import { CancelGuide } from '@/types/guide'

export const peloton: CancelGuide = {
  slug: 'peloton',
  service: 'Peloton',
  category: 'Health & Fitness',
  logo: '🚴',
  difficulty: 'medium',
  difficultyReason: 'Peloton membership cancellation requires going through account settings and may involve multiple confirmation steps.',
  darkPatternScore: 5,
  lastVerified: '2026-05-01',
  monthlyPrice: '$12.99/mo (App One) · $24/mo (App+) · $44/mo (All-Access with hardware)',
  refundPolicy: 'No refunds on membership fees. Equipment has a separate 30-day return policy.',
  description: 'Cancel Peloton membership in under 5 minutes via the app or web. Hardware and app memberships cancel separately.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://members.onepeloton.com/profile/membership',
      steps: [
        { step: 1, instruction: 'Go to members.onepeloton.com and sign in.' },
        { step: 2, instruction: 'Click your Profile icon in the top right.' },
        { step: 3, instruction: 'Select "Membership".' },
        { step: 4, instruction: 'Click "Cancel Membership".' },
        { step: 5, instruction: 'Follow the on-screen prompts.' },
        { step: 6, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Peloton app.' },
        { step: 2, instruction: 'Tap Profile → Settings → Membership → Cancel Membership.' },
        { step: 3, instruction: 'If subscribed via App Store: go to Settings → Apple ID → Subscriptions → Peloton → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Peloton app.' },
        { step: 2, instruction: 'Tap Profile → Settings → Membership → Cancel.' },
        { step: 3, instruction: 'Or cancel via Google Play → Subscriptions → Peloton → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I have Peloton hardware — does cancelling the membership affect my bike?',
      answer: 'Your Peloton bike or tread still works for manual workouts. You lose access to live and on-demand classes, leaderboard, metrics tracking, and the Peloton app\'s full library.',
    },
    {
      question: 'What\'s the difference between App and All-Access membership?',
      answer: 'App memberships (App One/App+) are for users without hardware. All-Access is for hardware owners. Cancel each separately if you have both.',
    },
  ],
  alternatives: [
    { name: 'ClassPass', url: '/cancel/classpass', description: 'From $19/mo — gym & fitness classes' },
    { name: 'Apple Fitness+', url: '#', description: '$9.99/mo — included with Apple One' },
  ],
  tags: ['fitness', 'cycling', 'health', 'workout', 'hardware'],
}
