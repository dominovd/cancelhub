/**
 * OAuth + magic-link callback.
 *
 * Supabase Auth redirects here with `?code=...` after the user clicks
 * the email link OR completes the Google flow. We exchange the code for
 * a session (which sets the auth cookies via the SSR client), then bounce
 * the user to wherever they were trying to go.
 *
 * IMPORTANT: this route is excluded from the i18n middleware (see
 * middleware.ts matcher), because the callback URL is locale-less.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const errorDescription = searchParams.get('error_description')

  if (errorDescription) {
    // e.g. magic link expired, link already used, OAuth cancelled
    const errUrl = new URL('/login', origin)
    errUrl.searchParams.set('error', errorDescription)
    return NextResponse.redirect(errUrl)
  }

  if (!code) {
    // No code in the URL — something went wrong upstream
    const errUrl = new URL('/login', origin)
    errUrl.searchParams.set('error', 'Missing auth code')
    return NextResponse.redirect(errUrl)
  }

  const supabase = createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    const errUrl = new URL('/login', origin)
    errUrl.searchParams.set('error', error.message)
    return NextResponse.redirect(errUrl)
  }

  // Avoid open-redirect: only allow same-origin paths.
  const target = next.startsWith('/') ? next : '/dashboard'
  return NextResponse.redirect(new URL(target, origin))
}
