import { CancelGuide } from '@/types/guide'

export const siriusxm: CancelGuide = {
  slug: 'siriusxm',
  service: 'SiriusXM',
  category: 'Music',
  logo: '📻',
  difficulty: 'hard',
  difficultyReason: 'SiriusXM is notorious for difficult cancellation — long hold times, aggressive retention, and no easy online cancel option.',
  darkPatternScore: 8,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: true,
    requiresChat: true,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 25,
  },
  lastVerified: '2026-05-01',
  monthlyPrice: '$9.99–$22.99/mo depending on plan. Promotional rates often jump to full price after the first year.',
  refundPolicy: 'Prorated refunds available for prepaid annual plans if cancelled within the billing period.',
  description: 'Cancel SiriusXM by phone or online chat — cancellation by phone can take 20+ minutes due to aggressive retention tactics.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://care.siriusxm.com/',
      steps: [
        { step: 1, instruction: 'Option 1 (faster): Go to siriusxm.com → sign in → Account → Cancel Subscription (if available online in your region).' },
        { step: 2, instruction: 'Option 2 (phone): Call 1-888-539-7474. Say "Cancel" to the automated system to skip to the cancellation queue.' },
        { step: 3, instruction: 'The agent will offer multiple discounts and promotions. You can say "I just want to cancel" firmly.' },
        { step: 4, instruction: 'Get a cancellation confirmation number or email.', note: 'SiriusXM is known for making cancellation extremely difficult. Be prepared for a 15–30 minute call. Online cancellation is available for some accounts.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'SiriusXM cannot be cancelled through the iOS app. Visit siriusxm.com or call 1-888-539-7474.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → SiriusXM → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit siriusxm.com or call 1-888-539-7474 to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → SiriusXM → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'SiriusXM won\'t let me cancel online.',
      answer: 'Online cancellation is inconsistently available. If you don\'t see a cancel option, you must call 1-888-539-7474. The FTC has received thousands of complaints about SiriusXM\'s cancellation process.',
    },
    {
      question: 'My promotional rate expired and I was charged full price.',
      answer: 'SiriusXM promotional rates automatically renew at full price. When cancelling, ask for a retention offer — they often offer 3–6 months at a steep discount.',
    },
  ],
  alternatives: [
    { name: 'Pandora', url: '/cancel/pandora', description: 'From $4.99/mo — music & radio streaming' },
    { name: 'Spotify', url: '/cancel/spotify', description: 'From $9.99/mo — podcasts & music' },
  ],
  tags: ['music', 'radio', 'satellite', 'audio', 'streaming'],
}
