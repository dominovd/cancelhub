import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { allCategories } from '@/lib/categories'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'categoriesPage' })
  const path = '/categories'
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

// Colour-tile palette — warm pastels that pair with the cream + terracotta system.
const TILE_PALETTE = [
  { bg: '#fbe7da', fg: '#7c2d12' }, // terracotta-soft
  { bg: '#e3ecdd', fg: '#1f3a1c' }, // sage-soft
  { bg: '#f5e6cf', fg: '#603e0a' }, // amber-soft
  { bg: '#f8dcda', fg: '#5c1414' }, // rose-soft
  { bg: '#e0e7f0', fg: '#1f3340' }, // sky-soft
  { bg: '#ecdcef', fg: '#3e1844' }, // plum-soft
  { bg: '#dfeae3', fg: '#1a3a2f' }, // mint-soft
  { bg: '#eeece4', fg: '#3a352b' }, // sand
]

function tileColor(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) & 0xffff
  }
  return TILE_PALETTE[hash % TILE_PALETTE.length]
}

export default async function CategoriesIndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'categoriesPage' })

  return (
    <article className="max-w-[1000px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span>Categories</span>
      </nav>

      <header style={{ padding: '14px 0 32px' }}>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(30px, 5vw, 46px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          {t('title')}{' '}
          <em
            className="font-serif-display"
            style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}
          >
            {t('titleAccent')}
          </em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 15.5, marginTop: 10, maxWidth: '54ch' }}>
          {t('intro')}
        </p>
      </header>

      <div
        className="grid gap-[12px]"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}
      >
        {allCategories.map((cat) => {
          const c = tileColor(cat.slug)
          return (
            <Link
              key={cat.slug}
              href={`/${locale}/categories/${cat.slug}`}
              className="hover:-translate-y-[2px]"
              style={{
                background: c.bg,
                color: c.fg,
                borderRadius: 16,
                padding: '22px 20px',
                minHeight: 124,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                transition: 'transform .2s ease',
              }}
            >
              <div
                className="font-serif-display"
                style={{ fontWeight: 600, fontSize: 21, letterSpacing: '-0.01em' }}
              >
                {cat.name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.75 }}>
                {t('countLabel', { count: cat.count })}
              </div>
            </Link>
          )
        })}
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-12 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">
          Browse all guides →
        </Link>
        <Link href={`/${locale}/rankings`} className="hover:accent transition-colors">
          Overall rankings →
        </Link>
      </div>
    </article>
  )
}
