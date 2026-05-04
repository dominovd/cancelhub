import Link from 'next/link'
import { LanguageSwitcher } from './LanguageSwitcher'

interface HeaderProps {
  locale?: string
}

export function Header({ locale = 'en' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-gray-900 hover:opacity-80 transition-opacity">
          <span className="text-xl">✂️</span>
          <span>CancelHub</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden sm:flex items-center gap-4 text-sm text-gray-600 mr-2">
            <Link href={`/${locale}/cancel`} className="hover:text-gray-900 transition-colors">All Guides</Link>
          </nav>
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </header>
  )
}
