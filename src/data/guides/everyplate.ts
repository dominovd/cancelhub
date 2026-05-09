import { CancelGuide } from '@/types/guide'

export const everyplate: CancelGuide = {
  slug: 'everyplate',
  service: 'EveryPlate',
  category: 'Food & Meal Kits',
  logo: '🥘',
  difficulty: 'easy',
  difficultyReason: 'EveryPlate cancellation is available online but you must cancel before the weekly cutoff to avoid charges.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$4.99–$6.99/meal — one of the most affordable meal kit services',
  refundPolicy: "No refunds on delivered boxes. Cancel before Saturday midnight to avoid next week's charge.",
  description: "Cancel EveryPlate before Saturday midnight to avoid next week's charge. Takes 2 minutes online.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.everyplate.com/account',
      steps: [
        { step: 1, instruction: 'Go to everyplate.com → sign in → Account → Settings.' },
        { step: 2, instruction: 'Find "Subscription" → click "Cancel subscription".' },
        { step: 3, instruction: 'Select a reason → confirm.', note: "Cancel before Saturday midnight to avoid the next week's delivery." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'EveryPlate does not have a standalone iOS app — use everyplate.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → EveryPlate → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit everyplate.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'EveryPlate and HelloFresh seem similar — are they related?',
      answer: 'Yes. EveryPlate is owned by HelloFresh. They operate separately but have a similar cancellation process.',
    },
    {
      question: 'I want to cancel just for this week.',
      answer: "You can skip individual weeks from your EveryPlate account without cancelling. Go to Account → Deliveries and skip the weeks you don't want.",
    },
  ],
  alternatives: [
    { name: 'HelloFresh', url: '/cancel/hellofresh', description: 'From $7.99/meal — more meal variety' },
    { name: 'Home Chef', url: '/cancel/home-chef', description: 'From $9.95/meal — customizable meals' },
  ],
  tags: ['meal-kit', 'food', 'budget', 'cooking', 'delivery'],
}
