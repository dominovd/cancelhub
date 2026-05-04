'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { PlatformGuide } from '@/types/guide'
import { InteractiveSteps } from './InteractiveSteps'

const platformIcons: Record<string, string> = {
  web: '🌐',
  ios: '🍎',
  android: '🤖',
}

export function PlatformTabs({ platforms }: { platforms: PlatformGuide[] }) {
  const t = useTranslations('guide')
  const [active, setActive] = useState(0)
  const current = platforms[active]

  return (
    <div>
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {platforms.map((p, i) => (
          <button
            key={p.platform}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === i
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{platformIcons[p.platform] ?? '📱'}</span>
            {p.label}
          </button>
        ))}
      </div>

      {current.deepLink && (
        <a
          href={current.deepLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <span>→</span> {t('goToCancellationPage')}
        </a>
      )}

      <InteractiveSteps steps={current.steps} platform={current.platform} />
    </div>
  )
}
