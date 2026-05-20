import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { allGuides } from '@/data/guides'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  const path = '/about'
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <article className="max-w-[760px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">{t('backLink')}</Link>
        <span>/</span>
        <span>About</span>
      </nav>

      {/* Hero */}
      <header style={{ padding: '18px 0 8px' }}>
        <span className="eyebrow" style={{ marginBottom: 14 }}>
          <span style={{ color: 'var(--green)' }}>●</span> Independent &amp; ad-free
        </span>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginTop: 14,
          }}
        >
          {t('title')}
        </h1>
        <p
          className="font-serif-display"
          style={{
            fontSize: 19,
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--ink-2)',
            marginTop: 16,
            lineHeight: 1.5,
            maxWidth: '58ch',
          }}
        >
          {t('intro')}
        </p>
      </header>

      {/* Stats strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid var(--line)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--card)',
          boxShadow: 'var(--shadow)',
          margin: '24px 0',
        }}
      >
        <div style={{ padding: '16px 18px', borderRight: '1px solid var(--line)' }}>
          <div className="font-serif-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {allGuides.length}
          </div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>
            {t('stat1')}
          </div>
        </div>
        <div style={{ padding: '16px 18px', borderRight: '1px solid var(--line)' }}>
          <div className="font-serif-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
            17
          </div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>
            {t('stat2')}
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <div className="font-serif-display" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
            0
          </div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink-3)', fontWeight: 600, marginTop: 2 }}>
            {t('stat3')}
          </div>
        </div>
      </div>

      {/* Three editorial cards */}
      <section className="grid sm:grid-cols-3 gap-[14px] mt-8">
        <div className="card-warm">
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 8 }}>
            {t('missionTitle')}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55 }}>{t('missionBody')}</p>
        </div>
        <div className="card-warm">
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 8 }}>
            {t('howTitle')}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55 }}>{t('howBody')}</p>
        </div>
        <div className="card-warm">
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 8 }}>
            {t('freeTitle')}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55 }}>{t('freeBody')}</p>
        </div>
      </section>

      {/* Get in touch */}
      <section
        className="dark-card mt-10"
        style={{ padding: '28px 30px' }}
      >
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a59e8c', fontWeight: 600 }}>
          {t('contactTitle')}
        </div>
        <p
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: '-0.015em',
            marginTop: 6,
            maxWidth: '36ch',
            lineHeight: 1.25,
          }}
        >
          {t('contactBody')}
          <Link href={`/${locale}/contact`} style={{ color: '#f0a878', fontStyle: 'italic' }}>
            {t('contactLink')}
          </Link>
          {t('contactBodySuffix')}
        </p>
      </section>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">
          ← Browse all guides
        </Link>
        <Link href={`/${locale}/rankings`} className="hover:accent transition-colors">
          See rankings →
        </Link>
      </div>
    </article>
  )
}
