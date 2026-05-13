import { CancelGuide } from '@/types/guide'

export const norton: CancelGuide = {
  slug: 'norton',
  service: 'Norton 360',
  category: 'Security',
  logo: '🛡️',
  difficulty: 'medium',
  difficultyReason: 'Norton uses aggressive retention tactics including multiple confirmation screens, discounts, and auto-renewal that is hard to spot.',
  darkPatternScore: 7,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 5,
  },
  lastVerified: '2026-05-01',
  monthlyPrice: '$19.99–$34.99/mo (annual plans billed upfront: $29.99–$99.99/yr)',
  refundPolicy: '60-day money-back guarantee on annual plans. Contact support within 60 days of purchase.',
  description: 'Cancel Norton 360 and stop auto-renewal in under 5 minutes. Includes steps to get your 60-day refund.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://my.norton.com/',
      steps: [
        { step: 1, instruction: 'Go to my.norton.com and sign in.' },
        { step: 2, instruction: 'Click "My Subscriptions".' },
        { step: 3, instruction: 'Find Norton 360 and click "Cancel auto-renewal".' },
        { step: 4, instruction: 'Follow the prompts and confirm cancellation.', note: 'For a refund within 60 days, contact Norton support via chat at norton.com/support after cancelling.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Norton 360" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm. (Only if subscribed via App Store.)' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "Norton 360" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Norton keeps charging me even after I cancelled.',
      answer: 'Check that you cancelled auto-renewal at my.norton.com, not just uninstalled the app. Uninstalling does NOT cancel your subscription. Contact support at norton.com/support if charges continue.',
    },
    {
      question: 'How do I get my 60-day refund?',
      answer: 'Contact Norton support via live chat at norton.com/support within 60 days of your purchase date. Have your order number ready. Refunds are processed in 5–7 business days.',
    },
  ],
  alternatives: [
    { name: 'Malwarebytes', url: '#', description: 'Free basic protection or $44.99/yr premium' },
    { name: 'Windows Defender', url: '#', description: 'Free built-in antivirus for Windows users' },
  ],
  tags: ['security', 'antivirus', 'vpn', 'protection'],
}
