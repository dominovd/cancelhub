'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CancelGuide } from '@/types/guide'
import { BrandLogo } from './BrandLogo'

interface SearchBarProps {
  guides: CancelGuide[]
  locale: string
}

export function SearchBar({ guides, locale }: SearchBarProps) {
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
        className="w-full bg-transparent ink text-[15px] py-3 border-0 border-b border-rule-strong focus:outline-none focus:border-[var(--ink)] transition-colors placeholder:ink-3"
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
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-paper-2 text-left transition-colors border-b border-rule last:border-0"
            >
              <BrandLogo slug={g.slug} alt={g.service} size={18} />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] ink truncate" style={{ fontWeight: 500 }}>
                  {t('resultLabel', { service: g.service })}
                </p>
                <p className="text-[12px] ink-3">{g.category}</p>
              </div>
              <span className="ink-3 text-[14px]">→</span>
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
