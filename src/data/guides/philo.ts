import { CancelGuide } from '@/types/guide'

export const philo: CancelGuide = {
  slug: 'philo',
  service: 'Philo',
  category: 'Streaming',
  logo: '📺',
  difficulty: 'easy',
  difficultyReason: 'Philo offers a simple cancellation flow with no major retention tactics.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: '$25/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Philo in under 3 minutes on web, iOS, or Android. No contracts or cancellation fees.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.philo.com/app/#/settings/payments',
      steps: [
        { step: 1, instruction: 'Go to philo.com and sign in.' },
        { step: 2, instruction: 'Click Settings in the top right corner.' },
        { step: 3, instruction: 'Go to Payments.' },
        { step: 4, instruction: 'Click "Cancel Plan".' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Philo" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions.' },
        { step: 2, instruction: 'Find "Philo" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Is there a cancellation fee?',
      answer: 'No. Philo has no contracts or cancellation fees. You can cancel any time and re-subscribe whenever you want.',
    },
    {
      question: 'Can I pause my Philo subscription?',
      answer: "Philo does not offer a pause feature. You can cancel and re-subscribe when you're ready — your account settings are preserved.",
    },
  ],
  alternatives: [
    { name: 'Sling TV', url: '/cancel/sling-tv', description: 'From $40/mo — live TV with sports' },
    { name: 'YouTube TV', url: '/cancel/youtube-tv', description: '$72.99/mo — 100+ channels' },
  ],
  tags: ['streaming', 'live-tv', 'entertainment', 'budget'],
}
