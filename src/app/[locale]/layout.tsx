import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales, isRtl, type Locale } from '@/config/i18n'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: {
    default: 'CancelHub — How to Cancel Any Subscription',
    template: '%s | CancelHub',
  },
  description: 'Step-by-step cancellation guides for Netflix, Spotify, Adobe, and 100+ more services.',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) notFound()

  const messages = await getMessages()
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={geistSans.variable}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
