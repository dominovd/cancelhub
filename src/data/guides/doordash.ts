import { CancelGuide } from '@/types/guide'

export const doordash: CancelGuide = {
  slug: 'doordash',
  service: 'DoorDash',
  category: 'Food Delivery',
  logo: '🍔',
  difficulty: 'easy',
  difficultyReason: 'DoorDash allows easy cancellation through the app or website with no retention screens.',
  darkPatternScore: 2,
  lastVerified: '2026-04-10',
  monthlyPrice: '$9.99/mo (DashPass)',
  refundPolicy: 'No refunds. DashPass benefits continue until the end of the billing period.',
  description: 'Cancel DashPass in under 2 minutes. No cancellation fee — access continues until billing period ends.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to doordash.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Get DashPass" or go to doordash.com/account.' },
        { step: 3, instruction: 'Scroll to "DashPass" → click "Manage DashPass".' },
        { step: 4, instruction: 'Click "Cancel DashPass".' },
        { step: 5, instruction: 'Follow the confirmation prompts → click "Cancel DashPass" to confirm.', note: 'You keep DashPass benefits until the end of your billing period.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the DoorDash app → tap your profile icon (bottom right).' },
        { step: 2, instruction: 'Tap "Get DashPass" or "Manage DashPass".' },
        { step: 3, instruction: 'Tap "Cancel DashPass" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the DoorDash app → tap your profile icon.' },
        { step: 2, instruction: 'Tap "Manage DashPass".' },
        { step: 3, instruction: 'Tap "Cancel DashPass" → follow confirmation prompts.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find the DashPass option in my account.",
      answer: "Make sure you're logged into the same account used to subscribe. If you subscribed through Chase credit card benefits, you must cancel through Chase, not DoorDash directly.",
    },
    {
      question: 'Will I lose my DashPass mid-month?',
      answer: 'No. DashPass benefits continue until the end of your current billing period.',
    },
  ],
  alternatives: [
    { name: 'Uber One', url: '/cancel/uber-one', description: '$9.99/mo — free delivery on Uber Eats + Uber rides' },
    { name: 'Grubhub+', url: '/cancel/grubhub', description: '$9.99/mo — free delivery on Grubhub orders' },
  ],
  tags: ['food-delivery', 'subscription', 'dashpass'],
}
