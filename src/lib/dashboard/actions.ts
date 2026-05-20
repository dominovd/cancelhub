'use server'

/**
 * Server actions for dashboard mutations.
 *
 * Each action:
 *  - Resolves the current user from the SSR cookie session
 *  - Throws if there's no user (the client should never call these from
 *    a logged-out state; the middleware also gates these routes)
 *  - Performs the mutation through the user-scoped Supabase client.
 *    RLS does the real authorization check.
 *  - Calls `revalidatePath` so RSC reads pick up the change on next
 *    navigation; the client uses optimistic updates for instant UI.
 */

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
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

class AuthError extends Error {
  constructor() {
    super('Not authenticated')
    this.name = 'AuthError'
  }
}

async function getUserId(): Promise<string> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new AuthError()
  return user.id
}

// ── subscriptions ────────────────────────────────────────────────────────────

export async function addSubscription(
  sub: Omit<Subscription, 'id' | 'createdAt'>,
): Promise<Subscription> {
  const userId = await getUserId()
  const supabase = createClient()
  const { data, error } = await supabase
    .from('subscriptions')
    .insert(subscriptionToInsert(sub, userId))
    .select()
    .single()

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to add subscription')
  }

  revalidatePath('/dashboard')
  revalidatePath('/notifications')
  return rowToSubscription(data)
}

/**
 * Bulk insert — used by the legacy localStorage migration. Insert one at a
 * time so a single bad row doesn't poison the batch.
 */
export async function bulkImportSubscriptions(
  subs: Omit<Subscription, 'id' | 'createdAt'>[],
): Promise<{ imported: number; failed: number }> {
  const userId = await getUserId()
  const supabase = createClient()

  let imported = 0
  let failed = 0

  for (const sub of subs) {
    const { error } = await supabase
      .from('subscriptions')
      .insert(subscriptionToInsert(sub, userId))
    if (error) failed++
    else imported++
  }

  revalidatePath('/dashboard')
  return { imported, failed }
}

export async function updateSubscription(
  id: string,
  patch: Partial<Subscription>,
): Promise<void> {
  await getUserId()
  const supabase = createClient()
  const { error } = await supabase
    .from('subscriptions')
    .update(subscriptionPatchToUpdate(patch))
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
}

export async function removeSubscription(id: string): Promise<void> {
  await getUserId()
  const supabase = createClient()
  const { error } = await supabase.from('subscriptions').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
}

export async function clearAllSubscriptions(): Promise<void> {
  const userId = await getUserId()
  const supabase = createClient()
  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('user_id', userId)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
}

// ── notification settings ────────────────────────────────────────────────────

export async function updateSettings(
  patch: Partial<NotificationSettings>,
): Promise<void> {
  const userId = await getUserId()
  const supabase = createClient()
  // The settings row is created by a trigger on signup, so we use update,
  // not upsert. Fall back to upsert if for some reason the row is missing.
  const { error: updateErr, data } = await supabase
    .from('notification_settings')
    .update(settingsPatchToUpdate(patch))
    .eq('user_id', userId)
    .select()

  if (!updateErr && data && data.length > 0) {
    revalidatePath('/notifications')
    return
  }

  // No row yet — insert with the patch + defaults from the trigger
  const { error: upsertErr } = await supabase
    .from('notification_settings')
    .upsert(
      {
        user_id: userId,
        ...settingsPatchToUpdate(patch),
      },
      { onConflict: 'user_id' },
    )

  if (upsertErr) throw new Error(upsertErr.message)
  revalidatePath('/notifications')
}

// ── notification events ──────────────────────────────────────────────────────

export async function markEventRead(id: string): Promise<void> {
  await getUserId()
  const supabase = createClient()
  const { error } = await supabase
    .from('notification_events')
    .update({ read: true })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/notifications')
}

export async function markAllEventsRead(): Promise<void> {
  const userId = await getUserId()
  const supabase = createClient()
  const { error } = await supabase
    .from('notification_events')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)
  if (error) throw new Error(error.message)
  revalidatePath('/notifications')
}

// ── session ──────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}
