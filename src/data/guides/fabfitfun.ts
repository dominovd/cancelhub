import { CancelGuide } from '@/types/guide'

export const fabfitfun: CancelGuide = {
  slug: 'fabfitfun',
  service: 'FabFitFun',
  category: 'Beauty & Subscription Boxes',
  logo: '💅',
  difficulty: 'medium',
  difficultyReason: 'FabFitFun requires cancelling before the seasonal cutoff and the cancel option is buried in account settings.',
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: '$54.99/quarter (seasonal box) · $219.99/yr (annual)',
  refundPolicy: 'No refunds on shipped boxes. Cancel before the seasonal cutoff to avoid being charged for the next box.',
  description: 'Cancel FabFitFun before the seasonal billing date to avoid next box charge. Takes 3 minutes online.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://fabfitfun.com/account/edit',
      steps: [
        { step: 1, instruction: 'Go to fabfitfun.com → sign in → Account → Membership.' },
        { step: 2, instruction: 'Click "Cancel Membership" — may be labeled "Manage Membership".' },
        { step: 3, instruction: 'Select a reason → confirm cancellation.', note: "Check your account for the exact cutoff date for the current season. Cancelling after the cutoff means you'll still receive (and pay for) that season's box." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'FabFitFun does not support in-app cancellation. Visit fabfitfun.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → FabFitFun → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit fabfitfun.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → FabFitFun → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I missed the seasonal cutoff — will I still be charged?',
      answer: "Yes. Once billing for a season processes, you'll receive and be charged for that box. Contact FabFitFun support to see if they can make an exception.",
    },
    {
      question: 'Can I pause FabFitFun instead of cancelling?',
      answer: 'FabFitFun does not offer a pause feature. You must cancel and resubscribe for future seasons.',
    },
  ],
  alternatives: [
    { name: 'IPSY', url: '/cancel/ipsy', description: '$14/mo — beauty subscription box' },
    { name: 'Birchbox', url: '#', description: '$15/mo — beauty samples' },
  ],
  tags: ['subscription-box', 'beauty', 'lifestyle', 'wellness', 'fashion'],
}
