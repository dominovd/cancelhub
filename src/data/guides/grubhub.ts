import { CancelGuide } from '@/types/guide'

export const grubhub: CancelGuide = {
  slug: 'grubhub',
  service: 'Grubhub+',
  category: 'Food & Delivery',
  logo: '🍔',
  difficulty: 'easy',
  difficultyReason: 'Grubhub+ cancellation is available in the app and on the web with minimal friction.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$9.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Grubhub+ membership in under 3 minutes via the app or grubhub.com.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.grubhub.com/loyalty/grubhub-plus',
      steps: [
        { step: 1, instruction: 'Go to grubhub.com and sign in.' },
        { step: 2, instruction: 'Click "Account" → "Grubhub+".' },
        { step: 3, instruction: 'Click "Cancel Membership".' },
        { step: 4, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Grubhub app.' },
        { step: 2, instruction: 'Tap Profile → Grubhub+ → Manage Membership.' },
        { step: 3, instruction: 'Tap "Cancel" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Grubhub app.' },
        { step: 2, instruction: 'Tap Profile → Grubhub+ → Manage Membership.' },
        { step: 3, instruction: 'Tap "Cancel" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I get Grubhub+ free through Amazon Prime — how do I cancel?',
      answer: 'If your Grubhub+ is linked to Amazon Prime, it won\'t be cancelled separately — it\'s included in your Prime membership. To stop it, you\'d need to disconnect the perk via your Amazon account or cancel Prime.',
    },
    {
      question: 'Will I lose my Grubhub rewards points if I cancel?',
      answer: 'No. Your Grubhub rewards points remain in your account even after cancelling Grubhub+. You just lose the free delivery perks.',
    },
  ],
  alternatives: [
    { name: 'DoorDash DashPass', url: '/cancel/doordash', description: '$9.99/mo — free delivery on DoorDash' },
    { name: 'Uber One', url: '/cancel/uber-one', description: '$9.99/mo — Uber & Uber Eats benefits' },
  ],
  tags: ['food', 'delivery', 'grubhub', 'restaurant'],
}
