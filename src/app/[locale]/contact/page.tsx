import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl('/contact', locale),
      languages: hreflangAlternates('/contact'),
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

  const sections = [
    {
      key: 'general',
      title: t('emailTitle'),
      desc: t('emailDesc'),
      mailto: 'mailto:info@cancelhub.app',
      shown: 'info@cancelhub.app',
    },
    {
      key: 'report',
      title: t('reportTitle'),
      desc: t('reportDesc'),
      mailto: 'mailto:info@cancelhub.app?subject=Guide%20correction',
      shown: 'info@cancelhub.app',
    },
    {
      key: 'suggest',
      title: t('suggestTitle'),
      desc: t('suggestDesc'),
      mailto: 'mailto:info@cancelhub.app?subject=Guide%20suggestion',
      shown: 'info@cancelhub.app',
    },
  ]

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">
      <nav className="text-[12px] ink-3 mb-10">
        <Link href={`/${locale}`} className="hover:accent transition-colors">
          ← {t('backLink')}
        </Link>
      </nav>

      <h1
        className="text-[36px] sm:text-[40px] leading-[1.05] mb-3"
        style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        {t('title')}
      </h1>
      <p className="text-[16px] ink-2 leading-[1.55] max-w-[55ch] mb-2">
        {t('subtitle')}
      </p>
      <p className="text-[12px] ink-3 mb-12">{t('responseNote')}</p>

      {sections.map((s) => (
        <section key={s.key} className="border-t border-rule pt-8 mt-8 first:mt-0">
          <h2
            className="text-[16px] mb-2"
            style={{ fontWeight: 500, letterSpacing: '-0.01em' }}
          >
            {s.title}
          </h2>
          <p className="text-[14px] ink-2 leading-[1.55] max-w-[60ch] mb-3">
            {s.desc}
          </p>
          <a
            href={s.mailto}
            className="text-[14px] ink underline underline-offset-[3px] hover:accent transition-colors"
          >
            {s.shown}
          </a>
        </section>
      ))}

      <div className="border-t border-rule-strong mt-12 pt-6 flex items-center gap-5 text-[12px] ink-3">
        <Link href={`/${locale}/about`} className="hover:accent transition-colors">
          {t('aboutLink')}
        </Link>
        <span className="opacity-50">·</span>
        <Link href={`/${locale}/cancel`} className="hover:accent transition-colors">
          {t('guidesLink')}
        </Link>
      </div>
    </article>
  )
}
