import { CancelGuide } from '@/types/guide'

export const adobe: CancelGuide = {
  slug: 'adobe',
  service: 'Adobe Creative Cloud',
  category: 'Software',
  logo: '🎨',
  difficulty: 'hard',
  difficultyReason: 'Adobe charges up to 50% of your remaining contract as an early termination fee and uses multiple retention screens.',
  darkPatternScore: 9,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: true,
    refundClarity: 'murky',
    estimatedMinutes: 8,
  },
  lastVerified: '2025-04-05',
  monthlyPrice: '$54.99/mo (annual plan)',
  refundPolicy: 'Early termination fee: 50% of remaining months if cancelled in first year. Free if cancelled within 14 days of purchase or renewal.',
  description: 'Cancel Adobe Creative Cloud without paying the early termination fee. Timing matters — here\'s exactly what to do.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://account.adobe.com/plans',
      steps: [
        { step: 1, instruction: 'Go to account.adobe.com and sign in.' },
        { step: 2, instruction: 'Click "Plans & Products" in the left sidebar.' },
        { step: 3, instruction: 'Find your Creative Cloud plan and click "Manage plan".' },
        { step: 4, instruction: 'Click "Cancel your plan".', note: 'Adobe will show you the early termination fee at this point.' },
        { step: 5, instruction: 'Choose a reason → Adobe will make multiple offers (discounts, pauses). Click "Continue to cancel" each time.' },
        { step: 6, instruction: 'Confirm cancellation. Save the confirmation number.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If you subscribed via App Store: open Settings → Apple ID → Subscriptions → Adobe → Cancel.' },
        { step: 2, instruction: 'If subscribed directly with Adobe: use the website steps above — the app does not support direct cancellation.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: open Play Store → Subscriptions → Adobe → Cancel.' },
        { step: 2, instruction: 'If subscribed directly with Adobe: use the website steps above.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'How do I avoid the 50% early termination fee?',
      answer: 'You have two options: (1) Cancel within 14 days of your annual plan starting or renewing — Adobe must refund you in full. (2) Wait until your annual contract ends and cancel before it auto-renews.',
    },
    {
      question: 'Adobe charged me the ETF — can I dispute it?',
      answer: 'If you believe the charge is incorrect, contact Adobe support and reference the 14-day window. If you\'re outside that window, you can dispute with your credit card company but results vary.',
    },
    {
      question: 'What happens to my files after cancellation?',
      answer: 'You lose access to Creative Cloud apps but your files saved locally remain. Cloud-stored files are accessible read-only for 90 days.',
    },
  ],
  alternatives: [
    { name: 'Affinity Suite', url: '#', description: 'One-time purchase, no subscription. Photoshop/Illustrator alternative.' },
    { name: 'Canva Pro', url: '#', description: '$12.99/mo — great for non-designers' },
    { name: 'Figma', url: '#', description: 'Free tier available, best for UI/UX design' },
  ],
  tags: ['software', 'creative', 'design', 'annual-contract'],
}
