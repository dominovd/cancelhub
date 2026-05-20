/**
 * Server-side read helpers for the dashboard. Use in server components.
 *
 * Each fn returns a Promise of app-shape data, hiding Supabase + DB-row
 * details from the caller.
 */

import { createClient } from '@/lib/supabase/server'
import type {
  Subscription,
  NotificationSettings,
  NotificationEvent,
} from '@/types/dashboard'
import { DEFAULT_NOTIFICATION_SETTINGS } from '@/types/dashboard'
import { rowToSubscription, rowToSettings, rowToEvent } from './mappers'

export interface DashboardSnapshot {
  subs: Subscription[]
  settings: NotificationSettings
  events: NotificationEvent[]
}

/**
 * Fetch everything the dashboard needs in one go. Requires an authenticated
 * session. If the session is missing or the user has no rows, returns
 * sensible empty defaults.
 */
export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      subs: [],
      settings: DEFAULT_NOTIFICATION_SETTINGS,
      events: [],
    }
  }

  // Three parallel queries — RLS scopes each to the current user automatically.
  const [subsRes, settingsRes, eventsRes] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('*')
      .order('next_charge_date', { ascending: true }),
    supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle(),
    supabase
      .from('notification_events')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(50),
  ])

  return {
    subs: (subsRes.data ?? []).map(rowToSubscription),
    settings: rowToSettings(settingsRes.data),
    events: (eventsRes.data ?? []).map(rowToEvent),
  }
}

export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}
