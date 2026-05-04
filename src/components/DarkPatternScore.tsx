'use client'

export function DarkPatternScore({ score }: { score: number }) {
  const label =
    score <= 2 ? 'Straightforward' :
    score <= 4 ? 'Minor friction' :
    score <= 6 ? 'Multiple screens' :
    score <= 8 ? 'Aggressive retention' :
    'Dark patterns'

  const color =
    score <= 2 ? 'text-green-600' :
    score <= 4 ? 'text-yellow-600' :
    score <= 6 ? 'text-orange-500' :
    'text-red-600'

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2.5 rounded-sm transition-colors ${
              i < score
                ? score <= 2 ? 'bg-green-500' :
                  score <= 4 ? 'bg-yellow-400' :
                  score <= 6 ? 'bg-orange-400' :
                  'bg-red-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${color}`}>{label}</span>
    </div>
  )
}
