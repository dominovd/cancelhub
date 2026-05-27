export const locales = ['en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const rtlLocales: Locale[] = []

export const localeLabels: Record<Locale, string> = {
  en: 'English',
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}
