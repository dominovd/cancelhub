'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { CancelGuide } from '@/types/guide'

interface SearchBarProps {
  guides: CancelGuide[]
  locale: string
}

const difficultySymbol = { easy: '✓', medium: '~', hard: '✗' }

export function SearchBar({ guides, locale }: SearchBarProps) {
  const t = useTranslations('search')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  const results = query.length > 1
    ? guides.filter((g) =>
        g.service.toLowerCase().includes(query.toLowerCase()) ||
        g.category.toLowerCase().includes(query.toLowerCase()) ||
        g.tags.some((tag) => tag.includes(query.toLowerCase()))
      ).slice(0, 6)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search any service — Netflix, Adobe, Spotify..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {results.map((g) => (
            <button
              key={g.slug}
              onClick={() => {
                router.push(`/${locale}/cancel/${g.slug}`)
                setQuery('')
                setOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors border-b border-gray-100 last:border-0"
            >
              <span className="text-xl">{g.logo}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {t('resultLabel', { service: g.service })}
                </p>
                <p className="text-xs text-gray-500">
                  {g.category} · {difficultySymbol[g.difficulty]} {g.difficulty}
                </p>
              </div>
              <span className="text-gray-300">→</span>
            </button>
          ))}
        </div>
      )}

      {open && query.length > 1 && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-xl z-50 p-4 text-sm text-gray-500 text-center">
          {t('notFound', { query })}
        </div>
      )}
    </div>
  )
}
