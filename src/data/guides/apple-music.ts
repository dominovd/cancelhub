import { CancelGuide } from '@/types/guide'

export const appleMusic: CancelGuide = {
  slug: 'apple-music',
  service: 'Apple Music',
  category: 'Music',
  logo: '🎶',
  difficulty: 'easy',
  difficultyReason: 'Apple Music cancellation is built into iOS settings and takes about 30 seconds.',
  darkPatternScore: 1,
  lastVerified: '2025-04-08',
  monthlyPrice: '$10.99/mo (Individual) · $16.99/mo (Family)',
  refundPolicy: 'No partial refunds. Access continues until billing period ends.',
  description: 'Cancel Apple Music on iPhone, Mac, Android, or the web. Includes free-trial timing.',
  platforms: [
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      deepLink: 'App: Settings → [Your Name] → Subscriptions',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name at the top.' },
        { step: 2, instruction: 'Tap "Subscriptions".' },
        { step: 3, instruction: 'Tap "Apple Music".' },
        { step: 4, instruction: 'Tap "Cancel Subscription" → Confirm.', note: 'If you\'re in a free trial, you\'ll see the trial end date.' },
      ],
    },
    {
      platform: 'web',
      label: 'Website (Mac/PC)',
      deepLink: 'https://music.apple.com/account/subscriptions',
      steps: [
        { step: 1, instruction: 'Open the Music app on Mac → click your name → Account Settings. Or visit music.apple.com and sign in.' },
        { step: 2, instruction: 'Find "Subscriptions" → click "Manage".' },
        { step: 3, instruction: 'Find Apple Music → click "Edit" → "Cancel Subscription".' },
        { step: 4, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Apple Music app on Android.' },
        { step: 2, instruction: 'Tap your profile → Account Settings → Subscriptions.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I\'m in a free trial — when should I cancel?',
      answer: 'Cancel at least 24 hours before the trial ends. The exact end date is shown in Settings → Subscriptions next to the Apple Music entry.',
    },
    {
      question: 'Will I lose my library?',
      answer: 'Downloaded Apple Music tracks (streamed songs) are removed. Music you purchased from iTunes is yours permanently. Your playlists are saved if you resubscribe.',
    },
  ],
  tags: ['music', 'streaming', 'apple'],
}
