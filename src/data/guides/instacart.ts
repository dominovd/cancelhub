import { CancelGuide } from '@/types/guide'

export const instacart: CancelGuide = {
  slug: 'instacart',
  service: 'Instacart+',
  category: 'Grocery Delivery',
  logo: '🛒',
  difficulty: 'easy',
  difficultyReason: 'Instacart+ cancellation is straightforward through the app with minimal retention friction.',
  darkPatternScore: 3,
  lastVerified: '2026-04-10',
  monthlyPrice: '$9.99/mo · $99/yr',
  refundPolicy: 'No refunds. Benefits continue until end of billing period. Annual subscribers may get a prorated refund if unused.',
  description: 'Cancel Instacart+ (formerly Instacart Express) in under 2 minutes on the app or website.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to instacart.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Instacart+" or go to instacart.com/store/instacart_plus.' },
        { step: 3, instruction: 'Click "Manage your membership".' },
        { step: 4, instruction: 'Click "Cancel membership".', note: 'If you have an annual plan with remaining months, Instacart may offer a prorated refund.' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Instacart app → tap your profile icon.' },
        { step: 2, instruction: 'Tap "Instacart+" → "Manage membership".' },
        { step: 3, instruction: 'Tap "Cancel membership" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Instacart app → profile icon → "Instacart+".' },
        { step: 2, instruction: 'Tap "Manage membership" → "Cancel membership" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I get a refund on my annual Instacart+ plan?',
      answer: "Yes, if you haven't heavily used the membership. Instacart may offer a prorated refund for the unused portion. Contact support if the option isn't shown during cancellation.",
    },
    {
      question: 'What happens to my pending orders after cancellation?',
      answer: "Active orders are not affected by cancellation. Delivery fee waivers won't apply to new orders placed after cancellation.",
    },
  ],
  alternatives: [
    { name: 'Amazon Fresh', url: '#', description: 'Free delivery with Prime — grocery delivery' },
    { name: 'Shipt', url: '#', description: '$99/yr — Target + other retailers' },
  ],
  tags: ['grocery', 'delivery', 'subscription'],
}
