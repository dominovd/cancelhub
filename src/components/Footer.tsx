import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@/config/i18n'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = defaultLocale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  return (
    <footer className="border-t border-rule mt-20 py-10 text-[12px] ink-3">
      <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>CancelHub · independent &amp; ad-free</span>
        <p className="text-center max-w-md">{t('tagline')}</p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link href={`${prefix}/cancel`} className="hover:ink transition-colors">
            {tNav('allGuides')}
          </Link>
          <span className="ink-3 opacity-50">·</span>
          <Link href={`${prefix}/about`} className="hover:ink transition-colors">
            {t('about')}
          </Link>
          <span className="ink-3 opacity-50">·</span>
          <Link href={`${prefix}/contact`} className="hover:ink transition-colors">
            {t('contact')}
          </Link>
          <span className="ink-3 opacity-50">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
