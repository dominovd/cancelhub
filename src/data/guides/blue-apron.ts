import { CancelGuide } from '@/types/guide'

export const blueApron: CancelGuide = {
  slug: 'blue-apron',
  service: 'Blue Apron',
  category: 'Food & Meal Kits',
  logo: '👨‍🍳',
  difficulty: 'medium',
  difficultyReason: 'Blue Apron requires cancelling before the weekly cutoff and the cancel option is buried under account settings. Pausing is heavily pushed.',
  darkPatternScore: 5,
  lastVerified: '2025-05-01',
  monthlyPrice: '$9.99–$13.99/meal depending on plan',
  refundPolicy: "No refunds on delivered boxes. Skip or cancel before the weekly cutoff (typically Friday) to avoid next week's charge.",
  description: "Cancel Blue Apron before Friday to avoid next week's charge. The cancel button is under Account → Plan Settings.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.blueapron.com/account/settings',
      steps: [
        { step: 1, instruction: 'Go to blueapron.com → sign in → Account → Plan Settings.' },
        { step: 2, instruction: 'Scroll to the bottom → click "Cancel Plan" (not "Skip").' },
        { step: 3, instruction: "Select a reason → confirm.", note: "Must cancel before Friday to avoid being charged for next week's box." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Blue Apron does not support cancellation through the iOS app. Visit blueapron.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Blue Apron → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit blueapron.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Blue Apron → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I see 'Skip' but not 'Cancel' in my account.",
      answer: "Skip only pauses one week. The 'Cancel Plan' option is usually at the very bottom of the Plan Settings page. Scroll past all other options.",
    },
    {
      question: "I missed the Friday cutoff — can I still cancel?",
      answer: "Once the order is locked, you'll be charged for that box. Contact Blue Apron support immediately — they may be able to stop it if it hasn't processed yet.",
    },
  ],
  alternatives: [
    { name: 'HelloFresh', url: '/cancel/hellofresh', description: 'From $7.99/meal — popular meal kit service' },
    { name: 'Factor Meals', url: '/cancel/factor-meals', description: 'From $10.99/meal — pre-cooked meals' },
  ],
  tags: ['meal-kit', 'food', 'cooking', 'delivery', 'subscription'],
}
