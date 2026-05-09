import { CancelGuide } from '@/types/guide'

export const discoveryPlus: CancelGuide = {
  slug: 'discovery-plus',
  service: 'Discovery+',
  category: 'Streaming',
  logo: '🔭',
  difficulty: 'easy',
  difficultyReason: 'Discovery+ cancellation is available online and in the app. Cancel where you subscribed.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$4.99/mo (with ads) · $8.99/mo (ad-free)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Discovery+ in under 3 minutes via web, iOS, or Android. Cancel through wherever you originally subscribed.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.discoveryplus.com/account',
      steps: [
        { step: 1, instruction: 'Go to discoveryplus.com → sign in → profile → Account Settings.' },
        { step: 2, instruction: 'Click "Cancel Subscription" → confirm.', note: 'If subscribed via a TV provider, Amazon, or Apple, cancel through that platform instead.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Discovery+ → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Discovery+ → Cancel subscription (if subscribed via Google Play).' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Amazon — where do I cancel?',
      answer: 'Cancel through Amazon: amazon.com → Account → Memberships & Subscriptions → Discovery+ → Cancel channel.',
    },
    {
      question: 'Does Discovery+ include Max (HBO Max) content?',
      answer: 'No. Discovery+ and Max are separate services, though both are owned by Warner Bros. Discovery. You need separate subscriptions for each.',
    },
  ],
  alternatives: [
    { name: 'Peacock', url: '/cancel/peacock', description: '$7.99/mo — NBC, sports & more' },
    { name: 'Paramount+', url: '/cancel/paramount-plus', description: '$7.99/mo — CBS & Paramount content' },
  ],
  tags: ['streaming', 'documentary', 'reality-tv', 'nature', 'entertainment'],
}
