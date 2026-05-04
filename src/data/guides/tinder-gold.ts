import { CancelGuide } from '@/types/guide'

export const tinderGold: CancelGuide = {
  slug: 'tinder-gold',
  service: 'Tinder Gold',
  category: 'Dating',
  logo: '🔥',
  difficulty: 'easy',
  difficultyReason: 'Tinder Gold cancellation is simple through your device subscription settings.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$29.99/mo · $14.99/mo (6-month) · $9.99/mo (12-month)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Tinder Gold or Tinder Plus in under 2 minutes via iOS, Android, or web.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://account.gotinder.com/',
      steps: [
        { step: 1, instruction: 'Go to account.gotinder.com and sign in.' },
        { step: 2, instruction: 'Click "Manage Payment Account".' },
        { step: 3, instruction: 'Click "Cancel Subscription" → confirm.', note: 'Web cancellation only works if you subscribed directly through Tinder, not via App Store or Google Play.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Tinder" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm. (Most Tinder subscriptions are via App Store.)' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "Tinder Gold" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find Tinder in my App Store subscriptions.",
      answer: "If you subscribed through Tinder's website directly, cancel at account.gotinder.com. If through Google Play, check the Play Store subscriptions.",
    },
    {
      question: 'Will I lose my matches and messages if I cancel?',
      answer: 'No. Your matches, messages, and profile are preserved on the free plan. You just lose Gold features like Likes You, Rewind, and Boosts.',
    },
  ],
  alternatives: [
    { name: 'Bumble', url: '/cancel/bumble', description: 'Free dating with Boost/Premium options' },
    { name: 'Hinge', url: '#', description: 'Free with optional Preferred membership' },
  ],
  tags: ['dating', 'social', 'subscription'],
}
