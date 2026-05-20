import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { allCategories, categoriesBySlug, getCategoryIntro } from '@/lib/categories'
import { BrandLogo } from '@/components/BrandLogo'
import type { CancelGuide } from '@/types/guide'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allCategories.map((c) => ({ locale, cat: c.slug }))
  )
}

export async function generateMetadata({
  params: { locale, cat },
}: {
  params: { locale: string; cat: string }
}): Promise<Metadata> {
  const category = categoriesBySlug[cat]
  if (!category) return {}

  const path = `/categories/${cat}`
  const title = `How to Cancel ${category.name} Subscriptions — Ranked by Difficulty`
  const description = getCategoryIntro(category.name)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: `${title} | CancelHub`,
      description,
      url: canonicalUrl(path, locale),
    },
  }
}

function diffPillClass(d: 'easy' | 'medium' | 'hard'): string {
  return d === 'easy' ? 'pill pill-easy' : d === 'medium' ? 'pill pill-med' : 'pill pill-hard'
}

export default async function CategoryPage({
  params: { locale, cat },
}: {
  params: { locale: string; cat: string }
}) {
  setRequestLocale(locale)
  const category = categoriesBySlug[cat]
  if (!category) notFound()

  const tDiff = await getTranslations({ locale, namespace: 'difficulty' })
  const diffShort = (d: 'easy' | 'medium' | 'hard') =>
    d === 'easy' ? tDiff('easyShort') : d === 'medium' ? tDiff('medShort') : tDiff('hardShort')

  const hardest = category.guides[0]
  const easiest = category.guides[category.guides.length - 1]

  return (
    <article className="max-w-[1000px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/categories`} className="hover:accent transition-colors">Categories</Link>
        <span>/</span>
        <span>{category.name}</span>
      </nav>

      <header style={{ padding: '14px 0 8px' }}>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(30px, 5vw, 46px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          {category.name}{' '}
          <em
            className="font-serif-display"
            style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}
          >
            subscriptions
          </em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 15.5, marginTop: 10, maxWidth: '54ch' }}>
          {getCategoryIntro(category.name)}
        </p>
      </header>

      {/* Quick stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid var(--line)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--card)',
          boxShadow: 'var(--shadow)',
          margin: '20px 0 8px',
        }}
      >
        <div style={{ padding: '14px 16px', borderRight: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600 }}>
            Services
          </div>
          <div className="font-serif-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 3, letterSpacing: '-0.01em' }}>
            {category.count}
          </div>
        </div>
        <div style={{ padding: '14px 16px', borderRight: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600 }}>
            Avg dark-pattern
          </div>
          <div className="font-serif-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 3, letterSpacing: '-0.01em' }}>
            {category.avgScore}<span style={{ fontSize: 14, color: 'var(--ink-3)' }}>/10</span>
          </div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600 }}>
            Hardest
          </div>
          <div className="font-serif-display" style={{ fontSize: 17, fontWeight: 600, marginTop: 3, letterSpacing: '-0.01em' }}>
            {hardest.service}
          </div>
        </div>
      </div>

      {/* Guide grid */}
      <section style={{ marginTop: 22 }}>
        <div
          className="flex items-baseline gap-[9px]"
          style={{ paddingBottom: 7, marginBottom: 11, borderBottom: '1px solid var(--line)' }}
        >
          <h2
            className="font-serif-display"
            style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}
          >
            All {category.name} guides
          </h2>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--ink-3)',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: '1px 8px',
              borderRadius: 999,
            }}
          >
            {category.count}
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--ink-3)' }}>
            Hardest first
          </span>
        </div>

        <div
          className="grid gap-[10px]"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))' }}
        >
          {category.guides.map((g: CancelGuide) => (
            <Link key={g.slug} href={`/${locale}/cancel/${g.slug}`} className="gcard">
              <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={42} />
              <div className="min-w-0 flex-1">
                <div
                  className="truncate"
                  style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }}
                >
                  {g.service}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{g.category}</div>
              </div>
              <span className={diffPillClass(g.difficulty)} style={{ flexShrink: 0 }}>
                {diffShort(g.difficulty)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hardest/easiest highlight */}
      {category.count >= 3 && (
        <section className="grid sm:grid-cols-2 gap-[14px] mt-12">
          <div className="card-warm" style={{ borderLeft: '3px solid var(--hard)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--hard)', fontWeight: 600 }}>
              Hardest in category
            </div>
            <Link
              href={`/${locale}/cancel/${hardest.slug}`}
              className="flex items-center gap-3 mt-2 group"
            >
              <BrandLogo slug={hardest.slug} service={hardest.service} alt={hardest.service} size={28} />
              <span
                className="group-hover:accent transition-colors"
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                {hardest.service}
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6 }}>
              {hardest.difficultyReason}
            </p>
          </div>
          <div className="card-warm" style={{ borderLeft: '3px solid var(--green)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--green)', fontWeight: 600 }}>
              Easiest in category
            </div>
            <Link
              href={`/${locale}/cancel/${easiest.slug}`}
              className="flex items-center gap-3 mt-2 group"
            >
              <BrandLogo slug={easiest.slug} service={easiest.service} alt={easiest.service} size={28} />
              <span
                className="group-hover:accent transition-colors"
                style={{ fontSize: 16, fontWeight: 600 }}
              >
                {easiest.service}
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6 }}>
              {easiest.difficultyReason}
            </p>
          </div>
        </section>
      )}

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-12 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/categories`} className="hover:accent transition-colors">
          ← All categories
        </Link>
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">
          Browse all guides →
        </Link>
      </div>
    </article>
  )
}
