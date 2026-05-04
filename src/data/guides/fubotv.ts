import { CancelGuide } from '@/types/guide'

export const fuboTV: CancelGuide = {
  slug: 'fubotv',
  service: 'FuboTV',
  category: 'Streaming',
  logo: '📺',
  difficulty: 'easy',
  difficultyReason: 'FuboTV offers a simple online cancellation with no early termination fees.',
  darkPatternScore: 3,
  lastVerified: '2025-04-10',
  monthlyPrice: '$84.99/mo (Pro plan)',
  refundPolicy: 'No refunds. Access continues until the end of the billing period.',
  description: 'Cancel FuboTV in under 2 minutes on the web. No cancellation fee — access continues until billing period ends.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to fubo.tv and sign in.' },
        { step: 2, instruction: 'Click your profile icon (top right) → "My Account".' },
        { step: 3, instruction: 'Click "Manage Subscription".' },
        { step: 4, instruction: 'Click "Cancel Subscription".', note: 'FuboTV may show you a pause option — only click "Cancel" if you want to fully cancel.' },
        { step: 5, instruction: 'Select a reason → confirm cancellation.' },
        { step: 6, instruction: "You'll receive a confirmation email." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "FuboTV" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "FuboTV" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Roku or Amazon — how do I cancel?',
      answer: 'Cancel through the platform you used: Roku (Settings → Subscriptions → FuboTV), Amazon (amazon.com/mysubscriptions), or Apple/Google (device subscription settings).',
    },
    {
      question: 'Does FuboTV offer a free trial?',
      answer: 'Free trials are occasionally offered. If cancelling during a trial, cancel at least 24 hours before it ends to avoid being charged.',
    },
  ],
  alternatives: [
    { name: 'YouTube TV', url: '/cancel/youtube-tv', description: '$72.99/mo — 100+ channels, unlimited DVR' },
    { name: 'Sling TV', url: '/cancel/sling-tv', description: 'From $40/mo — flexible channel packages' },
    { name: 'DirecTV Stream', url: '#', description: 'From $64.99/mo — live sports focus' },
  ],
  tags: ['streaming', 'live-tv', 'sports', 'cable-alternative'],
}
