import { CancelGuide } from '@/types/guide'

export const britbox: CancelGuide = {
  slug: 'britbox',
  service: 'BritBox',
  category: 'Streaming',
  logo: '🇬🇧',
  difficulty: 'easy',
  difficultyReason: 'BritBox cancellation is quick and available on the web or through device subscription settings.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: '$8.99/mo · $89.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel BritBox in under 3 minutes via web, iOS, or Android. British TV access ends at billing period close.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.britbox.com/us/account',
      steps: [
        { step: 1, instruction: 'Go to britbox.com → sign in → click your profile icon → Account.' },
        { step: 2, instruction: 'Find "Subscription" → click "Cancel Subscription".' },
        { step: 3, instruction: 'Confirm cancellation.', note: 'If subscribed via Amazon Prime Video Channels, Apple TV, or Roku, you must cancel through those platforms.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "BritBox" → tap it → tap "Cancel Subscription" (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → Subscriptions → BritBox → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Amazon — how do I cancel?',
      answer: 'Cancel through Amazon: amazon.com → Account → Memberships & Subscriptions → BritBox → Cancel channel. The BritBox website cannot cancel Amazon channel subscriptions.',
    },
    {
      question: 'Will I lose my watchlist and favorites?',
      answer: 'Your watchlist and viewing history are preserved. If you resubscribe, everything will be as you left it.',
    },
  ],
  alternatives: [
    { name: 'Acorn TV', url: '/cancel/acorn-tv', description: '$6.99/mo — British & international drama' },
    { name: 'PBS Passport', url: '#', description: '$5/mo — PBS shows & documentaries' },
  ],
  tags: ['streaming', 'british', 'tv', 'uk', 'drama'],
}
