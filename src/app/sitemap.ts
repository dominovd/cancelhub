import { MetadataRoute } from 'next'
import { allGuides } from '@/data/guides'
import { locales, defaultLocale } from '@/config/i18n'
import { siteUrl } from '@/config/seo'

function pageUrl(path: string, locale: string): string {
  const cleanPath = path === '/' ? '' : path
  return locale === defaultLocale
    ? `${siteUrl}${cleanPath}`
    : `${siteUrl}/${locale}${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Homepage for each locale
  for (const locale of locales) {
    entries.push({
      url: pageUrl('/', locale),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === defaultLocale ? 1.0 : 0.9,
    })
  }

  // /cancel index for each locale
  for (const locale of locales) {
    entries.push({
      url: pageUrl('/cancel', locale),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === defaultLocale ? 0.9 : 0.8,
    })
  }

  // Individual guide pages for each locale
  for (const guide of allGuides) {
    for (const locale of locales) {
      entries.push({
        url: pageUrl(`/cancel/${guide.slug}`, locale),
        lastModified: new Date(guide.lastVerified),
        changeFrequency: 'monthly',
        priority: locale === defaultLocale ? 0.8 : 0.7,
      })
    }
  }

  return entries
}
