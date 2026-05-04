export const locales = [
  'en',
  'de',
  'es',
  'fr',
  'pt-PT',
  'pt-BR',
  'it',
  'ja',
  'ko',
  'nl',
  'ru',
  'ar',
  'zh-TW',
  'sv',
  'hi',
  'id',
  'tr',
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const rtlLocales: Locale[] = ['ar']

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  'pt-PT': 'Português (Portugal)',
  'pt-BR': 'Português (Brasil)',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  nl: 'Nederlands',
  ru: 'Русский',
  ar: 'العربية',
  'zh-TW': '繁體中文',
  sv: 'Svenska',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  tr: 'Türkçe',
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}
