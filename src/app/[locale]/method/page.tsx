import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const path = '/method'
  return {
    title: 'Methodology — CancelHub',
    description:
      'How CancelHub tests cancellation flows, scores them, and updates the friction index. Open methodology, plain English.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

const lastUpdated = 'May 20, 2026'

export default async function MethodPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  return (
    <article className="max-w-[720px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">Home</Link>
        <span>/</span>
        <span>Methodology</span>
      </nav>

      <header style={{ padding: '18px 0 8px' }}>
        <span className="eyebrow" style={{ marginBottom: 14 }}>
          <span style={{ color: 'var(--green)' }}>●</span> Last updated {lastUpdated}
        </span>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginTop: 14,
          }}
        >
          How we score{' '}
          <em
            className="font-serif-display"
            style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}
          >
            cancellation friction.
          </em>
        </h1>
        <p
          className="font-serif-display"
          style={{
            fontSize: 19,
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--ink-2)',
            marginTop: 16,
            lineHeight: 1.5,
            maxWidth: '58ch',
          }}
        >
          Short version: a real person walks through each public cancellation flow on a fresh
          browser session and counts a fixed list of observable signals. The 0–10 score is a
          weighted sum of those signals. Anyone can ask for a re-test.
        </p>
      </header>

      <div style={{ marginTop: 32 }}>
        <Section title="What we measure">
          <p>
            Six observable signals, all visible to any user going through the flow today. We&apos;re
            not measuring intent or motive — just what the flow does.
          </p>
          <Criterion
            n="01"
            name="Steps below the fold"
            weight="0–1.5"
            body="How far the user has to scroll to find the cancel link from the account settings page. A link visible above the fold scores 0; a link that requires scrolling past upsells, banners, or unrelated cards scores up to 1.5."
          />
          <Criterion
            n="02"
            name="Retention prompts"
            weight="0–2.5"
            body="The number of screens between clicking &ldquo;cancel&rdquo; and the actual cancellation taking effect. Includes &ldquo;wait — get 2 months free,&rdquo; &ldquo;are you sure?&rdquo;, downgrade offers, pause-instead-of-cancel suggestions, and chatbot interrogations. One prompt = 0.5; six prompts = 2.5."
          />
          <Criterion
            n="03"
            name="Click count"
            weight="0–1.5"
            body="Total clicks from sign-in to confirmation email. We benchmark against Netflix (2 clicks) and score from there. Each click above 4 adds 0.25."
          />
          <Criterion
            n="04"
            name="Confirmation-shaming language"
            weight="0–1.5"
            body="Whether the prominent button keeps you subscribed and the cancel option is rendered as a small grey link (or worse, hidden behind a help icon). We score visual hierarchy that pushes the user away from cancelling."
          />
          <Criterion
            n="05"
            name="Phone-only path"
            weight="0–2.0"
            body="If the only documented way to cancel is calling a number or starting a live-chat session — i.e., no self-serve web flow — this adds 2.0 alone. Hold times over 10 minutes add another 0.5."
          />
          <Criterion
            n="06"
            name="Fees disclosed at cancel"
            weight="0–1.0"
            body="Whether the cancellation flow reveals a fee (early-termination, restocking, etc.) that wasn&apos;t prominently shown at sign-up. Surprise fees disclosed only on the last screen score the full 1.0."
          />

          <p style={{ marginTop: 18 }}>
            The score is a simple sum. Maximum possible: 10. Decimal places are rounded to the nearest
            whole number for the public index.
          </p>
        </Section>

        <Section title="How we test">
          <p>
            Each guide is hand-tested by a person on our team using a clean browser profile — no
            cookies, no extensions, no signed-in payment method. We sign up for the cheapest tier,
            wait at least 24 hours, and then walk through the cancellation flow exactly as the
            service documents it.
          </p>
          <p>
            We record: the URL of each screen, the count of clicks, the text of every retention
            offer, and the exact wording on the final confirmation. Screenshots are kept internally
            so any score can be reproduced or audited on request.
          </p>
          <p>
            We don&apos;t accept money, free accounts, or PR samples from any service we cover. The
            people doing the testing are paid by the project, not by the companies under review.
          </p>
        </Section>

        <Section title="How often we re-test">
          <p>Each guide is re-verified on a rolling schedule:</p>
          <ul style={ulStyle}>
            <li><strong>High-friction services (score 7–10)</strong> — re-tested every 8 weeks. These services change flows most often.</li>
            <li><strong>Moderate (4–6)</strong> — re-tested every 12 weeks.</li>
            <li><strong>Low-friction (0–3)</strong> — re-tested every 24 weeks. They rarely get worse without warning.</li>
            <li><strong>On request</strong> — anyone (including the company being scored) can email{' '}
              <a href="mailto:hello@cancelhub.app" style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>hello@cancelhub.app</a>
              {' '}and we re-test within 7 business days, regardless of the rolling schedule.
            </li>
          </ul>
          <p>
            Every entry on the public index shows the date it was last verified. If you&apos;re
            reading a score that was set six weeks ago, the actual flow may already have changed.
          </p>
        </Section>

        <Section title="If you&apos;re a company we&apos;ve scored">
          <p>
            We try to be fair, but we test public flows, not internal ones — if your in-app flow is
            different from the website flow, or if you&apos;ve changed the cancel path since our last
            verification, please tell us. Two paths:
          </p>
          <ul style={ulStyle}>
            <li>
              <strong>Request a re-test.</strong> Email{' '}
              <a href="mailto:hello@cancelhub.app?subject=Re-test%20request" style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>hello@cancelhub.app</a>
              {' '}with the URL or steps you want us to verify. We re-test on a clean session within 7
              business days and update the date stamp. If the flow has materially improved, the score
              moves the same day we finish testing.
            </li>
            <li>
              <strong>Publish a response.</strong> If you disagree with how we framed something, send a
              written response (any length, plain English) and we&apos;ll publish it under the score
              with attribution. We don&apos;t edit company responses except for length.
            </li>
          </ul>
          <p>
            We don&apos;t accept payment to remove or modify scores. We don&apos;t accept threats to
            do so either — we&apos;ll just publish those.
          </p>
        </Section>

        <Section title="What this index is not">
          <p>
            The friction index is <strong>our opinion</strong> about the observable difficulty of
            public cancellation flows, expressed as a number to make services comparable. It is not:
          </p>
          <ul style={ulStyle}>
            <li>A legal determination. We don&apos;t claim any service violates any law.</li>
            <li>A measure of product quality, customer service, or company morality.</li>
            <li>A guarantee. Flows change — verify against the service&apos;s current pages before relying on our numbers.</li>
            <li>A blanket recommendation to cancel. We&apos;re providing facts about exit cost, not telling you what to subscribe to.</li>
          </ul>
        </Section>

        <Section title="Corrections">
          <p>
            When we get something factually wrong (a wrong fee, a misnamed button, a flow we
            haven&apos;t updated in time), we correct it as soon as we can confirm. Corrections are
            logged with a date and a one-line note at the bottom of the affected guide so the change
            is visible.
          </p>
          <p>
            If a correction materially changes a score, we update the score the same day, and we
            email the affected company (if they&apos;ve given us a contact) within 24 hours.
          </p>
        </Section>

        <Section title="Open source">
          <p>
            The scoring weights above are public. The list of services and their current scores is
            public. The methodology is open to challenge. If you think we&apos;ve mis-weighted
            something or missed a signal, write to{' '}
            <a href="mailto:hello@cancelhub.app" style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>hello@cancelhub.app</a>{' '}
            with your proposal. We update the methodology page when we change it.
          </p>
        </Section>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/rankings`} className="hover:accent transition-colors">
          ← Back to the index
        </Link>
        <Link href={`/${locale}/about`} className="hover:accent transition-colors">
          About CancelHub →
        </Link>
      </div>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2
        className="font-serif-display"
        style={{
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: '-0.015em',
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)' }}>{children}</div>
    </section>
  )
}

function Criterion({
  n,
  name,
  weight,
  body,
}: {
  n: string
  name: string
  weight: string
  body: string
}) {
  return (
    <div
      className="card-warm"
      style={{
        marginTop: 14,
        padding: '16px 18px',
        display: 'grid',
        gridTemplateColumns: '32px 1fr',
        gap: 14,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          fontSize: 11,
          color: 'var(--ink-3)',
          paddingTop: 3,
          letterSpacing: '0.06em',
        }}
      >
        {n}
      </span>
      <div>
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h3
            className="font-serif-display"
            style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.005em' }}
          >
            {name}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono, ui-monospace, monospace)',
              fontSize: 11,
              color: 'var(--accent)',
              fontWeight: 600,
              background: 'var(--accent-soft)',
              padding: '2px 8px',
              borderRadius: 999,
              letterSpacing: '0.04em',
            }}
          >
            weight {weight}
          </span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, marginTop: 5 }}>{body}</p>
      </div>
    </div>
  )
}

const ulStyle: React.CSSProperties = {
  listStyle: 'disc',
  paddingLeft: 22,
  marginTop: 8,
  marginBottom: 12,
}
