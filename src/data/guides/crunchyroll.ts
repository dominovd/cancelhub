import { CancelGuide } from '@/types/guide'

export const crunchyroll: CancelGuide = {
  slug: 'crunchyroll',
  service: 'Crunchyroll',
  category: 'Streaming',
  logo: '🍥',
  difficulty: 'easy',
  difficultyReason: 'Crunchyroll cancellation is quick and straightforward on web or mobile.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Fan: $7.99/mo · Mega Fan: $9.99/mo · Ultimate Fan: $14.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Crunchyroll in under 3 minutes on web, iOS, or Android. Anime library stays accessible until billing period ends.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.crunchyroll.com/account',
      steps: [
        { step: 1, instruction: 'Go to crunchyroll.com and sign in.' },
        { step: 2, instruction: 'Click your Profile → Settings.' },
        { step: 3, instruction: 'Select "Manage Premium".' },
        { step: 4, instruction: 'Click "Cancel Premium".' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Go to Settings → tap your Apple ID name → Subscriptions.' },
        { step: 2, instruction: 'Find "Crunchyroll" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
        { step: 4, instruction: 'Note: only applies if you subscribed via the App Store.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → tap your profile → Subscriptions.' },
        { step: 2, instruction: 'Find "Crunchyroll" → tap "Cancel subscription".' },
        { step: 3, instruction: 'Confirm cancellation.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my watch history and favorites?',
      answer: 'No. Your watch history, favorites, and queue are saved in your account. You can resume from where you left off if you resubscribe.',
    },
    {
      question: 'I subscribed through the PlayStation Store — where do I cancel?',
      answer: 'Cancel through PlayStation: Settings → Account Management → Subscriptions → Crunchyroll. You cannot cancel a PlayStation subscription via the Crunchyroll website.',
    },
  ],
  alternatives: [
    { name: 'Funimation', url: '#', description: '$7.99/mo — now merged into Crunchyroll' },
    { name: 'Netflix', url: '/cancel/netflix', description: 'From $7.99/mo — some anime available' },
  ],
  tags: ['streaming', 'anime', 'manga', 'entertainment'],
}
