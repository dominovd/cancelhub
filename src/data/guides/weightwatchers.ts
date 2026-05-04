import { CancelGuide } from '@/types/guide'

export const weightwatchers: CancelGuide = {
  slug: 'weightwatchers',
  service: 'WeightWatchers',
  category: 'Health & Wellness',
  logo: '⚖️',
  difficulty: 'medium',
  difficultyReason: 'WeightWatchers cancellation requires contacting support or navigating account settings, and may involve a commitment period.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$23–$55/mo depending on plan (Digital, Workshops+Digital)',
  refundPolicy: 'No refunds. Commitment plans (3 or 6 months) require completing the term before cancelling.',
  description: 'Cancel WeightWatchers digital or workshop membership in under 5 minutes via web or by calling support.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.weightwatchers.com/us/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to weightwatchers.com and sign in.' },
        { step: 2, instruction: 'Click your profile → Account → Subscription.' },
        { step: 3, instruction: 'Click "Cancel Subscription" or "Manage Plan".' },
        { step: 4, instruction: 'If no cancel button is visible, call 1-800-651-6000 or use live chat.', note: 'If you are in a commitment plan, you may not be able to cancel until the term ends. Check your plan details.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Go to Settings → tap your Apple ID name → Subscriptions.' },
        { step: 2, instruction: 'Find "WeightWatchers" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
        { step: 4, instruction: 'Note: only applies if you subscribed via the App Store.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → tap your profile → Subscriptions.' },
        { step: 2, instruction: 'Find "WeightWatchers" → tap "Cancel subscription".' },
        { step: 3, instruction: 'Confirm cancellation.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I\'m in a commitment plan — can I cancel early?',
      answer: 'WeightWatchers commitment plans (3 or 6 months) generally do not allow early cancellation. You must complete the term. Contact support at 1-800-651-6000 to confirm your plan terms.',
    },
    {
      question: 'I can\'t find the Cancel button in my account.',
      answer: 'Some plans require you to call or chat. Contact WeightWatchers at 1-800-651-6000 or use the live chat at weightwatchers.com/us/form/contact-us.',
    },
  ],
  alternatives: [
    { name: 'Noom', url: '#', description: 'From $59/mo — psychology-based weight loss' },
    { name: 'Lose It!', url: '#', description: 'Free with premium — calorie tracking app' },
  ],
  tags: ['health', 'wellness', 'weight-loss', 'diet', 'fitness'],
}
