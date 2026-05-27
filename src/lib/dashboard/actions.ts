'use server'

/**
 * Server actions for dashboard mutations.
 *
 * Replaces Supabase client with direct Neon SQL queries.
 * Auth.js session provides the user ID; all mutations are scoped with
 * WHERE user_id = $userId (replaces Supabase RLS).
 */

import { revalidatePath } from 'next/cache'
import { sql } from '@/lib/db'
import { auth, signOut as authSignOut } from '@/auth'
import type {
  Subscription,
  NotificationSettings,
} from '@/types/dashboard'
import {
  rowToSubscription,
  subscriptionToInsert,
  subscriptionPatchToUpdate,
  settingsPatchToUpdate,
} from './mappers'
import type { SubRow } from '@/lib/db/types'

class AuthError extends Error {
  constructor() {
    super('Not authenticated')
    this.name = 'AuthError'
  }
}

async function getUserId(): Promise<string> {
  const session = await auth()
  if (!session?.user?.id) throw new AuthError()
  return session.user.id
}

// ── subscriptions ────────────────────────────────────────────────────────────

export async function addSubscription(
  sub: Omit<Subscription, 'id' | 'createdAt'>,
): Promise<Subscription> {
  const userId = await getUserId()
  const row = subscriptionToInsert(sub, userId)

  const rows = await sql`
    INSERT INTO subscriptions (
      user_id, name, guide_slug, category, monthly_price, currency,
      next_charge_date, trial_ends_on, difficulty, last_used_date, notes
    ) VALUES (
      ${row.user_id}, ${row.name}, ${row.guide_slug}, ${row.category},
      ${row.monthly_price}, ${row.currency}, ${row.next_charge_date},
      ${row.trial_ends_on}, ${row.difficulty}, ${row.last_used_date}, ${row.notes}
    )
    RETURNING *
  `

  if (!rows[0]) throw new Error('Failed to add subscription')
  revalidatePath('/dashboard')
  revalidatePath('/notifications')
  return rowToSubscription(rows[0] as SubRow)
}

/**
 * Bulk insert — used by the legacy localStorage migration.
 */
export async function bulkImportSubscriptions(
  subs: Omit<Subscription, 'id' | 'createdAt'>[],
): Promise<{ imported: number; failed: number }> {
  const userId = await getUserId()
  let imported = 0
  let failed = 0

  for (const sub of subs) {
    const row = subscriptionToInsert(sub, userId)
    try {
      await sql`
        INSERT INTO subscriptions (
          user_id, name, guide_slug, category, monthly_price, currency,
          next_charge_date, trial_ends_on, difficulty, last_used_date, notes
        ) VALUES (
          ${row.user_id}, ${row.name}, ${row.guide_slug}, ${row.category},
          ${row.monthly_price}, ${row.currency}, ${row.next_charge_date},
          ${row.trial_ends_on}, ${row.difficulty}, ${row.last_used_date}, ${row.notes}
        )
      `
      imported++
    } catch {
      failed++
    }
  }

  revalidatePath('/dashboard')
  return { imported, failed }
}

export async function updateSubscription(
  id: string,
  patch: Partial<Subscription>,
): Promise<void> {
  const userId = await getUserId()
  const upd = subscriptionPatchToUpdate(patch)

  // Build SET clause dynamically from non-empty patch.
  // We include user_id in the WHERE to prevent cross-user updates (defence-in-depth).
  const entries = Object.entries(upd).filter(([, v]) => v !== undefined)
  if (entries.length === 0) return

  // Use individual field updates to keep parameterisation simple.
  // This is less elegant than a dynamic builder but type-safe and
  // avoids sql-injection via key names.
  for (const [key, value] of entries) {
    switch (key) {
      case 'name':
        await sql`UPDATE subscriptions SET name = ${value as string} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'guide_slug':
        await sql`UPDATE subscriptions SET guide_slug = ${value as string | null} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'category':
        await sql`UPDATE subscriptions SET category = ${value as string} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'monthly_price':
        await sql`UPDATE subscriptions SET monthly_price = ${value as number} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'currency':
        await sql`UPDATE subscriptions SET currency = ${value as string} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'next_charge_date':
        await sql`UPDATE subscriptions SET next_charge_date = ${value as string} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'trial_ends_on':
        await sql`UPDATE subscriptions SET trial_ends_on = ${value as string | null} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'difficulty':
        await sql`UPDATE subscriptions SET difficulty = ${value as string | null} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'last_used_date':
        await sql`UPDATE subscriptions SET last_used_date = ${value as string | null} WHERE id = ${id} AND user_id = ${userId}`
        break
      case 'notes':
        await sql`UPDATE subscriptions SET notes = ${value as string | null} WHERE id = ${id} AND user_id = ${userId}`
        break
    }
  }

  revalidatePath('/dashboard')
}

export async function removeSubscription(id: string): Promise<void> {
  const userId = await getUserId()
  await sql`DELETE FROM subscriptions WHERE id = ${id} AND user_id = ${userId}`
  revalidatePath('/dashboard')
}

export async function clearAllSubscriptions(): Promise<void> {
  const userId = await getUserId()
  await sql`DELETE FROM subscriptions WHERE user_id = ${userId}`
  revalidatePath('/dashboard')
}

// ── notification settings ────────────────────────────────────────────────────

export async function updateSettings(
  patch: Partial<NotificationSettings>,
): Promise<void> {
  const userId = await getUserId()
  const upd = settingsPatchToUpdate(patch)

  // UPSERT: create the row if it doesn't exist yet.
  await sql`
    INSERT INTO notification_settings (user_id, channels, alerts, quiet_hours, digest_mode)
    VALUES (
      ${userId},
      ${upd.channels !== undefined ? JSON.stringify(upd.channels) : null}::jsonb,
      ${upd.alerts !== undefined ? JSON.stringify(upd.alerts) : null}::jsonb,
      ${upd.quiet_hours !== undefined ? JSON.stringify(upd.quiet_hours) : null}::jsonb,
      ${upd.digest_mode ?? null}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      channels    = COALESCE(EXCLUDED.channels,    notification_settings.channels),
      alerts      = COALESCE(EXCLUDED.alerts,      notification_settings.alerts),
      quiet_hours = COALESCE(EXCLUDED.quiet_hours, notification_settings.quiet_hours),
      digest_mode = COALESCE(EXCLUDED.digest_mode, notification_settings.digest_mode),
      updated_at  = now()
  `

  revalidatePath('/notifications')
}

// ── notification events ──────────────────────────────────────────────────────

export async function markEventRead(id: string): Promise<void> {
  const userId = await getUserId()
  await sql`UPDATE notification_events SET read = true WHERE id = ${id} AND user_id = ${userId}`
  revalidatePath('/notifications')
}

export async function markAllEventsRead(): Promise<void> {
  const userId = await getUserId()
  await sql`UPDATE notification_events SET read = true WHERE user_id = ${userId} AND read = false`
  revalidatePath('/notifications')
}

// ── session ──────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  await authSignOut({ redirectTo: '/' })
}
