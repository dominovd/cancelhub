import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { DashboardClient } from '@/components/dashboard/DashboardClient'
import { getDashboardSnapshot } from '@/lib/dashboard/queries'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// Dashboard is per-user — never serve a cached version.
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const path = '/dashboard'
  return {
    title: 'My Subscriptions — CancelHub',
    description:
      'Track your subscriptions, see what you really spend, and get reminded before every charge — especially before free trials end.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    robots: { index: false, follow: false },
  }
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)

  // Middleware redirects unauthenticated users to /login before we get here.
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="max-w-[1000px] mx-auto px-[22px]">
      <DashboardClient locale={locale} initial={snapshot} />
    </div>
  )
}
