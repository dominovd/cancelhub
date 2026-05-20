/**
 * Dashboard / subscriptions types.
 *
 * Everything is stored in localStorage — no backend, no auth.
 * See lib/dashboard-store.ts for the persistence hook.
 */

import type { Difficulty } from './guide'

export interface Subscription {
  /** Stable UUID generated on creation */
  id: string
  /** User-facing name, e.g. "Netflix" */
  name: string
  /** If linked to a cancellation guide, the slug. Enables auto-icon + difficulty */
  guideSlug?: string
  /** Category text — free-form or matches a guide.category */
  category: string
  /** Monthly cost in major units (e.g. 14.99 dollars) */
  monthlyPrice: number
  /** ISO currency code (default 'USD') */
  currency: string
  /** ISO date when the next charge happens */
  nextChargeDate: string
  /** Optional — set when this sub is currently a free trial */
  trialEndsOn?: string
  /** How hard it is to cancel — copied from linked guide or set manually */
  difficulty?: Difficulty
  /** ISO date when the user last used / opened this service */
  lastUsedDate?: string
  /** Free-text notes */
  notes?: string
  /** ISO datetime when this subscription was added to the dashboard */
  createdAt: string
}

export type NotificationChannel = 'email' | 'push' | 'sms' | 'calendar'

export interface NotificationSettings {
  channels: {
    email: { enabled: boolean; address: string; verified: boolean }
    push: { enabled: boolean }
    sms: { enabled: boolean; phone: string }
    calendar: { enabled: boolean; feedUrl: string }
  }
  alerts: {
    trialEnding: { enabled: boolean; leadDays: number }
    priceIncrease: { enabled: boolean }
    renewalThreshold: { enabled: boolean; leadDays: number; threshold: number }
    idleSubscription: { enabled: boolean }
    weeklyBrief: { enabled: boolean }
    monthlySummary: { enabled: boolean }
  }
  quietHours: { start: string; end: string }
  digestMode: 'immediate' | 'daily' | 'smart' | 'calendar'
}

export type NotificationType =
  | 'trial-ending'
  | 'renewal'
  | 'price-increase'
  | 'idle'
  | 'weekly-brief'
  | 'monthly-summary'
  | 'subscription-added'
  | 'subscription-cancelled'

export interface NotificationEvent {
  id: string
  type: NotificationType
  title: string
  body: string
  channels: NotificationChannel[]
  /** ISO datetime when this event was generated */
  sentAt: string
  read: boolean
  /** Optional — links the event to a specific subscription */
  subscriptionId?: string
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  channels: {
    email: { enabled: true, address: '', verified: false },
    push: { enabled: true },
    sms: { enabled: false, phone: '' },
    calendar: { enabled: false, feedUrl: '' },
  },
  alerts: {
    trialEnding: { enabled: true, leadDays: 2 },
    priceIncrease: { enabled: true },
    renewalThreshold: { enabled: true, leadDays: 3, threshold: 25 },
    idleSubscription: { enabled: true },
    weeklyBrief: { enabled: true },
    monthlySummary: { enabled: false },
  },
  quietHours: { start: '22:00', end: '08:00' },
  digestMode: 'immediate',
}
