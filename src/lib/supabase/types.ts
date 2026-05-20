/**
 * Generated-by-hand Supabase Database type.
 *
 * In a larger project you'd run `supabase gen types typescript` against
 * the live schema. For our 3-table schema, maintaining this manually is
 * less ceremony.
 *
 * Keep this in sync with supabase/migrations/0001_init.sql.
 *
 * NOTE: Each table needs a `Relationships: []` entry — without it the
 * @supabase/supabase-js generic types fall through to `never` and you
 * get cryptic "is not assignable to parameter of type 'never[]'" errors
 * on every `.insert()` and `.update()` call.
 */

import type { NotificationSettings } from '@/types/dashboard'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string
          user_id: string
          name: string
          guide_slug: string | null
          category: string
          monthly_price: number
          currency: string
          next_charge_date: string
          trial_ends_on: string | null
          difficulty: 'easy' | 'medium' | 'hard' | null
          last_used_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          guide_slug?: string | null
          category?: string
          monthly_price: number
          currency?: string
          next_charge_date: string
          trial_ends_on?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          last_used_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          guide_slug?: string | null
          category?: string
          monthly_price?: number
          currency?: string
          next_charge_date?: string
          trial_ends_on?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          last_used_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          user_id: string
          channels: NotificationSettings['channels']
          alerts: NotificationSettings['alerts']
          quiet_hours: NotificationSettings['quietHours']
          digest_mode: NotificationSettings['digestMode']
          updated_at: string
        }
        Insert: {
          user_id: string
          channels?: NotificationSettings['channels']
          alerts?: NotificationSettings['alerts']
          quiet_hours?: NotificationSettings['quietHours']
          digest_mode?: NotificationSettings['digestMode']
        }
        Update: {
          user_id?: string
          channels?: NotificationSettings['channels']
          alerts?: NotificationSettings['alerts']
          quiet_hours?: NotificationSettings['quietHours']
          digest_mode?: NotificationSettings['digestMode']
        }
        Relationships: []
      }
      notification_events: {
        Row: {
          id: string
          user_id: string
          type:
            | 'trial-ending'
            | 'renewal'
            | 'price-increase'
            | 'idle'
            | 'weekly-brief'
            | 'monthly-summary'
            | 'subscription-added'
            | 'subscription-cancelled'
          title: string
          body: string
          channels: string[]
          subscription_id: string | null
          sent_at: string
          read: boolean
        }
        Insert: {
          id?: string
          user_id: string
          type:
            | 'trial-ending'
            | 'renewal'
            | 'price-increase'
            | 'idle'
            | 'weekly-brief'
            | 'monthly-summary'
            | 'subscription-added'
            | 'subscription-cancelled'
          title: string
          body: string
          channels?: string[]
          subscription_id?: string | null
          sent_at?: string
          read?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          type?:
            | 'trial-ending'
            | 'renewal'
            | 'price-increase'
            | 'idle'
            | 'weekly-brief'
            | 'monthly-summary'
            | 'subscription-added'
            | 'subscription-cancelled'
          title?: string
          body?: string
          channels?: string[]
          subscription_id?: string | null
          sent_at?: string
          read?: boolean
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
