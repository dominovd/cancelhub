import { CancelGuide } from '@/types/guide'

export const hulu: CancelGuide = {
  slug: 'hulu',
  service: 'Hulu',
  category: 'Streaming',
  logo: '📺',
  difficulty: 'medium',
  difficultyReason: 'Hulu uses multiple confirmation screens and offers discounts before letting you cancel.',
  darkPatternScore: 5,
  lastVerified: '2026-04-06',
  monthlyPrice: '$7.99/mo (with ads) · $17.99/mo (no ads)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Hulu on web, iOS, Android, or Amazon in 5 minutes. Includes Disney Bundle cancellation.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://secure.hulu.com/account/cancel',
      steps: [
        { step: 1, instruction: 'Go to hulu.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account".' },
        { step: 3, instruction: 'Under "Your Subscription", click "Cancel".' },
        { step: 4, instruction: 'Select a reason → Hulu will make offers. Click "Continue to Cancel".' },
        { step: 5, instruction: 'Click "Cancel Subscription" to confirm.' },
        { step: 6, instruction: 'You\'ll receive a confirmation email.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Hulu" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions → find Hulu.' },
        { step: 2, instruction: 'Tap "Cancel subscription" → follow the prompts.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I have the Disney Bundle — does cancelling Hulu cancel Disney+ too?',
      answer: 'No. The Disney Bundle is managed through Hulu billing. Cancelling Hulu cancels the entire bundle. If you want Disney+ separately, subscribe directly through Disney after cancellation.',
    },
    {
      question: 'I can\'t find the Cancel button on my account page.',
      answer: 'If you subscribed through a third party (Amazon, Roku, Apple, or Google), you must cancel through that platform — the cancel button won\'t appear on Hulu\'s website.',
    },
  ],
  tags: ['streaming', 'video', 'entertainment', 'disney-bundle'],
}
