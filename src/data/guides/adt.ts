import { CancelGuide } from '@/types/guide'

export const adt: CancelGuide = {
  slug: 'adt',
  service: 'ADT',
  category: 'Home Security',
  logo: '🏠',
  difficulty: 'hard',
  difficultyReason: 'ADT requires calling customer service to cancel, involves a long-term contract (typically 36 months), and charges an early termination fee of up to 75% of remaining contract value.',
  darkPatternScore: 8,
  darkPatternFlags: {
    hiddenButton: true,
    requiresCall: true,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 30,
  },
  lastVerified: '2025-05-01',
  monthlyPrice: '$28.99–$59.99/mo depending on plan and equipment',
  refundPolicy: 'No refunds. Early termination fee applies if cancelled before contract end (typically 75% of remaining balance).',
  description: 'Cancel ADT — requires calling 1-800-238-2727. Long-term contracts may include early termination fees up to 75% of remaining balance.',
  platforms: [
    {
      platform: 'web',
      label: 'Phone / Website',
      deepLink: 'https://www.adt.com/help',
      steps: [
        { step: 1, instruction: 'Call ADT at 1-800-238-2727. There is no online cancellation option.' },
        { step: 2, instruction: 'Say "Cancel" or navigate to account changes when prompted.' },
        { step: 3, instruction: 'Ask the agent about your contract end date and any early termination fees before agreeing to cancel.' },
        { step: 4, instruction: 'Get a cancellation confirmation number and ask for written confirmation by email.', note: 'ADT contracts are typically 36 months. Cancelling early triggers an ETF of up to 75% of your remaining monthly payments.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'ADT cannot be cancelled through the app or website. Call 1-800-238-2727.' },
        { step: 2, instruction: 'The ADT+ app does not support account cancellation.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Same as iOS — call 1-800-238-2727. No in-app or online cancellation available.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'How much will my ADT early termination fee be?',
      answer: 'Typically 75% of your remaining contract balance. For example, if you have 12 months left at $40/mo, that\'s $360 × 75% = $270. Ask for the exact amount before cancelling.',
    },
    {
      question: 'I\'m moving — can I transfer my ADT service?',
      answer: 'ADT allows service transfers to a new address. Call 1-800-238-2727 and ask about relocation options — this may avoid the ETF and is often cheaper than cancelling.',
    },
  ],
  tags: ['home-security', 'monitoring', 'alarm', 'contract', 'security'],
}
