import { CancelGuide } from '@/types/guide'

export const onlyfans: CancelGuide = {
  slug: 'onlyfans',
  service: 'OnlyFans',
  category: 'Creator Platforms',
  logo: '💙',
  difficulty: 'easy',
  difficultyReason: 'OnlyFans subscription cancellation is available in the app and web, though each creator must be unsubscribed separately.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Varies by creator: $4.99–$49.99/mo per creator',
  refundPolicy: 'No refunds. Access continues until end of subscription period. Turn off auto-renew to stop being charged.',
  description: 'Cancel OnlyFans subscriptions in under 2 minutes. Each creator must be unsubscribed separately — turn off auto-renew.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://onlyfans.com/my/subscriptions/active',
      steps: [
        { step: 1, instruction: 'Go to onlyfans.com → sign in → Subscriptions (left sidebar).' },
        { step: 2, instruction: 'Find the creator → click the "···" menu or the subscription badge.' },
        { step: 3, instruction: 'Toggle off "Auto-Renew" or click "Unsubscribe" → confirm.', note: 'Turning off auto-renew cancels future charges. You keep access until the current subscription period ends.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open OnlyFans app → tap profile → Subscriptions → Active.' },
        { step: 2, instruction: 'Find creator → tap "···" → Turn off Auto-Renew → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open OnlyFans app → profile → Subscriptions → Active → find creator → turn off Auto-Renew → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I turned off auto-renew but I\'m still subscribed.',
      answer: 'This is correct. Turning off auto-renew means you won\'t be charged again, but your access continues until the end of the current period. You\'re not charged further.',
    },
    {
      question: 'How do I cancel multiple subscriptions at once?',
      answer: 'OnlyFans requires cancelling each creator individually. Go to onlyfans.com/my/subscriptions/active to see all active subscriptions and cancel them one by one.',
    },
  ],
  tags: ['creator', 'content', 'subscription', 'social'],
}
