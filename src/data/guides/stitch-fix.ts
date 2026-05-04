import { CancelGuide } from '@/types/guide'

export const stitchFix: CancelGuide = {
  slug: 'stitch-fix',
  service: 'Stitch Fix',
  category: 'Fashion & Shopping',
  logo: '👗',
  difficulty: 'easy',
  difficultyReason: 'Stitch Fix cancellation is available online, though the terminology ("pausing" vs "cancelling a Fix") can be confusing.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$20 styling fee per Fix (credited toward purchase) · Freestyle has no subscription',
  refundPolicy: 'Return unwanted items within 3 days of delivery. The $20 styling fee is non-refundable if you keep no items.',
  description: 'Cancel or pause your Stitch Fix subscription in 2 minutes online. You can keep a one-time Fix active without scheduling future deliveries.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.stitchfix.com/account/settings',
      steps: [
        { step: 1, instruction: 'Go to stitchfix.com and sign in.' },
        { step: 2, instruction: 'Click your profile → "Account Settings".' },
        { step: 3, instruction: 'Under "Fix Schedule", click "Cancel Fixes" or change to "Not scheduled".' },
        { step: 4, instruction: 'Confirm.', note: 'This cancels future automatic Fixes. Your account stays open. To close your account entirely, contact support at support.stitchfix.com.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Stitch Fix does not offer in-app subscription management. Visit stitchfix.com on your browser to cancel.' },
        { step: 2, instruction: 'If you have an in-app purchase, check Settings → Apple ID → Subscriptions.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Stitch Fix does not offer in-app subscription management. Visit stitchfix.com on your browser to manage your Fix schedule.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "What's the difference between cancelling a Fix and closing my account?",
      answer: 'Cancelling Fixes stops future automatic shipments but keeps your account open. Closing your account fully removes your profile. Contact support if you want full account deletion.',
    },
    {
      question: 'I just received a Fix — do I still need to return items?',
      answer: "Yes. Return any unwanted items within 3 days using the prepaid return bag. You're only charged for items you keep.",
    },
  ],
  alternatives: [
    { name: 'Trunk Club', url: '#', description: "Nordstrom's personal styling service" },
    { name: 'Nordstrom Rack', url: '#', description: 'Shop discounted designer brands directly' },
  ],
  tags: ['fashion', 'clothing', 'styling', 'subscription-box'],
}
