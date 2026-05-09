import { CancelGuide } from '@/types/guide'

export const beachbody: CancelGuide = {
  slug: 'beachbody',
  service: 'BODi (Beachbody On Demand)',
  category: 'Health & Fitness',
  logo: '💪',
  difficulty: 'medium',
  difficultyReason: 'Beachbody (now BODi) cancellation requires contacting support or navigating buried account settings. Auto-renewal is aggressive.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$19.99/mo · $119.88/yr',
  refundPolicy: '30-day money-back guarantee on first purchase. No refunds after 30 days.',
  description: 'Cancel BODi (Beachbody On Demand) in under 5 minutes via web or by contacting support. 30-day refund available for new subscribers.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.beachbodyondemand.com/account',
      steps: [
        { step: 1, instruction: 'Go to beachbodyondemand.com → sign in → Account Settings → Membership.' },
        { step: 2, instruction: 'Click "Cancel Membership" or "Cancel Subscription".' },
        { step: 3, instruction: 'If no cancel button, use live chat at team.beachbody.com/contact or call 1-800-470-7870.', note: 'For a 30-day refund, contact support immediately after signing up. Annual members can request a prorated refund within 30 days.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "BODi (Beachbody)" → tap it → tap "Cancel Subscription" (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → Subscriptions → BODi → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I signed up through a Beachbody coach — how do I cancel?',
      answer: 'Contact your coach directly or call Beachbody customer service at 1-800-470-7870. Coach-referral subscriptions may have different cancellation terms.',
    },
    {
      question: 'The app is now called BODi — is it the same as Beachbody On Demand?',
      answer: 'Yes. Beachbody On Demand was rebranded to BODi. Your subscription, content, and login are the same. Cancel the same way.',
    },
  ],
  alternatives: [
    { name: 'Peloton', url: '/cancel/peloton', description: 'From $12.99/mo — fitness classes' },
    { name: 'ClassPass', url: '/cancel/classpass', description: 'From $19/mo — gym & class credits' },
  ],
  tags: ['fitness', 'workout', 'health', 'streaming', 'wellness'],
}
