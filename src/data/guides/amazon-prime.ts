import { CancelGuide } from '@/types/guide'

export const amazonPrime: CancelGuide = {
  slug: 'amazon-prime',
  service: 'Amazon Prime',
  category: 'Shopping',
  logo: '📦',
  difficulty: 'medium',
  difficultyReason: 'Amazon hides the cancel option and shows multiple retention screens, but a refund is available if you act fast.',
  darkPatternScore: 7,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: true,
    refundClarity: 'murky',
    estimatedMinutes: 5,
  },
  lastVerified: '2026-04-07',
  monthlyPrice: '$14.99/mo · $139/yr',
  refundPolicy: 'Prorated refund available if you haven\'t used Prime benefits during the current billing period.',
  description: 'Cancel Amazon Prime and potentially get a refund. Amazon makes this tricky — follow the exact steps below.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.amazon.com/mc/pipelines/membership',
      steps: [
        { step: 1, instruction: 'Go to amazon.com → hover over "Account & Lists" → click "Account".' },
        { step: 2, instruction: 'Click "Prime" or search for "Manage Prime Membership" in account settings.' },
        { step: 3, instruction: 'Click "Update, cancel, and more" → "End membership".' },
        { step: 4, instruction: 'Choose "End Membership" (not "Remind me later" or other options Amazon shows).', note: 'Amazon will show a refund amount if you qualify.' },
        { step: 5, instruction: 'Click "Cancel membership" to confirm.' },
        { step: 6, instruction: 'Check your email for confirmation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Amazon Shopping app → tap the three lines (menu).' },
        { step: 2, instruction: 'Scroll to "Account" → tap "Manage Prime Membership".' },
        { step: 3, instruction: 'Tap "Update, cancel, and more" → "End membership".' },
        { step: 4, instruction: 'Follow the same prompts as the web version.' },
        { step: 5, instruction: 'Note: if you subscribed through Apple, cancel via iOS Settings → Subscriptions instead.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Amazon Shopping app → menu → "Account".' },
        { step: 2, instruction: 'Tap "Manage Prime Membership" → "End membership".' },
        { step: 3, instruction: 'If subscribed through Google Play, cancel via Play Store → Subscriptions instead.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Do I qualify for a refund?',
      answer: 'Yes, if you haven\'t used any Prime benefits (free shipping, Prime Video, etc.) since your last charge. The refund is prorated. Amazon shows the exact amount before you confirm cancellation.',
    },
    {
      question: 'What happens to my Prime Video watchlist?',
      answer: 'You lose access to Prime Video content immediately upon cancellation. Your watchlist is saved if you resubscribe.',
    },
    {
      question: 'I cancelled but I\'m still being charged.',
      answer: 'Check if you have a separate household Prime membership or if a family member started a new membership. Log in and check account settings.',
    },
  ],
  tags: ['shopping', 'streaming', 'delivery'],
}
