import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { SearchBar } from '@/components/SearchBar'
import { BrandLogo } from '@/components/BrandLogo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'CancelHub — How to Cancel Any Subscription',
    description: t('subtitle'),
    alternates: {
      canonical: canonicalUrl('/', locale),
      languages: hreflangAlternates('/'),
    },
  }
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  const tDiff = await getTranslations({ locale, namespace: 'difficulty' })
  const prefix = locale === 'en' ? '' : `/${locale}`

  const top3Hardest = [...allGuides]
    .sort((a, b) => b.darkPatternScore - a.darkPatternScore)
    .slice(0, 3)

  // Pick 8 representative guides across categories + difficulties for the popular grid.
  const popularSet = new Set([
    'netflix', 'adobe', 'spotify', 'crunch-fitness',
    'chatgpt', 'noom', 'audible', 'amazon-prime',
  ])
  const popularEight = allGuides.filter((g) => popularSet.has(g.slug))

  const filterChips = [
    { key: 'all', label: t('filterAll') },
    { key: 'streaming', label: 'Streaming' },
    { key: 'fitness', label: 'Fitness' },
    { key: 'ai', label: 'AI' },
    { key: 'music', label: 'Music' },
    { key: 'software', label: 'Software' },
    { key: 'food', label: 'Food & delivery' },
  ]

  const diffPillClass = (d: 'easy' | 'medium' | 'hard') =>
    d === 'easy' ? 'pill pill-easy' : d === 'medium' ? 'pill pill-med' : 'pill pill-hard'
  const diffShort = (d: 'easy' | 'medium' | 'hard') =>
    d === 'easy' ? tDiff('easyShort') : d === 'medium' ? tDiff('medShort') : tDiff('hardShort')

  return (
    <div className="max-w-[1000px] mx-auto px-[22px]">

      {/* ===== HERO ===== */}
      <section className="pt-[62px] pb-[38px] text-center">
        <span className="eyebrow mb-5"><span style={{ color: 'var(--green)', fontSize: 14, lineHeight: 1 }}>●</span> {t('badge')}</span>

        <h1
          className="font-serif-display text-balance"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(36px, 6.5vw, 62px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            maxWidth: '15ch',
            margin: '0 auto',
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

        <p
          className="ink-2"
          style={{
            fontSize: 16.5,
            maxWidth: '48ch',
            margin: '18px auto 0',
            lineHeight: 1.55,
          }}
        >
          {t('subtitle')}
        </p>

        <div style={{ maxWidth: 540, margin: '28px auto 12px' }}>
          <SearchBar guides={allGuides} locale={locale} variant="warm" />
        </div>

        <p style={{ fontSize: 13.5, color: 'var(--ink-3)' }}>
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {allGuides.length} {t('statsGuides').toLowerCase()}
          </strong>{' '}
          ·{' '}
          <a
            href="#dark-patterns"
            style={{ color: 'var(--accent)', fontWeight: 600 }}
          >
            {t('statLineLink')}
          </a>
        </p>

        <div
          className="flex flex-wrap justify-center gap-5 mt-6"
          style={{ fontSize: 13, color: 'var(--ink-3)' }}
        >
          <span className="inline-flex items-center gap-2">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustChecked')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustNoAccount')}
          </span>
          <span className="inline-flex items-center gap-2">
            <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
            {t('trustNoData')}
          </span>
        </div>
      </section>

      {/* ===== DARK PATTERN BANNER ===== */}
      <section id="dark-patterns" className="dark-card my-3">
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a59e8c',
            fontWeight: 600,
          }}
        >
          {t('darkPatternBadge')}
        </div>
        <h2
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(22px, 3.5vw, 28px)',
            letterSpacing: '-0.015em',
            marginTop: 6,
            maxWidth: '24ch',
          }}
        >
          {t('darkPatternTitle')}{' '}
          <em
            className="font-serif-display"
            style={{ fontStyle: 'italic', color: '#f0a878' }}
          >
            {t('darkPatternTitleAccent')}
          </em>{' '}
          {t('darkPatternTitleSuffix')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[10px] mt-5">
          {top3Hardest.map((g, i) => (
            <Link
              key={g.slug}
              href={`${prefix}/cancel/${g.slug}`}
              style={{
                background: '#211e18',
                border: '1px solid #3a352b',
                borderRadius: 12,
                padding: '13px 15px',
                display: 'block',
                textDecoration: 'none',
                transition: 'border-color .15s ease, transform .15s ease',
              }}
            >
              <div style={{ fontSize: 11, color: '#7a7361', fontWeight: 600 }}>
                #{i + 1} {t('rankHardest')}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginTop: 2, color: 'var(--paper)' }}>
                {g.service}
              </div>
              <div style={{ fontSize: 12, color: '#a59e8c', marginTop: 2 }}>
                {g.difficultyReason}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`${prefix}/rankings`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 16,
            fontSize: 13.5,
            fontWeight: 600,
            color: '#f0a878',
          }}
        >
          {t('darkPatternLink', { count: allGuides.length })}
        </Link>
      </section>

      {/* ===== POPULAR GUIDES ===== */}
      <section id="guides" className="mt-12">
        <div className="flex items-baseline gap-3 mb-1">
          <h2
            className="font-serif-display"
            style={{
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: '-0.015em',
            }}
          >
            {t('popularTitle')}
          </h2>
          <Link
            href={`${prefix}/cancel`}
            className="ml-auto hover:accent transition-colors"
            style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--accent)' }}
          >
            {t('popularSeeAll', { count: allGuides.length })}
          </Link>
        </div>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, marginBottom: 18 }}>
          {t('popularSub')}
        </p>

        <div className="flex flex-wrap gap-[7px] mb-[18px]">
          {filterChips.map((c, i) => (
            <Link
              key={c.key}
              href={c.key === 'all' ? `${prefix}/cancel` : `${prefix}/categories`}
              className={`chip ${i === 0 ? 'on' : ''}`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div
          className="grid gap-[10px]"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
        >
          {popularEight.map((g) => (
            <Link key={g.slug} href={`${prefix}/cancel/${g.slug}`} className="gcard">
              <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={42} />
              <div className="min-w-0 flex-1">
                <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }} className="truncate">
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

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="mt-12">
        <div className="flex items-baseline gap-3 mb-1">
          <h2
            className="font-serif-display"
            style={{
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: '-0.015em',
            }}
          >
            {t('howTitle')}
          </h2>
        </div>
        <p style={{ color: 'var(--ink-3)', fontSize: 14, marginBottom: 18 }}>
          {t('howSub')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          {[1, 2, 3].map((n) => (
            <div key={n} className="card-warm">
              <div
                className="font-serif-display"
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'var(--ink)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                {n}
              </div>
              <h3
                className="font-serif-display"
                style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}
              >
                {t(`howStep${n}Title`)}
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 5 }}>
                {t(`howStep${n}Body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRACKER PROMO ===== */}
      <section
        id="tracker"
        className="mt-12"
        style={{
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
          borderRadius: 22,
          padding: '34px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(194,65,12,0.18), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            fontWeight: 600,
          }}
        >
          {t('trackerBadge')}
        </div>
        <h2
          className="font-serif-display"
          style={{
            position: 'relative',
            fontWeight: 600,
            fontSize: 'clamp(24px, 4vw, 32px)',
            letterSpacing: '-0.02em',
            marginTop: 6,
            color: 'var(--accent-deep)',
            maxWidth: '18ch',
          }}
        >
          {t('trackerTitle')}
        </h2>
        <p
          style={{
            position: 'relative',
            fontSize: 15,
            color: 'var(--accent-deep)',
            marginTop: 10,
            maxWidth: '46ch',
          }}
        >
          {t('trackerDesc')}
        </p>

        <form
          action="#"
          className="flex flex-wrap gap-[9px] mt-[18px]"
          style={{ position: 'relative' }}
        >
          <input
            type="email"
            placeholder={t('trackerPlaceholder')}
            style={{
              flex: 1,
              minWidth: 200,
              padding: '13px 15px',
              borderRadius: 11,
              border: '1px solid #e3b896',
              background: '#fffdf7',
              color: 'var(--ink)',
              fontFamily: 'inherit',
              fontSize: 14.5,
              outline: 'none',
            }}
          />
          <button type="submit" className="btn-accent">
            {t('trackerButton')}
          </button>
        </form>

        <small
          style={{
            position: 'relative',
            display: 'block',
            marginTop: 11,
            color: 'var(--accent-deep)',
            opacity: 0.78,
            fontSize: 12.5,
          }}
        >
          {t('trackerSmall')}
        </small>
      </section>

    </div>
  )
}
