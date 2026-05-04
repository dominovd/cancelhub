import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl('/contact', locale),
      languages: hreflangAlternates('/contact'),
    },
  }
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

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

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{t('title')}</h1>
        <p className="text-gray-500 text-lg mb-12">{t('subtitle')}</p>

        {/* Contact cards */}
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-2xl mt-0.5">✉️</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">{t('emailTitle')}</p>
              <p className="text-sm text-gray-500 mb-3">{t('emailDesc')}</p>
              <a
                href="mailto:info@cancelhub.app"
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                info@cancelhub.app
              </a>
            </div>
          </div>

          {/* Report wrong steps */}
          <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-2xl mt-0.5">🔧</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">{t('reportTitle')}</p>
              <p className="text-sm text-gray-500 mb-3">{t('reportDesc')}</p>
              <a
                href="mailto:info@cancelhub.app?subject=Guide%20correction"
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                info@cancelhub.app
              </a>
            </div>
          </div>

          {/* Suggest a guide */}
          <div className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-2xl mt-0.5">💡</span>
            <div>
              <p className="font-semibold text-gray-900 mb-1">{t('suggestTitle')}</p>
              <p className="text-sm text-gray-500 mb-3">{t('suggestDesc')}</p>
              <a
                href="mailto:info@cancelhub.app?subject=Guide%20suggestion"
                className="inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                info@cancelhub.app
              </a>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-10 text-sm text-gray-400 text-center">
          {t('responseNote')}
        </p>

        {/* Links */}
        <div className="mt-10 flex justify-center gap-6 text-sm">
          <Link href={`/${locale}/about`} className="text-gray-400 hover:text-gray-700 transition-colors">
            {t('aboutLink')}
          </Link>
          <span className="text-gray-200">·</span>
          <Link href={`/${locale}/cancel`} className="text-gray-400 hover:text-gray-700 transition-colors">
            {t('guidesLink')}
          </Link>
        </div>
      </div>
    </div>
  )
}
