import { CancelGuide } from '@/types/guide'

export const acornTv: CancelGuide = {
  slug: 'acorn-tv',
  service: 'Acorn TV',
  category: 'Streaming',
  logo: '🌰',
  difficulty: 'easy',
  difficultyReason: 'Acorn TV cancellation is simple via web or device settings.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: '$6.99/mo · $69.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Acorn TV in under 2 minutes via web, iOS, or Android.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://acorn.tv/my-account',
      steps: [
        { step: 1, instruction: 'Go to acorn.tv → sign in → My Account.' },
        { step: 2, instruction: 'Find "Subscription" → click "Cancel Subscription" → confirm.', note: 'Cancel through the platform you subscribed on (Amazon, Apple, Roku) if you did not subscribe directly through Acorn TV.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Acorn TV" → tap it → tap "Cancel Subscription".' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → Subscriptions → Acorn TV → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Amazon — how do I cancel?',
      answer: 'Go to amazon.com → Account → Memberships & Subscriptions → Acorn TV → Cancel channel.',
    },
    {
      question: 'Does cancelling affect my watchlist?',
      answer: 'Your watchlist is saved. If you resubscribe later, your watch history and list will still be there.',
    },
  ],
  alternatives: [
    { name: 'BritBox', url: '/cancel/britbox', description: '$8.99/mo — British BBC & ITV content' },
    { name: 'MHz Choice', url: '#', description: '$7.99/mo — European crime drama' },
  ],
  tags: ['streaming', 'british', 'international', 'drama', 'mystery'],
}
