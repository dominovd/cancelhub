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
      {/* Methodology — anchor target from rankings page */}
      <section id="methodology" className="border-t border-rule pt-10 mt-10">
        <h2
          className="text-[18px] mb-3"
          style={{ fontWeight: 500, letterSpacing: '-0.012em' }}
        >
          Scoring methodology
        </h2>
        <p className="text-[15px] ink-2 leading-[1.65] max-w-[60ch] mb-8">
          Every guide carries two independent scores. Here's exactly what each one measures.
        </p>

        <h3 className="text-[14px] mb-2" style={{ fontWeight: 600 }}>
          Difficulty — easy / medium / hard
        </h3>
        <p className="text-[14px] ink-2 leading-[1.65] max-w-[60ch] mb-2">
          Reflects how many steps the cancellation process takes, regardless of intent.
        </p>
        <div className="space-y-2 mb-8">
          {[
            { label: 'Easy', color: 'var(--c-easy)', desc: '1–3 steps, fully self-serve, no retention screens.' },
            { label: 'Medium', color: '#f59e0b', desc: '4–7 steps, may include a retention offer or require navigating account settings.' },
            { label: 'Hard', color: 'var(--c-hard)', desc: '8+ steps, or requires contacting support, calling, or visiting in person.' },
          ].map(({ label, color, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <span
                className="text-[12px] px-2 py-[2px] rounded-full shrink-0 mt-[1px]"
                style={{ background: color, color: '#fff', fontWeight: 600 }}
              >
                {label}
              </span>
              <span className="text-[14px] ink-2 leading-[1.55]">{desc}</span>
            </div>
          ))}
        </div>

        <h3 className="text-[14px] mb-2" style={{ fontWeight: 600 }}>
          Dark pattern score — 0 to 10
        </h3>
        <p className="text-[14px] ink-2 leading-[1.65] max-w-[60ch] mb-3">
          Measures intentional friction — tactics the service uses to discourage you from leaving, independent of how many steps there are.
        </p>
        <div className="space-y-[10px] mb-4">
          {[
            { flag: 'Hidden cancel button', desc: 'The cancel option is buried, unlabelled, or accessible only via a non-obvious path.' },
            { flag: 'Requires phone call', desc: 'No self-serve cancel — you must call support, often with long hold times.' },
            { flag: 'Requires live chat', desc: 'Cancellation is gated behind a chat conversation with a retention agent.' },
            { flag: 'Retention tactics', desc: 'Service shows guilt-trip offers, countdown timers, or "pause instead" pop-ups before confirming.' },
            { flag: 'Confirmation shaming', desc: 'Cancel confirmation screen uses manipulative language (e.g. "No thanks, I want to keep losing money").' },
            { flag: 'Refund opacity', desc: 'Refund eligibility is unclear, buried in ToS, or simply absent.' },
          ].map(({ flag, desc }) => (
            <div key={flag} className="border-l-2 pl-3" style={{ borderColor: 'var(--rule-strong)' }}>
              <p className="text-[13px] ink" style={{ fontWeight: 500 }}>{flag}</p>
              <p className="text-[13px] ink-3 leading-[1.5]">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-[13px] ink-3 leading-[1.5] max-w-[55ch]">
          Each flag that applies adds roughly 1–2 points. Scores are set manually after going through the cancellation flow, and are updated when a service changes its process.
        </p>
      </section>

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
