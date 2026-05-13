import { CancelGuide } from '@/types/guide'

export const substack: CancelGuide = {
  slug: 'substack',
  service: 'Substack',
  category: 'Creator Platforms',
  logo: '📰',
  difficulty: 'easy',
  difficultyReason: 'Substack paid newsletter cancellation is simple and done directly from your subscription email or account settings.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Varies by newsletter: $5–$30+/mo per newsletter',
  refundPolicy: "No automatic refunds. Contact the newsletter author directly to request a refund. Annual subscriptions may be prorated at the author's discretion.",
  description: 'Cancel Substack paid newsletter subscription in under 2 minutes. Each newsletter cancels separately.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://substack.com/account/payments',
      steps: [
        { step: 1, instruction: 'Go to substack.com and sign in → click your profile → Settings.' },
        { step: 2, instruction: 'Go to "Subscriptions" or visit substack.com/account/payments.' },
        { step: 3, instruction: 'Find the newsletter you want to cancel → click "Manage" → Cancel subscription → confirm.', note: 'Each Substack newsletter is a separate subscription. Cancel each one individually from your account payments page.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Substack app → profile → Subscriptions → find the newsletter → tap to manage → Cancel.' },
        { step: 2, instruction: 'If subscribed via App Store: open Settings → tap your name → Subscriptions → find the Substack newsletter → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Substack app → profile → Subscriptions → find the newsletter → Cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: open Play Store → Subscriptions → find the newsletter → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I want to cancel all my Substack subscriptions at once.',
      answer: "Substack doesn't have a bulk cancel option. You must cancel each newsletter individually from substack.com/account/payments.",
    },
    {
      question: 'Can I get a refund on my annual Substack subscription?',
      answer: 'Contact the newsletter author directly — Substack gives authors control over refund decisions. Annual subscribers can often get a prorated refund within the first few months.',
    },
  ],
  tags: ['newsletter', 'creator', 'writing', 'journalism'],
}
