import { CancelGuide } from '@/types/guide'

export const noom: CancelGuide = {
  slug: 'noom',
  service: 'Noom',
  category: 'Health & Wellness',
  logo: '🥗',
  difficulty: 'hard',
  difficultyReason: 'Noom is one of the hardest subscriptions to cancel — they require calling or chatting with support, use long commitment plans, and have a notoriously aggressive retention process.',
  darkPatternScore: 9,
  lastVerified: '2025-05-01',
  monthlyPrice: '$59–$209/mo depending on plan length (longer = cheaper per month)',
  refundPolicy: 'No refunds after the trial period. Noom offers a 14-day trial for $0.50–$1. Cancel within the trial to avoid charges.',
  description: 'Cancel Noom — requires live chat or phone support. No direct cancel button. Must act within 14-day trial to avoid being charged.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://web.noom.com/settings/',
      steps: [
        { step: 1, instruction: 'Go to web.noom.com → sign in → Settings → Account.' },
        { step: 2, instruction: 'Look for "Cancel subscription" — if not visible, go to noom.com/contact or open the in-app chat.' },
        { step: 3, instruction: 'Request cancellation from the support agent. Expect retention offers — decline firmly.' },
        { step: 4, instruction: 'Get a cancellation confirmation in writing (email or chat transcript).', note: 'Noom requires you to initiate contact to cancel. There is no self-serve cancel button for most accounts. This is intentional.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store (rare): Settings → Apple ID → Subscriptions → Noom → Cancel.' },
        { step: 2, instruction: 'Most Noom subscriptions are direct — cancel via web.noom.com or in-app chat.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Noom → Cancel.' },
        { step: 2, instruction: 'For direct subscriptions, use web.noom.com or in-app chat.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find the cancel button in Noom.",
      answer: "Most Noom accounts don't have a self-serve cancel button. You must contact support via in-app chat or at noom.com/contact. The FTC has received numerous complaints about this practice.",
    },
    {
      question: 'My Noom trial ended and I was charged — can I get a refund?',
      answer: "Noom's refund policy is strict. Contact their support immediately and request a refund. Some users have success citing the difficulty of cancellation. File a dispute with your credit card as a last resort.",
    },
  ],
  tags: ['health', 'wellness', 'weight-loss', 'diet', 'coaching'],
}
