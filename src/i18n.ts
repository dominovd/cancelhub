import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale } from '@/config/i18n'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const safeLocale = locales.includes(locale as (typeof locales)[number])
    ? locale
    : defaultLocale

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  }
})
