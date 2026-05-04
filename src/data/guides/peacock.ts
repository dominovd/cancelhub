import { CancelGuide } from '@/types/guide'

export const peacock: CancelGuide = {
  slug: 'peacock',
  service: 'Peacock',
  category: 'Streaming',
  logo: '🦚',
  difficulty: 'easy',
  difficultyReason: "Peacock's cancellation flow is straightforward with minimal retention friction.",
  darkPatternScore: 3,
  lastVerified: '2025-04-10',
  monthlyPrice: '$7.99/mo (Premium) · $13.99/mo (Premium Plus)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Peacock Premium in under 3 minutes on web or through your device\'s subscription settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to peacocktv.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account".' },
        { step: 3, instruction: 'Under "Plan", click "Change or cancel plan".' },
        { step: 4, instruction: 'Click "Cancel plan".' },
        { step: 5, instruction: 'Select a reason → click "Continue".', note: 'Your Peacock Premium access continues until the billing date.' },
        { step: 6, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Peacock" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "Peacock" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through my TV provider (Comcast, Cox, etc.) — how do I cancel?',
      answer: 'If Peacock was bundled with your cable or internet plan, you must cancel through your TV/internet provider, not through Peacock directly.',
    },
    {
      question: 'I have the free tier — do I need to cancel?',
      answer: 'No. The free Peacock tier has no subscription to cancel. Only Premium and Premium Plus require cancellation.',
    },
  ],
  alternatives: [
    { name: 'Paramount+', url: '/cancel/paramount-plus', description: '$7.99/mo — CBS, MTV, Nickelodeon' },
    { name: 'Max', url: '/cancel/max', description: '$9.99/mo — HBO content' },
  ],
  tags: ['streaming', 'video', 'nbc', 'entertainment'],
}
