import { CancelGuide } from '@/types/guide'

export const paramountPlus: CancelGuide = {
  slug: 'paramount-plus',
  service: 'Paramount+',
  category: 'Streaming',
  logo: '⭐',
  difficulty: 'easy',
  difficultyReason: "Paramount+ cancellation is straightforward on web, though the app may require extra steps depending on how you subscribed.",
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$7.99/mo (Essential) · $12.99/mo (with SHOWTIME)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Paramount+ in under 5 minutes on web, iOS, or Android. Includes SHOWTIME bundle cancellation.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.paramountplus.com/account/billing/',
      steps: [
        { step: 1, instruction: 'Go to paramountplus.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Settings".' },
        { step: 3, instruction: 'Under "Subscription", click "Cancel Subscription".' },
        { step: 4, instruction: 'Confirm the cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Paramount+" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "Paramount+" → tap "Cancel" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Does cancelling Paramount+ also cancel SHOWTIME?',
      answer: 'If you subscribed to the Paramount+ with SHOWTIME bundle, yes — both are cancelled together.',
    },
    {
      question: 'I subscribed through Apple TV or Amazon — how do I cancel?',
      answer: "Cancel through the platform you used: Apple TV app subscriptions via iOS Settings, Amazon subscriptions via Amazon's Prime Video Channels page.",
    },
  ],
  alternatives: [
    { name: 'Peacock', url: '/cancel/peacock', description: 'From $7.99/mo — NBC content' },
    { name: 'Hulu', url: '/cancel/hulu', description: 'From $7.99/mo — broad streaming library' },
  ],
  tags: ['streaming', 'video', 'showtime', 'cbs'],
}
