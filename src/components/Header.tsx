import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { defaultLocale } from '@/config/i18n'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = defaultLocale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' })
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  const mobileItems = [
    { href: `${prefix || '/'}`, label: t('home') },
    { href: `${prefix}/cancel`, label: t('allGuides') },
    { href: `${prefix}/categories`, label: t('categories') },
    { href: `${prefix}/rankings`, label: t('rankings') },
    { href: `${prefix}/dashboard`, label: t('trackSubs'), cta: true },
    { href: `${prefix}/notifications`, label: t('notifications') },
  ]

  return (
    <header
      className="sticky top-0 z-50 header-bg border-b border-line"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-[1000px] mx-auto px-[22px] h-14 flex items-center gap-4">
        <Link
          href={`/${locale}`}
          className="logo-mark"
          aria-label="CancelHub"
        >
          Cancel<span>Hub</span>
        </Link>

        <nav
          className="hidden sm:flex items-center gap-[18px] text-[14px] ml-6"
          style={{ color: 'var(--ink-3)', fontWeight: 500 }}
        >
          <Link href={`${prefix}/cancel`} className="hover:accent transition-colors">
            {t('allGuides')}
          </Link>
          <Link href={`${prefix}/categories`} className="hover:accent transition-colors">
            {t('categories')}
          </Link>
          <Link href={`${prefix}/rankings`} className="hover:accent transition-colors">
            {t('rankings')}
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <Link
            href={`${prefix}/dashboard`}
            className="btn-dark hidden sm:inline-flex"
            style={{ padding: '7px 13px', fontSize: 13, borderRadius: 9 }}
          >
            {t('trackSubs')}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher currentLocale={locale} />
          <MobileMenu items={mobileItems} />
        </div>
      </div>
    </header>
  )
}
