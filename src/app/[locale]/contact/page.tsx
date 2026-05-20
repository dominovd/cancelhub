import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
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
  const t = await getTranslations({ locale, namespace: 'contact' })
  const path = '/contact'
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
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

  const cards = [
    {
      title: t('emailTitle'),
      desc: t('emailDesc'),
      cta: 'hello@cancelhub.app',
      href: 'mailto:hello@cancelhub.app',
      tone: 'default' as const,
    },
    {
      title: t('reportTitle'),
      desc: t('reportDesc'),
      cta: 'report@cancelhub.app',
      href: 'mailto:report@cancelhub.app?subject=Outdated%20guide',
      tone: 'warn' as const,
    },
    {
      title: t('suggestTitle'),
      desc: t('suggestDesc'),
      cta: 'hello@cancelhub.app',
      href: 'mailto:hello@cancelhub.app?subject=New%20service%20suggestion',
      tone: 'default' as const,
    },
  ]

  return (
    <article className="max-w-[760px] mx-auto px-[22px]">
      <nav
        style={{ fontSize: 13, color: 'var(--ink-3)', padding: '20px 0 0', display: 'flex', gap: 7 }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}`} className="hover:accent transition-colors">{t('backLink')}</Link>
        <span>/</span>
        <span>Contact</span>
      </nav>

      <header style={{ padding: '18px 0 8px' }}>
        <h1
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
          }}
        >
          {t('title')}
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 16, marginTop: 10, maxWidth: '54ch' }}>
          {t('subtitle')}
        </p>
      </header>

      <div className="grid sm:grid-cols-3 gap-[14px] mt-8">
        {cards.map((c, i) => (
          <a
            key={i}
            href={c.href}
            className="card-warm hover:-translate-y-[2px] transition-transform"
            style={{
              display: 'block',
              textDecoration: 'none',
              borderLeft: c.tone === 'warn' ? '3px solid var(--accent)' : undefined,
            }}
          >
            <h3
              className="font-serif-display"
              style={{ fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}
            >
              {c.title}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 6, lineHeight: 1.5 }}>{c.desc}</p>
            <div
              style={{
                marginTop: 14,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--accent)',
              }}
            >
              {c.cta} →
            </div>
          </a>
        ))}
      </div>

      <div
        className="card-warm mt-6"
        style={{
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
        }}
      >
        <p style={{ fontSize: 14, color: '#7c2d12' }}>
          <strong style={{ fontWeight: 600 }}>{t('responseNote')}</strong>
        </p>
      </div>

      <div
        className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-6"
        style={{ borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--ink-3)' }}
      >
        <Link href={`/${locale}/about`} className="hover:accent transition-colors">
          {t('aboutLink')}
        </Link>
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">
          {t('guidesLink')} →
        </Link>
      </div>
    </article>
  )
}
