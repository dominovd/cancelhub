import { CancelGuide } from '@/types/guide'

export const fabletics: CancelGuide = {
  slug: 'fabletics',
  service: 'Fabletics',
  category: 'Fashion',
  logo: '👟',
  difficulty: 'hard',
  difficultyReason: 'Fabletics requires cancellation via phone or live chat (no online self-service), uses aggressive retention tactics, and auto-charges $59.95 if you forget to skip by the 5th of the month.',
  darkPatternScore: 8,
  darkPatternFlags: {
    hiddenButton: true,
    requiresCall: false,
    requiresChat: true,
    retentionTactics: true,
    confirmationShaming: true,
    refundClarity: 'murky',
    estimatedMinutes: 15,
  },
  lastVerified: '2025-04-10',
  monthlyPrice: '$59.95/mo VIP membership credit',
  refundPolicy: 'Member credits can be used for purchases after cancellation if used promptly. No cash refunds on credits.',
  description: 'Cancel Fabletics VIP membership — requires a phone call or chat. Skip the "member credit" trap first.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Log into fabletics.com and use any accumulated credits before cancelling.' },
        { step: 2, instruction: 'Click "Member Credits" to check your balance.', note: 'Credits expire after cancellation — use them first.' },
        { step: 3, instruction: 'Open live chat at fabletics.com or call 1-844-322-5384.' },
        { step: 4, instruction: 'Tell the agent you want to cancel your VIP membership.' },
        { step: 5, instruction: 'Decline all retention offers (discounts, pauses, credit offers).' },
        { step: 6, instruction: 'Confirm cancellation and ask for a confirmation number or email.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Fabletics does not support cancellation through the iOS app or App Store.' },
        { step: 2, instruction: 'Use phone (1-844-322-5384) or live chat at fabletics.com.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Fabletics does not support cancellation through the Android app or Play Store.' },
        { step: 2, instruction: 'Use phone or live chat — see web steps above.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I was charged $59.95 — can I get a refund?',
      answer: "If you were charged but didn't want to be, contact Fabletics support immediately. They may issue a credit, but cash refunds are rare. The charge happens if you don't \"skip the month\" by the 5th.",
    },
    {
      question: 'What is the "skip the month" option?',
      answer: 'Each month, you must log in and click "Skip this month" before the 5th to avoid being charged. This is a deliberate dark pattern — set a recurring calendar reminder.',
    },
    {
      question: 'Can I cancel online without calling?',
      answer: 'Fabletics added a live chat option. Chat is available at fabletics.com and is generally faster than calling.',
    },
  ],
  alternatives: [],
  tags: ['fashion', 'fitness', 'subscription-box', 'vip-membership'],
}
