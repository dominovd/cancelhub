/**
 * Browser-side Supabase client. Use in 'use client' components only.
 *
 * Reads session from cookies maintained by the SSR helpers; no need to
 * manage tokens manually.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
