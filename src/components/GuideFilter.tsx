'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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
}

function diffPillClass(d: 'easy' | 'medium' | 'hard'): string {
  return d === 'easy' ? 'pill pill-easy' : d === 'medium' ? 'pill pill-med' : 'pill pill-hard'
}

export function GuideFilter({ guides, locale }: GuideFilterProps) {
  const t = useTranslations('guides')
  const tDiff = useTranslations('difficulty')

  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<string>('all')
  const [activeDiffs, setActiveDiffs] = useState<Set<'easy' | 'medium' | 'hard'>>(new Set())

  const allCats = useMemo(() => {
    const seen = new Set<string>()
    for (const g of guides) seen.add(g.category)
    return Array.from(seen).sort()
  }, [guides])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guides.filter((g) => {
      if (activeCat !== 'all' && g.category !== activeCat) return false
      if (activeDiffs.size > 0 && !activeDiffs.has(g.difficulty)) return false
      if (q) {
        return (
          g.service.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [guides, query, activeCat, activeDiffs])

  const groups = useMemo(() => {
    const map = new Map<string, Guide[]>()
    for (const g of filtered) {
      if (!map.has(g.category)) map.set(g.category, [])
      map.get(g.category)!.push(g)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const toggleDiff = (d: 'easy' | 'medium' | 'hard') => {
    setActiveDiffs((prev) => {
      const next = new Set(prev)
      if (next.has(d)) next.delete(d)
      else next.add(d)
      return next
    })
  }

  const diffShort = (d: 'easy' | 'medium' | 'hard') =>
    d === 'easy' ? tDiff('easyShort') : d === 'medium' ? tDiff('medShort') : tDiff('hardShort')

  return (
    <>
      {/* Search */}
      <div className="relative" style={{ maxWidth: 560, margin: '22px 0 8px' }}>
        <span
          className="absolute left-[16px] top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--ink-3)' }}
          aria-hidden="true"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a service…"
          className="w-full"
          style={{
            padding: '14px 18px 14px 46px',
            fontFamily: 'inherit',
            fontSize: 15,
            border: '1px solid var(--line)',
            borderRadius: 13,
            background: 'var(--card)',
            color: 'var(--ink)',
            boxShadow: 'var(--shadow)',
            outline: 'none',
          }}
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-[10px] flex-wrap" style={{ margin: '18px 0 6px' }}>
        <button
          className={`chip ${activeCat === 'all' ? 'on' : ''}`}
          onClick={() => setActiveCat('all')}
        >
          All
        </button>
        {allCats.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCat === cat ? 'on' : ''}`}
            onClick={() => setActiveCat((prev) => (prev === cat ? 'all' : cat))}
          >
            {cat}
          </button>
        ))}

        <div className="flex gap-[5px] items-center ml-auto" style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
          <button
            className={`dchip easy ${activeDiffs.has('easy') ? 'on' : ''}`}
            onClick={() => toggleDiff('easy')}
            aria-pressed={activeDiffs.has('easy')}
          >
            {diffShort('easy')}
          </button>
          <button
            className={`dchip med ${activeDiffs.has('medium') ? 'on' : ''}`}
            onClick={() => toggleDiff('medium')}
            aria-pressed={activeDiffs.has('medium')}
          >
            {diffShort('medium')}
          </button>
          <button
            className={`dchip hard ${activeDiffs.has('hard') ? 'on' : ''}`}
            onClick={() => toggleDiff('hard')}
            aria-pressed={activeDiffs.has('hard')}
          >
            {diffShort('hard')}
          </button>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: '14px 0 16px' }}>
        {t('countShown', { count: filtered.length, total: guides.length })}
      </p>

      {/* Groups */}
      {groups.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--ink-3)', padding: '40px 0', textAlign: 'center' }}>
          No results for &ldquo;{query}&rdquo;
        </p>
      ) : (
        groups.map(([category, items]) => (
          <div key={category} style={{ marginBottom: 30 }}>
            <div
              className="flex items-baseline gap-[9px]"
              style={{
                paddingBottom: 7,
                marginBottom: 11,
                borderBottom: '1px solid var(--line)',
              }}
            >
              <h2
                className="font-serif-display"
                style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}
              >
                {category}
              </h2>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--ink-3)',
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  padding: '1px 8px',
                  borderRadius: 999,
                }}
              >
                {items.length}
              </span>
            </div>

            <div
              className="grid gap-[10px]"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(228px, 1fr))' }}
            >
              {items.map((g) => (
                <Link key={g.slug} href={`/${locale}/cancel/${g.slug}`} className="gcard">
                  <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={42} />
                  <div className="min-w-0 flex-1">
                    <div
                      style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }}
                      className="truncate"
                    >
                      {g.service}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{g.category}</div>
                  </div>
                  <span className={diffPillClass(g.difficulty)} style={{ flexShrink: 0 }}>
                    {diffShort(g.difficulty)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  )
}
