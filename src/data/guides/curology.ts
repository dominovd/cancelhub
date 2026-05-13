import { CancelGuide } from '@/types/guide'

export const curology: CancelGuide = {
  slug: 'curology',
  service: 'Curology',
  category: 'Health & Wellness',
  logo: '🧴',
  difficulty: 'medium',
  difficultyReason: 'Curology cancellation requires navigating account settings or contacting support. The cancel option is not prominently displayed.',
  darkPatternScore: 5,
  lastVerified: '2026-05-01',
  monthlyPrice: '$29.95–$39.95/mo (custom formula + 2 hero ingredients)',
  refundPolicy: 'No refunds on shipped products. Cancel before your next processing date to avoid being charged.',
  description: 'Cancel Curology subscription in under 5 minutes via account settings. Cancel before processing date to avoid next shipment.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://curology.com/account',
      steps: [
        { step: 1, instruction: 'Go to curology.com → sign in → Account → Subscription.' },
        { step: 2, instruction: 'Click "Cancel subscription" or "Manage plan".' },
        { step: 3, instruction: 'If no cancel option is visible, use the support chat at curology.com/contact.' },
        { step: 4, instruction: 'Confirm cancellation and request a confirmation email.', note: 'Cancel at least 48 hours before your next processing date to avoid being charged for the next shipment.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Curology does not support in-app cancellation. Visit curology.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Curology → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit curology.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Curology → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I pause my Curology subscription instead of cancelling?',
      answer: 'Yes — Curology allows you to pause shipments for up to 3 months from your account settings. This may be better if you plan to continue your skincare routine.',
    },
    {
      question: 'I missed my processing date — will I still be charged?',
      answer: 'Yes. Once the order processes, you\'ll be charged and shipped the product. Contact Curology support immediately — they may be able to cancel it if it hasn\'t shipped yet.',
    },
  ],
  alternatives: [
    { name: 'Hims', url: '/cancel/hims', description: 'From $20/mo — telehealth & skincare' },
    { name: 'Ro', url: '#', description: 'Telehealth platform with skincare options' },
  ],
  tags: ['skincare', 'health', 'beauty', 'prescription', 'telehealth'],
}
