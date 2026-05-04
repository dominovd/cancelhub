import { CancelGuide } from '@/types/guide'

export const whoop: CancelGuide = {
  slug: 'whoop',
  service: 'WHOOP',
  category: 'Health & Fitness',
  logo: '⌚',
  difficulty: 'medium',
  difficultyReason: 'WHOOP membership requires contacting support to cancel and may involve a device commitment period.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$30/mo · $239/yr · $399/2yr (membership required to use device)',
  refundPolicy: 'No refunds after 30 days. If within 30 days and unused, contact support for a return.',
  description: 'Cancel WHOOP membership — requires contacting support. The device is free but only works with an active membership.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://app.whoop.com/profile/membership',
      steps: [
        { step: 1, instruction: 'Go to app.whoop.com → sign in → click your profile → Membership.' },
        { step: 2, instruction: 'Review your commitment period end date — cancelling early may not be possible if you are in a device commitment period.' },
        { step: 3, instruction: 'Click "Cancel Membership" — if not available, contact support at support.whoop.com.' },
        { step: 4, instruction: 'If prompted, confirm cancellation.', note: 'The WHOOP device stops working after membership ends. You cannot use WHOOP hardware without an active membership.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions → WHOOP → Cancel Subscription.', note: 'Only applies if you subscribed via the App Store.' },
        { step: 2, instruction: 'App Store subscriptions bypass WHOOP\'s website — cancel there if that\'s how you signed up.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions → WHOOP → Cancel subscription.', note: 'Only applies if you subscribed via Google Play.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'My membership is in a commitment period — can I still cancel?',
      answer: 'WHOOP requires you to complete your commitment period (usually 6 or 12 months) before you can cancel. Contact support at support.whoop.com to confirm your end date.',
    },
    {
      question: 'What happens to my WHOOP device if I cancel?',
      answer: 'The device becomes a paperweight — it only works with an active WHOOP membership. You can sell or give away the device, but the new owner must start their own membership.',
    },
  ],
  tags: ['fitness', 'health', 'wearable', 'tracker'],
}
