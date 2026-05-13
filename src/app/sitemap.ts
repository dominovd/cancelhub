import { MetadataRoute } from 'next'
import { allGuides } from '@/data/guides'
import { allCategories } from '@/lib/categories'
import { SUPPORTED_ACTIONS } from '@/lib/actions'
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

  // ── Static top-level pages ─────────────────────────────────────────────────
  const staticPages = [
    { path: '/',          priority: 1.0, freq: 'weekly'  },
    { path: '/cancel',    priority: 0.9, freq: 'weekly'  },
    { path: '/rankings',  priority: 0.8, freq: 'weekly'  },
    { path: '/categories',priority: 0.8, freq: 'weekly'  },
    { path: '/about',     priority: 0.5, freq: 'monthly' },
    { path: '/contact',   priority: 0.4, freq: 'monthly' },
  ] as const

  for (const { path, priority, freq } of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: pageUrl(path, locale),
        lastModified: now,
        changeFrequency: freq,
        priority: locale === defaultLocale ? priority : priority - 0.1,
      })
    }
  }

  // ── Category pages ─────────────────────────────────────────────────────────
  for (const cat of allCategories) {
    for (const locale of locales) {
      entries.push({
        url: pageUrl(`/categories/${cat.slug}`, locale),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === defaultLocale ? 0.7 : 0.6,
      })
    }
  }

  // ── Individual guide pages ─────────────────────────────────────────────────
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

  // ── Action pages (pause, refund…) ──────────────────────────────────────────
  for (const guide of allGuides) {
    for (const action of SUPPORTED_ACTIONS) {
      for (const locale of locales) {
        entries.push({
          url: pageUrl(`/cancel/${guide.slug}/${action}`, locale),
          lastModified: new Date(guide.lastVerified),
          changeFrequency: 'monthly',
          priority: locale === defaultLocale ? 0.6 : 0.5,
        })
      }
    }
  }

  return entries
}
