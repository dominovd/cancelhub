import { CancelGuide } from '@/types/guide'

export const homeChef: CancelGuide = {
  slug: 'home-chef',
  service: 'Home Chef',
  category: 'Food & Meal Kits',
  logo: '🍽️',
  difficulty: 'easy',
  difficultyReason: 'Home Chef cancellation is available online and is relatively easy, though you must cancel before the weekly cutoff.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: '$9.95–$15.95/meal depending on plan',
  refundPolicy: "No refunds on delivered boxes. Cancel or skip before Thursday midnight to avoid next week's charge.",
  description: 'Cancel Home Chef before Thursday midnight to avoid next week\'s delivery charge. Takes 2 minutes online.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.homechef.com/account',
      steps: [
        { step: 1, instruction: 'Go to homechef.com → sign in → Account → Account Settings.' },
        { step: 2, instruction: 'Scroll down to "Pause or Cancel" → click "Cancel account".' },
        { step: 3, instruction: 'Select a reason → confirm cancellation.', note: "Must cancel before Thursday midnight to avoid the next week's charge." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Home Chef does not support cancellation through the app. Visit homechef.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Home Chef → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit homechef.com on your mobile browser to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I see 'Pause' — is that the same as cancelling?",
      answer: "No. Pausing skips deliveries temporarily but keeps your subscription active. Click 'Cancel account' to fully cancel and stop future charges.",
    },
    {
      question: 'Can I skip a week instead of cancelling?',
      answer: 'Yes — Home Chef allows skipping individual weeks from your account dashboard. This is useful if you need a break but plan to continue.',
    },
  ],
  alternatives: [
    { name: 'HelloFresh', url: '/cancel/hellofresh', description: 'From $7.99/meal — popular meal kit' },
    { name: 'Blue Apron', url: '/cancel/blue-apron', description: 'From $9.99/meal — chef-designed recipes' },
  ],
  tags: ['meal-kit', 'food', 'cooking', 'delivery', 'subscription'],
}
