import { locales, defaultLocale, type Locale } from './i18n'

export const siteUrl = 'https://cancelhub.app'

/** Canonical URL for a given path + locale */
export function canonicalUrl(path: string, locale: string): string {
  const cleanPath = path === '/' ? '' : path
  return locale === defaultLocale
    ? `${siteUrl}${cleanPath}`
    : `${siteUrl}/${locale}${cleanPath}`
}

/** hreflang alternates for all locales */
export function hreflangAlternates(path: string): Record<string, string> {
  const cleanPath = path === '/' ? '' : path
  const entries = locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = locale === defaultLocale
      ? `${siteUrl}${cleanPath}`
      : `${siteUrl}/${locale}${cleanPath}`
    return acc
  }, {})
  // x-default points to the English version
  entries['x-default'] = `${siteUrl}${cleanPath}`
  return entries
}
