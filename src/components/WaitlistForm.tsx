'use client'

import { useTranslations } from 'next-intl'

export function WaitlistForm() {
  const t = useTranslations('home')

  return (
    <form
      className="flex gap-2 max-w-sm mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder={t('waitlistPlaceholder')}
        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        {t('waitlistButton')}
      </button>
    </form>
  )
}
