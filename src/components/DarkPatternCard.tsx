'use client'

import { useTranslations } from 'next-intl'
import type { DarkPatternFlags } from '@/types/guide'

// ─── Score bar ────────────────────────────────────────────────────────────────

function ScoreBar({ score }: { score: number }) {
  const t = useTranslations('darkPattern')
  const bucket = score <= 2 ? 'easy' : score <= 5 ? 'medium' : 'hard'
  const fillColor = `var(--c-${bucket})`

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 3,
              height: 14,
              background: i < score ? fillColor : 'var(--rule-strong)',
              opacity: i < score ? 1 : 0.45,
              borderRadius: 2,
            }}
          />
        ))}
      </div>
      <span
        className="text-[13px] tabular-nums"
        style={{ color: fillColor, fontWeight: 500 }}
      >
        {score}/10
      </span>
      <span className="text-[12px] ink-3">{t(score.toString())}</span>
    </div>
  )
}

// ─── Individual flag rows ─────────────────────────────────────────────────────

type FlagValue = boolean | string | number | undefined

function FlagRow({ label, value, invert = false }: { label: string; value: FlagValue; invert?: boolean }) {
  if (value === undefined) return null

  let display: React.ReactNode
  let dotColor: string

  if (typeof value === 'boolean') {
    const isBad = invert ? !value : value
    dotColor = isBad ? 'var(--c-hard)' : 'var(--c-easy)'
    display = value ? 'Yes' : 'No'
  } else if (value === 'clear') {
    dotColor = 'var(--c-easy)'
    display = 'Clear'
  } else if (value === 'murky') {
    dotColor = '#f59e0b' // amber — warning
    display = 'Murky'
  } else if (value === 'none') {
    dotColor = 'var(--c-hard)'
    display = 'None'
  } else if (typeof value === 'number') {
    dotColor = value <= 3 ? 'var(--c-easy)' : value <= 10 ? '#f59e0b' : 'var(--c-hard)'
    display = `~${value} min`
  } else {
    dotColor = 'var(--rule-strong)'
    display = value
  }

  return (
    <div
      className="flex items-center justify-between py-[9px] border-b border-rule"
      style={{ gap: '1rem' }}
    >
      <span className="text-[13px] ink-2">{label}</span>
      <span className="flex items-center gap-[6px] text-[13px]" style={{ fontWeight: 500 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: dotColor,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {display}
      </span>
    </div>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────

interface DarkPatternCardProps {
  score: number
  flags?: DarkPatternFlags
}

export function DarkPatternCard({ score, flags }: DarkPatternCardProps) {
  const hasFlags = flags && Object.keys(flags).length > 0

  return (
    <section className="border border-rule rounded-[6px] p-5 mt-10">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2
          className="text-[11px] ink-3 uppercase"
          style={{ letterSpacing: '0.18em' }}
        >
          Dark Pattern Score
        </h2>
        <ScoreBar score={score} />
      </div>

      {/* Breakdown */}
      {hasFlags && (
        <div>
          <FlagRow label="Cancel button hidden" value={flags.hiddenButton} />
          <FlagRow label="Requires phone call" value={flags.requiresCall} />
          <FlagRow label="Requires live chat" value={flags.requiresChat} />
          <FlagRow label="Retention tactics / guilt offers" value={flags.retentionTactics} />
          <FlagRow label="Confirmation shaming" value={flags.confirmationShaming} />
          <FlagRow label="Refund clarity" value={flags.refundClarity} invert />
          {flags.estimatedMinutes !== undefined && (
            <FlagRow label="Typical cancellation time" value={flags.estimatedMinutes} />
          )}
        </div>
      )}

      {/* Methodology note */}
      <p className="text-[11px] ink-3 mt-4 leading-[1.5]">
        Score reflects intentional friction: hidden flows, required phone calls, guilt-trip dialogs, and refund opacity.
        Difficulty to find the service is not included.
      </p>
    </section>
  )
}
