import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { auth } from '@/auth'
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
 * Routes that require authentication. Matched against the locale-stripped path.
 */
const PROTECTED_PATHS = ['/dashboard', '/notifications']

function isProtected(pathname: string): boolean {
  const localeStripped =
    pathname.replace(
      new RegExp(`^/(${locales.join('|')})(?=/|$)`),
      '',
    ) || '/'
  return PROTECTED_PATHS.some(
    (p) => localeStripped === p || localeStripped.startsWith(p + '/'),
  )
}

export default auth(function middleware(request: NextRequest) {
  // 1. Run intl middleware first — may rewrite/redirect for locale prefix.
  const response = intlMiddleware(request)

  // 2. Auth.js attaches the session to request.auth when using the
  //    auth() middleware wrapper. No cookie parsing needed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = (request as any).auth as { user?: { id?: string } } | null

  // 3. Gate protected routes.
  if (!session?.user && isProtected(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // 4. Bounce already-authed users away from /login.
  const strippedPath =
    request.nextUrl.pathname.replace(
      new RegExp(`^/(${locales.join('|')})(?=/|$)`),
      '',
    ) || '/'
  if (session?.user && strippedPath === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
