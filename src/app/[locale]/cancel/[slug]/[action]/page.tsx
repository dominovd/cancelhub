import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { allGuides, guidesBySlug } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { BrandLogo } from '@/components/BrandLogo'
import {
  SUPPORTED_ACTIONS,
  ACTION_META,
  derivePauseInfo,
  deriveRefundInfo,
  type ActionType,
} from '@/lib/actions'
import type { CancelGuide } from '@/types/guide'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allGuides.flatMap((g) =>
      SUPPORTED_ACTIONS.map((action) => ({ locale, slug: g.slug, action }))
    )
  )
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params: { locale, slug, action },
}: {
  params: { locale: string; slug: string; action: string }
}): Promise<Metadata> {
  const guide = guidesBySlug[slug]
  if (!guide || !SUPPORTED_ACTIONS.includes(action as ActionType)) return {}

  const meta = ACTION_META[action as ActionType]
  const path = `/cancel/${slug}/${action}`
  const title = meta.title(guide.service)
  const description = meta.description(guide.service)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: `${title} — CancelHub`,
      description,
      url: canonicalUrl(path, locale),
    },
  }
}

// ─── Pause content ────────────────────────────────────────────────────────────

function PauseContent({ guide, locale }: { guide: CancelGuide; locale: string }) {
  if (!guide) return null
  const info = derivePauseInfo(guide)

  return (
    <>
      {info.supported ? (
        <div className="space-y-6">
          <div
            className="flex items-center gap-2 text-[13px] px-4 py-3 rounded-[6px] border border-rule"
            style={{ background: 'var(--accent-soft)' }}
          >
            <span style={{ color: 'var(--c-easy)', fontWeight: 600 }}>✓</span>
            <span className="ink-2">
              {guide.service} offers a pause option.
            </span>
          </div>

          {info.answer && (
            <div>
              <h2
                className="text-[11px] ink-3 uppercase mb-4"
                style={{ letterSpacing: '0.18em' }}
              >
                What you need to know
              </h2>
              <p className="text-[15px] ink-2 leading-[1.65] max-w-[58ch]">
                {info.answer}
              </p>
            </div>
          )}

          {info.stepHint && !info.answer && (
            <div>
              <h2
                className="text-[11px] ink-3 uppercase mb-4"
                style={{ letterSpacing: '0.18em' }}
              >
                Where to find the pause option
              </h2>
              <p className="text-[15px] ink-2 leading-[1.65] max-w-[58ch]">
                {info.stepHint}
              </p>
            </div>
          )}

          <div className="border-t border-rule pt-6">
            <p className="text-[14px] ink-2 leading-[1.6] max-w-[56ch]">
              If you want to fully stop billing,{' '}
              <Link
                href={`/${locale}/cancel/${guide.slug}`}
                className="underline underline-offset-2 hover:accent transition-colors"
              >
                follow the full cancellation guide →
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div
            className="flex items-center gap-2 text-[13px] px-4 py-3 rounded-[6px] border border-rule"
            style={{ background: 'var(--accent-soft)' }}
          >
            <span style={{ color: 'var(--c-hard)', fontWeight: 600 }}>✗</span>
            <span className="ink-2">
              {guide.service} does not offer a pause option.
            </span>
          </div>

          <div>
            <h2
              className="text-[11px] ink-3 uppercase mb-4"
              style={{ letterSpacing: '0.18em' }}
            >
              Your alternatives
            </h2>
            <div className="space-y-3 text-[15px] ink-2 leading-[1.65] max-w-[56ch]">
              <p>
                <strong className="ink">Cancel and re-subscribe later.</strong>{' '}
                Most services let you re-join at any time without losing your account history.{' '}
                <Link
                  href={`/${locale}/cancel/${guide.slug}`}
                  className="underline underline-offset-2 hover:accent transition-colors"
                >
                  See how to cancel {guide.service} →
                </Link>
              </p>
              {guide.alternatives && guide.alternatives.length > 0 && (
                <p>
                  <strong className="ink">Switch to a cheaper alternative.</strong>{' '}
                  {guide.alternatives.slice(0, 2).map((a) => a.name).join(' or ')} may offer
                  similar features at a lower price.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Refund content ───────────────────────────────────────────────────────────

function RefundContent({ guide }: { guide: CancelGuide; locale: string }) {
  if (!guide) return null
  const info = deriveRefundInfo(guide)

  return (
    <div className="space-y-8">
      {/* Eligibility badge */}
      <div
        className="flex items-center gap-2 text-[13px] px-4 py-3 rounded-[6px] border border-rule"
        style={{ background: 'var(--accent-soft)' }}
      >
        <span style={{ color: info.eligible ? 'var(--c-easy)' : 'var(--c-hard)', fontWeight: 600 }}>
          {info.eligible ? '✓' : '✗'}
        </span>
        <span className="ink-2">
          {info.hasMBG
            ? `${guide.service} offers a money-back guarantee.`
            : info.eligible
            ? `${guide.service} may issue refunds in some cases.`
            : `${guide.service} does not offer refunds.`}
          {info.window && ` Request within ${info.window}.`}
        </span>
      </div>

      {/* Full policy */}
      <div>
        <h2
          className="text-[11px] ink-3 uppercase mb-4"
          style={{ letterSpacing: '0.18em' }}
        >
          Official refund policy
        </h2>
        <p className="text-[15px] ink-2 leading-[1.65] max-w-[58ch]">
          {info.policy}
        </p>
      </div>

      {/* How to request */}
      {info.eligible && (
        <div>
          <h2
            className="text-[11px] ink-3 uppercase mb-4"
            style={{ letterSpacing: '0.18em' }}
          >
            How to request a refund
          </h2>
          <ol className="space-y-3 text-[15px] ink-2 leading-[1.65] max-w-[56ch]">
            <li className="flex gap-3">
              <span className="ink-3 tabular-nums shrink-0">1.</span>
              <span>
                Cancel your subscription first to stop future charges.{' '}
                <Link
                  href={`/${guide.slug.includes('/') ? '' : '/'}cancel/${guide.slug}`}
                  className="underline underline-offset-2 hover:accent transition-colors ink"
                >
                  See cancellation steps →
                </Link>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="ink-3 tabular-nums shrink-0">2.</span>
              <span>
                Contact {guide.service} support directly — via live chat, email, or phone.
                Reference the exact charge date and amount.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="ink-3 tabular-nums shrink-0">3.</span>
              <span>
                If denied, dispute the charge with your bank or card issuer as a last resort.
                Most banks side with the customer for subscription billing disputes.
              </span>
            </li>
          </ol>
        </div>
      )}

      {/* No refund — what to do */}
      {!info.eligible && (
        <div>
          <h2
            className="text-[11px] ink-3 uppercase mb-4"
            style={{ letterSpacing: '0.18em' }}
          >
            What you can still do
          </h2>
          <div className="space-y-3 text-[15px] ink-2 leading-[1.65] max-w-[56ch]">
            <p>
              <strong className="ink">Cancel immediately</strong> to stop the next charge.
              Your access will continue until the end of the current billing period.{' '}
              <Link
                href={`/${guide.slug.includes('/') ? '' : '/'}cancel/${guide.slug}`}
                className="underline underline-offset-2 hover:accent transition-colors"
              >
                See how to cancel →
              </Link>
            </p>
            <p>
              <strong className="ink">Dispute with your bank</strong> if you were charged
              after cancelling or during a free trial without notice. Banks typically support
              customers in clear billing errors.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActionPage({
  params: { locale, slug, action },
}: {
  params: { locale: string; slug: string; action: string }
}) {
  setRequestLocale(locale)

  if (!SUPPORTED_ACTIONS.includes(action as ActionType)) notFound()
  const guide = guidesBySlug[slug]
  if (!guide) notFound()

  const actionType = action as ActionType
  const meta = ACTION_META[actionType]

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] ink-3 mb-8 flex-wrap">
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">Guides</Link>
        <span>/</span>
        <Link href={`/${locale}/cancel/${slug}`} className="hover:accent transition-colors">
          {guide.service}
        </Link>
        <span>/</span>
        <span className="ink-2">{meta.label}</span>
      </nav>

      {/* Hero */}
      <div className="flex items-start gap-5 mb-4">
        <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={36} className="mt-1" />
        <h1
          className="text-[32px] sm:text-[36px] leading-[1.05] flex-1 min-w-0"
          style={{ fontWeight: 500, letterSpacing: '-0.018em' }}
        >
          {meta.title(guide.service)}
        </h1>
      </div>
      <p className="text-[16px] ink-2 leading-[1.6] max-w-[55ch] mb-10">
        {meta.description(guide.service)}
      </p>

      {/* Content */}
      {actionType === 'pause' && <PauseContent guide={guide} locale={locale} />}
      {actionType === 'refund' && <RefundContent guide={guide} locale={locale} />}

      {/* Other actions */}
      <section className="border-t border-rule mt-12 pt-6">
        <p className="text-[11px] ink-3 uppercase mb-4" style={{ letterSpacing: '0.18em' }}>
          More guides for {guide.service}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/cancel/${slug}`}
            className="text-[13px] px-3 py-[6px] border border-rule rounded-full hover:border-[var(--accent)] hover:accent transition-colors ink-2"
          >
            How to cancel
          </Link>
          {actionType !== 'pause' && (
            <Link
              href={`/${locale}/cancel/${slug}/pause`}
              className="text-[13px] px-3 py-[6px] border border-rule rounded-full hover:border-[var(--accent)] hover:accent transition-colors ink-2"
            >
              How to pause
            </Link>
          )}
          {actionType !== 'refund' && (
            <Link
              href={`/${locale}/cancel/${slug}/refund`}
              className="text-[13px] px-3 py-[6px] border border-rule rounded-full hover:border-[var(--accent)] hover:accent transition-colors ink-2"
            >
              Get a refund
            </Link>
          )}
        </div>
      </section>

    </article>
  )
}
