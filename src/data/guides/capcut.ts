import { CancelGuide } from '@/types/guide'

export const capcut: CancelGuide = {
  slug: 'capcut',
  service: 'CapCut Pro',
  category: 'Creative Tools',
  logo: '🎬',
  difficulty: 'easy',
  difficultyReason: 'CapCut Pro cancellation is available through device subscription settings or the app.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$7.99/mo · $49.99/yr',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel CapCut Pro in under 2 minutes via iOS, Android, or web account settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.capcut.com/',
      steps: [
        { step: 1, instruction: 'Go to capcut.com and sign in.' },
        { step: 2, instruction: 'Click Profile → Subscription.' },
        { step: 3, instruction: 'Click "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → Subscriptions.' },
        { step: 2, instruction: 'Find "CapCut" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → Subscriptions.' },
        { step: 2, instruction: 'Find "CapCut Pro" → tap "Cancel subscription".' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my videos and projects if I cancel?',
      answer: 'No. Your videos and projects are saved in your account. You lose Pro features like premium effects, templates, and cloud storage upgrades, but your existing work is preserved.',
    },
    {
      question: 'CapCut is banned in my country — how do I cancel?',
      answer: 'If you can\'t access the app, cancel through your device\'s subscription settings (App Store or Google Play). You don\'t need to open the app to cancel through device settings.',
    },
  ],
  alternatives: [
    { name: 'Adobe Premiere Rush', url: '#', description: 'Included with Adobe Creative Cloud' },
    { name: 'InShot Pro', url: '#', description: '$3.99/mo — simple mobile video editor' },
  ],
  tags: ['video', 'editing', 'creative', 'social-media', 'tiktok'],
}
