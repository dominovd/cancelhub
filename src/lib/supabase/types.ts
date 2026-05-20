/**
 * Generated-by-hand Supabase Database type.
 *
 * In a larger project you'd run `supabase gen types typescript` against
 * the live schema. For our 3-table schema, maintaining this manually is
 * less ceremony.
 *
 * Keep this in sync with supabase/migrations/0001_init.sql.
 */

import type { NotificationSettings } from '@/types/dashboard'

export interface Database {
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
        Update: Partial<
          Database['public']['Tables']['subscriptions']['Insert']
        >
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
        Update: Partial<
          Database['public']['Tables']['notification_settings']['Insert']
        >
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
          type: Database['public']['Tables']['notification_events']['Row']['type']
          title: string
          body: string
          channels?: string[]
          subscription_id?: string | null
          sent_at?: string
          read?: boolean
        }
        Update: Partial<
          Database['public']['Tables']['notification_events']['Insert']
        >
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
