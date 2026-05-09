import { CancelGuide } from '@/types/guide'

export const canvaPro: CancelGuide = {
  slug: 'canva-pro',
  service: 'Canva Pro',
  category: 'Creative Tools',
  logo: '🎨',
  difficulty: 'easy',
  difficultyReason: 'Canva Pro cancellation is available in account settings and is relatively straightforward.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Pro: $14.99/mo · $119.99/yr · Teams: $29.99/mo for 5 people',
  refundPolicy: 'No refunds on monthly plans. Annual plans: prorated refund may be available — contact support.',
  description: 'Cancel Canva Pro in under 3 minutes via canva.com account settings. All your designs are preserved on the free plan.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.canva.com/settings/billing-and-plans',
      steps: [
        { step: 1, instruction: 'Go to canva.com → sign in → Account Settings (top right profile).' },
        { step: 2, instruction: 'Click "Billing & Plans" → "Cancel plan".' },
        { step: 3, instruction: 'Canva may offer a pause option — click "Cancel anyway" if you want to cancel.' },
        { step: 4, instruction: 'Confirm cancellation.', note: 'All your designs remain accessible on the free plan. Premium elements in existing designs remain visible but cannot be edited or downloaded without Pro.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID → Subscriptions → Canva → Cancel Subscription (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play → Subscriptions → Canva → Cancel subscription.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my designs when I cancel Canva Pro?',
      answer: 'No. All your designs are saved and accessible on the free Canva plan. Designs using premium elements can still be viewed but some elements may be locked for editing without Pro.',
    },
    {
      question: "I'm a team admin — does cancelling affect all team members?",
      answer: "Yes. Cancelling Canva Teams affects all members. You'll all revert to free accounts. Make sure to download any important team designs with premium elements first.",
    },
  ],
  alternatives: [
    { name: 'Adobe Express', url: '#', description: 'Free basic / $9.99/mo premium — Adobe creative tools' },
    { name: 'CapCut', url: '/cancel/capcut', description: '$7.99/mo — video & graphic editor' },
  ],
  tags: ['design', 'graphics', 'creative', 'templates', 'visual'],
}
