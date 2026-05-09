import { CancelGuide } from '@/types/guide'

export const hellofresh: CancelGuide = {
  slug: 'hellofresh',
  service: 'HelloFresh',
  category: 'Food & Meal Kits',
  logo: '🥦',
  difficulty: 'medium',
  difficultyReason: 'HelloFresh uses a pause-push strategy and requires cancelling before a weekly cutoff. The cancel option is hard to find.',
  darkPatternScore: 6,
  lastVerified: '2025-05-01',
  monthlyPrice: '$7.99–$13.99/meal depending on plan (2–5 meals × 2–4 people/week)',
  refundPolicy: 'No refunds on delivered boxes. Cancel or skip before the weekly cutoff (typically Friday midnight) to avoid the next charge.',
  description: "Cancel HelloFresh before Friday midnight to avoid next week's charge. The cancel button is buried — follow these exact steps.",
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.hellofresh.com/account/plan',
      steps: [
        { step: 1, instruction: 'Go to hellofresh.com → sign in → click your name → Account Settings.' },
        { step: 2, instruction: 'Go to "Plan Settings" tab.' },
        { step: 3, instruction: 'Scroll to the bottom → click "Cancel Plan" (not "Pause" — HelloFresh pushes pausing).' },
        { step: 4, instruction: 'Select a reason → click "Cancel Plan" again to confirm.', note: "Must cancel before Friday midnight (your local time) to avoid next week's delivery charge." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'HelloFresh does not support cancellation through the iOS app. Visit hellofresh.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → HelloFresh → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit hellofresh.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → HelloFresh → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "HelloFresh keeps showing me 'Pause' instead of 'Cancel'.",
      answer: "This is deliberate. Scroll past all the pause/skip options to find the 'Cancel Plan' link at the very bottom of the Plan Settings page.",
    },
    {
      question: 'I missed the Friday cutoff — will I be charged?',
      answer: "Yes. If you miss the cutoff, the next box is locked in. You can contact HelloFresh support to try to stop it, but it's not guaranteed once the order is processing.",
    },
  ],
  alternatives: [
    { name: 'Factor Meals', url: '/cancel/factor-meals', description: 'From $10.99/meal — prepared meals, no cooking' },
    { name: 'Home Chef', url: '#', description: 'From $9.95/meal — flexible meal kits' },
  ],
  tags: ['meal-kit', 'food', 'delivery', 'cooking', 'subscription'],
}
