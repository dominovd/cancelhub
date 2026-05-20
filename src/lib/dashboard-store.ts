'use client'

import { useEffect, useState, useCallback } from 'react'
import type {
  Subscription,
  NotificationSettings,
  NotificationEvent,
} from '@/types/dashboard'
import { DEFAULT_NOTIFICATION_SETTINGS } from '@/types/dashboard'

const STORAGE_KEYS = {
  subs: 'cancelhub:subscriptions:v1',
  settings: 'cancelhub:notifications:v1',
  events: 'cancelhub:notification-events:v1',
  seeded: 'cancelhub:seeded:v1',
} as const

// ── Seed data ────────────────────────────────────────────────────────────────
// Pre-populated subscriptions for first-time visitors so the dashboard looks
// alive instead of empty. After the seed flag is set we never re-seed.

function seedSubscriptions(): Subscription[] {
  const now = new Date()
  /** Date N days from today as YYYY-MM-DD (for nextChargeDate, trialEndsOn, lastUsedDate). */
  const addDays = (d: number): string => {
    const x = new Date(now)
    x.setDate(x.getDate() + d)
    return x.toISOString().slice(0, 10)
  }
  /** Date N days ago as a Date — call .toISOString() to get full datetime for createdAt. */
  const subDays = (d: number): Date => {
    const x = new Date(now)
    x.setDate(x.getDate() - d)
    return x
  }

  return [
    {
      id: 'seed-audible',
      name: 'Audible',
      guideSlug: 'audible',
      category: 'Audiobooks',
      monthlyPrice: 14.95,
      currency: 'USD',
      nextChargeDate: addDays(2),
      trialEndsOn: addDays(2),
      difficulty: 'medium',
      createdAt: subDays(28).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-canva',
      name: 'Canva Pro',
      guideSlug: 'canva-pro',
      category: 'Creative Tools',
      monthlyPrice: 14.99,
      currency: 'USD',
      nextChargeDate: addDays(6),
      trialEndsOn: addDays(6),
      difficulty: 'easy',
      createdAt: subDays(24).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-netflix',
      name: 'Netflix',
      guideSlug: 'netflix',
      category: 'Streaming',
      monthlyPrice: 15.49,
      currency: 'USD',
      nextChargeDate: addDays(3),
      difficulty: 'easy',
      lastUsedDate: subDays(1).toISOString().slice(0, 10),
      createdAt: subDays(120).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-spotify',
      name: 'Spotify',
      guideSlug: 'spotify',
      category: 'Music',
      monthlyPrice: 11.99,
      currency: 'USD',
      nextChargeDate: addDays(8),
      difficulty: 'easy',
      lastUsedDate: subDays(0).toISOString().slice(0, 10),
      createdAt: subDays(200).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-crunch',
      name: 'Crunch Fitness',
      guideSlug: 'crunch-fitness',
      category: 'Fitness',
      monthlyPrice: 24.99,
      currency: 'USD',
      nextChargeDate: addDays(12),
      difficulty: 'hard',
      lastUsedDate: subDays(32).toISOString().slice(0, 10),
      createdAt: subDays(90).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-adobe',
      name: 'Adobe Creative Cloud',
      guideSlug: 'adobe',
      category: 'Software',
      monthlyPrice: 54.99,
      currency: 'USD',
      nextChargeDate: addDays(13),
      difficulty: 'hard',
      lastUsedDate: subDays(7).toISOString().slice(0, 10),
      createdAt: subDays(60).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-chatgpt',
      name: 'ChatGPT Plus',
      guideSlug: 'chatgpt',
      category: 'AI',
      monthlyPrice: 20.0,
      currency: 'USD',
      nextChargeDate: addDays(20),
      difficulty: 'easy',
      lastUsedDate: subDays(0).toISOString().slice(0, 10),
      createdAt: subDays(45).toISOString() + 'T00:00:00Z',
    },
    {
      id: 'seed-icloud',
      name: 'iCloud+',
      guideSlug: undefined,
      category: 'Cloud Storage',
      monthlyPrice: 2.99,
      currency: 'USD',
      nextChargeDate: addDays(23),
      difficulty: 'easy',
      createdAt: subDays(400).toISOString() + 'T00:00:00Z',
    },
  ]
}

