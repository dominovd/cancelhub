import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
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
    <html lang={locale} dir={dir} className={geistSans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="font-sans">
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
