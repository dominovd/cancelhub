'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/config/i18n'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchLocale = (locale: Locale) => {
    // Replace current locale prefix in path
    const segments = pathname.split('/')
    // segments[1] is the current locale (or empty for default)
    const isDefaultLocale = !locales.includes(segments[1] as Locale)
    const pathWithoutLocale = isDefaultLocale ? pathname : '/' + segments.slice(2).join('/')
    const newPath = locale === 'en' ? pathWithoutLocale || '/' : `/${locale}${pathWithoutLocale}`
    router.push(newPath)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span>🌐</span>
        <span className="uppercase font-medium">{currentLocale}</span>
        <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                locale === currentLocale
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{localeLabels[locale]}</span>
              {locale === currentLocale && <span className="text-blue-500 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
