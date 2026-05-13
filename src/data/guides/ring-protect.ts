import { CancelGuide } from '@/types/guide'

export const ringProtect: CancelGuide = {
  slug: 'ring-protect',
  service: 'Ring Protect',
  category: 'Home Security',
  logo: '🔔',
  difficulty: 'easy',
  difficultyReason: 'Ring Protect cancellation is available online and in the app, though finding the right settings takes a few clicks.',
  darkPatternScore: 3,
  lastVerified: '2026-05-01',
  monthlyPrice: 'Basic: $4.99/mo per device · Plus: $10/mo · Pro: $20/mo',
  refundPolicy: 'No refunds. Access continues until end of billing period. Annual plans get prorated refund if cancelled within 30 days.',
  description: 'Cancel Ring Protect plan in under 3 minutes via the Ring app or Amazon account settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://ring.com/account',
      steps: [
        { step: 1, instruction: 'Go to ring.com and sign in.' },
        { step: 2, instruction: 'Click "Account".' },
        { step: 3, instruction: 'Select "Ring Protect Plans".' },
        { step: 4, instruction: 'Find your plan and click "Cancel Plan".' },
        { step: 5, instruction: 'Confirm cancellation.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open the Ring app.' },
        { step: 2, instruction: 'Tap the hamburger menu (☰) → Account → Ring Protect Plans.' },
        { step: 3, instruction: 'Tap "Cancel Plan" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open the Ring app.' },
        { step: 2, instruction: 'Tap Account → Ring Protect Plans → Cancel Plan.' },
        { step: 3, instruction: 'Confirm cancellation.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will my Ring cameras still work without a Protect plan?',
      answer: 'Yes. Your cameras still detect motion and send live alerts. You lose cloud video history (recordings are not saved), rich notifications, and extended warranties.',
    },
    {
      question: 'I have multiple Ring devices — do I need to cancel each plan?',
      answer: 'Ring Protect Plus and Pro cover all Ring devices at one address. Basic covers one device at a time. Cancel via your account to see all active plans.',
    },
  ],
  alternatives: [
    { name: 'Nest Aware', url: '#', description: 'From $8/mo — Google Nest camera subscription' },
    { name: 'SimpliSafe', url: '#', description: 'From $19.99/mo — professional monitoring' },
  ],
  tags: ['home-security', 'camera', 'amazon', 'ring', 'monitoring'],
}
