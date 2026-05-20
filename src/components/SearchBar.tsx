'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CancelGuide } from '@/types/guide'
import { BrandLogo } from './BrandLogo'

interface SearchBarProps {
  guides: CancelGuide[]
  locale: string
  /**
   * Visual variant. "underline" = the legacy minimal underline input.
   * "warm" = the cream pill input from the v5 design system (rounded card
   * with magnifier on the left, used on home + /cancel hero).
   */
  variant?: 'underline' | 'warm'
}

function MagnifierIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  )
}

export function SearchBar({ guides, locale, variant = 'underline' }: SearchBarProps) {
  const t = useTranslations('search')
  const tHome = useTranslations('home')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const results = query.length > 1
    ? guides
        .filter((g) =>
          g.service.toLowerCase().includes(query.toLowerCase()) ||
          g.category.toLowerCase().includes(query.toLowerCase()) ||
          g.tags.some((tag) => tag.includes(query.toLowerCase()))
        )
        .slice(0, 6)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Warm pill variant ─────────────────────────────────────────────────────
  if (variant === 'warm') {
    return (
      <div ref={ref} className="relative w-full">
        <div className="relative">
          <span
            className="absolute left-[17px] top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--ink-3)' }}
          >
            <MagnifierIcon />
          </span>
          <input
            type="text"
            placeholder={tHome('searchPlaceholder')}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            aria-label={tHome('searchPlaceholder')}
            className="w-full"
            style={{
              padding: '16px 18px 16px 48px',
              fontFamily: 'inherit',
              fontSize: 15,
              border: '1px solid var(--line)',
              borderRadius: 14,
              background: 'var(--card)',
              color: 'var(--ink)',
              boxShadow: 'var(--shadow)',
              outline: 'none',
              transition: 'border-color .15s ease',
            }}
            onFocusCapture={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
          />
        </div>

        {open && results.length > 0 && (
          <div
            className="absolute top-full mt-3 w-full z-50 overflow-hidden"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 13,
              boxShadow: 'var(--shadow-lg)',
              textAlign: 'left',
            }}
          >
            {results.map((g) => (
              <button
                key={g.slug}
                onClick={() => {
                  router.push(`/${locale}/cancel/${g.slug}`)
                  setQuery('')
                  setOpen(false)
                }}
                className="group w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-0 transition-colors"
                style={{ borderColor: 'var(--line)' }}
              >
                <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={26} />
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>
                    {g.service}
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{g.category}</p>
                </div>
                <span className="group-hover:accent transition-colors" style={{ color: 'var(--ink-3)' }}>→</span>
              </button>
            ))}
          </div>
        )}

        {open && query.length > 1 && results.length === 0 && (
          <div
            className="absolute top-full mt-3 w-full z-50 p-4 text-center"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: 13,
              boxShadow: 'var(--shadow)',
              fontSize: 13,
              color: 'var(--ink-3)',
            }}
          >
            {t('notFound', { query })}
          </div>
        )}
      </div>
    )
  }

  // ── Underline variant (legacy / minimal) ─────────────────────────────────
  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        placeholder={tHome('searchPlaceholder')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        aria-label={tHome('searchPlaceholder')}
        className="w-full bg-transparent ink text-[15px] py-3 border-0 border-b border-rule-strong focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--ink-2)]"
        style={{ borderBottomWidth: 1, borderRadius: 0 }}
      />

      {open && results.length > 0 && (
        <div className="absolute top-full mt-3 w-full bg-paper border border-rule z-50 overflow-hidden">
          {results.map((g) => (
            <button
              key={g.slug}
              onClick={() => {
                router.push(`/${locale}/cancel/${g.slug}`)
                setQuery('')
                setOpen(false)
              }}
              className="group w-full flex items-center gap-3 px-4 py-3 hover:bg-paper-2 text-left transition-colors border-b border-rule last:border-0"
            >
              <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={20} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] ink truncate" style={{ fontWeight: 500 }}>
                  {t('resultLabel', { service: g.service })}
                </p>
                <p className="text-[12px] ink-2">{g.category}</p>
              </div>
              <span className="text-[14px] ink-3 group-hover:accent transition-colors">→</span>
            </button>
          ))}
        </div>
      )}

      {open && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full mt-3 w-full bg-paper border border-rule z-50 p-4 text-[13px] ink-2 text-center">
          {t('notFound', { query })}
        </div>
      )}
    </div>
  )
}
