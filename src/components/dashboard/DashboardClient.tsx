'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useDashboard, type DashboardInitial } from '@/lib/dashboard/use-dashboard'
import type { Subscription } from '@/types/dashboard'
import { BrandLogo } from '@/components/BrandLogo'
import { AddSubscriptionDialog } from './AddSubscriptionDialog'
import { LegacyImportPrompt } from './LegacyImportPrompt'

interface Props {
  locale: string
  initial: DashboardInitial
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const MS_PER_DAY = 86_400_000

function daysFromNow(iso: string): number {
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''))
  return Math.round((d.getTime() - Date.now()) / MS_PER_DAY)
}

function isoDate(iso: string): Date {
  return new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''))
}

function formatRelative(iso: string): string {
  const d = daysFromNow(iso)
  if (d === 0) return 'today'
  if (d === 1) return 'tomorrow'
  if (d > 1 && d < 14) return `in ${d} days`
  return isoDate(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtMoney(value: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)
  } catch {
    return `$${value.toFixed(2)}`
  }
}

function diffPill(d?: 'easy' | 'medium' | 'hard'): { cls: string; label: string } | null {
  if (!d) return null
  if (d === 'easy') return { cls: 'pill pill-easy', label: 'Easy' }
  if (d === 'medium') return { cls: 'pill pill-med', label: 'Medium' }
  return { cls: 'pill pill-hard', label: 'Hard' }
}

