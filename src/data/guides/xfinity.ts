import { CancelGuide } from '@/types/guide'

export const xfinity: CancelGuide = {
  slug: 'xfinity',
  service: 'Xfinity',
  category: 'Internet & Cable',
  logo: '📡',
  difficulty: 'hard',
  difficultyReason: 'Xfinity is notorious for long hold times, aggressive retention tactics, and complex billing. Early termination fees can reach $110+.',
  darkPatternScore: 9,
  lastVerified: '2025-04-10',
  monthlyPrice: '$30–$120+/mo depending on plan',
  refundPolicy: 'Prorated refund for unused days after cancellation. Early termination fee applies if under contract.',
  description: 'Cancel Xfinity internet, cable, or streaming without paying early termination fees. Requires a call or store visit.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Go to xfinity.com/support and sign in.', note: 'Check your contract end date first — go to My Account → Service Agreement to see if you owe an ETF.' },
        { step: 2, instruction: 'Use the Xfinity Assistant chat (xfinity.com/xfinityassistant) and type "Cancel service" — this sometimes works without a hold.' },
        { step: 3, instruction: 'Alternatively, call 1-800-934-6489. Expect 15–45 minute wait times.' },
        { step: 4, instruction: 'Tell the rep you want to cancel, not downgrade. Decline all retention offers.' },
        { step: 5, instruction: 'Ask for a cancellation confirmation number and email.' },
        { step: 6, instruction: 'Return any rented equipment (modem, router, cable box) to an Xfinity store or via prepaid return kit within 10 days to avoid equipment charges.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Xfinity app → tap the account icon.' },
        { step: 2, instruction: 'Tap "Manage my plan" — limited cancellation options in-app. Full cancellation requires a call or store visit.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Xfinity app → account icon → "Manage my plan".' },
        { step: 2, instruction: 'For full cancellation, call or visit a store.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What is the early termination fee?',
      answer: "If you're under a 1 or 2-year contract, Xfinity charges up to $110 in ETFs. The fee decreases monthly as you approach contract end. Month-to-month customers have no ETF.",
    },
    {
      question: 'Do I have to return equipment?',
      answer: 'Yes — unreturned equipment results in charges of $110–$350 per device. Return within 10 days of cancellation to avoid fees.',
    },
    {
      question: 'Can I cancel online without calling?',
      answer: 'Some accounts can use Xfinity Assistant chat to cancel. Others require a phone call or in-store visit. The chat route is faster if it works for your account type.',
    },
  ],
  alternatives: [
    { name: 'AT&T Internet', url: '#', description: 'Fiber internet — competitive pricing' },
    { name: 'Google Fiber', url: '#', description: 'No contracts, no data caps' },
  ],
  tags: ['internet', 'cable', 'isp', 'comcast'],
}
