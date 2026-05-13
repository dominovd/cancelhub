import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { defaultLocale } from '@/config/i18n'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = defaultLocale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' })
  const guidesHref = locale === defaultLocale ? '/cancel' : `/${locale}/cancel`
  const rankingsHref = locale === defaultLocale ? '/rankings' : `/${locale}/rankings`
  const categoriesHref = locale === defaultLocale ? '/categories' : `/${locale}/categories`

  return (
    <header className="sticky top-0 z-50 header-bg backdrop-blur border-b border-rule">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-[15px] tracking-tight ink hover:accent transition-colors"
          style={{ fontWeight: 500 }}
        >
          CancelHub
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden sm:flex items-center gap-5 text-[13px] ink-2">
            <Link href={guidesHref} className="hover:accent transition-colors">
              {t('allGuides')}
            </Link>
            <Link href={categoriesHref} className="hover:accent transition-colors">
              Categories
            </Link>
            <Link href={rankingsHref} className="hover:accent transition-colors">
              Rankings
            </Link>
          </nav>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  )
}
