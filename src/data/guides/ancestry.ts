import { CancelGuide } from '@/types/guide'

export const ancestry: CancelGuide = {
  slug: 'ancestry',
  service: 'Ancestry',
  category: 'Family & Genealogy',
  logo: '🌳',
  difficulty: 'medium',
  difficultyReason: 'Ancestry uses multiple confirmation screens and auto-renewal that is easy to miss. The cancel option is buried in account settings.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$24.99/mo (US Discovery) · $49.99/mo (World Explorer) · Annual plans available',
  refundPolicy: 'No refunds on current subscription period. Cancel before renewal to avoid next charge.',
  description: 'Cancel Ancestry subscription and stop auto-renewal in under 5 minutes. Steps work for all Ancestry plans.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.ancestry.com/account/subscription',
      steps: [
        { step: 1, instruction: 'Go to ancestry.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → Account Settings.' },
        { step: 3, instruction: 'Click "Subscription".' },
        { step: 4, instruction: 'Click "Cancel Subscription".' },
        { step: 5, instruction: 'Follow the prompts.' },
        { step: 6, instruction: 'Confirm cancellation.', note: 'Your family tree data is preserved even after cancellation. You lose access to Ancestry records but keep your tree.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "Ancestry" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.', note: 'Only if you subscribed via the App Store.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions.' },
        { step: 2, instruction: 'Find "Ancestry" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will my family tree be deleted if I cancel?',
      answer: 'No. Your family tree, photos, and uploaded documents are saved in your account. You can still view your tree on the free plan but lose access to Ancestry\'s historical record database.',
    },
    {
      question: 'I have an annual plan — can I get a partial refund?',
      answer: 'Ancestry generally does not offer partial refunds for annual plans. Contact support at support.ancestry.com to check if an exception applies to your situation.',
    },
  ],
  alternatives: [
    { name: 'MyHeritage', url: '#', description: 'From $9.90/mo — family history & DNA' },
    { name: 'Findmypast', url: '#', description: 'From $9.99/mo — UK & Irish records focus' },
  ],
  tags: ['genealogy', 'family-tree', 'dna', 'history', 'records'],
}
