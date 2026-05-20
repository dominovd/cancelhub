'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Subscription } from '@/types/dashboard'
import { allGuides } from '@/data/guides'
import { BrandLogo } from '@/components/BrandLogo'

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (sub: Omit<Subscription, 'id' | 'createdAt'>) => void
}

function tomorrowISO(): string {
  const d = new Date()
  d.setDate(d.getDate() + 30)
  return d.toISOString().slice(0, 10)
}

export function AddSubscriptionDialog({ open, onClose, onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [guideSlug, setGuideSlug] = useState<string | undefined>(undefined)
  const [category, setCategory] = useState('')
  const [monthlyPrice, setMonthlyPrice] = useState('')
  const [nextChargeDate, setNextChargeDate] = useState(tomorrowISO())
  const [isTrial, setIsTrial] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setName('')
      setGuideSlug(undefined)
      setCategory('')
      setMonthlyPrice('')
      setNextChargeDate(tomorrowISO())
      setIsTrial(false)
      setShowSuggestions(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const suggestions = useMemo(() => {
    if (!name.trim()) return []
    const q = name.toLowerCase()
    return allGuides
      .filter((g) => g.service.toLowerCase().includes(q) || g.tags.some((t) => t.includes(q)))
      .slice(0, 5)
  }, [name])

  const pickGuide = (slug: string) => {
    const g = allGuides.find((x) => x.slug === slug)
    if (!g) return
    setName(g.service)
    setGuideSlug(g.slug)
    setCategory(g.category)
    setShowSuggestions(false)
  }

  if (!open) return null

  const canSubmit = name.trim().length > 0 && Number(monthlyPrice) > 0

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const guide = guideSlug ? allGuides.find((g) => g.slug === guideSlug) : undefined
    onAdd({
      name: name.trim(),
      guideSlug,
      category: category.trim() || (guide?.category ?? 'Other'),
      monthlyPrice: Number(monthlyPrice),
      currency: 'USD',
      nextChargeDate,
      trialEndsOn: isTrial ? nextChargeDate : undefined,
      difficulty: guide?.difficulty,
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-sub-title"
      onClick={onClose}
      className="modal-overlay"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{
          background: 'var(--card)',
          borderRadius: 18,
          padding: '24px 26px 22px',
          maxWidth: 480,
          width: '100%',
          boxShadow: '0 24px 60px -20px rgba(20, 17, 14, 0.45)',
          border: '1px solid var(--line)',
        }}
      >
        <div className="flex items-baseline justify-between mb-[18px]">
          <h2
            id="add-sub-title"
            className="font-serif-display"
            style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.015em' }}
          >
            Add a subscription
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
              color: 'var(--ink-3)',
              fontSize: 22,
              padding: 4,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <label style={fieldLabel}>Service name</label>
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setGuideSlug(undefined)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Netflix, your gym, that random PDF tool…"
            style={fieldInput}
            autoComplete="off"
            required
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                background: 'var(--card)',
                border: '1px solid var(--line)',
                borderRadius: 12,
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1,
                overflow: 'hidden',
              }}
            >
              {suggestions.map((g) => (
                <button
                  key={g.slug}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    pickGuide(g.slug)
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'transparent',
                    border: 0,
                    borderBottom: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <BrandLogo slug={g.slug} service={g.service} alt={g.service} size={28} />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{g.service}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{g.category}</div>
                  </div>
                  <span
                    className={
                      g.difficulty === 'easy'
                        ? 'pill pill-easy'
                        : g.difficulty === 'medium'
                          ? 'pill pill-med'
                          : 'pill pill-hard'
                    }
                  >
                    {g.difficulty === 'easy' ? 'Easy' : g.difficulty === 'medium' ? 'Medium' : 'Hard'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        {guideSlug && (
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              color: 'var(--green)',
              fontWeight: 500,
            }}
          >
            ✓ linked to our guide for {name}
          </div>
        )}

        <div className="grid grid-cols-2 gap-[12px] mt-[16px]">
          <div>
            <label style={fieldLabel}>Monthly price</label>
            <input
              type="number"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(e.target.value)}
              placeholder="14.99"
              step="0.01"
              min="0"
              style={fieldInput}
              required
            />
          </div>
          <div>
            <label style={fieldLabel}>Next charge</label>
            <input
              type="date"
              value={nextChargeDate}
              onChange={(e) => setNextChargeDate(e.target.value)}
              style={fieldInput}
              required
            />
          </div>
        </div>

        <div className="mt-[14px]">
          <label style={fieldLabel}>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Streaming · Fitness · Software · …"
            style={fieldInput}
          />
        </div>

        <label
          className="mt-[14px] flex items-center gap-[8px]"
          style={{ fontSize: 13.5, color: 'var(--ink-2)', cursor: 'pointer' }}
        >
          <input
            type="checkbox"
            checked={isTrial}
            onChange={(e) => setIsTrial(e.target.checked)}
            style={{ accentColor: 'var(--accent)' }}
          />
          This is a free trial — bill starts on the date above
        </label>

        <div className="flex items-center justify-end gap-[8px] mt-[20px]">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-dark" disabled={!canSubmit} style={{ opacity: canSubmit ? 1 : 0.5 }}>
            Add subscription
          </button>
        </div>
      </form>
    </div>
  )
}

const fieldLabel: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  color: 'var(--ink-3)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: 5,
}

const fieldInput: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  border: '1px solid var(--line)',
  borderRadius: 10,
  background: 'var(--paper)',
  fontFamily: 'inherit',
  fontSize: 14,
  color: 'var(--ink)',
  outline: 'none',
}
