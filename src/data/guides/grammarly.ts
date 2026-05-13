import { CancelGuide } from '@/types/guide'

export const grammarly: CancelGuide = {
  slug: 'grammarly',
  service: 'Grammarly',
  category: 'Productivity',
  logo: '✍️',
  difficulty: 'easy',
  difficultyReason: 'Grammarly cancellation is straightforward but requires navigating account settings on the web — the browser extension has no cancel option.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Premium: $12/mo · Business: $15/user/mo (billed annually)',
  refundPolicy: 'No refunds on monthly plans. Annual plans: contact support within 30 days for a refund.',
  description: 'Cancel Grammarly Premium in under 3 minutes via grammarly.com account settings. The browser extension cannot cancel.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://account.grammarly.com/subscription',
      steps: [
        { step: 1, instruction: 'Go to account.grammarly.com → sign in.' },
        { step: 2, instruction: 'Click "Subscription" in the left sidebar.' },
        { step: 3, instruction: 'Click "Cancel Subscription" → confirm.', note: 'You revert to the free plan with basic grammar checks. Premium features (style, tone, plagiarism detection) are removed.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → Subscriptions → Grammarly → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play → Subscriptions → Grammarly → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I cancelled but the Grammarly extension still works.',
      answer: 'Grammarly Premium access continues until the end of your billing period. The extension will switch to free after your subscription expires.',
    },
    {
      question: 'I have an annual plan — can I get a refund?',
      answer: 'Contact Grammarly support within 30 days of payment at support.grammarly.com. Annual plan refunds are considered case by case.',
    },
  ],
  alternatives: [
    { name: 'ProWritingAid', url: '#', description: '$10/mo — deep grammar and style analysis' },
    { name: 'Hemingway Editor', url: '#', description: 'One-time $19.99 — readability focused' },
  ],
  tags: ['writing', 'grammar', 'productivity', 'ai', 'editing'],
}
