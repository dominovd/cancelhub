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
  const path = '/privacy'
  return {
    title: 'Privacy Policy — CancelHub',
    description:
      'How CancelHub handles your data. We collect only what we need to track your subscriptions and never sell anything.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

const lastUpdated = 'May 20, 2026'

export default async function PrivacyPage({
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
        <span>Privacy</span>
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
          Privacy <em className="font-serif-display" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>policy</em>
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
          Short version: we collect the minimum needed to remind you about your subscriptions. We don&apos;t sell anything, don&apos;t run ad networks, and don&apos;t share your list with the companies you&apos;re cancelling.
        </p>
      </header>

      <div style={{ marginTop: 32 }}>
        <Section title="What we collect">
          <p>
            <strong>Account email.</strong> If you sign in, your email lives in Supabase Auth so we can authenticate you and send you transactional emails (magic-link sign-in, subscription alerts you opt into).
          </p>
          <p>
            <strong>Subscriptions you add.</strong> When you add a subscription to your dashboard, we store the service name, category, price, next charge date, and any notes you write. Nothing else.
          </p>
          <p>
            <strong>Notification preferences.</strong> Channel choices (email, push, SMS, calendar) and timing settings — whatever you configured on <Link href={`/${locale}/notifications`} style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>/notifications</Link>.
          </p>
          <p>
            <strong>Notification history.</strong> Records of alerts we&apos;ve sent you. Stored so you can see your own history; we don&apos;t analyse it for ads.
          </p>
          <p>
            <strong>Anonymous analytics.</strong> Vercel Analytics records page views and aggregate visitor counts. No cookies, no IP fingerprinting, no tracking across sites.
          </p>
        </Section>

        <Section title="What we don't collect">
          <ul style={ulStyle}>
            <li>No bank or credit-card details — we don&apos;t handle payments at all.</li>
            <li>No location data beyond what Vercel logs server-side for routing.</li>
            <li>No data scraped from third-party services. If you tell us &ldquo;I subscribe to Netflix&rdquo;, we don&apos;t ping Netflix.</li>
            <li>No advertising identifiers.</li>
            <li>No third-party cookies. (We use only Supabase&apos;s own auth cookies on cancelhub.app.)</li>
          </ul>
        </Section>

        <Section title="Who processes your data">
          <p>Three services act as processors on our behalf:</p>
          <ul style={ulStyle}>
            <li><strong>Supabase</strong> — auth + Postgres database hosting (EU West region). Your subscriptions table lives here.</li>
            <li><strong>Resend</strong> — transactional email delivery (magic-link sign-in, subscription alerts). They process your email address but don&apos;t store the content of your dashboard.</li>
            <li><strong>Vercel</strong> — hosts the website and processes anonymous analytics.</li>
          </ul>
          <p>We don&apos;t share your data with anyone else. We don&apos;t sell, rent, or trade it. We don&apos;t share it with the subscription services we write guides about.</p>
        </Section>

        <Section title="Your rights">
          <p>You can, at any time:</p>
          <ul style={ulStyle}>
            <li><strong>Export</strong> your data — write to us and we&apos;ll send you a JSON dump of everything we hold about you, within 7 days.</li>
            <li><strong>Delete</strong> your account — wipes your row in Supabase Auth, your subscriptions, your settings, and your notification history. Cannot be undone.</li>
            <li><strong>Opt out</strong> of any notification type via <Link href={`/${locale}/notifications`} style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>/notifications</Link>.</li>
          </ul>
          <p>If you&apos;re in the EU/UK, you have additional rights under GDPR — including the right to lodge a complaint with your data-protection authority. We&apos;ll cooperate with any such request.</p>
        </Section>

        <Section title="Security">
          <p>We use industry-standard practices: passwords are never stored (magic-link auth only; Google OAuth handled by Google), database access is gated behind row-level security so you can never see another user&apos;s rows, and connections are TLS-encrypted end-to-end.</p>
          <p>We won&apos;t pretend we&apos;re unhackable. If we have a breach, we&apos;ll notify affected users by email within 72 hours, as required by GDPR Article 33.</p>
        </Section>

        <Section title="Children">
          <p>CancelHub is for adults managing their own subscriptions. We don&apos;t knowingly collect data from anyone under 16. If you believe a minor has signed up, email us and we&apos;ll delete the account.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>If we materially change what we collect or who we share data with, we&apos;ll update this page and email signed-in users. Minor edits (typos, clarity) will just be reflected in the &ldquo;last updated&rdquo; date at the top.</p>
        </Section>

        <Section title="Contact">
          <p>
            Questions, requests, or complaints:{' '}
            <a
              href="mailto:hello@cancelhub.app"
              style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor', paddingBottom: 1 }}
            >
              hello@cancelhub.app
            </a>
          </p>
          <p>We read every email and respond within 1 business day.</p>
        </Section>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/terms`} className="hover:accent transition-colors">
          Read our terms →
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

const ulStyle: React.CSSProperties = {
  listStyle: 'disc',
  paddingLeft: 22,
  marginTop: 8,
  marginBottom: 12,
}
