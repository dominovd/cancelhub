import { CancelGuide } from '@/types/guide'

export const kindleUnlimited: CancelGuide = {
  slug: 'kindle-unlimited',
  service: 'Kindle Unlimited',
  category: 'Books & Reading',
  logo: '📚',
  difficulty: 'easy',
  difficultyReason: 'Kindle Unlimited cancellation is simple and straightforward through Amazon.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: '$11.99/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period. Borrowed books are removed after cancellation.',
  description: 'Cancel Kindle Unlimited in under 2 minutes at Amazon. All borrowed books are removed after your period ends.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.amazon.com/manageyourkindle',
      steps: [
        { step: 1, instruction: 'Go to amazon.com → sign in → Account & Lists → Memberships & Subscriptions.' },
        { step: 2, instruction: 'Find "Kindle Unlimited" → click "Cancel Kindle Unlimited".' },
        { step: 3, instruction: 'Confirm cancellation.', note: 'You keep access until your current billing period ends. All borrowed books are then removed from your devices.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Kindle Unlimited cannot be cancelled through the Kindle or Amazon iOS app.' },
        { step: 2, instruction: 'Visit amazon.com on your mobile browser and follow the web steps above.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Kindle Unlimited cannot be cancelled through the Kindle or Amazon Android app.' },
        { step: 2, instruction: 'Visit amazon.com on your mobile browser and follow the web steps above.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "What happens to books I've borrowed?",
      answer: "All borrowed Kindle Unlimited books are removed from your devices when your membership ends. Books you've purchased separately are unaffected.",
    },
    {
      question: 'Can I pause Kindle Unlimited instead of cancelling?',
      answer: 'Amazon allows you to pause Kindle Unlimited for 1–3 months. Visit amazon.com/manageyourkindle and look for the "Pause" option — you keep access during the pause period.',
    },
  ],
  alternatives: [
    { name: 'Audible', url: '/cancel/audible', description: '$14.95/mo — audiobooks' },
    { name: 'Scribd', url: '#', description: '$11.99/mo — books, audiobooks & more' },
  ],
  tags: ['books', 'reading', 'amazon', 'ebooks'],
}
