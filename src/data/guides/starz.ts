import { CancelGuide } from '@/types/guide'

export const starz: CancelGuide = {
  slug: 'starz',
  service: 'Starz',
  category: 'Streaming',
  logo: '⭐',
  difficulty: 'easy',
  difficultyReason: 'Starz cancellation is available online and in the app. Where you cancel depends on how you subscribed.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$9.99/mo · $74.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Starz in under 3 minutes via web, app, iOS, or Android. Cancel through wherever you subscribed.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.starz.com/us/en/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to starz.com → sign in → profile → Account → Subscription.' },
        { step: 2, instruction: 'Click "Cancel Subscription" → confirm.', note: 'Only works if subscribed directly through Starz. If subscribed via Amazon, Apple, or Roku, cancel through that platform.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Settings → Apple ID → Subscriptions → Starz → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Google Play → Subscriptions → Starz → Cancel subscription (if subscribed via Google Play).' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through Amazon Prime Video Channels — how do I cancel?',
      answer: 'Cancel through Amazon: amazon.com → Account → Memberships & Subscriptions → Starz → Cancel channel.',
    },
    {
      question: 'I subscribed through my cable/TV provider — how do I cancel?',
      answer: 'Contact your TV provider directly (Comcast, DirecTV, etc.) to remove Starz from your package. The Starz website cannot cancel provider-billed subscriptions.',
    },
  ],
  alternatives: [
    { name: 'Showtime (Paramount+)', url: '/cancel/paramount-plus', description: '$12.99/mo — with Paramount+' },
    { name: 'HBO Max', url: '#', description: '$15.99/mo — premium HBO content' },
  ],
  tags: ['streaming', 'video', 'movies', 'tv', 'premium'],
}
