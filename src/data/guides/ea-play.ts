import { CancelGuide } from '@/types/guide'

export const eaPlay: CancelGuide = {
  slug: 'ea-play',
  service: 'EA Play',
  category: 'Gaming',
  logo: '🎮',
  difficulty: 'easy',
  difficultyReason: 'EA Play cancellation is available online but requires a few steps to find the right page.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'EA Play: $4.99/mo · EA Play Pro: $14.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel EA Play or EA Play Pro in under 5 minutes on web, PlayStation, Xbox, or device settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.ea.com/ea-app',
      steps: [
        { step: 1, instruction: 'Go to ea.com → sign in → "Account" → "Subscriptions".' },
        { step: 2, instruction: 'Find EA Play or EA Play Pro → click "Cancel Subscription".' },
        { step: 3, instruction: 'Confirm cancellation.', note: 'If subscribed via PlayStation or Xbox, you must cancel through their platform — not EA\'s website.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → "Subscriptions".' },
        { step: 2, instruction: 'Find "EA Play" → tap it → "Cancel Subscription" → confirm. (Only if subscribed via App Store.)' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Subscriptions".' },
        { step: 2, instruction: 'Find "EA Play" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I subscribed through PlayStation/Xbox — where do I cancel?',
      answer: 'Cancel through your console: PlayStation → Settings → Account Management → Subscriptions, or Xbox → Microsoft Account → Services & Subscriptions.',
    },
    {
      question: 'Will I lose my game progress if I cancel EA Play?',
      answer: 'Your game saves and progress are kept. You lose access to the game vault (free games included with EA Play) and member discounts.',
    },
  ],
  alternatives: [
    { name: 'Xbox Game Pass', url: '#', description: '$14.99/mo — 100s of games + EA Play included' },
    { name: 'PlayStation Plus', url: '#', description: 'From $9.99/mo — PS games & online play' },
  ],
  tags: ['gaming', 'ea', 'games', 'subscription'],
}
