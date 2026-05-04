import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl('/about', locale),
      languages: hreflangAlternates('/about'),
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
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-10 inline-block"
        >
          ← {t('backLink')}
        </Link>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{t('title')}</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p className="text-lg">{t('intro')}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">{t('missionTitle')}</h2>
          <p>{t('missionBody')}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">{t('howTitle')}</h2>
          <p>{t('howBody')}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">{t('freeTitle')}</h2>
          <p>{t('freeBody')}</p>

          <h2 className="text-xl font-bold text-gray-900 mt-10 mb-3">{t('contactTitle')}</h2>
          <p>
            {t('contactBody')}{' '}
            <Link
              href={`/${locale}/contact`}
              className="text-blue-600 hover:underline"
            >
              {t('contactLink')}
            </Link>
            {t('contactBodySuffix')}
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-gray-100 pt-10 text-center">
          <div>
            <p className="text-3xl font-extrabold text-gray-900">100+</p>
            <p className="text-sm text-gray-500 mt-1">{t('stat1')}</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900">17</p>
            <p className="text-sm text-gray-500 mt-1">{t('stat2')}</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">{t('stat3')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
