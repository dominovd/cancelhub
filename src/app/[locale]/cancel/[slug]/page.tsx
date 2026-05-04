import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { allGuides, guidesBySlug } from '@/data/guides'
import { locales } from '@/config/i18n'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { DarkPatternScore } from '@/components/DarkPatternScore'
import { PlatformTabs } from '@/components/PlatformTabs'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allGuides.map((g) => ({ locale, slug: g.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const guide = guidesBySlug[params.slug]
  if (!guide) return {}
  return {
    title: `How to Cancel ${guide.service}`,
    description: guide.description,
  }
}

export default async function GuidePage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const guide = guidesBySlug[params.slug]
  if (!guide) notFound()

  const t = await getTranslations({ locale: params.locale, namespace: 'guide' })

  const primaryPlatform = guide.platforms.find((p) => p.platform === 'web') ?? guide.platforms[0]
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Cancel ${guide.service}`,
    description: guide.description,
    step: primaryPlatform.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      text: s.instruction,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href={`/${params.locale}`} className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${params.locale}/cancel`} className="hover:text-gray-600 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-gray-700">{guide.service}</span>
        </nav>

        {/* Header card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl">{guide.logo}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                {guide.category}
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                How to Cancel {guide.service}
              </h1>
              <p className="text-gray-500 text-sm mt-1">{guide.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            <DifficultyBadge difficulty={guide.difficulty} reason={guide.difficultyReason} />
            {guide.monthlyPrice && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                💰 {guide.monthlyPrice}
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto">
              ✓ {t('verifiedOn', { date: guide.lastVerified })}
            </span>
          </div>
        </div>

        {/* Dark pattern score */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{t('darkPatternTitle')}</p>
              <p className="text-xs text-gray-400">{guide.difficultyReason}</p>
            </div>
            <DarkPatternScore score={guide.darkPatternScore} />
          </div>
        </div>

        {/* Refund policy */}
        {guide.refundPolicy && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-0.5">{t('refundTitle')}</p>
              <p className="text-sm text-amber-800">{guide.refundPolicy}</p>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">{t('stepsTitle')}</h2>
          <PlatformTabs platforms={guide.platforms} />
        </div>

        {/* Common issues */}
        {guide.commonIssues.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('issuesTitle')}</h2>
            <div className="space-y-4">
              {guide.commonIssues.map((issue, i) => (
                <div key={i} className="border-l-2 border-blue-200 pl-4">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    &ldquo;{issue.question}&rdquo;
                  </p>
                  <p className="text-sm text-gray-600">{issue.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {guide.alternatives && guide.alternatives.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {t('alternativesTitle', { service: guide.service })}
            </h2>
            <div className="space-y-2">
              {guide.alternatives.map((alt) => (
                <Link
                  key={alt.name}
                  href={alt.url}
                  className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                      {alt.name}
                    </p>
                    <p className="text-xs text-gray-500">{alt.description}</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-blue-400">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link href={`/${params.locale}/cancel`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            {t('backLink')}
          </Link>
          <p className="text-xs text-gray-400">
            {t('reportLink')}{' '}
            <a href="mailto:hello@cancelhub.app" className="underline hover:text-gray-600">
              {t('reportLinkSuffix')}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
