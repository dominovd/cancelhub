import { CancelGuide } from '@/types/guide'

export const netflix: CancelGuide = {
  slug: 'netflix',
  service: 'Netflix',
  category: 'Streaming',
  logo: '🎬',
  difficulty: 'easy',
  difficultyReason: 'Netflix allows cancellation in 2 clicks from account settings with no retention tactics.',
  darkPatternScore: 1,
  lastVerified: '2026-04-10',
  monthlyPrice: '$15.49–$22.99',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel your Netflix subscription in under 2 minutes. Steps work on web, iOS, Android, and Roku.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.netflix.com/cancelplan',
      steps: [
        { step: 1, instruction: 'Go to netflix.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → Account.' },
        { step: 3, instruction: 'Under "Membership", click "Cancel Membership".' },
        { step: 4, instruction: 'Click "Finish Cancellation" to confirm.' },
        { step: 5, instruction: 'You\'ll receive a confirmation email. Keep it for your records.', note: 'Access continues until the end of your current billing period.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open iPhone Settings → tap your name at the top.' },
        { step: 2, instruction: 'Tap "Subscriptions".' },
        { step: 3, instruction: 'Find and tap "Netflix".' },
        { step: 4, instruction: 'Tap "Cancel Subscription" → Confirm.' },
        { step: 5, instruction: 'You keep access until your billing period ends.', note: 'Apple does not issue partial refunds.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Google Play Store.' },
        { step: 2, instruction: 'Tap your profile icon → "Payments & subscriptions" → "Subscriptions".' },
        { step: 3, instruction: 'Find "Netflix" and tap it.' },
        { step: 4, instruction: 'Tap "Cancel subscription" and follow the prompts.' },
        { step: 5, instruction: 'Access continues until the end of the billing period.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I cancelled but I\'m still being charged.',
      answer: 'You may have two Netflix accounts or subscribed through different channels (web vs App Store). Check both your app store subscriptions and netflix.com/account.',
    },
    {
      question: 'Can I pause instead of cancelling?',
      answer: 'Yes. On netflix.com/account, look for "Pause Membership" — pauses billing for 1–3 months.',
    },
    {
      question: 'Will I lose my watchlist and watch history?',
      answer: 'Netflix keeps your data for 10 months after cancellation. If you resubscribe within that window, everything is restored.',
    },
  ],
  alternatives: [
    { name: 'Apple TV+', url: '/cancel/apple-tv-plus', description: 'Ad-free, $9.99/mo' },
    { name: 'Disney+', url: '/cancel/disney-plus', description: 'Disney, Marvel, Star Wars — $7.99/mo' },
    { name: 'Max', url: '/cancel/max', description: 'HBO content — $9.99/mo' },
  ],
  tags: ['streaming', 'video', 'entertainment'],
}
