import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { BrandLogo } from '@/components/BrandLogo'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import type { CancelGuide } from '@/types/guide'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const path = '/rankings'
  return {
    title: 'Hardest Subscriptions to Cancel — 2025 Rankings',
    description:
      'Which subscriptions make cancellation the most painful? We scored 90+ services on dark patterns, required phone calls, guilt tactics, and refund opacity.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: 'Hardest Subscriptions to Cancel — CancelHub Rankings',
      description:
        'Which subscriptions make cancellation the most painful? We scored 90+ services on dark patterns, required phone calls, guilt tactics, and refund opacity.',
      url: canonicalUrl(path, locale),
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const bucket = score <= 2 ? 'easy' : score <= 5 ? 'medium' : 'hard'
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 3,
              height: 12,
              background: i < score ? `var(--c-${bucket})` : 'var(--rule-strong)',
              opacity: i < score ? 1 : 0.4,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      <span
        className="text-[12px] tabular-nums"
        style={{ color: `var(--c-${bucket})`, fontWeight: 500, minWidth: '2.4ch' }}
      >
        {score}/10
      </span>
    </div>
  )
}

function FlagPills({ guide }: { guide: CancelGuide }) {
  const f = guide.darkPatternFlags
  if (!f) return null

  const pills: { label: string; bad: boolean }[] = []
  if (f.requiresCall) pills.push({ label: 'Requires call', bad: true })
  if (f.requiresChat && !f.requiresCall) pills.push({ label: 'Requires chat', bad: true })
  if (f.hiddenButton) pills.push({ label: 'Hidden cancel', bad: true })
  if (f.retentionTactics) pills.push({ label: 'Retention tactics', bad: true })
  if (f.confirmationShaming) pills.push({ label: 'Guilt trip', bad: true })
  if (f.refundClarity === 'none') pills.push({ label: 'No refund info', bad: true })

  if (pills.length === 0) return null

  return (
    <div className="flex flex-wrap gap-[5px] mt-[6px]">
      {pills.map((p) => (
        <span
          key={p.label}
          className="text-[10px] px-[7px] py-[2px] rounded-full"
          style={{
            background: 'var(--accent-soft)',
            color: 'var(--accent)',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          {p.label}
        </span>
      ))}
    </div>
  )
}

function GuideRow({
  guide,
  rank,
  locale,
}: {
  guide: CancelGuide
  rank: number
  locale: string
}) {
  return (
    <Link
      href={`/${locale}/cancel/${guide.slug}`}
      className="group grid items-start gap-4 py-4 border-b border-rule hover:bg-[var(--accent-soft)] transition-colors rounded-[4px] px-2 -mx-2"
      style={{ gridTemplateColumns: '2ch 28px 1fr auto' }}
    >
      {/* Rank */}
      <span
        className="text-[13px] ink-3 tabular-nums pt-[2px]"
        style={{ fontWeight: 500 }}
      >
        {rank}
      </span>

      {/* Logo */}
      <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={24} className="mt-[2px]" />

      {/* Service + pills */}
      <div className="min-w-0">
        <span className="text-[15px] ink group-hover:accent transition-colors" style={{ fontWeight: 500 }}>
          {guide.service}
        </span>
        <div className="text-[12px] ink-3 mt-[1px]">{guide.category}</div>
        <FlagPills guide={guide} />
      </div>

      {/* Score */}
      <div className="pt-[3px] shrink-0">
        <ScoreBar score={guide.darkPatternScore} />
        <div className="mt-[5px] flex justify-end">
          <DifficultyBadge difficulty={guide.difficulty} shortLabel />
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RankingsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  const byScore = [...allGuides].sort((a, b) => b.darkPatternScore - a.darkPatternScore)
  const hardest = byScore.slice(0, 15)
  const easiest = [...allGuides]
    .sort((a, b) => a.darkPatternScore - b.darkPatternScore)
    .slice(0, 10)

  // Category stats — average dark pattern score per category
  const categoryMap = new Map<string, number[]>()
  for (const g of allGuides) {
    const arr = categoryMap.get(g.category) ?? []
    arr.push(g.darkPatternScore)
    categoryMap.set(g.category, arr)
  }
  const categoryStats = Array.from(categoryMap.entries())
    .map(([cat, scores]: [string, number[]]) => ({
      category: cat,
      avg: scores.reduce((a: number, b: number) => a + b, 0) / scores.length,
      count: scores.length,
    }))
    .sort((a: { avg: number }, b: { avg: number }) => b.avg - a.avg)
    .slice(0, 8)

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] ink-3 mb-8">
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span className="ink-2">Rankings</span>
      </nav>

      {/* Hero */}
      <h1
        className="text-[34px] sm:text-[38px] leading-[1.05] mb-4"
        style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
      >
        Hardest subscriptions to cancel
      </h1>
      <p className="text-[16px] ink-2 leading-[1.6] max-w-[56ch] mb-3">
        We scored {allGuides.length} services on intentional cancellation friction —
        hidden flows, mandatory phone calls, guilt-trip dialogs, and refund opacity.
        Higher score = more dark patterns.
      </p>
      <p className="text-[12px] ink-3 mb-10">
        Last updated May 2025 · Methodology:{' '}
        <Link href={`/${locale}/about`} className="underline underline-offset-2 hover:accent transition-colors">
          how we score
        </Link>
      </p>

      {/* ── Top 15 hardest ── */}
      <section>
        <h2
          className="text-[11px] ink-3 uppercase mb-1"
          style={{ letterSpacing: '0.18em' }}
        >
          Hardest to cancel
        </h2>
        <p className="text-[13px] ink-3 mb-6">
          These services use the most aggressive dark patterns to prevent you from leaving.
        </p>
        <div>
          {hardest.map((g, i) => (
            <GuideRow key={g.slug} guide={g} rank={i + 1} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── Category breakdown ── */}
      <section className="border-t border-rule mt-14 pt-10">
        <h2
          className="text-[11px] ink-3 uppercase mb-1"
          style={{ letterSpacing: '0.18em' }}
        >
          Worst categories on average
        </h2>
        <p className="text-[13px] ink-3 mb-7">
          Average dark pattern score by subscription category.
        </p>
        <div>
          {categoryStats.map((cs) => (
            <div
              key={cs.category}
              className="flex items-center justify-between py-3 border-b border-rule"
            >
              <div>
                <span className="text-[14px] ink" style={{ fontWeight: 500 }}>{cs.category}</span>
                <span className="text-[12px] ink-3 ml-2">({cs.count} services)</span>
              </div>
              <ScoreBar score={Math.round(cs.avg)} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Top 10 easiest ── */}
      <section className="border-t border-rule mt-14 pt-10">
        <h2
          className="text-[11px] ink-3 uppercase mb-1"
          style={{ letterSpacing: '0.18em' }}
        >
          Easiest to cancel
        </h2>
        <p className="text-[13px] ink-3 mb-6">
          These services let you leave without friction — a rarity worth noting.
        </p>
        <div>
          {easiest.map((g, i) => (
            <GuideRow key={g.slug} guide={g} rank={i + 1} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── Methodology ── */}
      <section className="border-t border-rule mt-14 pt-8">
        <h2
          className="text-[11px] ink-3 uppercase mb-4"
          style={{ letterSpacing: '0.18em' }}
        >
          How scores are calculated
        </h2>
        <p className="text-[14px] ink-2 leading-[1.6] max-w-[58ch]">
          Each service is scored 0–10 based on intentional cancellation friction.
          We check for hidden cancel buttons, mandatory phone or chat requirements,
          retention pop-ups and guilt-trip dialogs, early termination fee clarity,
          and refund policy transparency. Scores are verified manually and updated
          when services change their flows.
        </p>
        <p className="text-[14px] ink-2 leading-[1.6] max-w-[58ch] mt-4">
          Difficulty (easy / medium / hard) is a separate rating that reflects how
          many steps the cancellation process takes — not how intentionally hostile
          the service is.
        </p>
        <p className="text-[13px] ink-3 mt-5">
          Spotted an error?{' '}
          <a
            href="mailto:hello@cancelhub.app"
            className="underline underline-offset-2 hover:accent transition-colors ink-2"
          >
            hello@cancelhub.app
          </a>
        </p>
      </section>

    </article>
  )
}
