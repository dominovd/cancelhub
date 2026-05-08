import { CancelGuide } from '@/types/guide'

export const duolingoPlus: CancelGuide = {
  slug: 'duolingo-plus',
  service: 'Duolingo Plus',
  category: 'Education',
  logo: '🦉',
  difficulty: 'easy',
  difficultyReason: 'Duolingo Plus (Super Duolingo) cancellation is quick through the app or device subscription settings.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Super Duolingo: $6.99/mo · $83.99/yr · Family Plan: $9.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Duolingo Plus (Super Duolingo) in under 2 minutes via the app, iOS Settings, or Google Play.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.duolingo.com/settings/super',
      steps: [
        { step: 1, instruction: 'Go to duolingo.com and sign in.' },
        { step: 2, instruction: 'Click your profile → Settings.' },
        { step: 3, instruction: 'Go to "Super Duolingo" → click "Manage".' },
        { step: 4, instruction: 'Click "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Duolingo" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.', note: 'Only if subscribed via the App Store.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions.' },
        { step: 2, instruction: 'Find "Duolingo" → tap "Cancel subscription" → confirm.', note: 'Most Android subscriptions go through Google Play.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my streak if I cancel?',
      answer: 'Your streak is preserved on the free plan. You lose ad-free experience, unlimited hearts, and other Super features, but your progress, levels, and streak remain.',
    },
    {
      question: 'What\'s the difference between Duolingo Plus and Super Duolingo?',
      answer: 'They\'re the same thing — Duolingo rebranded Duolingo Plus as Super Duolingo. Cancel the same way regardless of which name you see.',
    },
  ],
  alternatives: [
    { name: 'Babbel', url: '#', description: 'From $6.95/mo — structured language lessons' },
    { name: 'Rosetta Stone', url: '#', description: 'From $11.99/mo — immersive language learning' },
  ],
  tags: ['education', 'language', 'learning', 'app'],
}
