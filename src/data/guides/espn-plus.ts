import { CancelGuide } from '@/types/guide'

export const espnPlus: CancelGuide = {
  slug: 'espn-plus',
  service: 'ESPN+',
  category: 'Sports',
  logo: '🏈',
  difficulty: 'easy',
  difficultyReason: 'ESPN+ cancellation is straightforward via the web, though bundled Disney subscriptions require extra steps.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$10.99/mo · $109.99/yr · Disney Bundle from $14.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel ESPN+ in under 5 minutes on web, iOS, or Android. Includes Disney Bundle cancellation steps.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.disneyplus.com/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to disneyplus.com and sign in.' },
        { step: 2, instruction: 'Click your profile → "Account".' },
        { step: 3, instruction: 'Under "Subscription", click "Cancel subscription".' },
        { step: 4, instruction: 'Confirm the cancellation.', note: 'If bundled with Disney+/Hulu, cancelling ESPN+ cancels the whole bundle.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "ESPN+" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.', note: 'Only applies if you subscribed via App Store.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "ESPN+" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I have the Disney Bundle — does cancelling ESPN+ cancel everything?',
      answer: 'Yes. The Disney Bundle is managed together. Cancelling ESPN+ cancels Disney+ and Hulu as well. Subscribe to them separately if needed.',
    },
    {
      question: "I can't find ESPN+ in my subscriptions.",
      answer: 'You may be subscribed through a TV provider. Contact your cable or streaming provider to cancel.',
    },
  ],
  alternatives: [
    { name: 'Peacock', url: '/cancel/peacock', description: 'From $7.99/mo — NBC sports & more' },
    { name: 'FuboTV', url: '/cancel/fubotv', description: 'From $79.99/mo — live sports TV' },
  ],
  tags: ['sports', 'streaming', 'disney', 'espn'],
}
