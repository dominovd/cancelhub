import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides, guidesBySlug } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
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

function SectionHeading({ n, children }: { n: number | string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-[10px] mb-[6px]">
      <span
        style={{
          fontSize: 13,
          color: '#fff',
          background: 'var(--ink)',
          width: 24,
          height: 24,
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {n}
      </span>
      <h2
        className="font-serif-display"
        style={{ fontWeight: 600, fontSize: 23, letterSpacing: '-0.01em' }}
      >
        {children}
      </h2>
    </div>
  )
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
  const tDiff = await getTranslations({ locale: params.locale, namespace: 'difficulty' })

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

  const faqSchema = guide.commonIssues.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.commonIssues.map((issue) => ({
          '@type': 'Question',
          name: issue.question,
          acceptedAnswer: { '@type': 'Answer', text: issue.answer },
        })),
      }
    : null

  const difficultyClass =
    guide.difficulty === 'easy' ? 'pill pill-easy' : guide.difficulty === 'medium' ? 'pill pill-med' : 'pill pill-hard'
  const difficultyShort =
    guide.difficulty === 'easy' ? tDiff('easyShort') : guide.difficulty === 'medium' ? tDiff('medShort') : tDiff('hardShort')

  const estimatedMinutes = guide.darkPatternFlags?.estimatedMinutes
  const bestPlatform =
    primaryPlatform.platform === 'web' ? 'Website' :
    primaryPlatform.platform === 'ios' ? 'iPhone / iPad' : 'Android'

  // section counter so the "When to cancel" advisory inserts cleanly when present
  let sectionN = 0
  const nextN = () => String(++sectionN)

  const showWhen = !!guide.refundPolicy

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="max-w-[760px] mx-auto px-[22px]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: 13,
            color: 'var(--ink-3)',
            padding: '20px 0 0',
            display: 'flex',
            gap: 7,
            flexWrap: 'wrap',
          }}
        >
          <Link href={`/${params.locale}`} className="hover:accent transition-colors">{tNav('home')}</Link>
          <span>/</span>
          <Link href={`/${params.locale}/cancel`} className="hover:accent transition-colors">{tNav('allGuides')}</Link>
          <span>/</span>
          <Link
            href={`/${params.locale}/categories/${categoryToSlug(guide.category)}`}
            className="hover:accent transition-colors"
          >
            {guide.category}
          </Link>
        </nav>

        {/* Header */}
        <header style={{ padding: '18px 0 8px' }}>
          <div className="flex items-center gap-4 mb-[18px]">
            <div
              className="flex-none flex items-center justify-center shadow-warm"
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                background: 'var(--card)',
                border: '1px solid var(--line)',
              }}
            >
              <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={42} />
            </div>
            <div className="min-w-0">
              <h1
                className="font-serif-display"
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {t('howToCancel', { service: guide.service })}
              </h1>
              <p style={{ color: 'var(--ink-3)', fontSize: 15, marginTop: 3 }}>
                {guide.description}
              </p>
            </div>
          </div>

          {/* Fact strip */}
          <div className="fact-strip" style={{ marginBottom: 14 }}>
            <div>
              <div className="k">{t('factDifficulty')}</div>
              <div className="v"><span className={difficultyClass}>{difficultyShort}</span></div>
            </div>
            <div>
              <div className="k">{t('factTime')}</div>
              <div className="v">{estimatedMinutes ? `~${estimatedMinutes} min` : '—'}</div>
            </div>
            <div>
              <div className="k">{t('factPlatform')}</div>
              <div className="v">{bestPlatform}</div>
            </div>
          </div>

          {/* Reassurance banner — only for easy cancellations */}
          {guide.difficulty === 'easy' && (
            <div className="reassure">
              <span className="dot">✓</span>
              <div>
                <b>This one&apos;s quick.</b> Most people finish in under {estimatedMinutes ?? 3} minutes. No phone calls, no retention loops, no hidden fees.
              </div>
            </div>
          )}
        </header>

        {/* Action cross-links */}
        <div className="flex flex-wrap gap-2 mt-6 mb-2">
          <Link
            href={`/${params.locale}/cancel/${guide.slug}/pause`}
            className="chip"
            style={{ fontSize: 12.5, padding: '5px 11px' }}
          >
            How to pause →
          </Link>
          <Link
            href={`/${params.locale}/cancel/${guide.slug}/refund`}
            className="chip"
            style={{ fontSize: 12.5, padding: '5px 11px' }}
          >
            Get a refund →
          </Link>
          <Link
            href={`/${params.locale}/cancel/${guide.slug}/delete`}
            className="chip"
            style={{ fontSize: 12.5, padding: '5px 11px' }}
          >
            Delete account →
          </Link>
        </div>

        {/* When to cancel — terracotta advisory (refund-aware) */}
        {showWhen && (
          <section style={{ padding: '34px 0 4px' }}>
            <SectionHeading n={nextN()}>{t('whenTitle')}</SectionHeading>
            <div
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-border)',
                borderRadius: 14,
                padding: '18px 20px',
                marginTop: 10,
                marginLeft: 34,
              }}
            >
              <div
                className="font-serif-display"
                style={{ fontSize: 18, fontWeight: 600, color: 'var(--accent-deep)' }}
              >
                {t('refundTitle')}
              </div>
              <p style={{ fontSize: 14, color: 'var(--accent-deep)', marginTop: 5 }}>{guide.refundPolicy}</p>
            </div>
          </section>
        )}

        {/* Steps */}
        <section style={{ padding: '34px 0 4px' }}>
          <SectionHeading n={nextN()}>{t('stepsTitle')}</SectionHeading>
          <p
            style={{
              color: 'var(--ink-3)',
              fontSize: 14,
              marginBottom: 16,
              paddingLeft: 34,
            }}
          >
            Pick your platform — the steps are slightly different on web vs mobile.
          </p>
          <div style={{ paddingLeft: 0 }}>
            <PlatformTabs platforms={guide.platforms} />
          </div>
        </section>

        {/* After you cancel */}
        <section style={{ padding: '34px 0 4px' }}>
          <SectionHeading n={nextN()}>{t('afterTitle')}</SectionHeading>
          <div className="card-warm" style={{ marginTop: 10 }}>
            <ul className="checklist">
              <li>
                <span className="mk">✓</span>
                <span>{t('afterCheck1')}</span>
              </li>
              <li>
                <span className="mk">✓</span>
                <span>{t('afterCheck2')}</span>
              </li>
              <li>
                <span className="mk">✓</span>
                <span>{t('afterCheck3')}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Dark pattern card — keep existing component */}
        <section style={{ paddingTop: 28 }}>
          <DarkPatternCard score={guide.darkPatternScore} flags={guide.darkPatternFlags} />
        </section>

        {/* Common issues */}
        {guide.commonIssues.length > 0 && (
          <section style={{ padding: '34px 0 4px' }}>
            <SectionHeading n={nextN()}>{t('issuesTitle')}</SectionHeading>
            <div style={{ marginTop: 10 }}>
              {guide.commonIssues.map((issue, i) => (
                <details key={i} className="faq-item">
                  <summary>{issue.question}</summary>
                  <div className="faq-body">{issue.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Alternatives */}
        {guide.alternatives && guide.alternatives.length > 0 && (
          <section style={{ padding: '34px 0 4px' }}>
            <h2
              className="font-serif-display"
              style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.01em', marginBottom: 12 }}
            >
              {t('alternativesTitle', { service: guide.service })}
            </h2>
            <div
              className="grid gap-[10px]"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))' }}
            >
              {guide.alternatives.map((alt) => {
                const altSlug = alt.url.split('/').filter(Boolean).pop() ?? ''
                return (
                  <Link key={alt.name} href={alt.url} className="gcard">
                    <BrandLogo slug={altSlug} service={alt.name} alt={alt.name} size={42} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate" style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }}>
                        {alt.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{alt.description}</div>
                    </div>
                    <span style={{ color: 'var(--ink-3)' }}>→</span>
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
        <div
          className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-6"
          style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
        >
          <Link href={`/${params.locale}/cancel`} className="hover:accent transition-colors">
            {t('backLink')}
          </Link>
          <Link href={`/${params.locale}/rankings`} className="hover:accent transition-colors">
            See all rankings →
          </Link>
        </div>
      </article>
    </>
  )
}