function seedNotificationEvents(): NotificationEvent[] {
  const ago = (h: number) => new Date(Date.now() - h * 3600 * 1000).toISOString()
  return [
    {
      id: 'evt-1',
      type: 'trial-ending',
      title: 'Audible trial ends in 2 days',
      body: 'You\'ll be charged $14.95 unless you cancel. Easy cancel — about 90 seconds.',
      channels: ['email', 'push'],
      sentAt: ago(2),
      read: false,
      subscriptionId: 'seed-audible',
    },
    {
      id: 'evt-2',
      type: 'price-increase',
      title: 'Adobe CC announced a price increase',
      body: '$54.99 → $59.99 effective July 12, 2026. Source: Adobe newsroom.',
      channels: ['email'],
      sentAt: ago(24),
      read: false,
      subscriptionId: 'seed-adobe',
    },
    {
      id: 'evt-3',
      type: 'idle',
      title: 'Crunch Fitness — 32 days idle',
      body: 'No check-ins since April 14. Renews soon. Hard to cancel — start now if you want out.',
      channels: ['email'],
      sentAt: ago(48),
      read: false,
      subscriptionId: 'seed-crunch',
    },
    {
      id: 'evt-4',
      type: 'weekly-brief',
      title: 'Sunday brief — $124 incoming this week',
      body: '5 charges scheduled, 2 trial conversions. Heaviest day: next Monday ($54.99).',
      channels: ['email'],
      sentAt: ago(72),
      read: true,
    },
    {
      id: 'evt-5',
      type: 'subscription-added',
      title: 'Canva Pro trial added',
      body: 'Detected from your Canva confirmation email. We\'ll ping you 2 days before billing.',
      channels: ['push'],
      sentAt: ago(96),
      read: true,
      subscriptionId: 'seed-canva',
    },
    {
      id: 'evt-6',
      type: 'monthly-summary',
      title: 'April spending summary — $123.04',
      body: '5 active subscriptions. +$15 vs March (added ChatGPT Plus). Biggest: Adobe CC.',
      channels: ['email'],
      sentAt: ago(240),
      read: true,
    },
  ]
}

// ── Storage helpers ──────────────────────────────────────────────────────────

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota, private browsing, etc — silently swallow
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export interface DashboardState {
  /** True after the first client-side mount. SSR-rendered output uses defaults. */
  ready: boolean
  subs: Subscription[]
  settings: NotificationSettings
  events: NotificationEvent[]

  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt'>) => void
  updateSubscription: (id: string, patch: Partial<Subscription>) => void
  removeSubscription: (id: string) => void
  clearAll: () => void

  updateSettings: (patch: Partial<NotificationSettings> | ((prev: NotificationSettings) => NotificationSettings)) => void

  markEventRead: (id: string) => void
  markAllEventsRead: () => void
}

export function useDashboard(): DashboardState {
  const [ready, setReady] = useState(false)
  const [subs, setSubs] = useState<Subscription[]>([])
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS)
  const [events, setEvents] = useState<NotificationEvent[]>([])

  // First mount — load from localStorage and seed if empty.
  useEffect(() => {
    const seeded = readJSON<boolean>(STORAGE_KEYS.seeded, false)

    if (!seeded) {
      const seedSubs = seedSubscriptions()
      const seedEvents = seedNotificationEvents()
      writeJSON(STORAGE_KEYS.subs, seedSubs)
      writeJSON(STORAGE_KEYS.events, seedEvents)
      writeJSON(STORAGE_KEYS.settings, DEFAULT_NOTIFICATION_SETTINGS)
      writeJSON(STORAGE_KEYS.seeded, true)
      setSubs(seedSubs)
      setEvents(seedEvents)
      setSettings(DEFAULT_NOTIFICATION_SETTINGS)
    } else {
      setSubs(readJSON<Subscription[]>(STORAGE_KEYS.subs, []))
      setEvents(readJSON<NotificationEvent[]>(STORAGE_KEYS.events, []))
      setSettings(readJSON<NotificationSettings>(STORAGE_KEYS.settings, DEFAULT_NOTIFICATION_SETTINGS))
    }
    setReady(true)
  }, [])

  const addSubscription = useCallback((sub: Omit<Subscription, 'id' | 'createdAt'>) => {
    setSubs((prev) => {
      const next: Subscription[] = [
        ...prev,
        {
          ...sub,
          id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date().toISOString(),
        },
      ]
      writeJSON(STORAGE_KEYS.subs, next)
      return next
    })
  }, [])

  const updateSubscription = useCallback((id: string, patch: Partial<Subscription>) => {
    setSubs((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
      writeJSON(STORAGE_KEYS.subs, next)
      return next
    })
  }, [])

  const removeSubscription = useCallback((id: string) => {
    setSubs((prev) => {
      const next = prev.filter((s) => s.id !== id)
      writeJSON(STORAGE_KEYS.subs, next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setSubs([])
    setEvents([])
    writeJSON(STORAGE_KEYS.subs, [])
    writeJSON(STORAGE_KEYS.events, [])
  }, [])

  const updateSettings = useCallback(
    (
      patch:
        | Partial<NotificationSettings>
        | ((prev: NotificationSettings) => NotificationSettings)
    ) => {
      setSettings((prev) => {
        const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
        writeJSON(STORAGE_KEYS.settings, next)
        return next
      })
    },
    [],
  )

  const markEventRead = useCallback((id: string) => {
    setEvents((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, read: true } : e))
      writeJSON(STORAGE_KEYS.events, next)
      return next
    })
  }, [])

  const markAllEventsRead = useCallback(() => {
    setEvents((prev) => {
      const next = prev.map((e) => ({ ...e, read: true }))
      writeJSON(STORAGE_KEYS.events, next)
      return next
    })
  }, [])

  return {
    ready,
    subs,
    settings,
    events,
    addSubscription,
    updateSubscription,
    removeSubscription,
    clearAll,
    updateSettings,
    markEventRead,
    markAllEventsRead,
  }
}
