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
      <ol className="step-list">
        {steps.map((s) => {
          const done = checked.has(s.step)
          return (
            <li
              key={`${platform}-${s.step}`}
              onClick={() => toggle(s.step)}
              className={done ? 'done' : ''}
            >
              <div className="step-title">{s.instruction}</div>
              {s.note && <div className="step-note">{s.note}</div>}
            </li>
          )
        })}
      </ol>

      {allDone && (
        <div
          className="mt-7 pt-5 border-t"
          style={{ borderColor: 'var(--line)' }}
        >
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--green)' }}>
            ✓ {t('allDoneTitle')}
          </p>
          <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 4 }}>
            {t('allDoneDesc')}
          </p>
        </div>
      )}

      {!allDone && checked.size > 0 && (
        <div className="mt-6">
          <div
            className="flex justify-between mb-[6px]"
            style={{ fontSize: 11.5, color: 'var(--ink-3)' }}
          >
            <span>{t('progressOf', { done: checked.size, total: steps.length })}</span>
            <span>{Math.round((checked.size / steps.length) * 100)}%</span>
          </div>
          <div
            style={{
              height: 6,
              background: 'var(--paper-2)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(checked.size / steps.length) * 100}%`,
                background: 'var(--accent)',
                height: '100%',
                borderRadius: 999,
                transition: 'width .35s ease',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
