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
import { DarkPatternCard } from '@/components/DarkPatternCard'
import { FreshnessBar } from '@/components/FreshnessBar'
import { categoryToSlug } from '@/lib/categories'
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
          <Link href={`/${params.locale}`} className="hover:accent transition-colors">
            {tNav('home')}
          </Link>
          <span>/</span>
          <Link href={`/${params.locale}/cancel`} className="hover:accent transition-colors">
            {tNav('guides')}
          </Link>
          <span>/</span>
          <Link
            href={`/${params.locale}/categories/${categoryToSlug(guide.category)}`}
            className="ink-2 hover:accent transition-colors"
          >
            {guide.category}
          </Link>
        </nav>

        {/* Title with logo */}
        <div className="flex items-start gap-5 mb-3">
          <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={36} className="mt-2" />
          <h1
            className="text-[34px] sm:text-[38px] leading-[1.05] flex-1 min-w-0"
            style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
          >
            {t('howToCancel', { service: guide.service })}
          </h1>
        </div>
        <p className="text-[16px] ink-2 leading-[1.6] max-w-[55ch] mb-5">
          {guide.description}
        </p>

        {/* Action cross-links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/${params.locale}/cancel/${guide.slug}/pause`}
            className="text-[12px] px-3 py-[5px] border border-rule rounded-full hover:border-[var(--accent)] hover:accent transition-colors ink-3"
          >
            How to pause →
          </Link>
          <Link
            href={`/${params.locale}/cancel/${guide.slug}/refund`}
            className="text-[12px] px-3 py-[5px] border border-rule rounded-full hover:border-[var(--accent)] hover:accent transition-colors ink-3"
          >
            Get a refund →
          </Link>
        </div>

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
            <span className="inline-flex items-start gap-2">
              <span className="ink-3 shrink-0">{t('refundTitle')}</span>
              <span>{guide.refundPolicy}</span>
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

        {/* Dark pattern scorecard */}
        <DarkPatternCard score={guide.darkPatternScore} flags={guide.darkPatternFlags} />

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
                    className="group grid items-center gap-4 py-[14px] border-b border-rule transition-colors"
                    style={{ gridTemplateColumns: '28px 1fr 20px' }}
                  >
                    {/* Logo — fixed width, vertically centred */}
                    <BrandLogo slug={altSlug} service={alt.name} alt={alt.name} size={22} />

                    {/* Name + description stacked — takes all remaining space */}
                    <div className="min-w-0">
                      <span
                        className="block text-[15px] ink group-hover:accent transition-colors leading-snug"
                        style={{ fontWeight: 500 }}
                      >
                        {alt.name}
                      </span>
                      <span className="block text-[12px] ink-3 mt-[2px] leading-snug truncate">
                        {alt.description}
                      </span>
                    </div>

                    {/* Arrow */}
                    <span className="text-[14px] ink-3 opacity-40 group-hover:opacity-100 group-hover:accent transition-all justify-self-end">
                      →
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Freshness bar */}
        <FreshnessBar
          lastVerified={guide.lastVerified}
          service={guide.service}
          slug={guide.slug}
        />

        {/* Footer nav */}
        <div className="border-t border-rule mt-8 pt-6 flex items-center justify-between flex-wrap gap-4 text-[12px] ink-3">
          <Link
            href={`/${params.locale}/cancel`}
            className="hover:accent transition-colors"
          >
            {t('backLink')}
          </Link>
          <Link
            href={`/${params.locale}/rankings`}
            className="hover:accent transition-colors"
          >
            See all rankings →
          </Link>
        </div>
      </article>
    </>
  )
}
