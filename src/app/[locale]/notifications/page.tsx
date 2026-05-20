import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { canonicalUrl, hreflangAlternates } from '@/config/seo'
import { locales } from '@/config/i18n'
import { NotificationsClient } from '@/components/dashboard/NotificationsClient'
import { getDashboardSnapshot } from '@/lib/dashboard/queries'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const path = '/notifications'
  return {
    title: 'Notification settings — CancelHub',
    description:
      'Control when CancelHub pings you. Trial-ending alerts, renewal reminders, price changes, and idle-subscription nudges.',
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
    robots: { index: false, follow: false },
  }
}

export default async function NotificationsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const snapshot = await getDashboardSnapshot()

  return (
    <div className="max-w-[880px] mx-auto px-[22px]">
      <NotificationsClient locale={locale} initial={snapshot} />
    </div>
  )
}
