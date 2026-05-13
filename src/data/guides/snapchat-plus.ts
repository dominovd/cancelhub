import { CancelGuide } from '@/types/guide'

export const snapchatPlus: CancelGuide = {
  slug: 'snapchat-plus',
  service: 'Snapchat+',
  category: 'Social Media',
  logo: '👻',
  difficulty: 'easy',
  difficultyReason: 'Snapchat+ cancellation is quick and available in the app or device settings.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: '$3.99/mo · $29.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Snapchat+ in under 2 minutes via the Snapchat app, iOS Settings, or Google Play.',
  platforms: [
    {
      platform: 'web',
      label: 'Snapchat App',
      steps: [
        { step: 1, instruction: 'Open Snapchat → tap your profile icon.' },
        { step: 2, instruction: 'Tap ⚙️ Settings → scroll to "Snapchat+".' },
        { step: 3, instruction: 'Tap "Manage Membership" → "Cancel Subscription".' },
        { step: 4, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → "Subscriptions".' },
        { step: 2, instruction: 'Find "Snapchat+" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Subscriptions".' },
        { step: 2, instruction: 'Find "Snapchat+" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my Snapchat streaks and memories if I cancel?',
      answer: 'No. Your streaks, memories, friends, and messages are all preserved on the free Snapchat plan. You only lose Snapchat+ exclusive features.',
    },
    {
      question: 'I can\'t find "Manage Membership" in the app.',
      answer: 'Try cancelling through your device: iOS Settings → Apple ID → Subscriptions, or Google Play → Subscriptions. This works regardless of how you originally subscribed.',
    },
  ],
  alternatives: [
    { name: 'Instagram', url: '#', description: 'Free social media with no subscription needed' },
  ],
  tags: ['social-media', 'snapchat', 'messaging', 'premium'],
}
