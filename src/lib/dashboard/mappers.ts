/**
 * DB ↔ app-type mappers.
 *
 * Postgres uses snake_case; our TypeScript types use camelCase.
 * These helpers do the conversion in both directions so the rest of
 * the code never sees raw rows.
 */

import type { Database } from '@/lib/supabase/types'
import type {
  Subscription,
  NotificationSettings,
  NotificationEvent,
} from '@/types/dashboard'
import { DEFAULT_NOTIFICATION_SETTINGS } from '@/types/dashboard'

type SubRow = Database['public']['Tables']['subscriptions']['Row']
type SettingsRow = Database['public']['Tables']['notification_settings']['Row']
type EventRow = Database['public']['Tables']['notification_events']['Row']

// ── subscriptions ────────────────────────────────────────────────────────────

export function rowToSubscription(row: SubRow): Subscription {
  return {
    id: row.id,
    name: row.name,
    guideSlug: row.guide_slug ?? undefined,
    category: row.category,
    monthlyPrice: Number(row.monthly_price),
    currency: row.currency,
    nextChargeDate: row.next_charge_date,
    trialEndsOn: row.trial_ends_on ?? undefined,
    difficulty: row.difficulty ?? undefined,
    lastUsedDate: row.last_used_date ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
  }
}

/**
 * App-shape Subscription → DB Insert row (without id/created_at, those are
 * server-generated). `user_id` must be supplied by the caller.
 */
export function subscriptionToInsert(
  sub: Omit<Subscription, 'id' | 'createdAt'>,
  userId: string,
): Database['public']['Tables']['subscriptions']['Insert'] {
  return {
    user_id: userId,
    name: sub.name,
    guide_slug: sub.guideSlug ?? null,
    category: sub.category,
    monthly_price: sub.monthlyPrice,
    currency: sub.currency,
    next_charge_date: sub.nextChargeDate,
    trial_ends_on: sub.trialEndsOn ?? null,
    difficulty: sub.difficulty ?? null,
    last_used_date: sub.lastUsedDate ?? null,
    notes: sub.notes ?? null,
  }
}

export function subscriptionPatchToUpdate(
  patch: Partial<Subscription>,
): Database['public']['Tables']['subscriptions']['Update'] {
  const out: Database['public']['Tables']['subscriptions']['Update'] = {}
  if (patch.name !== undefined) out.name = patch.name
  if (patch.guideSlug !== undefined) out.guide_slug = patch.guideSlug ?? null
  if (patch.category !== undefined) out.category = patch.category
  if (patch.monthlyPrice !== undefined) out.monthly_price = patch.monthlyPrice
  if (patch.currency !== undefined) out.currency = patch.currency
  if (patch.nextChargeDate !== undefined) out.next_charge_date = patch.nextChargeDate
  if (patch.trialEndsOn !== undefined) out.trial_ends_on = patch.trialEndsOn ?? null
  if (patch.difficulty !== undefined) out.difficulty = patch.difficulty ?? null
  if (patch.lastUsedDate !== undefined) out.last_used_date = patch.lastUsedDate ?? null
  if (patch.notes !== undefined) out.notes = patch.notes ?? null
  return out
}

// ── notification_settings ────────────────────────────────────────────────────

export function rowToSettings(row: SettingsRow | null): NotificationSettings {
  if (!row) return DEFAULT_NOTIFICATION_SETTINGS
  return {
    channels: row.channels,
    alerts: row.alerts,
    quietHours: row.quiet_hours,
    digestMode: row.digest_mode,
  }
}

export function settingsPatchToUpdate(
  patch: Partial<NotificationSettings>,
): Database['public']['Tables']['notification_settings']['Update'] {
  const out: Database['public']['Tables']['notification_settings']['Update'] = {}
  if (patch.channels !== undefined) out.channels = patch.channels
  if (patch.alerts !== undefined) out.alerts = patch.alerts
  if (patch.quietHours !== undefined) out.quiet_hours = patch.quietHours
  if (patch.digestMode !== undefined) out.digest_mode = patch.digestMode
  return out
}

// ── notification_events ──────────────────────────────────────────────────────

export function rowToEvent(row: EventRow): NotificationEvent {
  // Channels stored as text[], so they may include unknown strings — narrow
  // to the union and drop anything weird that wouldn't render.
  const safeChannels = row.channels.filter(
    (c): c is NotificationEvent['channels'][number] =>
      c === 'email' || c === 'push' || c === 'sms' || c === 'calendar',
  )

  return {
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    channels: safeChannels,
    sentAt: row.sent_at,
    read: row.read,
    subscriptionId: row.subscription_id ?? undefined,
  }
}
