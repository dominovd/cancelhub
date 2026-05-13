import { CancelGuide } from '@/types/guide'

export const xboxGamePass: CancelGuide = {
  slug: 'xbox-game-pass',
  service: 'Xbox Game Pass',
  category: 'Gaming',
  logo: '🎮',
  difficulty: 'easy',
  difficultyReason: 'Xbox Game Pass cancellation is clean and simple via Microsoft account settings or the Xbox app.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: 'PC Game Pass: $9.99/mo · Game Pass Ultimate: $14.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Xbox Game Pass or PC Game Pass in under 3 minutes via Microsoft account settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://account.microsoft.com/services',
      steps: [
        { step: 1, instruction: 'Go to account.microsoft.com/services → sign in.' },
        { step: 2, instruction: 'Find "Xbox Game Pass" or "PC Game Pass" → click "Cancel".' },
        { step: 3, instruction: 'Follow the prompts → confirm cancellation.', note: "Games in the Game Pass library are no longer playable after cancellation. Games you've purchased separately are unaffected." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Xbox app → profile → Settings → Subscriptions → Game Pass → Cancel (or Settings → Apple ID → Subscriptions → Xbox if App Store purchase).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Xbox app → profile → Settings → Subscriptions → Cancel (or Google Play → Subscriptions → Xbox Game Pass → Cancel).' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I have Game Pass Ultimate — does cancelling also cancel Xbox Live Gold?',
      answer: 'Yes. Game Pass Ultimate includes Xbox Live Gold. Cancelling Ultimate removes both. Your multiplayer access ends at the end of the billing period.',
    },
    {
      question: 'Can I cancel Xbox Game Pass on my Xbox console?',
      answer: 'Yes. On your Xbox: press the Xbox button → Settings → Account → Subscriptions → Game Pass → Cancel.',
    },
  ],
  alternatives: [
    { name: 'PlayStation Plus', url: '/cancel/playstation-plus', description: 'From $9.99/mo — PS exclusive games' },
    { name: 'EA Play', url: '/cancel/ea-play', description: '$4.99/mo — included with Game Pass Ultimate' },
  ],
  tags: ['gaming', 'xbox', 'microsoft', 'console', 'pc'],
}
