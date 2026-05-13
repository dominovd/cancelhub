'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/config/i18n'

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

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
    const segments = pathname.split('/')
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
        className="flex items-center gap-1.5 ink-2 hover:accent transition-colors text-[13px]"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <GlobeIcon />
        <span className="uppercase" style={{ fontWeight: 500, letterSpacing: '0.04em' }}>
          {currentLocale}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 overflow-hidden overflow-y-auto"
          style={{
            marginTop: 8,
            width: 200,
            maxHeight: 320,
            background: 'var(--header-bg, var(--bg))',
            border: '1px solid var(--rule-strong)',
            borderRadius: 6,
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}
        >
          {locales.map((locale) => {
            const isCurrent = locale === currentLocale
            return (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className="w-full text-left transition-colors"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 14px',
                  fontSize: 13,
                  color: isCurrent ? 'var(--accent)' : 'var(--ink-2)',
                  fontWeight: isCurrent ? 600 : 400,
                  background: 'transparent',
                  borderBottom: '1px solid var(--rule)',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-2)'
                }}
              >
                <span>{localeLabels[locale]}</span>
                {isCurrent && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
