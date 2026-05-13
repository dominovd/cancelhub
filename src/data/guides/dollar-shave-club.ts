import { CancelGuide } from '@/types/guide'

export const dollarShaveClub: CancelGuide = {
  slug: 'dollar-shave-club',
  service: 'Dollar Shave Club',
  category: 'Personal Care',
  logo: '🪒',
  difficulty: 'easy',
  difficultyReason: 'Dollar Shave Club cancellation is available online but requires a few steps to find the cancel option in account settings.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$5–$15/mo depending on products selected',
  refundPolicy: 'Contact support within 30 days of delivery for a return/refund on unopened products.',
  description: 'Cancel Dollar Shave Club membership in under 3 minutes via dollarshaveclub.com account settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.dollarshaveclub.com/account',
      steps: [
        { step: 1, instruction: 'Go to dollarshaveclub.com → sign in → Account → Membership Settings.' },
        { step: 2, instruction: 'Scroll to "Cancel Membership" → click it.' },
        { step: 3, instruction: 'Select a reason → confirm cancellation.', note: 'You can also cancel by calling 1-800-742-8765 or via live chat at dollarshaveclub.com/help.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Dollar Shave Club does not support in-app cancellation. Visit dollarshaveclub.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Dollar Shave Club → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit dollarshaveclub.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I received a shipment I didn't want — can I return it?",
      answer: 'Yes. Dollar Shave Club accepts returns on unopened products within 30 days. Contact support at dollarshaveclub.com/help to initiate a return.',
    },
    {
      question: 'Can I pause my Dollar Shave Club shipments?',
      answer: 'Yes — you can delay your next shipment or change your order frequency from your account dashboard without cancelling entirely.',
    },
  ],
  alternatives: [
    { name: "Harry's", url: '#', description: 'Similar subscription razor service' },
    { name: 'Gillette on Demand', url: '#', description: 'Order razors as needed, no subscription' },
  ],
  tags: ['personal-care', 'grooming', 'razors', 'shaving', 'subscription'],
}
