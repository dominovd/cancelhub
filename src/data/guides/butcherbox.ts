import { CancelGuide } from '@/types/guide'

export const butcherbox: CancelGuide = {
  slug: 'butcherbox',
  service: 'ButcherBox',
  category: 'Food & Grocery',
  logo: '🥩',
  difficulty: 'medium',
  difficultyReason: 'ButcherBox cancellation requires navigating account settings and must be done before the monthly cutoff. The cancel link is not prominently displayed.',
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: '$146–$291/box (every 4–8 weeks depending on plan)',
  refundPolicy: 'No refunds on shipped boxes. Cancel before your billing date to avoid next shipment.',
  description: "Cancel ButcherBox before your billing date to avoid next month's charge. The cancel option is in Account Settings.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.butcherbox.com/account/plan',
      steps: [
        { step: 1, instruction: 'Go to butcherbox.com → sign in → Account → Plan.' },
        { step: 2, instruction: 'Scroll to the bottom → click "Cancel membership".' },
        { step: 3, instruction: 'Select a reason → confirm.', note: 'Cancel at least 3 days before your billing date to avoid being charged for the next box.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'ButcherBox does not support in-app cancellation. Visit butcherbox.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → ButcherBox → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit butcherbox.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find the cancel link in my account.",
      answer: 'ButcherBox buries the cancel option at the very bottom of the Plan page. Scroll past all the membership options. If you still can\'t find it, contact support at butcherbox.com/support.',
    },
    {
      question: 'Can I pause ButcherBox instead of cancelling?',
      answer: 'Yes — ButcherBox allows you to delay your next order or skip a cycle from your account settings. This keeps your membership active without a delivery.',
    },
  ],
  alternatives: [
    { name: 'Thrive Market', url: '/cancel/thrive-market', description: '$12/mo — organic groceries at wholesale prices' },
    { name: 'Crowd Cow', url: '#', description: 'No subscription — order premium meat on demand' },
  ],
  tags: ['meat', 'food', 'grocery', 'delivery', 'subscription'],
}
