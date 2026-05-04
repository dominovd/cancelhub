import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@/config/i18n'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = defaultLocale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const guidesHref = locale === defaultLocale ? '/cancel' : `/${locale}/cancel`

  return (
    <footer className="border-t border-gray-100 mt-20 py-10 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <span>✂️</span> CancelHub
        </div>
        <p className="text-center">{t('tagline')}</p>
        <div className="flex gap-4">
          <Link href={guidesHref} className="hover:text-gray-900 transition-colors">
            {tNav('allGuides')}
          </Link>
          <span className="text-gray-300">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
