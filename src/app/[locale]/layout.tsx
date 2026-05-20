import type { Metadata } from 'next'
import { Fraunces, Spline_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { locales, isRtl, type Locale } from '@/config/i18n'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Editorial serif — used for h1/h2, numbers, and the brand wordmark.
// Italic 500 is the "em" accent used throughout the design system.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Body sans — humanist geometric, pairs cleanly with Fraunces.
const splineSans = Spline_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
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
  verification: {
    google: '5spKtcOz0kp7Yifnn-B9cM2R8yUdsoFwHxaJoHl5ADM',
  },
}

// Runs before paint to apply persisted theme. Avoids a light-mode flash for
// users who picked dark. Inlined so it executes synchronously.
const themeBootstrap = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={`${fraunces.variable} ${splineSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
