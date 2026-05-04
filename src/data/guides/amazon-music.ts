import { CancelGuide } from '@/types/guide'

export const amazonMusic: CancelGuide = {
  slug: 'amazon-music',
  service: 'Amazon Music Unlimited',
  category: 'Music',
  logo: '🎵',
  difficulty: 'easy',
  difficultyReason: 'Amazon Music Unlimited cancellation is straightforward through Amazon account settings.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: '$10.99/mo · $8.99/mo (Prime members) · $4.99/mo (single device)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Amazon Music Unlimited in under 2 minutes at Amazon. Prime members can downgrade to free Prime Music.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.amazon.com/hz/audible/mlp/mso/manage-subscriptions',
      steps: [
        { step: 1, instruction: 'Go to amazon.com → "Account & Lists" → "Memberships & Subscriptions".' },
        { step: 2, instruction: 'Find "Amazon Music Unlimited" → click "Cancel Subscription".' },
        { step: 3, instruction: 'Confirm cancellation.', note: 'Prime members retain free access to Prime Music (2 million songs) after cancelling Unlimited.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Amazon Music Unlimited cannot be cancelled through the app.' },
        { step: 2, instruction: 'Visit amazon.com on your mobile browser and follow the web steps above.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Same as iOS — use amazon.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via Google Play, check Play Store → Subscriptions.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I\'m a Prime member — what do I keep after cancelling?',
      answer: 'You keep access to Prime Music, which includes 2 million songs ad-free. You lose access to Amazon Music Unlimited\'s 100 million song catalog.',
    },
    {
      question: 'I was on a free trial — will I be charged if I cancel now?',
      answer: 'No. Cancel before your trial ends and you won\'t be charged. Go to amazon.com → Account → Memberships & Subscriptions to cancel the trial.',
    },
  ],
  alternatives: [
    { name: 'Spotify', url: '/cancel/spotify', description: 'From $9.99/mo — 100M+ songs & podcasts' },
    { name: 'Apple Music', url: '/cancel/apple-music', description: '$10.99/mo — 100M songs, lossless audio' },
  ],
  tags: ['music', 'streaming', 'amazon', 'audio'],
}
