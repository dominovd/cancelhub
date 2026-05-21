import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { BrandLogo } from '@/components/BrandLogo'
import type { CancelGuide } from '@/types/guide'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'rankings' })
  const path = '/rankings'
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDesc'),
      url: canonicalUrl(path, locale),
    },
  }
}

function scoreColor(score: number): { bar: string; text: string } {
  if (score <= 3) return { bar: 'var(--easy)', text: 'var(--easy)' }
  if (score <= 6) return { bar: 'var(--med)', text: 'var(--med)' }
  return { bar: 'var(--hard)', text: 'var(--hard)' }
}

function ScoreBar({ score }: { score: number }) {
  const c = scoreColor(score)
  const pct = (score / 10) * 100
  return (
    <div style={{ width: 130, flexShrink: 0 }}>
      <div
        className="flex justify-between items-baseline"
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 15 }}
      >
        <span style={{ fontSize: 20, color: c.text }}>{score}</span>
        <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>/ 10</span>
      </div>
      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          marginTop: 5,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 999,
            background: c.bar,
            transition: 'width .4s ease',
          }}
        />
      </div>
    </div>
  )
}

function patternTags(g: CancelGuide): string[] {
  const out: string[] = []
  const f = g.darkPatternFlags
  if (!f) return out
  if (f.requiresCall) out.push('Phone-only')
  if (f.requiresChat && !f.requiresCall) out.push('Chat-only')
  if (f.hiddenButton) out.push('Hidden link')
  if (f.retentionTactics) out.push('Retention loops')
  if (f.confirmationShaming) out.push('Guilt screens')
  if (f.refundClarity === 'none') out.push('No refund info')
  return out
}

function formatVerifiedDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function GuideRow({
  guide,
  rank,
  locale,
  worst,
  verifiedLabel,
}: {
  guide: CancelGuide
  rank: number
  locale: string
  worst?: boolean
  verifiedLabel: string
}) {
  const tags = patternTags(guide)
  return (
    <Link
      href={`/${locale}/cancel/${guide.slug}`}
      className="shadow-warm"
      style={{
        background: 'var(--card)',
        border: `1px solid ${worst ? '#e8b4b0' : 'var(--line)'}`,
        borderRadius: 14,
        padding: '15px 17px',
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        marginBottom: 8,
        transition: 'transform .1s ease, border-color .1s ease',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div
        className="font-serif-display"
        style={{
          fontWeight: 600,
          fontSize: 22,
          width: 38,
          flexShrink: 0,
          textAlign: 'center',
          color: worst ? 'var(--hard)' : 'var(--ink-3)',
        }}
      >
        {String(rank).padStart(2, '0')}
      </div>

      <div className="flex-none">
        <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={46} />
      </div>

      <div className="flex-1 min-w-0">
        <div style={{ fontWeight: 600, fontSize: 15.5 }}>{guide.service}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 1 }}>
          {guide.difficultyReason}
        </div>
        <div className="flex flex-wrap gap-[5px] mt-[6px] items-center">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                background: 'var(--hard-soft)',
                color: 'var(--hard)',
                padding: '2px 7px',
                borderRadius: 6,
              }}
            >
              {tag}
            </span>
          ))}
          <span
            style={{
              fontSize: 11,
              color: 'var(--ink-3)',
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              marginLeft: tags.length ? 4 : 0,
            }}
          >
            {verifiedLabel}
          </span>
        </div>
      </div>

      <ScoreBar score={guide.darkPatternScore} />
    </Link>
  )
}

