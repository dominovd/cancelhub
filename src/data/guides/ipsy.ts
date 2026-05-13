import { CancelGuide } from '@/types/guide'

export const ipsy: CancelGuide = {
  slug: 'ipsy',
  service: 'IPSY',
  category: 'Beauty & Subscription Boxes',
  logo: '💄',
  difficulty: 'medium',
  difficultyReason: 'IPSY cancellation requires navigating account settings and must be done before the monthly cutoff to avoid being charged for the next box.',
  darkPatternScore: 6,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Glam Bag: $14/mo · Glam Bag Plus: $28/mo · Glam Bag X: $55/quarter',
  refundPolicy: 'No refunds on shipped bags. Cancel before the 1st of the month to avoid being charged for the next cycle.',
  description: 'Cancel IPSY Glam Bag before the 1st of the month to avoid next charge. Takes 3 minutes online.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.ipsy.com/manage-membership',
      steps: [
        { step: 1, instruction: 'Go to ipsy.com → sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account" → "Manage Membership".' },
        { step: 3, instruction: 'Click "Cancel Membership".' },
        { step: 4, instruction: 'Select a reason → click "Cancel Membership" again to confirm.', note: 'Must cancel before the 1st of the month to avoid being charged for the next bag. Check your account for your exact cutoff date.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'IPSY does not support in-app cancellation. Visit ipsy.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via App Store, check Settings → Apple ID → Subscriptions.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit ipsy.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play, check Play Store → Subscriptions.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I was charged after I thought I cancelled.',
      answer: 'Check your cancellation confirmation email. If you didn\'t receive one, the cancellation may not have gone through. Contact IPSY support at ipsy.com/support with your account email.',
    },
    {
      question: 'Can I skip a month instead of cancelling?',
      answer: 'Yes — IPSY allows you to skip up to 3 months per year from your account settings. Go to Account → Manage Membership → Skip a Month.',
    },
  ],
  alternatives: [
    { name: 'FabFitFun', url: '#', description: '$54.99/quarter — lifestyle subscription box' },
    { name: 'Birchbox', url: '#', description: '$15/mo — beauty sample subscription' },
  ],
  tags: ['beauty', 'subscription-box', 'cosmetics', 'makeup'],
}
