import { CancelGuide } from '@/types/guide'

export const scribd: CancelGuide = {
  slug: 'scribd',
  service: 'Scribd',
  category: 'Books & Reading',
  logo: '📖',
  difficulty: 'easy',
  difficultyReason: 'Scribd cancellation is available online and in the app, though the cancel option requires a few clicks to find.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$11.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Scribd in under 3 minutes via web or the app. Access to books, audiobooks, and documents ends at billing period close.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.scribd.com/account-settings/payments',
      steps: [
        { step: 1, instruction: 'Go to scribd.com → sign in → profile icon → Account Settings → Payments & Subscriptions.' },
        { step: 2, instruction: 'Click "Cancel subscription".' },
        { step: 3, instruction: 'Select a reason → confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Scribd → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Scribd → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What do I lose when I cancel Scribd?',
      answer: 'Access to unlimited books, audiobooks, magazines, sheet music, and documents ends. Any offline saved content will no longer be accessible.',
    },
    {
      question: 'Can I pause Scribd instead of cancelling?',
      answer: 'Yes — Scribd offers a 2-month pause option. Go to Account Settings → Payments → look for a pause option before cancelling.',
    },
  ],
  alternatives: [
    { name: 'Kindle Unlimited', url: '/cancel/kindle-unlimited', description: '$11.99/mo — Amazon ebook subscription' },
    { name: 'Audible', url: '/cancel/audible', description: '$14.95/mo — audiobooks with credits' },
  ],
  tags: ['books', 'audiobooks', 'reading', 'documents', 'magazines'],
}
