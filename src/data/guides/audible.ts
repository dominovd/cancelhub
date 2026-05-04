import { CancelGuide } from '@/types/guide'

export const audible: CancelGuide = {
  slug: 'audible',
  service: 'Audible',
  category: 'Audiobooks',
  logo: '🎧',
  difficulty: 'medium',
  difficultyReason: 'Audible uses multiple retention screens, offers pauses and discounts, but cancellation is ultimately available.',
  darkPatternScore: 6,
  lastVerified: '2025-04-10',
  monthlyPrice: '$14.95/mo (Premium Plus)',
  refundPolicy: 'Unused credits are lost upon cancellation. Purchased audiobooks are yours to keep forever.',
  description: 'Cancel Audible without losing your credits or purchased audiobooks. Timing your cancellation matters.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to audible.com and sign in.' },
        { step: 2, instruction: 'Hover over your name → click "Account Details".' },
        { step: 3, instruction: 'Click "Cancel membership" (usually in the left sidebar or under "Membership Details").' },
        { step: 4, instruction: 'Audible will show you a "pause membership" option — click "Continue to Cancel" if you want to cancel.', note: 'Use your credits before cancelling — they expire when your membership ends.' },
        { step: 5, instruction: 'Select a reason → click "Cancel membership".' },
        { step: 6, instruction: "You'll receive a confirmation email." },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Audible → Cancel.' },
        { step: 2, instruction: 'If subscribed directly with Amazon/Audible: use the website steps above.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Audible → Cancel.' },
        { step: 2, instruction: 'If subscribed directly: use the website steps above.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my credits when I cancel?',
      answer: 'Any unused credits are lost when you cancel. Use them before cancelling — you can buy audiobooks with credits and keep them forever even after cancellation.',
    },
    {
      question: 'Will I lose my purchased audiobooks?',
      answer: 'No. Audiobooks you bought with credits or purchased outright are yours permanently. You can access them via the Audible app even without a membership.',
    },
    {
      question: 'Can I pause instead of cancelling?',
      answer: 'Yes. Audible lets you pause for 1–3 months. During the pause, you won\'t be charged but also won\'t earn credits. Find the option during the cancellation flow.',
    },
  ],
  alternatives: [
    { name: 'Kindle Unlimited', url: '/cancel/kindle-unlimited', description: '$11.99/mo — ebooks + some audiobooks' },
    { name: 'Scribd', url: '/cancel/scribd', description: '$11.99/mo — audiobooks, ebooks, documents' },
  ],
  tags: ['audiobooks', 'amazon', 'audio', 'books'],
}