function daysIdle(sub: Subscription): number | null {
  if (!sub.lastUsedDate) return null
  return Math.max(0, Math.round((Date.now() - isoDate(sub.lastUsedDate).getTime()) / MS_PER_DAY))
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function SubRow({ sub, onRemove }: { sub: Subscription; onRemove: () => void }) {
  const days = daysFromNow(sub.nextChargeDate)
  const isTrial = !!sub.trialEndsOn
  const pill = diffPill(sub.difficulty)
  const idle = daysIdle(sub)

  return (
    <div className={`sub-row${isTrial ? ' trial-row' : ''}`}>
      <BrandLogo
        slug={sub.guideSlug ?? sub.name.toLowerCase()}
        service={sub.name}
        alt={sub.name}
        size={42}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 14.5 }}>
          <span className="truncate">{sub.name}</span>
          {isTrial && <span className="pill pill-trial">Trial · ends {formatRelative(sub.trialEndsOn!)}</span>}
          {!isTrial && pill && <span className={pill.cls}>{pill.label}</span>}
          {idle !== null && idle > 30 && <span className="pill pill-idle">{idle}d idle</span>}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>{sub.category}</div>
      </div>
      <div className="text-right" style={{ flexShrink: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14.5, fontFamily: 'var(--font-serif)' }}>
          {fmtMoney(sub.monthlyPrice, sub.currency)}
        </div>
        <div
          style={{
            fontSize: 12,
            color: days <= 3 ? 'var(--accent)' : 'var(--ink-3)',
            fontWeight: days <= 3 ? 600 : 400,
          }}
        >
          {formatRelative(sub.nextChargeDate)}
        </div>
      </div>
      {sub.guideSlug ? (
        <Link href={`/cancel/${sub.guideSlug}`} className="btn-cancel">
          How to cancel →
        </Link>
      ) : (
        <span className="btn-cancel" style={{ opacity: 0.5, cursor: 'default' }}>
          No guide yet
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        style={{
          background: 'transparent',
          border: 0,
          color: 'var(--ink-4)',
          cursor: 'pointer',
          fontSize: 18,
          padding: '4px 6px',
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function DashboardClient({ locale }: Props) {
  const t = useTranslations('dashboard')
  const store = useDashboard()
  const [adding, setAdding] = useState(false)

  // Derived data
  const totals = useMemo(() => {
    const monthly = store.subs.reduce((sum, s) => sum + s.monthlyPrice, 0)
    return {
      monthly,
      yearly: monthly * 12,
      count: store.subs.length,
      trials: store.subs.filter((s) => !!s.trialEndsOn).length,
    }
  }, [store.subs])

  const upcoming = useMemo(() => {
    return [...store.subs]
      .filter((s) => daysFromNow(s.nextChargeDate) >= 0)
      .sort((a, b) => daysFromNow(a.nextChargeDate) - daysFromNow(b.nextChargeDate))
  }, [store.subs])

  const endingSoon = useMemo(() => {
    return upcoming.filter((s) => !!s.trialEndsOn && daysFromNow(s.trialEndsOn!) <= 7)
  }, [upcoming])

  const idleSubs = useMemo(() => {
    return store.subs
      .map((s) => ({ sub: s, idle: daysIdle(s) }))
      .filter((x) => x.idle !== null && x.idle! > 30)
      .map((x) => x.sub)
  }, [store.subs])

  const insights = useMemo(() => {
    const out: { type: 'urgent' | 'idle' | 'neutral'; title: string; body: string }[] = []
    if (endingSoon.length > 0) {
      const total = endingSoon.reduce((s, x) => s + x.monthlyPrice, 0)
      out.push({
        type: 'urgent',
        title: `${endingSoon.length} ${endingSoon.length === 1 ? 'trial ends' : 'trials end'} soon`,
        body: `${endingSoon.map((s) => s.name).join(' · ')}. You'll be charged ${fmtMoney(total)} unless you cancel.`,
      })
    }
    if (idleSubs.length > 0) {
      const top = idleSubs[0]
      const days = daysIdle(top)
      out.push({
        type: 'idle',
        title: `${top.name} — ${days} days idle`,
        body: `No activity recently. Worth ${fmtMoney(top.monthlyPrice)}/mo to you?`,
      })
    }
    if (totals.count > 0 && out.length < 3) {
      out.push({
        type: 'neutral',
        title: 'Your subscriptions look healthy',
        body: `${totals.count} active · ${fmtMoney(totals.monthly)}/mo total. Nothing urgent.`,
      })
    }
    return out.slice(0, 3)
  }, [endingSoon, idleSubs, totals])

  // 14-day timeline data
  const timeline = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      const iso = date.toISOString().slice(0, 10)
      const charges = store.subs.filter((s) => s.nextChargeDate === iso)
      return {
        date,
        iso,
        isToday: i === 0,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        charges,
        total: charges.reduce((sum, c) => sum + c.monthlyPrice, 0),
      }
    })
  }, [store.subs])

  const upcomingTotal = useMemo(
    () => timeline.reduce((sum, day) => sum + day.total, 0),
    [timeline],
  )

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const map = new Map<string, number>()
    for (const s of store.subs) {
      map.set(s.category, (map.get(s.category) ?? 0) + s.monthlyPrice)
    }
    return Array.from(map.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  }, [store.subs])

  const maxCategoryAmount = categoryBreakdown[0]?.amount ?? 1

  if (!store.ready) {
    // SSR / first paint — render a minimal skeleton so the layout doesn't jump.
    return (
      <div style={{ minHeight: 400, color: 'var(--ink-3)', textAlign: 'center', padding: 60 }}>
        Loading your dashboard…
      </div>
    )
  }

  if (store.subs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0 60px' }}>
        <h2
          className="font-serif-display"
          style={{ fontWeight: 600, fontSize: 28, letterSpacing: '-0.018em', marginBottom: 8 }}
        >
          No subscriptions tracked yet.
        </h2>
        <p style={{ color: 'var(--ink-3)', fontSize: 15, maxWidth: '44ch', margin: '0 auto 22px' }}>
          Add anything that bills you each month and we&apos;ll remind you before the next charge.
        </p>
        <button type="button" className="btn-dark" onClick={() => setAdding(true)}>
          ＋ Add your first subscription
        </button>
        <AddSubscriptionDialog
          open={adding}
          onClose={() => setAdding(false)}
          onAdd={(sub) => {
            store.addSubscription(sub)
            setAdding(false)
          }}
        />
      </div>
    )
  }

  return (
    <>
      {/* ── PAGE HEADER ── */}
      <div className="flex items-end justify-between gap-4 flex-wrap" style={{ padding: '30px 0 6px' }}>
        <div>
          <h1
            className="font-serif-display"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(26px, 4.5vw, 34px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Hey there — you have{' '}
            <em
              className="font-serif-display"
              style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}
            >
              {totals.count} active
            </em>{' '}
            {totals.count === 1 ? 'sub' : 'subs'}
          </h1>
          <div style={{ color: 'var(--ink-3)', fontSize: 14, marginTop: 3 }}>
            {totals.trials > 0
              ? `${totals.trials} ${totals.trials === 1 ? 'trial' : 'trials'} ending soon`
              : 'No trials right now'}
            {' · '}
            <Link href={`/${locale}/notifications`} className="hover:accent transition-colors">
              notification settings →
            </Link>
          </div>
        </div>
        <button type="button" className="btn-dark" onClick={() => setAdding(true)}>
          ＋ Add subscription
        </button>
      </div>

      {/* ── HERO STAT CARD ── */}
      <div className="dark-card mt-[14px]">
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#a59e8c',
            fontWeight: 600,
          }}
        >
          You&apos;re spending
        </div>
        <div
          className="font-serif-display"
          style={{
            fontWeight: 600,
            fontSize: 'clamp(40px, 8vw, 62px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginTop: 8,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>$</span>
          {totals.monthly.toFixed(2)}
          <span style={{ fontSize: 22, color: '#a59e8c', fontWeight: 400 }}> / month</span>
        </div>
        <div className="flex flex-wrap gap-[22px] mt-[18px]" style={{ fontSize: 12.5, color: '#a59e8c' }}>
          <div>
            Per year
            <div
              className="font-serif-display"
              style={{ color: 'var(--paper)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 1 }}
            >
              {fmtMoney(totals.yearly)}
            </div>
          </div>
          <div>
            Active subscriptions
            <div
              className="font-serif-display"
              style={{ color: 'var(--paper)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 1 }}
            >
              {totals.count}
            </div>
          </div>
          <div>
            Trials ending soon
            <div
              className="font-serif-display"
              style={{ color: totals.trials > 0 ? '#f0a878' : 'var(--paper)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginTop: 1 }}
            >
              {totals.trials}
            </div>
          </div>
        </div>
      </div>

      {/* ── INSIGHTS ── */}
      {insights.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-[10px] mt-[14px]">
          {insights.map((ins, i) => (
            <div
              key={i}
              className={`insight insight-${ins.type}`}
              style={{
                background:
                  ins.type === 'urgent' ? 'var(--accent-soft)' :
                  ins.type === 'idle' ? 'var(--green-soft)' : 'var(--card)',
                border: '1px solid ' + (
                  ins.type === 'urgent' ? 'var(--accent-border)' :
                  ins.type === 'idle' ? 'var(--green-border)' : 'var(--line)'
                ),
                borderRadius: 14,
                padding: '14px 16px',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                gap: 11,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  background: ins.type === 'urgent' ? 'var(--accent)' : ins.type === 'idle' ? 'var(--green)' : 'var(--card)',
                  border: ins.type === 'neutral' ? '1px solid var(--line)' : undefined,
                  color: ins.type === 'neutral' ? 'var(--ink-3)' : '#fff',
                  fontWeight: 700,
                }}
              >
                {ins.type === 'urgent' ? '!' : ins.type === 'idle' ? '✓' : '◐'}
              </div>
              <div
                className="insight-body"
                style={{
                  fontSize: 12,
                  color:
                    ins.type === 'urgent'
                      ? 'var(--accent-deep)'
                      : ins.type === 'idle'
                        ? 'var(--green-deep)'
                        : 'var(--ink-3)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                <div
                  className="font-serif-display insight-title"
                  style={{
                    color:
                      ins.type === 'urgent'
                        ? 'var(--accent-deeper)'
                        : ins.type === 'idle'
                          ? 'var(--green-deeper)'
                          : 'var(--ink)',
                    fontSize: 14.5,
                    fontWeight: 600,
                    letterSpacing: '-0.005em',
                    marginBottom: 1,
                  }}
                >
                  {ins.title}
                </div>
                {ins.body}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* sub-row right column wrapper for mobile flex-wrap */}
      {/* (intentional empty marker — styles live in globals .sub-row) */}

      {/* ── TIMELINE ── */}
      <div className="flex items-baseline gap-[9px] mt-[32px] mb-[12px]">
        <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>
          Upcoming charges
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
          Next 14 days
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-3)' }}>
          Total{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
            {fmtMoney(upcomingTotal)}
          </strong>{' '}
          incoming
        </span>
      </div>

      <div
        className="card-warm"
        style={{ padding: '18px 20px 16px' }}
      >
        <div className="timeline-grid">
          {timeline.map((day) => {
            const hasTrial = day.charges.some((c) => !!c.trialEndsOn)
            return (
              <div
                key={day.iso}
                title={day.charges.map((c) => `${c.name} ${fmtMoney(c.monthlyPrice)}`).join(', ')}
                style={{
                  height: 74,
                  borderRadius: 7,
                  background: hasTrial ? 'var(--accent-soft)' : 'var(--paper)',
                  border: `1px solid ${day.isToday ? 'var(--ink)' : hasTrial ? 'var(--accent-border)' : 'var(--line)'}`,
                  borderWidth: day.isToday ? 1.5 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: day.isToday ? 'var(--ink)' : day.isWeekend ? '#9a937e' : 'var(--ink-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 4px 0',
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}
                >
                  {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div
                  className="font-serif-display"
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    textAlign: 'center',
                    marginTop: 1,
                    color: hasTrial ? '#7c2d12' : 'var(--ink)',
                    lineHeight: 1,
                  }}
                >
                  {day.date.getDate()}
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2px 3px 3px',
                    gap: 1,
                  }}
                >
                  {day.charges.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        height: 6,
                        borderRadius: 2,
                        background:
                          c.difficulty === 'hard' ? 'var(--hard)' :
                          c.difficulty === 'medium' ? 'var(--med)' : 'var(--green)',
                      }}
                    />
                  ))}
                </div>
                {day.total > 0 && (
                  <div
                    className="font-serif-display"
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: hasTrial ? '#7c2d12' : 'var(--ink)',
                      textAlign: 'center',
                      padding: '1px 2px 4px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {fmtMoney(day.total).replace('.00', '')}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div
          className="flex gap-[14px] mt-[14px] flex-wrap"
          style={{ fontSize: 11.5, color: 'var(--ink-3)' }}
        >
          <span className="inline-flex items-center gap-[5px]"><span style={{ width: 10, height: 10, borderRadius: 2.5, background: 'var(--green)' }} />Easy to cancel</span>
          <span className="inline-flex items-center gap-[5px]"><span style={{ width: 10, height: 10, borderRadius: 2.5, background: 'var(--med)' }} />Medium</span>
          <span className="inline-flex items-center gap-[5px]"><span style={{ width: 10, height: 10, borderRadius: 2.5, background: 'var(--hard)' }} />Hard</span>
          <span className="inline-flex items-center gap-[5px]"><span style={{ width: 10, height: 10, borderRadius: 2.5, background: 'var(--accent)' }} />Trial converting</span>
        </div>
      </div>

      {/* ── CATEGORY BREAKDOWN + NOTIFICATION PREVIEW ── */}
      <div className="grid sm:grid-cols-[1.3fr_1fr] gap-[14px] mt-[14px]">
        <div className="card-warm">
          <div className="flex justify-between items-baseline mb-[14px]">
            <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 14.5 }}>
              Where the money goes
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
              {categoryBreakdown.length} {categoryBreakdown.length === 1 ? 'category' : 'categories'} ·{' '}
              <strong className="font-serif-display" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                {fmtMoney(totals.monthly)}
              </strong>
              /mo
            </span>
          </div>
          {categoryBreakdown.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>Add subscriptions to see your spending split.</p>
          ) : (
            categoryBreakdown.map((c, i) => (
              <div
                key={c.category}
                className="grid items-center gap-[12px] py-[6px]"
                style={{ gridTemplateColumns: '140px 1fr 60px', fontSize: 13 }}
              >
                <span style={{ fontWeight: 500 }}>{c.category}</span>
                <div
                  style={{
                    height: 8,
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(c.amount / maxCategoryAmount) * 100}%`,
                      background: ['var(--accent)', '#d96b3b', '#e09060', '#e8b08b', '#f0c9b1'][i] ?? 'var(--accent)',
                      borderRadius: 999,
                      transition: 'width .6s ease',
                    }}
                  />
                </div>
                <span
                  className="font-serif-display"
                  style={{ fontWeight: 600, textAlign: 'right', fontSize: 13.5, letterSpacing: '-0.005em' }}
                >
                  {fmtMoney(c.amount)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="dark-card flex items-center gap-[14px] flex-wrap" style={{ padding: '18px 22px' }}>
          <div
            style={{
              flexShrink: 0,
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'var(--accent)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            🔔
          </div>
          <div className="flex-1 min-w-[160px]">
            <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 16 }}>
              {store.events.filter((e) => !e.read).length || 'No'} alert{store.events.filter((e) => !e.read).length === 1 ? '' : 's'} queued
            </div>
            <div style={{ fontSize: 12.5, color: '#a59e8c', marginTop: 2 }}>
              {store.settings.channels.email.enabled ? 'Email' : '—'}
              {store.settings.channels.push.enabled ? ' · push' : ''}
              {store.settings.alerts.trialEnding.enabled ? ` · ${store.settings.alerts.trialEnding.leadDays}d before trials` : ''}
            </div>
          </div>
          <Link href={`/${locale}/notifications`} className="btn-accent" style={{ padding: '9px 15px', fontSize: 13.5 }}>
            Settings →
          </Link>
        </div>
      </div>

      {/* ── ACTIVE SUBSCRIPTIONS LIST ── */}
      <div className="flex items-baseline gap-[9px] mt-[32px] mb-[12px]">
        <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em' }}>
          Active subscriptions
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
          {upcoming.length}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-3)' }}>
          Sorted by{' '}
          <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>next charge</strong>
        </span>
      </div>

      <div className="flex flex-col gap-[8px]">
        {upcoming.map((s) => (
          <SubRow key={s.id} sub={s} onRemove={() => store.removeSubscription(s.id)} />
        ))}
      </div>

      {/* ── ADD-MORE HINT ── */}
      <div
        style={{
          border: '1.5px dashed var(--line)',
          borderRadius: 14,
          padding: 16,
          textAlign: 'center',
          color: 'var(--ink-3)',
          fontSize: 13.5,
          marginTop: 14,
        }}
      >
        Most people miss <strong style={{ color: 'var(--ink)' }}>2–3 subscriptions</strong> they forgot about.{' '}
        <button
          type="button"
          onClick={() => setAdding(true)}
          style={{ color: 'var(--accent)', fontWeight: 600, background: 'transparent', border: 0, cursor: 'pointer', font: 'inherit' }}
        >
          Add another →
        </button>
      </div>

      {/* ── CLEAR ALL (dev / reset) ── */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => {
            if (confirm('Clear all subscriptions and notification history? This cannot be undone.')) {
              store.clearAll()
            }
          }}
          style={{
            fontSize: 11.5,
            color: 'var(--ink-4)',
            background: 'transparent',
            border: 0,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Reset all data
        </button>
      </div>

      <AddSubscriptionDialog
        open={adding}
        onClose={() => setAdding(false)}
        onAdd={(sub) => {
          store.addSubscription(sub)
          setAdding(false)
        }}
      />

    </>
  )
}
