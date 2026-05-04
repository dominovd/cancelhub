import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { allGuides } from '@/data/guides'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { DarkPatternScore } from '@/components/DarkPatternScore'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'guides' })
  return { title: t('title') }
}

export default async function CancelIndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'guides' })
  const sorted = [...allGuides].sort((a, b) => b.darkPatternScore - a.darkPatternScore)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
          All guides
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-gray-500">
          {allGuides.length} {t('subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>{t('colService')}</span>
          <span className="hidden sm:block">{t('colDifficulty')}</span>
          <span className="hidden sm:block">{t('colDarkPatterns')}</span>
          <span />
        </div>

        {sorted.map((guide) => (
          <Link
            key={guide.slug}
            href={`/${locale}/cancel/${guide.slug}`}
            className="group grid grid-cols-[1fr_auto_auto] sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl flex-shrink-0">{guide.logo}</span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm truncate">
                  {guide.service}
                </p>
                <p className="text-xs text-gray-400 sm:hidden">
                  {guide.difficulty} · {guide.category}
                </p>
              </div>
            </div>
            <div className="hidden sm:block">
              <DifficultyBadge difficulty={guide.difficulty} />
            </div>
            <div className="hidden sm:block">
              <DarkPatternScore score={guide.darkPatternScore} />
            </div>
            <span className="text-gray-300 group-hover:text-blue-400 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
