'use client'

/**
 * Client hook: keeps the dashboard's local state in sync with the server.
 *
 * The hook is initialized with `initial` data fetched server-side (so the
 * first paint is non-empty). Every mutation is **optimistic**: we update
 * local state immediately, then call the matching server action. On error,
 * we call `router.refresh()` to pull canonical data back from the server.
 */

import { useCallback, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type {
  Subscription,
  NotificationSettings,
  NotificationEvent,
} from '@/types/dashboard'
import {
  addSubscription as actAdd,
  updateSubscription as actUpdate,
  removeSubscription as actRemove,
  clearAllSubscriptions as actClearAll,
  updateSettings as actUpdateSettings,
  markEventRead as actMarkRead,
  markAllEventsRead as actMarkAllRead,
} from './actions'

export interface DashboardInitial {
  subs: Subscription[]
  settings: NotificationSettings
  events: NotificationEvent[]
}

export interface DashboardState {
  /** True once the client has mounted — kept for parity with the legacy API. */
  ready: boolean
  /** True while a server action is in-flight. */
  pending: boolean
  /** Most recent error from a server action, if any. */
  error: string | null

  subs: Subscription[]
  settings: NotificationSettings
  events: NotificationEvent[]

  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt'>) => Promise<void>
  updateSubscription: (id: string, patch: Partial<Subscription>) => Promise<void>
  removeSubscription: (id: string) => Promise<void>
  clearAll: () => Promise<void>
  updateSettings: (
    patch:
      | Partial<NotificationSettings>
      | ((prev: NotificationSettings) => NotificationSettings),
  ) => Promise<void>
  markEventRead: (id: string) => Promise<void>
  markAllEventsRead: () => Promise<void>
}

export function useDashboard(initial: DashboardInitial): DashboardState {
  const router = useRouter()
  const [subs, setSubs] = useState<Subscription[]>(initial.subs)
  const [settings, setSettings] = useState<NotificationSettings>(initial.settings)
  const [events, setEvents] = useState<NotificationEvent[]>(initial.events)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const refresh = useCallback(() => {
    router.refresh()
  }, [router])

  // ── subscriptions ─────────────────────────────────────────────────────────

  const addSubscription = useCallback(
    async (sub: Omit<Subscription, 'id' | 'createdAt'>) => {
      // Optimistic insert with a temporary id we'll replace once the server
      // returns the real one.
      const tempId = `optimistic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      const optimistic: Subscription = {
        ...sub,
        id: tempId,
        createdAt: new Date().toISOString(),
      }
      setSubs((prev) => [...prev, optimistic])
      setError(null)

      try {
        const real = await actAdd(sub)
        setSubs((prev) => prev.map((s) => (s.id === tempId ? real : s)))
        startTransition(refresh)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        // Roll back local state by refetching from server
        setSubs((prev) => prev.filter((s) => s.id !== tempId))
        startTransition(refresh)
      }
    },
    [refresh],
  )

  const updateSubscription = useCallback(
    async (id: string, patch: Partial<Subscription>) => {
      const before = subs
      setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
      setError(null)
      try {
        await actUpdate(id, patch)
        startTransition(refresh)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        setSubs(before)
        startTransition(refresh)
      }
    },
    [subs, refresh],
  )

  const removeSubscription = useCallback(
    async (id: string) => {
      const before = subs
      setSubs((prev) => prev.filter((s) => s.id !== id))
      setError(null)
      try {
        await actRemove(id)
        startTransition(refresh)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        setSubs(before)
        startTransition(refresh)
      }
    },
    [subs, refresh],
  )

  const clearAll = useCallback(async () => {
    const before = subs
    setSubs([])
    setError(null)
    try {
      await actClearAll()
      startTransition(refresh)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setSubs(before)
      startTransition(refresh)
    }
  }, [subs, refresh])

  // ── settings ──────────────────────────────────────────────────────────────

  const updateSettings = useCallback(
    async (
      patch:
        | Partial<NotificationSettings>
        | ((prev: NotificationSettings) => NotificationSettings),
    ) => {
      const before = settings
      const nextValue =
        typeof patch === 'function' ? patch(settings) : { ...settings, ...patch }
      const diff: Partial<NotificationSettings> =
        typeof patch === 'function' ? nextValue : (patch as Partial<NotificationSettings>)
      setSettings(nextValue)
      setError(null)
      try {
        await actUpdateSettings(diff)
        startTransition(refresh)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        setSettings(before)
        startTransition(refresh)
      }
    },
    [settings, refresh],
  )

  // ── events ────────────────────────────────────────────────────────────────

  const markEventRead = useCallback(
    async (id: string) => {
      const before = events
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)))
      try {
        await actMarkRead(id)
        startTransition(refresh)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        setEvents(before)
        startTransition(refresh)
      }
    },
    [events, refresh],
  )

  const markAllEventsRead = useCallback(async () => {
    const before = events
    setEvents((prev) => prev.map((e) => ({ ...e, read: true })))
    try {
      await actMarkAllRead()
      startTransition(refresh)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setEvents(before)
      startTransition(refresh)
    }
  }, [events, refresh])

  return {
    ready: true,
    pending,
    error,
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
