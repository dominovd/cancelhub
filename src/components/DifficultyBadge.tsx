'use client'

import { Difficulty } from '@/types/guide'

const config: Record<Difficulty, { label: string; color: string; icon: string }> = {
  easy: { label: 'Easy', color: 'bg-green-100 text-green-700 border-green-200', icon: '✓' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '~' },
  hard: { label: 'Hard', color: 'bg-red-100 text-red-700 border-red-200', icon: '✗' },
}

export function DifficultyBadge({ difficulty, reason }: { difficulty: Difficulty; reason?: string }) {
  const { label, color, icon } = config[difficulty]
  return (
    <span
      title={reason}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${color} cursor-default`}
    >
      <span>{icon}</span> {label} to cancel
    </span>
  )
}
