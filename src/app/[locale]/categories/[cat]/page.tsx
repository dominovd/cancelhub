import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { allCategories, categoriesBySlug, getCategoryIntro } from '@/lib/categories'
import { BrandLogo } from '@/components/BrandLogo'
import { DifficultyBadge } from '@/components/DifficultyBadge'
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const bucket = score <= 2 ? 'easy' : score <= 5 ? 'medium' : 'hard'
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: 3,
              height: 11,
              background: i < score ? `var(--c-${bucket})` : 'var(--rule-strong)',
              opacity: i < score ? 1 : 0.4,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] tabular-nums"
        style={{ color: `var(--c-${bucket})`, fontWeight: 500 }}
      >
        {score}/10
      </span>
    </div>
  )
}

function GuideRow({ guide, locale }: { guide: CancelGuide; locale: string }) {
  const hasCall = guide.darkPatternFlags?.requiresCall
  const hasChat = guide.darkPatternFlags?.requiresChat
  const hasRetention = guide.darkPatternFlags?.retentionTactics

  return (
    <Link
      href={`/${locale}/cancel/${guide.slug}`}
      className="group grid items-center gap-4 py-4 border-b border-rule hover:bg-[var(--accent-soft)] transition-colors rounded-[4px] px-2 -mx-2"
      style={{ gridTemplateColumns: '28px 1fr auto' }}
    >
      <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={22} />

      <div className="min-w-0">
        <span
          className="block text-[15px] ink group-hover:accent transition-colors"
          style={{ fontWeight: 500 }}
        >
          {guide.service}
        </span>
        <div className="flex flex-wrap gap-[5px] mt-[4px]">
          {hasCall && (
            <span className="text-[10px] px-[7px] py-[2px] rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 500 }}>
              Requires call
            </span>
          )}
          {hasChat && !hasCall && (
            <span className="text-[10px] px-[7px] py-[2px] rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 500 }}>
              Requires chat
            </span>
          )}
          {hasRetention && (
            <span className="text-[10px] px-[7px] py-[2px] rounded-full" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', fontWeight: 500 }}>
              Retention tactics
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <ScoreBar score={guide.darkPatternScore} />
        <div className="mt-[5px]">
          <DifficultyBadge difficulty={guide.difficulty} shortLabel />
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoryPage({
  params: { locale, cat },
}: {
  params: { locale: string; cat: string }
}) {
  setRequestLocale(locale)
  const category = categoriesBySlug[cat]
  if (!category) notFound()

  const hardest = category.guides[0]
  const easiest = category.guides[category.guides.length - 1]

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] ink-3 mb-8">
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/categories`} className="hover:accent transition-colors">Categories</Link>
        <span>/</span>
        <span className="ink-2">{category.name}</span>
      </nav>

      {/* Hero */}
      <h1
        className="text-[34px] sm:text-[38px] leading-[1.05] mb-4"
        style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
      >
        {category.name} subscriptions — cancellation ranked
      </h1>
      <p className="text-[16px] ink-2 leading-[1.6] max-w-[56ch] mb-10">
        {getCategoryIntro(category.name)}
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-px bg-[color:var(--rule)] border border-rule rounded-[6px] overflow-hidden mb-12">
        {[
          { v: category.count.toString(), l: 'Services tracked' },
          { v: `${category.avgScore}/10`, l: 'Avg dark pattern score' },
          { v: hardest.service, l: 'Hardest to cancel' },
        ].map((s) => (
          <div key={s.l} className="bg-paper px-4 py-5 text-center">
            <p className="text-[20px] ink leading-tight" style={{ fontWeight: 500, letterSpacing: '-0.015em' }}>
              {s.v}
            </p>
            <p className="text-[10px] ink-3 mt-1 uppercase" style={{ letterSpacing: '0.14em' }}>
              {s.l}
            </p>
          </div>
        ))}
      </div>

      {/* Guide list */}
      <section>
        <h2
          className="text-[11px] ink-3 uppercase mb-6"
          style={{ letterSpacing: '0.18em' }}
        >
          All {category.name} guides — hardest first
        </h2>
        <div>
          {category.guides.map((g) => (
            <GuideRow key={g.slug} guide={g} locale={locale} />
          ))}
        </div>
      </section>

      {/* Easiest/hardest callout */}
      {category.count >= 3 && (
        <section className="border-t border-rule mt-12 pt-8 grid sm:grid-cols-2 gap-6">
          <div className="border border-rule rounded-[6px] p-5">
            <p className="text-[10px] ink-3 uppercase mb-2" style={{ letterSpacing: '0.16em' }}>Hardest to cancel</p>
            <Link
              href={`/${locale}/cancel/${hardest.slug}`}
              className="flex items-center gap-3 group"
            >
              <BrandLogo slug={hardest.slug} service={hardest.service} alt={hardest.service} size={20} />
              <span className="text-[15px] ink group-hover:accent transition-colors" style={{ fontWeight: 500 }}>
                {hardest.service}
              </span>
            </Link>
            <div className="mt-3">
              <ScoreBar score={hardest.darkPatternScore} />
            </div>
          </div>
          <div className="border border-rule rounded-[6px] p-5">
            <p className="text-[10px] ink-3 uppercase mb-2" style={{ letterSpacing: '0.16em' }}>Easiest to cancel</p>
            <Link
              href={`/${locale}/cancel/${easiest.slug}`}
              className="flex items-center gap-3 group"
            >
              <BrandLogo slug={easiest.slug} service={easiest.service} alt={easiest.service} size={20} />
              <span className="text-[15px] ink group-hover:accent transition-colors" style={{ fontWeight: 500 }}>
                {easiest.service}
              </span>
            </Link>
            <div className="mt-3">
              <ScoreBar score={easiest.darkPatternScore} />
            </div>
          </div>
        </section>
      )}

      {/* Footer nav */}
      <div className="border-t border-rule mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 text-[12px] ink-3">
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
