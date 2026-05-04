'use client'

import { useTranslations } from 'next-intl'
import { Difficulty } from '@/types/guide'

const config: Record<Difficulty, { color: string; icon: string }> = {
  easy: { color: 'bg-green-100 text-green-700 border-green-200', icon: '✓' },
  medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '~' },
  hard: { color: 'bg-red-100 text-red-700 border-red-200', icon: '✗' },
}

export function DifficultyBadge({ difficulty, reason }: { difficulty: Difficulty; reason?: string }) {
  const t = useTranslations('difficulty')
  const { color, icon } = config[difficulty]
  return (
    <span
      title={reason}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${color} cursor-default`}
    >
      <span>{icon}</span> {t(difficulty)}
    </span>
  )
}
