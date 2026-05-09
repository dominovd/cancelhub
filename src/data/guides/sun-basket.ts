import { CancelGuide } from '@/types/guide'

export const sunBasket: CancelGuide = {
  slug: 'sun-basket',
  service: 'Sun Basket',
  category: 'Food & Meal Kits',
  logo: '🌞',
  difficulty: 'medium',
  difficultyReason: 'Sun Basket cancellation requires navigating account settings and must be done before the weekly cutoff. The cancel option is not prominently displayed.',
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: '$10.99–$16.99/meal depending on plan',
  refundPolicy: "No refunds on delivered orders. Cancel before Wednesday midnight to avoid next week's charge.",
  description: "Cancel Sun Basket before Wednesday midnight to avoid next week's charge. Takes 3 minutes online.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.sunbasket.com/account',
      steps: [
        { step: 1, instruction: 'Go to sunbasket.com → sign in → Account → Settings.' },
        { step: 2, instruction: 'Find "Plan" or "Subscription" → click "Cancel plan".' },
        { step: 3, instruction: 'Sun Basket may offer to pause or skip — click "No thanks, cancel" to proceed.' },
        { step: 4, instruction: 'Confirm cancellation.', note: 'Must cancel before Wednesday midnight. Sun Basket heavily promotes pausing — look for the cancel option below the pause offer.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Sun Basket does not support in-app cancellation. Visit sunbasket.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Sun Basket → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit sunbasket.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Sun Basket is pushing me to pause instead of cancel.',
      answer: "This is intentional. Look for a 'Cancel plan' or 'No thanks, cancel' link below the pause/skip offers. It's usually in smaller text.",
    },
    {
      question: 'I missed the Wednesday cutoff — will I be charged?',
      answer: "Yes. Once the order locks in, you'll be charged and shipped that week's box. Contact Sun Basket support immediately to attempt a cancellation.",
    },
  ],
  alternatives: [
    { name: 'HelloFresh', url: '/cancel/hellofresh', description: 'From $7.99/meal — most popular meal kit' },
    { name: 'Green Chef', url: '#', description: 'From $12.99/meal — organic & specialty diets' },
  ],
  tags: ['meal-kit', 'organic', 'healthy', 'food', 'delivery'],
}
