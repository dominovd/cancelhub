'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function WaitlistForm() {
  const t = useTranslations('home')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="flex items-center gap-3 max-w-md"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      <input
        type="email"
        required
        placeholder={t('waitlistPlaceholder')}
        disabled={submitted}
        className="flex-1 bg-transparent ink text-[14px] py-2 border-0 border-b border-rule-strong focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--ink-2)]"
        style={{ borderBottomWidth: 1, borderRadius: 0 }}
      />
      <button
        type="submit"
        disabled={submitted}
        className="text-[13px] py-2 px-4 border border-[var(--ink)] ink bg-transparent hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors disabled:opacity-60 disabled:cursor-default"
        style={{ borderRadius: 0, fontWeight: 500 }}
      >
        {submitted ? '✓' : t('waitlistButton')}
      </button>
    </form>
  )
}
