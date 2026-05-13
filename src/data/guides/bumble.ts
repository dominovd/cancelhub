import { CancelGuide } from '@/types/guide'

export const bumble: CancelGuide = {
  slug: 'bumble',
  service: 'Bumble',
  category: 'Dating',
  logo: '🐝',
  difficulty: 'easy',
  difficultyReason: 'Bumble subscription cancellation is straightforward through your device or the app.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Bumble Boost: $16.99/mo · Bumble Premium: $32.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Bumble Boost or Premium in under 3 minutes via iOS, Android, or web.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://bumble.com/the-buzz/how-to-cancel-bumble-boost',
      steps: [
        { step: 1, instruction: 'Go to bumble.com and open the app or web version.' },
        { step: 2, instruction: 'Tap your Profile → Settings → Manage Subscription.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.', note: 'If subscribed via App Store or Google Play, you must cancel through your device settings.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Bumble" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "Bumble" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my matches if I cancel?',
      answer: 'No. Your matches, conversations, and profile stay intact on the free tier. You lose premium features like Beeline (seeing who liked you), SuperSwipes, and Spotlight.',
    },
    {
      question: 'I subscribed through the app — can I cancel on the website?',
      answer: 'No. If you subscribed through the App Store or Google Play, you must cancel through those platforms. The in-app settings will redirect you there.',
    },
  ],
  alternatives: [
    { name: 'Tinder Gold', url: '/cancel/tinder-gold', description: 'From $9.99/mo — largest dating app' },
    { name: 'Hinge', url: '#', description: 'Free with optional Preferred membership' },
  ],
  tags: ['dating', 'social', 'subscription'],
}
