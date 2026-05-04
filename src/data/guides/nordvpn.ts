import { CancelGuide } from '@/types/guide'

export const nordvpn: CancelGuide = {
  slug: 'nordvpn',
  service: 'NordVPN',
  category: 'Security',
  logo: '🔒',
  difficulty: 'easy',
  difficultyReason: 'NordVPN offers a 30-day money-back guarantee and a simple cancellation flow.',
  darkPatternScore: 2,
  lastVerified: '2025-04-08',
  monthlyPrice: '$3.99–$12.99/mo (depending on plan)',
  refundPolicy: '30-day money-back guarantee. Request a refund via live chat or email within 30 days.',
  description: 'Cancel NordVPN and get a full refund if you\'re within 30 days of purchase. Takes under 5 minutes.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://my.nordaccount.com/dashboard/nordvpn/',
      steps: [
        { step: 1, instruction: 'Go to my.nordaccount.com and sign in.' },
        { step: 2, instruction: 'Click "Billing" or "Subscription" in the left sidebar.' },
        { step: 3, instruction: 'Find your plan → click "Cancel auto-renewal" or "Cancel subscription".' },
        { step: 4, instruction: 'Confirm cancellation.' },
        { step: 5, instruction: 'For a refund: start a live chat at nordvpn.com/support and request it. Refunds are processed in 5–10 business days.', note: 'NordVPN does not offer refunds through the account dashboard — you must contact support.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → NordVPN → Cancel.' },
        { step: 2, instruction: 'Note: App Store subscriptions are not eligible for the NordVPN 30-day refund. Contact Apple instead.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → NordVPN → Cancel.' },
        { step: 2, instruction: 'For refunds on Play purchases, contact Google Play support within 48 hours.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I\'m past 30 days — can I still get a refund?',
      answer: 'The 30-day guarantee is firm. After that, no refunds are available. You can still cancel auto-renewal so you won\'t be charged again.',
    },
    {
      question: 'I can\'t find the cancel option in my account.',
      answer: 'If you subscribed through a third party (App Store, Google Play, or a reseller like Amazon), you must cancel through that platform.',
    },
  ],
  tags: ['vpn', 'security', 'privacy'],
}
