'use client'

import { useTranslations } from 'next-intl'
import { Difficulty } from '@/types/guide'

const DOT_COUNT_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
}

interface DifficultyBadgeProps {
  difficulty: Difficulty
  reason?: string
  /** Show just the word, e.g. "easy" — defaults to the i18n label */
  shortLabel?: boolean
}

/**
 * Three-dot progress indicator + label.
 * Filled dots take the semantic color (--c-easy/medium/hard); the label
 * stays in neutral ink-2 so it doesn't shout.
 */
export function DifficultyBadge({ difficulty, reason, shortLabel = false }: DifficultyBadgeProps) {
  const t = useTranslations('difficulty')
  const filled = DOT_COUNT_BY_DIFFICULTY[difficulty]
  const label = shortLabel ? difficulty : t(difficulty)

  return (
    <span
      title={reason}
      className={`diff--${difficulty} inline-flex items-center gap-1.5 text-[12px] ink-2 cursor-default`}
    >
      <span className="inline-flex items-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`diff-dot ${i < filled ? 'diff-dot--on' : ''}`}
          />
        ))}
      </span>
      <span>{label}</span>
    </span>
  )
}
