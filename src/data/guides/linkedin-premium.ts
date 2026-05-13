import { CancelGuide } from '@/types/guide'

export const linkedinPremium: CancelGuide = {
  slug: 'linkedin-premium',
  service: 'LinkedIn Premium',
  category: 'Professional',
  logo: '💼',
  difficulty: 'medium',
  difficultyReason: 'LinkedIn Premium cancellation is buried in account settings and uses multiple confirmation screens with retention offers.',
  darkPatternScore: 6,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: true,
    refundClarity: 'murky',
    estimatedMinutes: 4,
  },
  lastVerified: '2025-05-01',
  monthlyPrice: 'Career: $29.99/mo · Business: $59.99/mo · Sales Navigator: $99.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel LinkedIn Premium in under 5 minutes via web or mobile. Includes steps to avoid the retention screens.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.linkedin.com/mypreferences/d/premium-manage',
      steps: [
        { step: 1, instruction: 'Go to linkedin.com → click your profile photo → Settings & Privacy.' },
        { step: 2, instruction: 'Click "Subscriptions & Payments" → "Manage Premium account".' },
        { step: 3, instruction: 'Click "Cancel subscription" → LinkedIn will show retention offers — click "Continue to cancel".' },
        { step: 4, instruction: 'Select a reason → confirm cancellation.', note: 'You lose InMail credits, who viewed your profile, and AI writing tools. Your profile and connections are unaffected.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → Subscriptions → LinkedIn → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play → Subscriptions → LinkedIn → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find the cancel button in my LinkedIn settings.",
      answer: 'Go directly to linkedin.com/mypreferences/d/premium-manage. LinkedIn changes settings layouts frequently, so direct links work better than navigating through menus.',
    },
    {
      question: 'Will cancelling affect my LinkedIn profile or connections?',
      answer: 'No. Your profile, connections, recommendations, and job history all remain intact. You lose Premium features like InMail credits and advanced analytics.',
    },
  ],
  alternatives: [
    { name: 'Indeed Resume', url: '#', description: 'Free job search with resume visibility' },
    { name: 'Glassdoor', url: '#', description: 'Free company reviews and salary data' },
  ],
  tags: ['professional', 'networking', 'career', 'jobs', 'linkedin'],
}
