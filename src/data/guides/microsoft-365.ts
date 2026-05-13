import { CancelGuide } from '@/types/guide'

export const microsoft365: CancelGuide = {
  slug: 'microsoft-365',
  service: 'Microsoft 365',
  category: 'Productivity',
  logo: '📊',
  difficulty: 'medium',
  difficultyReason: 'Cancellation is hidden under multiple menus, and you risk losing OneDrive storage immediately.',
  darkPatternScore: 6,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: false,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'clear',
    estimatedMinutes: 5,
  },
  lastVerified: '2026-04-05',
  monthlyPrice: '$6.99/mo (Personal) · $9.99/mo (Family)',
  refundPolicy: 'Prorated refund available within 30 days for annual subscriptions.',
  description: 'Cancel Microsoft 365 without losing your files. OneDrive storage drops to 5GB — here\'s how to prepare.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://account.microsoft.com/services',
      steps: [
        { step: 1, instruction: 'Go to account.microsoft.com and sign in.' },
        { step: 2, instruction: 'Click "Services & subscriptions" in the top navigation.' },
        { step: 3, instruction: 'Find Microsoft 365 → click "Manage".' },
        { step: 4, instruction: 'Click "Cancel" under the subscription details.' },
        { step: 5, instruction: 'Follow the prompts. Microsoft may offer a discount — skip if you want to cancel.', note: 'If you have more than 5GB in OneDrive, download your files first.' },
        { step: 6, instruction: 'Confirm cancellation. You\'ll get a confirmation email.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Microsoft 365 → Cancel.' },
        { step: 2, instruction: 'If subscribed via Microsoft directly: use the website steps above.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Microsoft 365 → Cancel.' },
        { step: 2, instruction: 'If subscribed directly: use the website steps above.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my Office apps (Word, Excel, PowerPoint)?',
      answer: 'Apps switch to "read-only" mode after cancellation. You can view but not edit documents. Microsoft 365 on the web (Office.com) remains free with limited features.',
    },
    {
      question: 'What happens to OneDrive storage?',
      answer: 'Your storage drops to the free 5GB limit. If you have more data, you have 30 days to download or delete files before Microsoft restricts access.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, for annual subscriptions cancelled within 30 days of purchase or renewal. Monthly subscriptions are not refunded. Contact Microsoft support for annual refunds.',
    },
  ],
  alternatives: [
    { name: 'Google Workspace (free)', url: '#', description: 'Docs, Sheets, Slides — free with Google account' },
    { name: 'LibreOffice', url: '#', description: 'Free, open-source Office alternative' },
  ],
  tags: ['productivity', 'office', 'microsoft', 'cloud'],
}
