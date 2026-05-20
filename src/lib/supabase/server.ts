/**
 * Server-side Supabase client for App Router. Use in:
 *   - Server Components
 *   - Route Handlers (app/**/route.ts)
 *   - Server Actions
 *
 * Reads cookies via next/headers and writes back any session refresh
 * cookies through the same store.
 */

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Server Component context — set was called from a place where
            // cookies are read-only. Middleware handles refresh in that case.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // see above
          }
        },
      },
    },
  )
}

/**
 * Admin client using the service-role key. Bypasses RLS — only use in
 * trusted server contexts (edge functions, cron jobs, server actions
 * that have already validated the user). Never expose to the browser.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin client')
  }
  // We still create through createServerClient so cookie semantics work,
  // but the service-role key bypasses RLS.
  const cookieStore = cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    },
  )
}
