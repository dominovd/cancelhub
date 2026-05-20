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
      <div className="platform-tabs">
        {platforms.map((p, i) => (
          <button
            key={p.platform}
            onClick={() => setActive(i)}
            className={`platform-tab ${active === i ? 'on' : ''}`}
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
          className="btn-accent"
          style={{ marginBottom: 18 }}
        >
          {t('goToCancellationPage')} →
        </a>
      )}

      <InteractiveSteps steps={current.steps} platform={current.platform} />
    </div>
  )
}
