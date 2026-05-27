/**
 * Raw database row types for our three tables.
 *
 * These mirror the Neon schema (neon/schema.sql) exactly.
 * user_id is TEXT — it holds the Auth.js JWT sub (Google's numeric user ID).
 */

import type { NotificationSettings } from '@/types/dashboard'

export interface SubRow {
  id: string
  user_id: string
  name: string
  guide_slug: string | null
  category: string
  monthly_price: string | number  // Neon returns numeric as string
  currency: string
  next_charge_date: string        // DATE → 'YYYY-MM-DD'
  trial_ends_on: string | null
  difficulty: 'easy' | 'medium' | 'hard' | null
  last_used_date: string | null
  notes: string | null
  created_at: string
}

export interface SettingsRow {
  user_id: string
  channels: NotificationSettings['channels']
  alerts: NotificationSettings['alerts']
  quiet_hours: NotificationSettings['quietHours']
  digest_mode: NotificationSettings['digestMode']
  updated_at: string
}

export interface EventRow {
  id: string
  user_id: string
  type: string
  title: string
  body: string
  channels: string[]
  sent_at: string
  read: boolean
  subscription_id: string | null
}

export interface VerificationTokenRow {
  identifier: string
  token: string
  expires: string
}
