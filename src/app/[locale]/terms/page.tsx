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
  const path = '/terms'
  return {
    title: 'Terms of Service — CancelHub',
    description:
      'The rules of the road for using CancelHub. Short, plain English, no surprises.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  }
}

const lastUpdated = 'May 20, 2026'

export default async function TermsPage({
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
        <span>Terms</span>
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
          Terms of <em className="font-serif-display" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>service</em>
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
          Short version: use CancelHub to track your own subscriptions. Don&apos;t abuse it. We try to be accurate but cancellation flows change, so verify with the service before you assume anything. No warranties.
        </p>
      </header>

      <div style={{ marginTop: 32 }}>
        <Section title="What CancelHub is">
          <p>
            CancelHub is an independent, ad-free website that publishes cancellation guides for subscription services and provides a personal dashboard to track your own subscriptions and remind you of upcoming charges.
          </p>
          <p>
            We are not affiliated with any of the services we write about. We don&apos;t take referral payments, sponsorships, or sponsored placements. We don&apos;t scrape or interact with third-party services on your behalf.
          </p>
        </Section>

        <Section title="Your account">
          <p>You need to be 16 or older to create an account. You&apos;re responsible for any activity under your account — keep your magic-link emails private and don&apos;t share access.</p>
          <p>You can delete your account at any time. We&apos;ll wipe your data within 7 days of the request.</p>
        </Section>

        <Section title="Accuracy of guides">
          <p>We update cancellation guides regularly and timestamp each one with a &ldquo;last verified&rdquo; date. <strong>But subscription services change their flows without notice.</strong> If you follow a guide and it doesn&apos;t work, we&apos;d love to know — email us and we&apos;ll fix it fast — but we can&apos;t guarantee any specific guide is correct at the moment you read it.</p>
          <p>Always look at your actual bill / confirmation email after cancelling to confirm it worked. We&apos;ll happily help you troubleshoot but we&apos;re not responsible for charges that go through because a service&apos;s flow changed since we last checked.</p>
        </Section>

        <Section title="Acceptable use">
          <p>Don&apos;t:</p>
          <ul style={ulStyle}>
            <li>Scrape, crawl, or otherwise programmatically harvest the site beyond reasonable browsing.</li>
            <li>Reverse-engineer the service or its API for resale.</li>
            <li>Use the dashboard to track subscriptions that aren&apos;t yours.</li>
            <li>Abuse the contact form or any feedback mechanism for spam.</li>
            <li>Attempt to break security controls (RLS, auth, etc).</li>
          </ul>
          <p>We may suspend or close accounts that violate these rules. Honest mistakes — write to us, we&apos;ll work it out.</p>
        </Section>

        <Section title="Intellectual property">
          <p>The CancelHub name, wordmark, original copy on cancellation guides, ranking methodology, and the design system are ours. The screenshots, brand logos, and product names of the services we write about belong to those companies and are used for identification only — no endorsement implied or claimed.</p>
          <p>You can quote or link to our guides freely with attribution. You can&apos;t republish them in full elsewhere without permission. The cancellation methodology is open — see <Link href={`/${locale}/about`} style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>/about</Link>.</p>
        </Section>

        <Section title="No warranty">
          <p>The service is provided &ldquo;as is&rdquo;, without warranties of any kind. We make no promises about uptime, accuracy of guides, completeness of data, or that the service will be uninterrupted. Notifications can fail to send (Resend outage, your spam filter, your phone in airplane mode) — they&apos;re a helpful nudge, not a legal guarantee.</p>
          <p>You agree that using CancelHub is at your own risk and that we&apos;re not liable for any direct, indirect, incidental, or consequential damages arising from your use of the service or from following any guide.</p>
        </Section>

        <Section title="Privacy">
          <p>How we handle your data is covered in our <Link href={`/${locale}/privacy`} style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor' }}>Privacy Policy</Link>. The short version: we collect the minimum, never sell anything, and let you delete your data at any time.</p>
        </Section>

        <Section title="Termination">
          <p>You can stop using CancelHub at any time. Delete your account from your settings or by emailing us.</p>
          <p>We can also terminate accounts that violate these terms — we&apos;ll email you first unless the violation is severe (security attacks, abuse of other users).</p>
        </Section>

        <Section title="Changes to these terms">
          <p>We&apos;ll update this page when something material changes (new services we use, new account requirements, etc) and email signed-in users. Minor clarifications just update the &ldquo;last updated&rdquo; date at the top.</p>
        </Section>

        <Section title="Disputes">
          <p>These terms are governed by the laws of the European Union (where Supabase EU West and our team are based). If we can&apos;t resolve a dispute over email, the courts in the EU have jurisdiction.</p>
          <p>If you&apos;re a consumer in the EU/UK, this doesn&apos;t override your statutory rights.</p>
        </Section>

        <Section title="Contact">
          <p>
            Questions, complaints, or feedback:{' '}
            <a
              href="mailto:hello@cancelhub.app"
              style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor', paddingBottom: 1 }}
            >
              hello@cancelhub.app
            </a>
          </p>
        </Section>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/privacy`} className="hover:accent transition-colors">
          Read our privacy policy →
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
