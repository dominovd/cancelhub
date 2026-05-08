import { CancelGuide } from '@/types/guide'

export const patreon: CancelGuide = {
  slug: 'patreon',
  service: 'Patreon',
  category: 'Creator Platforms',
  logo: '🎨',
  difficulty: 'easy',
  difficultyReason: 'Patreon membership cancellation is quick and clean — each creator membership is managed separately.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Varies by creator: $1–$100+/mo per creator',
  refundPolicy: 'No automatic refunds. You can request a refund from the creator within 5 days of being charged. Access continues until end of billing period.',
  description: 'Cancel Patreon membership(s) in under 2 minutes. Each creator is cancelled separately.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.patreon.com/settings/memberships',
      steps: [
        { step: 1, instruction: 'Go to patreon.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → Settings → Memberships.' },
        { step: 3, instruction: 'Find the creator you want to cancel → click "Edit".' },
        { step: 4, instruction: 'Click "Cancel Membership" → confirm.', note: 'Each creator membership must be cancelled separately. You can manage all memberships from patreon.com/settings/memberships.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Patreon app → profile → Memberships.' },
        { step: 2, instruction: 'Find the creator → tap "···".' },
        { step: 3, instruction: 'Tap "Cancel Membership" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Patreon app → profile → Memberships.' },
        { step: 2, instruction: 'Find the creator → tap "Cancel Membership" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I was charged today — can I get a refund?',
      answer: 'Patreon allows you to request a refund from the creator within 5 days of a charge. Go to the creator\'s page → contact them directly, or check your payment history at patreon.com/settings/payments.',
    },
    {
      question: 'I have multiple creator memberships — do I cancel each one?',
      answer: 'Yes. Each Patreon creator membership is separate. Go to patreon.com/settings/memberships to see and cancel each one individually.',
    },
  ],
  tags: ['creator', 'membership', 'content', 'support'],
}
