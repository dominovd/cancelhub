import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides, guidesBySlug } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { PlatformTabs } from '@/components/PlatformTabs'
import { BrandLogo } from '@/components/BrandLogo'
import { getGuideTranslations, applyGuideTranslations } from '@/data/guide-translations/loader'

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
  const baseGuide = guidesBySlug[params.slug]
  if (!baseGuide) return {}
  const translations = await getGuideTranslations(params.locale)
  const guide = applyGuideTranslations(baseGuide, translations)
  const t = await getTranslations({ locale: params.locale, namespace: 'guide' })
  const path = `/cancel/${params.slug}`
  const title = t('howToCancel', { service: guide.service })
  return {
    title,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl(path, params.locale),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: `${title} — CancelHub`,
      description: guide.description,
      url: canonicalUrl(path, params.locale),
    },
  }
}

export default async function GuidePage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  setRequestLocale(params.locale)
  const baseGuide = guidesBySlug[params.slug]
  if (!baseGuide) notFound()

  const translations = await getGuideTranslations(params.locale)
  const guide = applyGuideTranslations(baseGuide, translations)

  const t = await getTranslations({ locale: params.locale, namespace: 'guide' })
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' })

  const primaryPlatform = guide.platforms.find((p) => p.platform === 'web') ?? guide.platforms[0]
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('howToCancel', { service: guide.service }),
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

      <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] ink-3 mb-8">
          <Link href={`/${params.locale}`} className="hover:ink transition-colors">
            {tNav('home')}
          </Link>
          <span>/</span>
          <Link href={`/${params.locale}/cancel`} className="hover:ink transition-colors">
            {tNav('guides')}
          </Link>
          <span>/</span>
          <span className="ink-2">{guide.category}</span>
        </nav>

        {/* Title with logo */}
        <div className="flex items-start gap-5 mb-3">
          <BrandLogo slug={guide.slug} alt={guide.service} size={36} className="mt-2" />
          <h1
            className="text-[34px] sm:text-[38px] leading-[1.05] flex-1 min-w-0"
            style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
          >
            {t('howToCancel', { service: guide.service })}
          </h1>
        </div>
        <p className="text-[16px] ink-2 leading-[1.6] max-w-[55ch] mb-8">
          {guide.description}
        </p>

        {/* Meta strip */}
        <div className="border-y border-rule py-3 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] ink-2">
          <span className="inline-flex items-center gap-2">
            <span className="ink-3">{t('difficulty')}</span>
            <DifficultyBadge difficulty={guide.difficulty} reason={guide.difficultyReason} shortLabel />
          </span>
          {guide.monthlyPrice && (
            <span className="inline-flex items-center gap-2">
              <span className="ink-3">Price</span>
              <span>{guide.monthlyPrice}</span>
            </span>
          )}
          {guide.refundPolicy && (
            <span className="inline-flex items-center gap-2">
              <span className="ink-3">{t('refundTitle')}</span>
              <span className="truncate max-w-[28ch]">{guide.refundPolicy}</span>
            </span>
          )}
          <span className="ink-3 ml-auto">{t('verifiedOn', { date: guide.lastVerified })}</span>
        </div>

        {/* Steps */}
        <section className="mt-12">
          <h2
            className="text-[11px] ink-3 uppercase mb-6"
            style={{ letterSpacing: '0.18em' }}
          >
            {t('stepsTitle')}
          </h2>
          <PlatformTabs platforms={guide.platforms} />
        </section>

        {/* Common issues */}
        {guide.commonIssues.length > 0 && (
          <section className="border-t border-rule mt-12 pt-10">
            <h2
              className="text-[11px] ink-3 uppercase mb-6"
              style={{ letterSpacing: '0.18em' }}
            >
              {t('issuesTitle')}
            </h2>
            <div className="space-y-6">
              {guide.commonIssues.map((issue, i) => (
                <div key={i}>
                  <p className="text-[14px] ink mb-1" style={{ fontWeight: 500 }}>
                    {issue.question}
                  </p>
                  <p className="text-[14px] ink-2 leading-[1.55] max-w-[60ch]">
                    {issue.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Alternatives */}
        {guide.alternatives && guide.alternatives.length > 0 && (
          <section className="border-t border-rule mt-12 pt-10">
            <h2
              className="text-[11px] ink-3 uppercase mb-5"
              style={{ letterSpacing: '0.18em' }}
            >
              {t('alternativesTitle', { service: guide.service })}
            </h2>
            <div>
              {guide.alternatives.map((alt) => {
                // url is like '/cancel/disney-plus' — extract slug for the logo
                const altSlug = alt.url.split('/').filter(Boolean).pop() ?? ''
                return (
                  <Link
                    key={alt.name}
                    href={alt.url}
                    className="group grid items-center gap-5 py-[14px] border-b border-rule hover:opacity-90 transition-opacity"
                    style={{ gridTemplateColumns: '24px 1fr auto 20px' }}
                  >
                    <BrandLogo slug={altSlug} alt={alt.name} size={20} />
                    <span className="text-[15px] ink">{alt.name}</span>
                    <span className="text-[12px] ink-2 truncate max-w-[24ch]">
                      {alt.description}
                    </span>
                    <span className="ink-3 text-[14px] opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Footer nav */}
        <div className="border-t border-rule mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 text-[12px] ink-3">
          <Link
            href={`/${params.locale}/cancel`}
            className="hover:ink transition-colors"
          >
            {t('backLink')}
          </Link>
          <p>
            {t('reportLink')}{' '}
            <a
              href="mailto:hello@cancelhub.app"
              className="underline underline-offset-2 hover:ink transition-colors"
            >
              {t('reportLinkSuffix')}
            </a>
          </p>
        </div>
      </article>
    </>
  )
}
