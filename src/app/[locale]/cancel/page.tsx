import { Metadata } from 'next'
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
      <p className="text-[15px] ink-2 mb-10 max-w-[55ch] leading-[1.55]">
        {allGuides.length} {t('subtitle')}
      </p>

      <GuideFilter
        guides={sorted}
        locale={locale}
        colService={t('colService')}
        colDifficulty={t('colDifficulty')}
        colDarkPatterns={t('colDarkPatterns')}
      />
    </div>
  )
}
