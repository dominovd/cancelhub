'use client'

/**
 * Legacy localStorage utilities.
 *
 * Used only by the post-login migration prompt — checks if the user has
 * pre-auth guest subscriptions and, if so, lets them import them into
 * their new account.
 *
 * After import (or skip) the legacy keys are cleared.
 */

import type { Subscription } from '@/types/dashboard'

const STORAGE_KEYS = {
  subs: 'cancelhub:subscriptions:v1',
  settings: 'cancelhub:notifications:v1',
  events: 'cancelhub:notification-events:v1',
  seeded: 'cancelhub:seeded:v1',
  migrated: 'cancelhub:migrated-to-supabase:v1',
} as const

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

/** Returns guest subscriptions stored in localStorage, if any. */
export function readLegacySubscriptions(): Subscription[] {
  return readJSON<Subscription[]>(STORAGE_KEYS.subs, [])
}

/** True once we've offered (and the user has answered) the migration prompt. */
export function isLegacyMigrationHandled(): boolean {
  return readJSON<boolean>(STORAGE_KEYS.migrated, false)
}

export function markLegacyMigrationHandled(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEYS.migrated, JSON.stringify(true))
  } catch {
    // quota / private browsing — silently swallow
  }
}

/** Clear all legacy keys after a successful migration or explicit dismiss. */
export function clearLegacyStorage(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEYS.subs)
    window.localStorage.removeItem(STORAGE_KEYS.settings)
    window.localStorage.removeItem(STORAGE_KEYS.events)
    window.localStorage.removeItem(STORAGE_KEYS.seeded)
    markLegacyMigrationHandled()
  } catch {
    // see above
  }
}
