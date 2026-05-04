import { CancelGuide } from '@/types/guide'

export const appleTvPlus: CancelGuide = {
  slug: 'apple-tv-plus',
  service: 'Apple TV+',
  category: 'Streaming',
  logo: '🍎',
  difficulty: 'easy',
  difficultyReason: 'Apple TV+ is one of the easiest subscriptions to cancel — Apple provides a clean, friction-free flow.',
  darkPatternScore: 1,
  lastVerified: '2025-05-01',
  monthlyPrice: '$9.99/mo · $99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period. Apple may offer prorated refunds in some regions.',
  description: 'Cancel Apple TV+ in under 2 minutes via iPhone, Mac, or the web. Apple makes it easy with no retention screens.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://appleid.apple.com/',
      steps: [
        { step: 1, instruction: 'Go to appleid.apple.com and sign in.' },
        { step: 2, instruction: 'Click "Subscriptions".' },
        { step: 3, instruction: 'Find "Apple TV+" → click it.' },
        { step: 4, instruction: 'Click "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name.' },
        { step: 2, instruction: 'Tap "Subscriptions".' },
        { step: 3, instruction: 'Find "Apple TV+" → tap it.' },
        { step: 4, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android / Other',
      steps: [
        { step: 1, instruction: 'Apple TV+ subscriptions cannot be cancelled via Android. Visit appleid.apple.com on any browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I got Apple TV+ free with a device — do I need to cancel?',
      answer: 'If your free trial period has ended and you haven\'t cancelled, you may be billed. Check appleid.apple.com to confirm your subscription status.',
    },
    {
      question: 'Does cancelling affect my other Apple subscriptions?',
      answer: 'No. Each Apple subscription is independent. Cancelling Apple TV+ does not affect iCloud+, Apple Music, or Apple Arcade.',
    },
  ],
  alternatives: [
    { name: 'Netflix', url: '/cancel/netflix', description: 'From $7.99/mo — largest streaming library' },
    { name: 'Disney+', url: '/cancel/disney-plus', description: 'From $7.99/mo — Disney, Marvel, Star Wars' },
  ],
  tags: ['streaming', 'apple', 'video', 'originals'],
}
