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

  const allDone = checked.size === steps.length && steps.length > 0

  return (
    <div>
      <ol className="space-y-6">
        {steps.map((s) => {
          const done = checked.has(s.step)
          return (
            <li
              key={`${platform}-${s.step}`}
              onClick={() => toggle(s.step)}
              className="grid gap-4 cursor-pointer select-none group"
              style={{ gridTemplateColumns: '28px 1fr' }}
            >
              <span
                className={`text-[13px] mt-[3px] transition-colors ${done ? 'ink-3' : 'ink-3 group-hover:ink-2'}`}
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontVariantNumeric: 'tabular-nums' }}
              >
                {String(s.step).padStart(2, '0')}
              </span>
              <div>
                <p
                  className={`text-[15px] leading-[1.55] transition-all ${
                    done ? 'ink-3 line-through' : 'ink'
                  }`}
                >
                  {s.instruction}
                </p>
                {s.note && (
                  <p className="mt-2 text-[12px] ink-3 leading-[1.5]">{s.note}</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {allDone && (
        <div className="mt-8 border-t border-rule pt-5">
          <p className="text-[14px] ink" style={{ fontWeight: 500 }}>
            {t('allDoneTitle')}
          </p>
          <p className="text-[13px] ink-2 mt-1">{t('allDoneDesc')}</p>
        </div>
      )}

      {!allDone && checked.size > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-[11px] ink-3 mb-1.5">
            <span>{t('progressOf', { done: checked.size, total: steps.length })}</span>
            <span>{Math.round((checked.size / steps.length) * 100)}%</span>
          </div>
          <div className="h-px bg-rule overflow-hidden" style={{ background: 'var(--rule)' }}>
            <div
              className="h-full transition-all"
              style={{
                width: `${(checked.size / steps.length) * 100}%`,
                background: 'var(--ink)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
