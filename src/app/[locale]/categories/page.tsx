import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
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
  const path = '/categories'
  return {
    title: 'Subscription Categories — Cancellation Guides by Type',
    description:
      'Browse cancellation guides by subscription category — streaming, fitness, meal kits, gaming, and more. Ranked by cancellation difficulty.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

function ScoreBar({ score }: { score: number }) {
  const bucket = score <= 2 ? 'easy' : score <= 5 ? 'medium' : 'hard'
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: 3,
            height: 10,
            background: i < score ? `var(--c-${bucket})` : 'var(--rule-strong)',
            opacity: i < score ? 1 : 0.4,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  )
}

export default function CategoriesIndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] ink-3 mb-8">
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span className="ink-2">Categories</span>
      </nav>

      {/* Hero */}
      <h1
        className="text-[34px] sm:text-[38px] leading-[1.05] mb-4"
        style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
      >
        Browse by category
      </h1>
      <p className="text-[16px] ink-2 leading-[1.6] max-w-[56ch] mb-12">
        {allCategories.reduce((sum, c) => sum + c.count, 0)} guides across {allCategories.length} subscription categories,
        ranked by cancellation difficulty.
      </p>

      {/* Category grid */}
      <div>
        {allCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${locale}/categories/${cat.slug}`}
            className="group grid items-center gap-4 py-4 border-b border-rule hover:bg-[var(--accent-soft)] transition-colors rounded-[4px] px-2 -mx-2"
            style={{ gridTemplateColumns: '1fr auto' }}
          >
            <div className="min-w-0">
              <span
                className="block text-[16px] ink group-hover:accent transition-colors"
                style={{ fontWeight: 500 }}
              >
                {cat.name}
              </span>
              <span className="text-[12px] ink-3 mt-[2px] block">
                {cat.count} {cat.count === 1 ? 'service' : 'services'}
              </span>
            </div>

            <div className="shrink-0 text-right">
              <ScoreBar score={cat.avgScore} />
              <span className="text-[10px] ink-3 mt-[4px] block">avg score</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-rule mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 text-[12px] ink-3">
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
