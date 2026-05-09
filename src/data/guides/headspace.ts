import { CancelGuide } from '@/types/guide'

export const headspace: CancelGuide = {
  slug: 'headspace',
  service: 'Headspace',
  category: 'Health & Wellness',
  logo: '🧠',
  difficulty: 'easy',
  difficultyReason: 'Headspace cancellation is available online and in the app. The cancel option can be a bit hard to find in settings.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$12.99/mo · $69.99/yr · Student: $9.99/yr',
  refundPolicy: 'No refunds on monthly plans. Annual plans: contact support within 14 days of renewal for a refund.',
  description: 'Cancel Headspace in under 3 minutes via web, iOS, or Android. Free content remains accessible after cancellation.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.headspace.com/account/subscriptions',
      steps: [
        { step: 1, instruction: 'Go to headspace.com → sign in → Profile → Account → Manage subscription.' },
        { step: 2, instruction: 'Click "Cancel subscription" → follow prompts → confirm.', note: 'Free Headspace content (select meditations, sleep sounds) remains available after cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Headspace → Cancel Subscription.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Headspace → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I still use Headspace after cancelling?',
      answer: 'Yes — a limited set of free meditations, sleep sounds, and exercises remain available. Full library access requires a paid subscription.',
    },
    {
      question: 'I have a student or work plan — how do I cancel?',
      answer: 'Student plans and employer-provided plans may have different cancellation terms. Contact support at headspace.com/help to cancel these plans.',
    },
  ],
  alternatives: [
    { name: 'Calm', url: '/cancel/calm', description: '$14.99/mo — meditation & sleep stories' },
    { name: 'Insight Timer', url: '#', description: 'Free — 100,000+ guided meditations' },
  ],
  tags: ['meditation', 'mindfulness', 'wellness', 'sleep', 'health'],
}
