import { CancelGuide } from '@/types/guide'

export const masterclass: CancelGuide = {
  slug: 'masterclass',
  service: 'MasterClass',
  category: 'Education',
  logo: '🎓',
  difficulty: 'easy',
  difficultyReason: 'MasterClass cancellation is available online and takes a few minutes, though the layout can make the cancel option hard to find.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Individual: $10/mo (billed $120/yr) · Duo: $15/mo · Family: $20/mo',
  refundPolicy: '30-day satisfaction guarantee on annual plans. Contact support within 30 days for a full refund.',
  description: 'Cancel MasterClass in under 3 minutes via account settings. 30-day refund available on annual plans.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.masterclass.com/account/manage-membership',
      steps: [
        { step: 1, instruction: 'Go to masterclass.com → sign in → profile icon → Settings → Membership.' },
        { step: 2, instruction: 'Click "Cancel Membership".' },
        { step: 3, instruction: 'Follow prompts → confirm cancellation.', note: 'For a refund within 30 days of purchase, contact support at masterclass.com/help after cancelling.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → MasterClass → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → MasterClass → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I get a refund on my MasterClass annual plan?',
      answer: 'Yes — MasterClass offers a 30-day money-back guarantee on annual plans. Contact support at masterclass.com/help within 30 days of your purchase. Refunds are processed in 5–10 business days.',
    },
    {
      question: "Will I lose access to courses I've started?",
      answer: 'Yes. Access ends at the end of your billing period after cancellation. Download any offline-saved content before cancelling.',
    },
  ],
  alternatives: [
    { name: 'Skillshare', url: '/cancel/skillshare', description: '$14/mo — hands-on creative classes' },
    { name: 'Coursera', url: '#', description: 'From $49/mo — university-level courses' },
  ],
  tags: ['education', 'learning', 'courses', 'skills', 'celebrity'],
}
