import { CancelGuide } from '@/types/guide'

export const chewyAutoship: CancelGuide = {
  slug: 'chewy-autoship',
  service: 'Chewy Autoship',
  category: 'Pets',
  logo: '🐾',
  difficulty: 'easy',
  difficultyReason: 'Chewy Autoship is easy to cancel or modify — Chewy provides a clear cancellation flow in your account.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Varies — 5–35% discount on recurring pet supply orders',
  refundPolicy: 'Full refunds on unwanted orders if reported within a reasonable time. Chewy is known for exceptional customer service.',
  description: 'Cancel Chewy Autoship orders in under 2 minutes via chewy.com or the Chewy app. Each Autoship order cancels separately.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.chewy.com/app/account/autoship',
      steps: [
        { step: 1, instruction: 'Go to chewy.com → sign in → Account → Autoship & Save.' },
        { step: 2, instruction: 'Find the Autoship order you want to cancel → click "Manage Autoship".' },
        { step: 3, instruction: 'Click "Cancel Autoship" → confirm.', note: "Each product with Autoship must be cancelled separately. Cancelling one product's Autoship does not affect others." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Chewy app → Account → Autoship & Save → tap the order → Cancel Autoship → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Chewy app → Account → Autoship & Save → tap the order → Cancel Autoship → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I was charged for an Autoship I forgot about — can I get a refund?',
      answer: 'Yes. Chewy is known for exceptional customer service. Contact them at chewy.com/app/contact or call 1-800-672-4399 — they frequently offer refunds or replacements even for opened items.',
    },
    {
      question: 'Can I pause an Autoship instead of cancelling?',
      answer: 'Yes — Chewy allows you to skip a delivery or change the frequency instead of cancelling. Go to Autoship & Save → Manage Autoship → Skip delivery or change next order date.',
    },
  ],
  alternatives: [
    { name: 'Amazon Subscribe & Save', url: '#', description: 'Up to 15% off recurring Amazon orders' },
    { name: 'PetSmart', url: '#', description: 'In-store and online pet supplies' },
  ],
  tags: ['pets', 'autoship', 'subscription', 'delivery', 'chewy'],
}
