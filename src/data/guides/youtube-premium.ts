import { CancelGuide } from '@/types/guide'

export const youtubePremium: CancelGuide = {
  slug: 'youtube-premium',
  service: 'YouTube Premium',
  category: 'Entertainment',
  logo: '▶️',
  difficulty: 'easy',
  difficultyReason: 'YouTube Premium cancellation is quick on the web, though the mobile app requires a few extra taps.',
  darkPatternScore: 2,
  lastVerified: '2026-04-07',
  monthlyPrice: '$13.99/mo · $22.99/mo (Family)',
  refundPolicy: 'No refunds. Access and ad-free experience continue until billing period ends.',
  description: 'Cancel YouTube Premium in under 3 minutes on web, iOS, or Android.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.youtube.com/paid_memberships',
      steps: [
        { step: 1, instruction: 'Go to youtube.com/paid_memberships and sign in.' },
        { step: 2, instruction: 'Find "YouTube Premium" → click "Manage membership".' },
        { step: 3, instruction: 'Click "Deactivate".' },
        { step: 4, instruction: 'Follow the confirmation steps → click "Continue to cancel".' },
        { step: 5, instruction: 'Confirm. You\'ll keep Premium until your billing period ends.', note: 'YouTube Music Premium is included and also cancelled.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "YouTube Premium" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "YouTube Premium" → tap "Cancel subscription".' },
        { step: 3, instruction: 'Follow the confirmation flow.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Does cancelling YouTube Premium also cancel YouTube Music?',
      answer: 'Yes — YouTube Music Premium is bundled with YouTube Premium and cancelled together.',
    },
    {
      question: 'I can\'t find the Deactivate button.',
      answer: 'If you subscribed through the iOS or Android app, you\'ll need to cancel through your device\'s subscription settings, not through YouTube directly.',
    },
  ],
  tags: ['entertainment', 'video', 'music', 'google'],
}
