import { CancelGuide } from '@/types/guide'

export const crunchFitness: CancelGuide = {
  slug: 'crunch-fitness',
  service: 'Crunch Fitness',
  category: 'Fitness',
  logo: '💪',
  difficulty: 'hard',
  difficultyReason: 'Crunch requires in-person or certified mail cancellation for most members. Annual contracts carry early termination fees up to $175.',
  darkPatternScore: 8,
  darkPatternFlags: {
    hiddenButton: true,
    requiresCall: true,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 20,
  },
  lastVerified: '2025-04-10',
  monthlyPrice: '$9.99–$29.99/mo depending on tier and location',
  refundPolicy: 'No refunds. Annual contract members owe an early termination fee if cancelling before contract end.',
  description: 'Cancel your Crunch Fitness membership in person, by certified mail, or sometimes online. Annual contracts have early termination fees.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Log in at crunch.com and check if your location offers online cancellation (rare — most do not).' },
        { step: 2, instruction: 'If online cancel is not available, go to your home club in person with a photo ID.' },
        { step: 3, instruction: 'Ask to speak with a membership advisor and request cancellation.', note: 'Bring your member ID or the email used to sign up.' },
        { step: 4, instruction: 'Alternatively, send a certified letter to your home club with: your full name, member ID, address, and signature.' },
        { step: 5, instruction: 'Keep the certified mail receipt as proof. Cancellation typically takes effect 30 days after receipt.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Crunch does not support cancellation through the iOS app.' },
        { step: 2, instruction: 'Cancel in person at your home club or via certified mail — see web steps.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Crunch does not support cancellation through the Android app.' },
        { step: 2, instruction: 'Cancel in person or by certified mail — see web steps.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I'm in an annual contract — what's the early termination fee?",
      answer: 'The ETF is typically $175 or the remaining balance of your contract (whichever is less). Month-to-month members can cancel anytime with 30 days notice.',
    },
    {
      question: 'Can I cancel if I moved away?',
      answer: 'Yes — relocation is an acceptable reason. You\'ll need to provide proof of your new address (utility bill, lease) showing you live more than 25 miles from any Crunch location.',
    },
    {
      question: 'Can I freeze my membership instead?',
      answer: 'Yes. Most Crunch locations allow a 1–3 month freeze for a small fee ($10–$15/mo). Ask at your home club.',
    },
  ],
  alternatives: [
    { name: 'Planet Fitness', url: '/cancel/planet-fitness', description: '$10–$25/mo — easy online cancellation' },
    { name: 'Anytime Fitness', url: '/cancel/anytime-fitness', description: '$30–$50/mo — 24/7 access' },
  ],
  tags: ['fitness', 'gym', 'membership', 'annual-contract'],
}
