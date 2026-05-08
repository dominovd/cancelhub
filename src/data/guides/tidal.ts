import { CancelGuide } from '@/types/guide'

export const tidal: CancelGuide = {
  slug: 'tidal',
  service: 'Tidal',
  category: 'Music',
  logo: '🎧',
  difficulty: 'easy',
  difficultyReason: 'Tidal cancellation is straightforward via web or the app settings.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Tidal Free · HiFi: $10.99/mo · HiFi Plus: $19.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Tidal HiFi or HiFi Plus in under 3 minutes via web, iOS, or Android.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://listen.tidal.com/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to tidal.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account".' },
        { step: 3, instruction: 'Click "Subscription".' },
        { step: 4, instruction: 'Click "Cancel Plan".' },
        { step: 5, instruction: 'Confirm the cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Tidal → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Tidal → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my playlists and downloads after cancelling?',
      answer: 'Your playlists are preserved if you keep a free Tidal account. Downloaded tracks are removed since offline listening requires a paid plan.',
    },
    {
      question: 'I subscribed through Sprint/T-Mobile — how do I cancel?',
      answer: 'Some Tidal subscriptions are carrier-bundled. Contact your mobile carrier to remove Tidal from your plan. The Tidal website won\'t show carrier-billed subscriptions.',
    },
  ],
  alternatives: [
    { name: 'Spotify', url: '/cancel/spotify', description: 'From $9.99/mo — largest music catalog' },
    { name: 'Apple Music', url: '/cancel/apple-music', description: '$10.99/mo — lossless & spatial audio' },
  ],
  tags: ['music', 'streaming', 'hifi', 'lossless', 'audio'],
}
