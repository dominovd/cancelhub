import { CancelGuide } from '@/types/guide'

export const pandora: CancelGuide = {
  slug: 'pandora',
  service: 'Pandora',
  category: 'Music',
  logo: '🎵',
  difficulty: 'easy',
  difficultyReason: 'Pandora cancellation is available on the web but not directly in the mobile app.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Plus: $4.99/mo · Premium: $9.99/mo · Family Plan: $14.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Pandora Plus or Premium in under 3 minutes via web. Mobile app requires web browser to cancel.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.pandora.com/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to pandora.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → Account.' },
        { step: 3, instruction: 'Click "Subscription".' },
        { step: 4, instruction: 'Click "Cancel Subscription".' },
        { step: 5, instruction: 'Confirm cancellation.', note: 'Free Pandora (ad-supported) remains available after cancelling.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Pandora Premium cannot be cancelled through the iOS app. Visit pandora.com on your browser to cancel.' },
        { step: 2, instruction: 'If subscribed via App Store: open Settings → tap your name → Subscriptions → Pandora → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit pandora.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: open Play Store → Subscriptions → Pandora → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What do I keep after cancelling Pandora?',
      answer: 'You revert to free Pandora with ads. Your stations, thumbs up/down history, and playlists are preserved.',
    },
    {
      question: 'I subscribed through my mobile carrier — how do I cancel?',
      answer: 'Some carriers (AT&T, Verizon, T-Mobile) bundle Pandora. Contact your carrier directly to remove it from your plan. Pandora\'s website won\'t show carrier-billed subscriptions.',
    },
  ],
  alternatives: [
    { name: 'Spotify', url: '/cancel/spotify', description: 'From $9.99/mo — 100M+ songs & podcasts' },
    { name: 'Amazon Music', url: '/cancel/amazon-music', description: '$10.99/mo — 100M songs' },
  ],
  tags: ['music', 'streaming', 'radio', 'audio'],
}
