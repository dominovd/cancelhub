import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from './LanguageSwitcher'
import { defaultLocale } from '@/config/i18n'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = defaultLocale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' })
  const guidesHref = locale === defaultLocale ? '/cancel' : `/${locale}/cancel`

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-gray-900 hover:opacity-80 transition-opacity">
          <span className="text-xl">✂️</span>
          <span>CancelHub</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-600 mr-2">
            <Link href={guidesHref} className="hover:text-gray-900 transition-colors">
              {t('allGuides')}
            </Link>
          </nav>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  )
}
