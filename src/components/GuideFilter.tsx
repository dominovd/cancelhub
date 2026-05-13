'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { DifficultyBadge } from './DifficultyBadge'
import { DarkPatternScore } from './DarkPatternScore'
import { BrandLogo } from './BrandLogo'

interface Guide {
  slug: string
  service: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  darkPatternScore: number
}

interface GuideFilterProps {
  guides: Guide[]
  locale: string
  colService: string
  colDifficulty: string
  colDarkPatterns: string
}

export function GuideFilter({ guides, locale, colService, colDifficulty, colDarkPatterns }: GuideFilterProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return guides
    return guides.filter(
      (g) =>
        g.service.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    )
  }, [guides, query])

  return (
    <>
      {/* Filter input */}
      <div className="mb-6 relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter services…"
          className="w-full bg-transparent text-[14px] ink placeholder:ink-3 border-b border-rule focus:border-rule-strong outline-none pb-2 pr-8 transition-colors"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear filter"
            className="absolute right-0 top-0 ink-3 hover:accent transition-colors text-[16px] leading-none"
            style={{ paddingBottom: 6 }}
          >
            ×
          </button>
        )}
      </div>

      {/* Column headers */}
      <div
        className="hidden sm:grid items-center gap-5 pb-3 border-b border-rule-strong text-[11px] ink-3 uppercase grid-cols-[24px_1fr_auto_auto_20px]"
        style={{ letterSpacing: '0.18em' }}
      >
        <span />
        <span>{colService}</span>
        <span>{colDifficulty}</span>
        <span className="text-right">{colDarkPatterns}</span>
        <span />
      </div>

      {/* Rows */}
      <div>
        {filtered.length === 0 ? (
          <p className="text-[14px] ink-3 py-10 text-center">No results for &ldquo;{query}&rdquo;</p>
        ) : (
          filtered.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${locale}/cancel/${guide.slug}`}
              className="group grid items-center gap-5 py-[14px] border-b border-rule transition-colors grid-cols-[24px_1fr_auto_20px] sm:grid-cols-[24px_1fr_auto_auto_20px]"
            >
              <BrandLogo slug={guide.slug} service={guide.service} alt={guide.service} size={22} />
              <div className="min-w-0">
                <p className="text-[15px] ink truncate group-hover:accent transition-colors">
                  {guide.service}
                </p>
                <p className="text-[11px] ink-3 truncate sm:hidden">
                  {guide.category}
                </p>
              </div>
              <DifficultyBadge difficulty={guide.difficulty} shortLabel />
              <div className="hidden sm:block">
                <DarkPatternScore score={guide.darkPatternScore} />
              </div>
              <span className="text-[14px] ink-3 opacity-50 group-hover:opacity-100 group-hover:accent transition-all">→</span>
            </Link>
          ))
        )}
      </div>

      {/* Count */}
      {query && (
        <p className="text-[12px] ink-3 mt-4">
          {filtered.length} of {guides.length} services
        </p>
      )}
    </>
  )
}
