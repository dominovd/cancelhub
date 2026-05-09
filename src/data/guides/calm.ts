import { CancelGuide } from '@/types/guide'

export const calm: CancelGuide = {
  slug: 'calm',
  service: 'Calm',
  category: 'Health & Wellness',
  logo: '🧘',
  difficulty: 'easy',
  difficultyReason: 'Calm cancellation is available via web or app settings. Mobile subscriptions must cancel through the device.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$14.99/mo · $69.99/yr · Calm Premium for Life: $399.99 one-time',
  refundPolicy: 'No refunds on monthly plans. Annual plans: contact support within 30 days.',
  description: 'Cancel Calm Premium in under 3 minutes via web, iOS, or Android. Meditation content is removed after cancellation.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.calm.com/app/settings',
      steps: [
        { step: 1, instruction: 'Go to calm.com → sign in → Settings → Subscription.' },
        { step: 2, instruction: 'Click "Cancel Premium" → confirm.', note: 'Web cancellation only works for subscriptions purchased directly through Calm, not via App Store or Google Play.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Calm → Cancel Subscription (required for App Store subscriptions).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Calm → Cancel subscription (required for Play Store subscriptions).' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I cancelled Calm but the app still shows Premium.',
      answer: "Access continues until your current billing period ends. The cancellation is confirmed — you won't be charged again.",
    },
    {
      question: 'I bought Calm via the App Store — why can\'t I cancel on the website?',
      answer: 'App Store subscriptions must be cancelled through iOS Settings → Apple ID → Subscriptions. The Calm website cannot cancel App Store purchases.',
    },
  ],
  alternatives: [
    { name: 'Headspace', url: '/cancel/headspace', description: '$12.99/mo — meditation & mindfulness' },
    { name: 'Insight Timer', url: '#', description: 'Free — 100,000+ guided meditations' },
  ],
  tags: ['meditation', 'wellness', 'sleep', 'mindfulness', 'health'],
}
