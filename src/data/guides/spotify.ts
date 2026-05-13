import { CancelGuide } from '@/types/guide'

export const spotify: CancelGuide = {
  slug: 'spotify',
  service: 'Spotify',
  category: 'Music',
  logo: '🎵',
  difficulty: 'easy',
  difficultyReason: 'Cancellation on the web is straightforward, though the app does not support cancellation directly.',
  darkPatternScore: 2,
  lastVerified: '2026-04-08',
  monthlyPrice: '$11.99',
  refundPolicy: 'No refunds. Premium continues until the end of the billing period.',
  description: 'Cancel Spotify Premium in under 60 seconds. Web is the fastest path — the app does not let you cancel directly.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.spotify.com/account/subscription/cancel',
      steps: [
        { step: 1, instruction: 'Go to spotify.com/account and log in.' },
        { step: 2, instruction: 'Click "Change plan" or scroll to "Your plan".' },
        { step: 3, instruction: 'Scroll down and click "Cancel Premium".' },
        { step: 4, instruction: 'Follow the confirmation steps (Spotify may offer a discount — skip if not interested).' },
        { step: 5, instruction: 'Click "Cancel anyway" to confirm. You\'ll get a confirmation email.', note: 'You keep Premium until the billing period ends.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open iPhone Settings → tap your Apple ID name.' },
        { step: 2, instruction: 'Tap "Subscriptions" → find Spotify.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → tap your profile icon.' },
        { step: 2, instruction: 'Go to "Payments & subscriptions" → "Subscriptions".' },
        { step: 3, instruction: 'Find Spotify → tap "Cancel subscription".' },
        { step: 4, instruction: 'Follow the confirmation prompts.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'The "Cancel Premium" button is greyed out.',
      answer: 'You subscribed through the App Store or Google Play. Cancel through your device settings instead — see the iOS or Android tab above.',
    },
    {
      question: 'Spotify offered me a discount — should I take it?',
      answer: 'If you want to keep Spotify, yes — they sometimes offer 1–3 months at 50% off or free. If you genuinely want to cancel, click "Cancel anyway".',
    },
  ],
  alternatives: [
    { name: 'Apple Music', url: '/cancel/apple-music', description: '$10.99/mo, great if you\'re in the Apple ecosystem' },
    { name: 'YouTube Music', url: '/cancel/youtube-music', description: '$10.99/mo, included with YouTube Premium' },
  ],
  tags: ['music', 'streaming', 'audio'],
}
