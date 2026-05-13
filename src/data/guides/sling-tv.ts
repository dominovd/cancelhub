import { CancelGuide } from '@/types/guide'

export const slingTv: CancelGuide = {
  slug: 'sling-tv',
  service: 'Sling TV',
  category: 'Streaming',
  logo: '📡',
  difficulty: 'easy',
  difficultyReason: 'Sling TV cancellation is available online and takes just a few minutes, though they may offer discounts to keep you.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: '$40/mo (Orange or Blue) · $55/mo (Orange + Blue)',
  refundPolicy: 'No refunds. Sling offers prorated credit if you cancel partway through the month in some cases.',
  description: 'Cancel Sling TV in under 5 minutes on web or mobile. No contracts or early termination fees.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.sling.com/account/cancel-service',
      steps: [
        { step: 1, instruction: 'Go to sling.com and sign in.' },
        { step: 2, instruction: 'Go to My Account.' },
        { step: 3, instruction: 'Click "Cancel Service".' },
        { step: 4, instruction: 'Sling may offer a discount — click "No thanks" to proceed.', note: 'Sling often offers 50% off for 1–3 months as a retention offer.' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Sling TV" → tap it.', note: 'Only available if you subscribed via the App Store.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions.' },
        { step: 2, instruction: 'Find "Sling TV" → tap "Cancel subscription" → confirm.', note: 'Only available if you subscribed via Google Play.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Sling offered me a discount to stay — should I take it?',
      answer: "Sling often offers 50% off for 1–3 months. If you plan to return, it may be worth taking. If you're done with live TV, just click 'No thanks' and proceed.",
    },
    {
      question: 'Will I lose my DVR recordings if I cancel?',
      answer: 'Yes — Sling Cloud DVR recordings are deleted when you cancel. There is no way to export them.',
    },
  ],
  alternatives: [
    { name: 'Philo', url: '/cancel/philo', description: '$25/mo — 70+ channels, no sports' },
    { name: 'YouTube TV', url: '/cancel/youtube-tv', description: '$72.99/mo — 100+ channels' },
  ],
  tags: ['streaming', 'live-tv', 'sports', 'cable-alternative'],
}
