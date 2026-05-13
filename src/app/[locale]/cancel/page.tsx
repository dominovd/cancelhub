import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { DarkPatternScore } from '@/components/DarkPatternScore'
import { BrandLogo } from '@/components/BrandLogo'

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
  // Hardest-first: surface the worst dark-pattern offenders at the top.
  const sorted = [...allGuides].sort((a, b) => b.darkPatternScore - a.darkPatternScore)

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-20">
      <h1
        className="text-[34px] sm:text-[38px] leading-[1.05] mb-3"
        style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
      >
        {t('title')}
      </h1>
      <p className="text-[15px] ink-2 mb-12 max-w-[55ch] leading-[1.55]">
        {allGuides.length} {t('subtitle')}
      </p>

      {/* Column labels (desktop only) */}
      <div
        className="hidden sm:grid items-center gap-5 pb-3 border-b border-rule-strong text-[11px] ink-3 uppercase grid-cols-[24px_1fr_auto_auto_20px]"
        style={{ letterSpacing: '0.18em' }}
      >
        <span />
        <span>{t('colService')}</span>
        <span>{t('colDifficulty')}</span>
        <span className="text-right">{t('colDarkPatterns')}</span>
        <span />
      </div>

      <div>
        {sorted.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${locale}/cancel/${guide.slug}`}
            className="group grid items-center gap-5 py-[14px] border-b border-rule transition-colors grid-cols-[24px_1fr_auto_20px] sm:grid-cols-[24px_1fr_auto_auto_20px]"
          >
            <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={22} />
            <div className="min-w-0">
              <p className="text-[15px] ink truncate group-hover:accent transition-colors">
                {guide.service}
              </p>
              <p className="text-[11px] ink-3 truncate sm:hidden">
                {guide.category}
              </p>
            </div>
            <DifficultyBadge difficulty={guide.difficulty} shortLabel />
            <div className="hidden sm:block">
              <DarkPatternScore score={guide.darkPatternScore} />
            </div>
            <span className="text-[14px] ink-3 opacity-50 group-hover:opacity-100 group-hover:accent transition-all">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
