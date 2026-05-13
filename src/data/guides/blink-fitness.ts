import { CancelGuide } from '@/types/guide'

export const blinkFitness: CancelGuide = {
  slug: 'blink-fitness',
  service: 'Blink Fitness',
  category: 'Health & Fitness',
  logo: '💪',
  difficulty: 'hard',
  difficultyReason: 'Blink Fitness requires cancelling in person or by certified mail. Online cancellation is not available. An annual fee may apply.',
  darkPatternScore: 8,
  darkPatternFlags: {
    hiddenButton: true,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: false,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 15,
  },
  lastVerified: '2026-05-01',
  monthlyPrice: '$15/mo (Monthly) · $25/mo (All Out) · Annual fee: $49/yr',
  refundPolicy: 'No refunds. 30-day cancellation notice required for monthly plans. Annual members may owe remaining dues.',
  description: 'Cancel Blink Fitness in person at your home gym or by certified mail. No online cancellation available.',
  platforms: [
    {
      platform: 'web',
      label: 'In Person / Certified Mail',
      deepLink: 'https://www.blinkfitness.com/locations',
      steps: [
        { step: 1, instruction: 'Option 1 — Visit your home Blink Fitness gym in person and request a cancellation form from the front desk.' },
        { step: 2, instruction: 'Fill out and submit the form. Ask for a confirmation receipt.' },
        { step: 3, instruction: 'Option 2 — Send a written cancellation request by certified mail to your home gym address (find it at blinkfitness.com/locations).', note: 'Monthly members must give 30 days notice. Your billing continues during this notice period.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'The Blink Fitness app does not support cancellation. Visit your home gym in person or send certified mail.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Same as iOS — no in-app cancellation. Go to your home gym or send certified mail.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I cancel Blink online?',
      answer: 'No. Blink Fitness does not offer online cancellation. You must visit your home gym in person or send a certified letter. This is a deliberate policy.',
    },
    {
      question: 'I moved — how do I cancel if I can\'t visit my home gym?',
      answer: 'Send a certified letter to your original home gym location. Include your full name, address, phone number, and membership ID. Keep the tracking number for proof of delivery.',
    },
  ],
  alternatives: [
    { name: 'ClassPass', url: '/cancel/classpass', description: 'From $19/mo — flexible gym & class credits' },
    { name: 'Crunch Fitness', url: '/cancel/crunch-fitness', description: 'From $9.99/mo — nationwide gym chain' },
  ],
  tags: ['gym', 'fitness', 'health', 'in-person'],
}
