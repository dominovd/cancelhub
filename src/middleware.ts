import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { locales, defaultLocale } from '@/config/i18n'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  // Don't add locale prefix for default locale (en) — keeps URLs clean
  localePrefix: 'as-needed',
  // Always default to English regardless of browser language
  // Users switch language manually via the LanguageSwitcher
  localeDetection: false,
})

/**
 * Routes that require authentication. The leading slash is the locale-
 * stripped path (we match against the URL after intl handles the prefix).
 */
const PROTECTED_PATHS = ['/dashboard', '/notifications']

function isProtected(pathname: string): boolean {
  // Strip locale prefix if present (e.g. /ru/dashboard → /dashboard)
  const localeStripped = pathname.replace(
    new RegExp(`^/(${locales.join('|')})(?=/|$)`),
    '',
  ) || '/'
  return PROTECTED_PATHS.some((p) => localeStripped === p || localeStripped.startsWith(p + '/'))
}

export async function middleware(request: NextRequest) {
  // 1. Run intl middleware first — it may rewrite/redirect to add locale.
  const response = intlMiddleware(request)

  // 2. Refresh Supabase session cookies on every request, attaching to
  //    whatever response intl produced. Without this, server components
  //    see stale auth state.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 3. Gate protected routes.
  if (!user && isProtected(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // 4. If user is already authed and lands on /login, bounce them to /dashboard.
  if (user && request.nextUrl.pathname.replace(/^\/(en|de|es|fr|pt-PT|pt-BR|it|ja|ko|nl|ru|ar|zh-TW|sv|hi|id|tr)/, '') === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // Match all pathnames except static files, API routes, and the auth callback
  // (which has its own handler that must run unmodified).
  matcher: ['/((?!api|_next|_vercel|auth/callback|.*\\..*).*)'],
}
