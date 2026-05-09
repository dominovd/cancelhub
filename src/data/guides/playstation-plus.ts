import { CancelGuide } from '@/types/guide'

export const playstationPlus: CancelGuide = {
  slug: 'playstation-plus',
  service: 'PlayStation Plus',
  category: 'Gaming',
  logo: '🎮',
  difficulty: 'easy',
  difficultyReason: 'PlayStation Plus cancellation is available online and through the PS console, though the menu layout changes with firmware updates.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Essential: $9.99/mo · Extra: $14.99/mo · Premium: $17.99/mo',
  refundPolicy: 'No refunds once subscription is used. Unused portions of prepaid subscriptions may be refunded — contact PlayStation support.',
  description: 'Cancel PlayStation Plus in under 5 minutes via PS console, web, or the PlayStation app.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.playstation.com/en-us/playstation-plus/',
      steps: [
        { step: 1, instruction: 'Go to playstation.com → sign in → profile icon → Account Settings.' },
        { step: 2, instruction: 'Go to "Subscriptions" → find PlayStation Plus → "Cancel Subscription".' },
        { step: 3, instruction: 'Confirm cancellation.', note: "Monthly PS Plus games you've added remain in your library but are inaccessible until you resubscribe. Online multiplayer access stops at end of period." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open PlayStation App → profile → Account Management → Subscriptions → PlayStation Plus → Cancel (or via Settings → Apple ID → Subscriptions if App Store purchase).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open PlayStation App → profile → Account Management → Subscriptions → PlayStation Plus → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I cancelled PS Plus — do I lose my free monthly games?',
      answer: "Games added to your library while subscribed are locked until you resubscribe — they're not deleted. Once you resub, they unlock immediately without re-downloading.",
    },
    {
      question: 'Can I cancel PS Plus on my PS4/PS5?',
      answer: 'Yes. On your console: Settings → Account Management → Account Information → PlayStation Subscriptions → PlayStation Plus → Cancel.',
    },
  ],
  alternatives: [
    { name: 'Xbox Game Pass', url: '/cancel/xbox-game-pass', description: '$14.99/mo — 100s of games + EA Play' },
    { name: 'EA Play', url: '/cancel/ea-play', description: '$4.99/mo — EA game vault' },
  ],
  tags: ['gaming', 'playstation', 'sony', 'console', 'online'],
}
