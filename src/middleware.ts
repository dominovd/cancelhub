import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from '@/config/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  // Don't add locale prefix for default locale (en) — keeps URLs clean
  localePrefix: 'as-needed',
  // Always default to English regardless of browser language
  // Users switch language manually via the LanguageSwitcher
  localeDetection: false,
})

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
