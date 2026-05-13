import { CancelGuide } from '@/types/guide'

export const experian: CancelGuide = {
  slug: 'experian',
  service: 'Experian',
  category: 'Finance',
  logo: '📊',
  difficulty: 'medium',
  difficultyReason: 'Experian does not offer online self-service cancellation. You must call or chat, and agents use retention tactics.',
  darkPatternScore: 6,
  darkPatternFlags: {
    hiddenButton: true,
    requiresCall: true,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: true,
    refundClarity: 'murky',
    estimatedMinutes: 20,
  },
  lastVerified: '2025-04-10',
  monthlyPrice: '$24.99/mo (CreditWorks Premium)',
  refundPolicy: 'Prorated refunds available in some cases. Contact support within the billing cycle for best results.',
  description: 'Cancel Experian CreditWorks or IdentityWorks subscription. Requires phone or chat — no online self-cancel.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      steps: [
        { step: 1, instruction: 'Log into experian.com/consumer/cancel.html or go to your account settings.' },
        { step: 2, instruction: 'If no cancel button is available (common), open live chat via experian.com/consumer/help.html.', note: 'Experian often hides the cancel option — live chat is usually the fastest route.' },
        { step: 3, instruction: 'Tell the agent you want to cancel your subscription.' },
        { step: 4, instruction: 'Decline any retention offers (credit monitoring pause, discounts).' },
        { step: 5, instruction: 'Request a confirmation email with your cancellation date.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Experian → Cancel.' },
        { step: 2, instruction: 'If subscribed directly with Experian: use phone (1-479-343-6239) or live chat.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Experian → Cancel.' },
        { step: 2, instruction: 'If subscribed directly: use live chat or call Experian support.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: "I can't find a cancel button on the website.",
      answer: 'Experian intentionally makes self-service cancellation hard to find. Go directly to experian.com/consumer/cancel.html or use the live chat option. Calling 1-479-343-6239 is also reliable.',
    },
    {
      question: 'Will cancelling affect my credit score?',
      answer: 'No. Cancelling your Experian subscription does not affect your credit score in any way.',
    },
    {
      question: 'What happens to my credit monitoring?',
      answer: 'Credit monitoring alerts stop. Your credit report data is not deleted — you can still get free annual reports at annualcreditreport.com.',
    },
  ],
  alternatives: [
    { name: 'Credit Karma', url: '/cancel/credit-karma', description: 'Free credit monitoring — no subscription needed' },
    { name: 'Identity Guard', url: '#', description: '$8.99/mo — identity theft protection' },
  ],
  tags: ['finance', 'credit', 'identity', 'monitoring'],
}
