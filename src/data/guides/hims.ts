import { CancelGuide } from '@/types/guide'

export const hims: CancelGuide = {
  slug: 'hims',
  service: 'Hims',
  category: 'Health & Wellness',
  logo: '💊',
  difficulty: 'medium',
  difficultyReason: 'Hims requires contacting support to cancel and may require giving advance notice before the next billing cycle.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Varies by product: $20–$100+/mo depending on treatment',
  refundPolicy: 'No refunds on shipped products. Cancel before your next processing date to avoid being charged.',
  description: 'Cancel Hims subscription — contact support via chat or account settings. Cancel before processing date to avoid next shipment.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.forhims.com/account',
      steps: [
        { step: 1, instruction: 'Go to forhims.com → sign in → Account.' },
        { step: 2, instruction: 'Find your subscription → click "Manage" or "Cancel".' },
        { step: 3, instruction: 'If no cancel option is visible, use the live chat at forhims.com/support.' },
        { step: 4, instruction: 'Request cancellation and confirm.', note: 'Cancel at least 48 hours before your next processing date to avoid being charged for the next shipment.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Hims does not support in-app cancellation. Visit forhims.com on your browser.' },
        { step: 2, instruction: 'If you have an App Store subscription, check Settings → Apple ID → Subscriptions.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit forhims.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play, check Play Store → Subscriptions.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I missed my processing date — will I be charged?',
      answer: "Yes. If you miss your cancellation window (typically 48 hours before processing), you'll be charged and the shipment will be sent. You can contact support to try to stop it, but it's not guaranteed.",
    },
    {
      question: 'Can I pause my Hims subscription instead of cancelling?',
      answer: 'Yes — Hims allows you to pause or delay shipments from your account settings. This may be better than cancelling if you plan to continue your treatment.',
    },
  ],
  alternatives: [
    { name: 'Ro', url: '#', description: 'Similar telehealth & prescription services' },
    { name: 'Roman', url: '#', description: "Men's health telehealth platform" },
  ],
  tags: ['health', 'wellness', 'telehealth', 'men', 'prescription'],
}
