import { CancelGuide } from '@/types/guide'

export const classpass: CancelGuide = {
  slug: 'classpass',
  service: 'ClassPass',
  category: 'Health & Fitness',
  logo: '🏋️',
  difficulty: 'medium',
  difficultyReason: 'ClassPass uses multiple retention steps and requires navigating deep into account settings. Pausing is pushed heavily before cancellation.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$19–$159/mo depending on credit plan',
  refundPolicy: 'No refunds on unused credits. Credits expire at end of billing period.',
  description: 'Cancel ClassPass in under 5 minutes via the app or web. Unused credits are forfeited at billing end.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://classpass.com/account/plan',
      steps: [
        { step: 1, instruction: 'Go to classpass.com and sign in.' },
        { step: 2, instruction: 'Click "Account" → "Plan".' },
        { step: 3, instruction: 'Click "Cancel Plan".' },
        { step: 4, instruction: 'ClassPass will offer to pause your membership — click "No thanks, cancel".' },
        { step: 5, instruction: 'Select a reason for cancellation.' },
        { step: 6, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open ClassPass app → tap "Profile".' },
        { step: 2, instruction: 'Go to "Settings" → "Manage Plan".' },
        { step: 3, instruction: 'Tap "Cancel Plan" → follow prompts.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open ClassPass app → tap "Profile".' },
        { step: 2, instruction: 'Go to "Settings" → "Manage Plan".' },
        { step: 3, instruction: 'Tap "Cancel Plan" → follow prompts.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'ClassPass keeps offering me a pause instead of cancellation.',
      answer: 'This is intentional. Look for a small "No thanks, I want to cancel" link below the pause offer. Don\'t accept the pause unless you actually want to pause.',
    },
    {
      question: 'I have unused credits — can I get a refund?',
      answer: 'No. ClassPass credits are non-refundable and expire at the end of your billing period. Use them before your billing date if possible.',
    },
  ],
  alternatives: [
    { name: 'Crunch Fitness', url: '/cancel/crunch-fitness', description: 'From $9.99/mo — gym membership' },
    { name: 'Peloton', url: '/cancel/peloton', description: 'From $12.99/mo — at-home fitness' },
  ],
  tags: ['fitness', 'gym', 'wellness', 'classes', 'health'],
}
