import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { GuideFilter } from '@/components/GuideFilter'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'guides' })
  return {
    title: t('title'),
    alternates: {
      canonical: canonicalUrl('/cancel', locale),
      languages: hreflangAlternates('/cancel'),
    },
  }
}

export default async function CancelIndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'guides' })

  // Hardest-first by default: surface the worst dark-pattern offenders at the top
  // (the filter component re-groups by category, but the iteration order respects this).
  const sorted = [...allGuides].sort((a, b) => b.darkPatternScore - a.darkPatternScore)

  return (
    <div className="max-w-[1000px] mx-auto px-[22px]">
      {/* Breadcrumb */}
      <nav
        style={{
          fontSize: 13,
          color: 'var(--ink-3)',
          padding: '20px 0 0',
          display: 'flex',
          gap: 7,
        }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span>All guides</span>
      </nav>

      {/* Heading */}
      <header style={{ padding: '14px 0 4px' }}>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(30px, 5vw, 46px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          {t('title')}
        </h1>
        <p
          className="ink-3"
          style={{ fontSize: 15.5, marginTop: 8, maxWidth: '54ch' }}
        >
          {t('introSubtitle', { count: allGuides.length })}
        </p>
      </header>

      <GuideFilter guides={sorted} locale={locale} />

      {/* Missing service prompt */}
      <div
        style={{
          marginTop: 8,
          border: '1.5px dashed var(--line)',
          borderRadius: 14,
          padding: 22,
          textAlign: 'center',
          background: 'var(--card)',
        }}
      >
        <h3
          className="font-serif-display"
          style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}
        >
          {t('missingTitle')}
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 4 }}>
          {t('missingDesc')}
        </p>
        <form
          action="#"
          className="flex flex-wrap gap-[8px] justify-center mt-[14px]"
        >
          <input
            type="text"
            placeholder={t('missingPlaceholder')}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid var(--line)',
              background: 'var(--paper)',
              fontFamily: 'inherit',
              fontSize: 14,
              minWidth: 200,
              color: 'var(--ink)',
              outline: 'none',
            }}
          />
          <button type="submit" className="btn-dark" style={{ padding: '10px 18px' }}>
            {t('missingButton')}
          </button>
        </form>
      </div>
    </div>
  )
}
