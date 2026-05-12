import { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { allGuides, guidesByCategory } from '@/data/guides'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { SearchBar } from '@/components/SearchBar'
import { DifficultyBadge } from '@/components/DifficultyBadge'
import { WaitlistForm } from '@/components/WaitlistForm'
import { BrandLogo } from '@/components/BrandLogo'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: 'CancelHub — How to Cancel Any Subscription',
    description: t('subtitle'),
    alternates: {
      canonical: canonicalUrl('/', locale),
      languages: hreflangAlternates('/'),
    },
  }
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'home' })
  const categories = Object.entries(guidesByCategory).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-14">
        <h1
          className="text-[40px] sm:text-[44px] leading-[1.05] mb-5 text-balance"
          style={{ fontWeight: 500, letterSpacing: '-0.02em' }}
        >
          {t('title')}
        </h1>
        <p className="text-[16px] ink-2 leading-[1.55] max-w-[34ch] mb-10">
          {t('subtitle')}
        </p>

        <SearchBar guides={allGuides} locale={locale} />

        <p className="text-[12px] ink-3 mt-3">
          {allGuides.length} {t('statsGuides').toLowerCase()} ·{' '}
          <a href="#dark-patterns" className="underline underline-offset-2 hover:ink transition-colors">
            {t('darkPatternBadge').toLowerCase()}
          </a>
        </p>
      </section>

      {/* Guides */}
      <section id="guides" className="max-w-3xl mx-auto px-6 pb-20">
        {categories.map(([category, guides], idx) => (
          <div key={category} className={idx === 0 ? '' : 'mt-12'}>
            <h2 className="text-[11px] ink-3 uppercase mb-2" style={{ letterSpacing: '0.18em' }}>
              {category}
            </h2>
            <div>
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${locale}/cancel/${guide.slug}`}
                  className="group grid items-center gap-5 py-[14px] border-b border-rule hover:opacity-90 transition-opacity"
                  style={{ gridTemplateColumns: '24px 1fr auto 20px' }}
                >
                  <BrandLogo slug={guide.slug} alt={guide.service} size={20} />
                  <span className="text-[15px] ink truncate">{guide.service}</span>
                  <DifficultyBadge difficulty={guide.difficulty} shortLabel />
                  <span className="ink-3 text-[14px] opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Dark patterns — inline essay note instead of red banner */}
      <section id="dark-patterns" className="border-y border-rule">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p
            className="text-[11px] ink-3 uppercase mb-3"
            style={{ letterSpacing: '0.18em' }}
          >
            {t('darkPatternBadge')}
          </p>
          <p className="text-[16px] ink-2 leading-[1.6] max-w-[60ch]">
            {t('darkPatternDesc')}
          </p>
          <Link
            href={`/${locale}/cancel`}
            className="inline-block mt-5 text-[13px] ink hover:opacity-80 transition-opacity"
            style={{ borderBottom: '1px solid currentColor', paddingBottom: 2 }}
          >
            {t('darkPatternLink')}
          </Link>
        </div>
      </section>

      {/* Waitlist — same paper, separated by hairline */}
      <section id="about" className="max-w-3xl mx-auto px-6 py-16">
        <p
          className="text-[11px] ink-3 uppercase mb-3"
          style={{ letterSpacing: '0.18em' }}
        >
          {t('waitlistTitle')}
        </p>
        <h2
          className="text-[22px] mb-3"
          style={{ fontWeight: 500, letterSpacing: '-0.012em' }}
        >
          {t('waitlistTitle')}
        </h2>
        <p className="text-[14px] ink-2 leading-[1.6] max-w-[48ch] mb-6">
          {t('waitlistDesc')}
        </p>
        <WaitlistForm />
      </section>
    </div>
  )
}
