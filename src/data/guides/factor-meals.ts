import { CancelGuide } from '@/types/guide'

export const factorMeals: CancelGuide = {
  slug: 'factor-meals',
  service: 'Factor Meals',
  category: 'Food & Meal Kits',
  logo: '🥗',
  difficulty: 'medium',
  difficultyReason: "Factor requires cancelling before a weekly cutoff deadline or you'll be charged for the next week. The deadline is easy to miss.",
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: '$10.99–$15.99/meal (6–18 meals/week)',
  refundPolicy: "No refunds on delivered meals. Cancel before the weekly cutoff (typically Wednesday 11:59 PM CT) to avoid being charged for the next week.",
  description: "Cancel Factor Meals before Wednesday 11:59 PM CT to avoid next week's charge. Takes 2 minutes online.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.factor75.com/plans/menus',
      steps: [
        { step: 1, instruction: 'Go to factor75.com and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Account Settings" or "My Account".' },
        { step: 3, instruction: 'Go to "Plan Settings".' },
        { step: 4, instruction: 'Click "Cancel Plan" or "Pause Deliveries".' },
        { step: 5, instruction: 'Select a reason → confirm.', note: 'You must cancel before Wednesday 11:59 PM CT (your local cutoff may differ). Check your account for the exact deadline.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Factor does not support in-app cancellation. Visit factor75.com on your mobile browser to cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Factor does not support in-app cancellation. Visit factor75.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I missed the cancellation cutoff — will I be charged?',
      answer: "Yes. If you miss the Wednesday 11:59 PM CT deadline, you'll be charged and shipped the next week's meals. You can contact support to request a refund, but it's not guaranteed.",
    },
    {
      question: 'Can I pause instead of cancel?',
      answer: 'Yes — Factor allows you to skip weeks or pause your plan. This may be better than cancelling if you plan to return.',
    },
  ],
  alternatives: [
    { name: 'HelloFresh', url: '#', description: 'From $7.99/meal — cook-at-home meal kits' },
    { name: 'Home Chef', url: '#', description: 'From $9.95/meal — flexible meal kits' },
  ],
  tags: ['meal-kit', 'food', 'delivery', 'prepared-meals'],
}
