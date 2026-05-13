import { CancelGuide } from '@/types/guide'

export const skillshare: CancelGuide = {
  slug: 'skillshare',
  service: 'Skillshare',
  category: 'Education',
  logo: '🎨',
  difficulty: 'easy',
  difficultyReason: 'Skillshare cancellation is available online but can involve a few extra steps and a pause offer.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$14/mo · $99/yr',
  refundPolicy: 'No refunds on monthly plans. Annual plans: 7-day refund window — contact support.',
  description: 'Cancel Skillshare membership in under 3 minutes via web or the app.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.skillshare.com/account/membership',
      steps: [
        { step: 1, instruction: 'Go to skillshare.com → sign in → profile → Settings → Membership.' },
        { step: 2, instruction: 'Click "Cancel membership".' },
        { step: 3, instruction: 'Skillshare may offer a pause — click "Cancel anyway" to proceed.' },
        { step: 4, instruction: 'Confirm.', note: 'You keep access until the end of your billing period.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Skillshare → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Skillshare → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Skillshare is offering me a pause — should I take it?',
      answer: "If you're unsure, pausing for 1–3 months keeps your progress and bookmarks. If you're done with Skillshare, click 'Cancel anyway' to proceed.",
    },
    {
      question: 'I have an annual plan — can I get a refund?',
      answer: 'Skillshare offers a 7-day refund window on annual plans. Contact support at support.skillshare.com immediately after purchase if you want a refund.',
    },
  ],
  alternatives: [
    { name: 'MasterClass', url: '/cancel/masterclass', description: '$10/mo — celebrity-taught courses' },
    { name: 'Coursera', url: '#', description: 'From $49/mo — university-level courses' },
  ],
  tags: ['education', 'creative', 'design', 'learning', 'courses'],
}
