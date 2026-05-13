import { CancelGuide } from '@/types/guide'

export const shudder: CancelGuide = {
  slug: 'shudder',
  service: 'Shudder',
  category: 'Streaming',
  logo: '👻',
  difficulty: 'easy',
  difficultyReason: 'Shudder cancellation is quick and straightforward via web or device subscription settings.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: '$5.99/mo · $56.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Shudder in under 2 minutes via web, iOS, or Android. Horror content access ends at billing period close.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.shudder.com/account',
      steps: [
        { step: 1, instruction: 'Go to shudder.com → sign in → profile → Account Settings.' },
        { step: 2, instruction: 'Click "Cancel Membership" → confirm.', note: 'Only for subscriptions directly through Shudder. Amazon channel subscribers must cancel via Amazon.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Shudder → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Shudder → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Amazon — where do I cancel?',
      answer: 'Cancel through Amazon: amazon.com → Account → Memberships & Subscriptions → Shudder → Cancel channel.',
    },
    {
      question: 'Will I lose my watchlist if I cancel?',
      answer: 'Your watchlist and watch history are preserved in your account. If you resubscribe, everything will be as you left it.',
    },
  ],
  alternatives: [
    { name: 'Discovery+', url: '/cancel/discovery-plus', description: '$4.99/mo — non-fiction & horror content' },
    { name: 'Peacock', url: '/cancel/peacock', description: '$7.99/mo — NBC & more' },
  ],
  tags: ['streaming', 'horror', 'movies', 'tv', 'entertainment'],
}
