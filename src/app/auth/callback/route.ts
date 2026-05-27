/**
 * Legacy Supabase auth callback — no longer used.
 *
 * Auth.js now handles OAuth callbacks at /api/auth/callback/google
 * and /api/auth/callback/resend. This file is kept to avoid a 404
 * if any old email links are still in the wild; it just redirects home.
 */
import { NextResponse, type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  return NextResponse.redirect(new URL('/dashboard', origin))
}
