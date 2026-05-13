'use client'

import { useTranslations } from 'next-intl'

/**
 * 10-tick severity scale. Filled ticks take the semantic colour for the
 * bucket (easy/medium/hard tokens reused). Empty ticks are hairlines.
 * The textual label stays in neutral ink-2 — colour does the signalling.
 */
export function DarkPatternScore({ score }: { score: number }) {
  const t = useTranslations('darkPattern')

  const bucket = score <= 2 ? 'easy' : score <= 5 ? 'medium' : 'hard'
  const fillColor = `var(--c-${bucket})`

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 2,
              height: 12,
              background: i < score ? fillColor : 'var(--rule-strong)',
              opacity: i < score ? 1 : 0.55,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
      <span className="text-[12px] ink-2 whitespace-nowrap">{t(score.toString())}</span>
    </div>
  )
}
