import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { allGuides } from '@/data/guides'
import { locales } from '@/config/i18n'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    alternates: {
      canonical: canonicalUrl('/about', locale),
      languages: hreflangAlternates('/about'),
    },
  }
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })

  const sections: Array<{ title: string; body: string }> = [
    { title: t('missionTitle'), body: t('missionBody') },
    { title: t('howTitle'),     body: t('howBody') },
    { title: t('freeTitle'),    body: t('freeBody') },
  ]

  return (
    <article className="max-w-2xl mx-auto px-6 pt-12 pb-20">
      <nav className="text-[12px] ink-3 mb-10">
        <Link href={`/${locale}`} className="hover:accent transition-colors">
          ← {t('backLink')}
        </Link>
      </nav>

      <h1
        className="text-[36px] sm:text-[40px] leading-[1.05] mb-5"
        style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
      >
        {t('title')}
      </h1>

      <p className="text-[17px] ink-2 leading-[1.6] mb-12 max-w-[55ch]">
        {t('intro')}
      </p>

      {sections.map(({ title, body }) => (
        <section key={title} className="border-t border-rule pt-10 mt-10 first:mt-0">
          <h2
            className="text-[18px] mb-3"
            style={{ fontWeight: 500, letterSpacing: '-0.012em' }}
          >
            {title}
          </h2>
          <p className="text-[15px] ink-2 leading-[1.65] max-w-[60ch]">{body}</p>
        </section>
      ))}

      <section className="border-t border-rule pt-10 mt-10">
        <h2
          className="text-[18px] mb-3"
          style={{ fontWeight: 500, letterSpacing: '-0.012em' }}
        >
          {t('contactTitle')}
        </h2>
        <p className="text-[15px] ink-2 leading-[1.65] max-w-[60ch]">
          {t('contactBody')}
          <Link
            href={`/${locale}/contact`}
            className="ink underline underline-offset-2 hover:accent transition-colors"
          >
            {t('contactLink')}
          </Link>
          {t('contactBodySuffix')}
        </p>
      </section>

      {/* Stats — quiet, monochrome, hairline column rules */}
      <section className="border-t border-rule-strong mt-12 pt-8">
        <div className="grid grid-cols-3 gap-px bg-[color:var(--rule)]">
          {[
            { v: `${allGuides.length}+`, l: t('stat1') },
            { v: `${locales.length}`,    l: t('stat2') },
            { v: '0',                    l: t('stat3') },
          ].map((s) => (
            <div key={s.l} className="bg-paper px-4 py-5 text-center">
              <p className="text-[28px] ink" style={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
                {s.v}
              </p>
              <p className="text-[11px] ink-3 mt-1 uppercase" style={{ letterSpacing: '0.16em' }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
