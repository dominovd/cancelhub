import { CancelGuide } from '@/types/guide'

export const disneyPlus: CancelGuide = {
  slug: 'disney-plus',
  service: 'Disney+',
  category: 'Streaming',
  logo: '🏰',
  difficulty: 'easy',
  difficultyReason: 'Disney+ cancellation is straightforward with no early termination fees.',
  darkPatternScore: 3,
  lastVerified: '2026-04-06',
  monthlyPrice: '$7.99/mo (with ads) · $13.99/mo (no ads)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Disney+ in 5 minutes on web, iOS, Android, or through Roku and Amazon.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.disneyplus.com/account',
      steps: [
        { step: 1, instruction: 'Go to disneyplus.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account".' },
        { step: 3, instruction: 'Under "Subscription", click "Cancel subscription".' },
        { step: 4, instruction: 'Select a reason → Click "Continue".' },
        { step: 5, instruction: 'Click "Cancel subscription" to confirm.' },
        { step: 6, instruction: 'You\'ll receive a confirmation email.', note: 'Access continues until your billing date.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Disney+" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → "Subscriptions".' },
        { step: 2, instruction: 'Find Disney+ → tap "Cancel subscription".' },
        { step: 3, instruction: 'Complete the confirmation flow.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I don\'t see a "Cancel subscription" button.',
      answer: 'You likely subscribed through a third party (Apple, Google, Amazon, Roku, or Hulu). Cancel through the original billing platform instead.',
    },
    {
      question: 'Can I cancel the Disney Bundle (Disney+, Hulu, ESPN+)?',
      answer: 'Yes — cancelling Disney+ cancels the entire bundle. If you want to keep Hulu or ESPN+ separately, you\'ll need to re-subscribe to them individually.',
    },
  ],
  tags: ['streaming', 'video', 'family', 'entertainment'],
}
