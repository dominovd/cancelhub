/**
 * Server-side read helpers for the dashboard. Use in server components.
 *
 * Replaces Supabase client calls with direct Neon SQL queries.
 * Auth.js session provides the user ID; all queries are scoped with
 * WHERE user_id = $1 (replaces Supabase RLS).
 */

import { sql } from '@/lib/db'
import { auth } from '@/auth'
import type {
  Subscription,
  NotificationSettings,
  NotificationEvent,
} from '@/types/dashboard'
import { DEFAULT_NOTIFICATION_SETTINGS } from '@/types/dashboard'
import { rowToSubscription, rowToSettings, rowToEvent } from './mappers'
import type { SubRow, SettingsRow, EventRow } from '@/lib/db/types'

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
  const session = await auth()
  if (!session?.user?.id) {
    return {
      subs: [],
      settings: DEFAULT_NOTIFICATION_SETTINGS,
      events: [],
    }
  }

  const userId = session.user.id

  // Three parallel queries scoped to the current user.
  const [subsRows, settingsRows, eventsRows] = await Promise.all([
    sql`
      SELECT * FROM subscriptions
      WHERE user_id = ${userId}
      ORDER BY next_charge_date ASC
    `,
    sql`
      SELECT * FROM notification_settings
      WHERE user_id = ${userId}
      LIMIT 1
    `,
    sql`
      SELECT * FROM notification_events
      WHERE user_id = ${userId}
      ORDER BY sent_at DESC
      LIMIT 50
    `,
  ])

  return {
    subs: (subsRows as SubRow[]).map(rowToSubscription),
    settings: rowToSettings((settingsRows[0] as SettingsRow) ?? null),
    events: (eventsRows as EventRow[]).map(rowToEvent),
  }
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user ?? null
}
