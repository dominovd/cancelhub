import { CancelGuide } from '@/types/guide'

export const uberEats: CancelGuide = {
  slug: 'uber-eats',
  service: 'Uber Eats',
  category: 'Food Delivery',
  logo: '🛵',
  difficulty: 'easy',
  difficultyReason: 'Cancellation is straightforward through the Uber app with no retention friction.',
  darkPatternScore: 2,
  lastVerified: '2026-04-10',
  monthlyPrice: '$9.99/mo (Uber One)',
  refundPolicy: 'No refunds. Uber One benefits continue until the end of the billing period.',
  description: 'Cancel Uber One (Uber Eats + Uber rides membership) in under 2 minutes through the app or website.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to uber.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Uber One" or go directly to uber.com/uberpro/uber-one.' },
        { step: 3, instruction: 'Click "Manage membership".' },
        { step: 4, instruction: 'Click "Cancel membership".', note: 'Your Uber One benefits continue until the billing period ends.' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Uber or Uber Eats app → tap your profile icon.' },
        { step: 2, instruction: 'Tap "Uber One" → "Manage membership".' },
        { step: 3, instruction: 'Tap "Cancel membership" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Uber or Uber Eats app → profile icon.' },
        { step: 2, instruction: 'Tap "Uber One" → "Manage membership" → "Cancel membership".' },
        { step: 3, instruction: 'Confirm cancellation.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I'm cancelling Uber One — does it cancel both Uber rides and Uber Eats benefits?",
      answer: 'Yes. Uber One is a single membership that covers both Uber ride discounts and Uber Eats delivery benefits. Cancelling removes both.',
    },
    {
      question: 'I was charged after cancelling.',
      answer: 'If you cancelled before your renewal date but were still charged, contact Uber support through the app (Help → Account → Uber One) for a refund.',
    },
  ],
  alternatives: [
    { name: 'DoorDash DashPass', url: '/cancel/doordash', description: '$9.99/mo — free delivery on DoorDash' },
    { name: 'Grubhub+', url: '/cancel/grubhub', description: '$9.99/mo — free delivery on Grubhub' },
  ],
  tags: ['food-delivery', 'rides', 'uber-one'],
}
