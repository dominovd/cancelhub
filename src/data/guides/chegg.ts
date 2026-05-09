import { CancelGuide } from '@/types/guide'

export const chegg: CancelGuide = {
  slug: 'chegg',
  service: 'Chegg',
  category: 'Education',
  logo: '📚',
  difficulty: 'medium',
  difficultyReason: 'Chegg cancellation is available online but requires navigating account settings and may show retention offers.',
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Chegg Study: $14.95/mo · Chegg Study Pack: $19.95/mo',
  refundPolicy: 'No refunds. Cancel before your renewal date to avoid the next charge.',
  description: 'Cancel Chegg subscription in under 3 minutes via chegg.com account settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.chegg.com/account',
      steps: [
        { step: 1, instruction: 'Go to chegg.com → sign in → My Account → Subscriptions.' },
        { step: 2, instruction: 'Find your active Chegg plan → click "Cancel subscription".' },
        { step: 3, instruction: 'Follow the confirmation steps → confirm cancellation.', note: 'Access continues until end of current billing period.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Chegg does not support in-app cancellation. Visit chegg.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Chegg → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit chegg.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Chegg → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I graduated — can I pause my Chegg subscription for the summer?',
      answer: 'Chegg does not offer a pause feature. You must cancel and resubscribe. There is no way to temporarily suspend your account.',
    },
    {
      question: 'Chegg charged me after I thought I cancelled.',
      answer: "Check your email for a cancellation confirmation. If you didn't receive one, the cancellation likely didn't complete. Re-cancel at chegg.com/account and contact support if charges continue.",
    },
  ],
  alternatives: [
    { name: 'Quizlet', url: '#', description: 'Free flashcards & study tools' },
    { name: 'Khan Academy', url: '#', description: 'Free — comprehensive academic subjects' },
  ],
  tags: ['education', 'studying', 'homework', 'textbooks', 'college'],
}
