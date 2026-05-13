import { CancelGuide } from '@/types/guide'

export const dazn: CancelGuide = {
  slug: 'dazn',
  service: 'DAZN',
  category: 'Sports',
  logo: '🥊',
  difficulty: 'medium',
  difficultyReason: "DAZN cancellation varies by country and requires navigating account settings that aren't always clearly labeled.",
  darkPatternScore: 5,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Varies by country: $19.99–$24.99/mo (US) · £9.99/mo (UK)',
  refundPolicy: 'No refunds. Access continues until end of billing period. Cancellation policies vary by region.',
  description: 'Cancel DAZN in under 5 minutes via web or mobile. Steps vary slightly by country.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.dazn.com/en-US/account',
      steps: [
        { step: 1, instruction: 'Go to dazn.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "My Account".' },
        { step: 3, instruction: 'Navigate to "Subscription".' },
        { step: 4, instruction: 'Click "Cancel subscription" → confirm.', note: 'The exact menu labels may differ slightly depending on your region.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "DAZN" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "DAZN" → tap "Cancel" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find the cancel option in my account.",
      answer: "DAZN's interface varies by region. Try navigating to dazn.com/account directly. If you subscribed through Apple or Google, cancel through your device's subscription settings instead.",
    },
    {
      question: 'Will I get a refund if I cancel mid-month?',
      answer: 'DAZN does not offer refunds for partial months. Your access continues until the billing period ends.',
    },
  ],
  alternatives: [
    { name: 'ESPN+', url: '/cancel/espn-plus', description: '$10.99/mo — US sports streaming' },
    { name: 'FuboTV', url: '/cancel/fubotv', description: 'From $79.99/mo — live sports TV' },
  ],
  tags: ['sports', 'streaming', 'boxing', 'mma', 'international'],
}
