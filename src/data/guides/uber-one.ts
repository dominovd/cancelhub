import { CancelGuide } from '@/types/guide'

export const uberOne: CancelGuide = {
  slug: 'uber-one',
  service: 'Uber One',
  category: 'Food & Delivery',
  logo: '🚗',
  difficulty: 'easy',
  difficultyReason: 'Uber One cancellation is available in the app but buried under several menus.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$9.99/mo · $96/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Uber One membership in under 3 minutes in the Uber or Uber Eats app.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.uber.com/us/en/u/uber-one/',
      steps: [
        { step: 1, instruction: 'Go to uber.com and sign in.' },
        { step: 2, instruction: 'Go to Account → Uber One.' },
        { step: 3, instruction: 'Click "Manage".' },
        { step: 4, instruction: 'Click "Cancel Membership" → confirm.', note: 'Can also be cancelled directly in the Uber or Uber Eats app.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Uber app → Account (bottom right) → Uber One.' },
        { step: 2, instruction: 'Tap "Manage Membership" → "Cancel Membership" → confirm.' },
        { step: 3, instruction: 'OR: Open Uber Eats app → Account → Uber One → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Uber or Uber Eats app → Account → Uber One.' },
        { step: 2, instruction: 'Tap "Manage Membership" → "Cancel Membership" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Does cancelling Uber One affect Uber Eats?',
      answer: 'Uber One covers both Uber rides and Uber Eats deliveries. Cancelling removes benefits from both services.',
    },
    {
      question: 'Can I get a refund if I just signed up?',
      answer: 'Uber One does not typically offer refunds. If you signed up recently and haven\'t used the benefits, contact Uber support via the app to request a goodwill refund.',
    },
  ],
  alternatives: [
    { name: 'DoorDash DashPass', url: '/cancel/doordash', description: '$9.99/mo — free delivery on DoorDash' },
    { name: 'Instacart+', url: '/cancel/instacart', description: '$9.99/mo — free grocery delivery' },
  ],
  tags: ['delivery', 'food', 'rides', 'uber'],
}
