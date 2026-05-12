'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { PlatformGuide } from '@/types/guide'
import { InteractiveSteps } from './InteractiveSteps'

export function PlatformTabs({ platforms }: { platforms: PlatformGuide[] }) {
  const t = useTranslations('guide')
  const [active, setActive] = useState(0)
  const current = platforms[active]

  return (
    <div>
      {/* Hairline-underline tabs */}
      <div className="flex items-center border-b border-rule mb-8">
        {platforms.map((p, i) => (
          <button
            key={p.platform}
            onClick={() => setActive(i)}
            className={`text-[13px] py-2 mr-6 transition-colors ${
              active === i ? 'ink' : 'ink-3 hover:ink-2'
            }`}
            style={{
              borderBottom: active === i ? '1px solid var(--ink)' : '1px solid transparent',
              marginBottom: -1,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {current.deepLink && (
        <a
          href={current.deepLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-8 text-[13px] ink hover:opacity-80 transition-opacity"
          style={{ borderBottom: '1px solid currentColor', paddingBottom: 2, fontWeight: 500 }}
        >
          {t('goToCancellationPage')} →
        </a>
      )}

      <InteractiveSteps steps={current.steps} platform={current.platform} />
    </div>
  )
}