export default async function RankingsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'rankings' })

  const byScore = [...allGuides].sort((a, b) => b.darkPatternScore - a.darkPatternScore)
  const worst = byScore.slice(0, 15)
  const best = [...allGuides]
    .sort((a, b) => a.darkPatternScore - b.darkPatternScore)
    .slice(0, 10)

  return (
    <article className="max-w-[900px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span>Rankings</span>
      </nav>

      <section style={{ padding: '14px 0 8px' }}>
        <span className="eyebrow danger" style={{ marginBottom: 16 }}>{t('eyebrow')}</span>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, 5.5vw, 52px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            maxWidth: '18ch',
            marginTop: 8,
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
        <p style={{ color: 'var(--ink-3)', fontSize: 16, marginTop: 14, maxWidth: '58ch' }}>
          {t('intro')}
        </p>

        <div
          className="flex flex-wrap items-center gap-[18px] mt-4"
          style={{ fontSize: 13, color: 'var(--ink-3)' }}
        >
          <span className="inline-flex items-center gap-[6px]">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustVerified')}
          </span>
          <span className="inline-flex items-center gap-[6px]">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustUpdated')}
          </span>
          <span className="inline-flex items-center gap-[6px]">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustOpen')}
          </span>
        </div>
      </section>

      <div className="card-warm" style={{ margin: '22px 0 8px' }}>
        <h3
          className="font-serif-display flex items-center gap-[8px]"
          style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}
        >
          <span style={{ color: 'var(--accent)' }}>◐</span> {t('methodTitle')}
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 6 }}>{t('methodDesc')}</p>
        <div className="flex flex-wrap gap-[8px] mt-3">
          {[
            t('critHidden'),
            t('critRetention'),
            t('critClicks'),
            t('critShaming'),
            t('critPhone'),
            t('critFees'),
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                fontWeight: 600,
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                padding: '4px 10px',
                borderRadius: 8,
                color: 'var(--ink)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/${locale}/method`}
          style={{
            display: 'inline-block',
            marginTop: 14,
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--accent)',
            borderBottom: '1px solid currentColor',
            paddingBottom: 1,
          }}
        >
          {t('methodLink')}
        </Link>
      </div>

      <div
        className="flex items-center gap-[8px] flex-wrap"
        style={{ margin: '24px 0 14px', fontSize: 12.5, color: 'var(--ink-3)' }}
      >
        <span className="inline-flex items-center gap-[6px]">
          <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--easy)' }} />
          {t('scoreLegendEasy')}
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--med)' }} />
          {t('scoreLegendMed')}
        </span>
        <span className="inline-flex items-center gap-[6px]">
          <span style={{ width: 14, height: 14, borderRadius: 4, background: 'var(--hard)' }} />
          {t('scoreLegendHard')}
        </span>
      </div>

      <div className="flex items-center gap-[12px] mb-[14px] mt-[16px]">
        <h2
          className="font-serif-display"
          style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--hard)', whiteSpace: 'nowrap' }}
        >
          {t('dividerHard')}
        </h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div>
        {worst.map((g, i) => (
          <GuideRow
            key={g.slug}
            guide={g}
            rank={i + 1}
            locale={locale}
            worst
            verifiedLabel={t('verifiedOn', { date: formatVerifiedDate(g.lastVerified) })}
          />
        ))}
      </div>

      <div
        className="dark-card mt-8 flex items-center gap-4 flex-wrap"
        style={{ padding: '20px 22px' }}
      >
        <div className="flex-1 min-w-[200px]">
          <h3
            className="font-serif-display"
            style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}
          >
            {t('reportInaccuracyTitle')}
          </h3>
          <p style={{ fontSize: 13, color: '#a59e8c', marginTop: 3 }}>
            {t('reportInaccuracyDesc')}
          </p>
        </div>
        <a
          href="mailto:hello@cancelhub.app?subject=Ranking%20inaccuracy"
          className="btn-accent"
          style={{ padding: '10px 16px' }}
        >
          {t('reportInaccuracyButton')}
        </a>
      </div>

      <div className="flex items-center gap-[12px] mb-[14px] mt-[36px]">
        <h2
          className="font-serif-display"
          style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', color: 'var(--green)', whiteSpace: 'nowrap' }}
        >
          {t('dividerEasy')}
        </h2>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 12 }}>{t('easyNote')}</p>
      <div>
        {best.map((g, i) => (
          <GuideRow
            key={g.slug}
            guide={g}
            rank={i + 1}
            locale={locale}
            verifiedLabel={t('verifiedOn', { date: formatVerifiedDate(g.lastVerified) })}
          />
        ))}
      </div>

      <div
        className="card-warm"
        style={{
          marginTop: 36,
          background: 'var(--paper-2)',
          borderLeft: '2px solid var(--line-2)',
          borderRadius: 0,
        }}
      >
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color: 'var(--ink-3)',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {t('disclaimerTitle')}
        </div>
        <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
          {t('disclaimer')}
        </p>
      </div>
    </article>
  )
}
