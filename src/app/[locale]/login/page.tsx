import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl } from '@/config/seo'
import { locales } from '@/config/i18n'
import { LoginForm } from './LoginForm'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    title: 'Sign in — CancelHub',
    description: 'Sign in to track your subscriptions and get reminders before every charge.',
    alternates: { canonical: canonicalUrl('/login', locale) },
    robots: { index: false, follow: false },
  }
}

export default async function LoginPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string }
  searchParams: { next?: string; error?: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'login' })

  return (
    <div className="max-w-[440px] mx-auto px-[22px]" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <header className="text-center" style={{ marginBottom: 28 }}>
        <span className="eyebrow" style={{ marginBottom: 16 }}>
          <span style={{ color: 'var(--green)' }}>●</span> {t('eyebrow')}
        </span>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(28px, 4.5vw, 36px)',
            letterSpacing: '-0.022em',
            lineHeight: 1.1,
            marginTop: 14,
          }}
        >
          {t('title')}{' '}
          <em className="font-serif-display" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
            {t('titleAccent')}
          </em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 15, marginTop: 12, maxWidth: '38ch', margin: '12px auto 0' }}>
          {t('subtitle')}
        </p>
      </header>

      <LoginForm next={searchParams.next} initialError={searchParams.error} />

      <div
        style={{
          marginTop: 32,
          paddingTop: 22,
          borderTop: '1px solid var(--line)',
          fontSize: 13,
          color: 'var(--ink-3)',
          textAlign: 'center',
        }}
      >
        {t('terms')}{' '}
        <Link
          href={`/${locale}/about`}
          style={{ color: 'var(--accent)', borderBottom: '1px solid currentColor', paddingBottom: 1 }}
        >
          {t('termsLink')}
        </Link>
        .
      </div>
    </div>
  )
}
