import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides, guidesByCategory } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { SearchBar } from '@/components/SearchBar'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { WaitlistForm } from '@/components/WaitlistForm'

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
  const categories = Object.entries(guidesByCategory).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
            {t('badge')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <SearchBar guides={allGuides} locale={locale} />

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-400">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{allGuides.length}</p>
              <p>{t('statsGuides')}</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">100%</p>
              <p>{t('statsFree')}</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p>{t('statsPlatforms')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Pattern banner */}
      <section className="bg-red-50 border-b border-red-100 py-5 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <p className="font-semibold text-red-800 text-sm">{t('darkPatternBadge')}</p>
              <p className="text-red-600 text-xs">{t('darkPatternDesc')}</p>
            </div>
          </div>
          <Link
            href={`/${locale}/cancel`}
            className="text-xs font-semibold text-red-700 hover:text-red-900 border border-red-200 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
          >
            {t('darkPatternLink')}
          </Link>
        </div>
      </section>

      {/* Guides by category */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('browseTitle')}</h2>
        <div className="space-y-10">
          {categories.map(([category, guides]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/${locale}/cancel/${guide.slug}`}
                    className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <span className="text-3xl">{guide.logo}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {guide.service}
                      </p>
                      <DifficultyBadge difficulty={guide.difficulty} />
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="about" className="bg-gray-900 text-white py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-3xl mb-4">✂️</p>
          <h2 className="text-2xl font-bold mb-3">{t('waitlistTitle')}</h2>
          <p className="text-gray-400 mb-6">{t('waitlistDesc')}</p>
          <WaitlistForm />
        </div>
      </section>
    </div>
  )
}
