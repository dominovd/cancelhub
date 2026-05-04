'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CancelStep } from '@/types/guide'

export function InteractiveSteps({ steps, platform }: { steps: CancelStep[]; platform: string }) {
  const t = useTranslations('guide')
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (step: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(step)) next.delete(step)
      else next.add(step)
      return next
    })
  }

  const allDone = checked.size === steps.length

  return (
    <div>
      <ol className="space-y-3">
        {steps.map((s) => {
          const done = checked.has(s.step)
          return (
            <li
              key={`${platform}-${s.step}`}
              onClick={() => toggle(s.step)}
              className={`flex gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all ${
                done
                  ? 'bg-green-50 border-green-200 opacity-60'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                  done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 bg-white'
                }`}
              >
                {done && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-0.5">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {t('stepLabel', { n: s.step })}
                  </span>
                </div>
                <p className={`text-sm font-medium text-gray-900 ${done ? 'line-through text-gray-400' : ''}`}>
                  {s.instruction}
                </p>
                {s.note && (
                  <p className="mt-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5">
                    💡 {s.note}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {allDone && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-700 font-semibold">{t('allDoneTitle')}</p>
          <p className="text-green-600 text-sm mt-1">{t('allDoneDesc')}</p>
        </div>
      )}

      {!allDone && checked.size > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t('progressOf', { done: checked.size, total: steps.length })}</span>
            <span>{Math.round((checked.size / steps.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(checked.size / steps.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
