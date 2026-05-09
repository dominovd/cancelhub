import { CancelGuide } from '@/types/guide'

export const dropbox: CancelGuide = {
  slug: 'dropbox',
  service: 'Dropbox',
  category: 'Cloud Storage',
  logo: '📦',
  difficulty: 'easy',
  difficultyReason: 'Dropbox cancellation is available online and is relatively straightforward, though it downgrade to free rather than fully closing the account.',
  darkPatternScore: 3,
  lastVerified: '2025-05-01',
  monthlyPrice: 'Plus: $9.99/mo · Professional: $16.58/mo · Business: $15/user/mo',
  refundPolicy: 'No refunds on monthly plans. Annual plans may qualify for a prorated refund if cancelled within 30 days.',
  description: 'Cancel Dropbox paid plan (downgrade to free 2GB) in under 3 minutes via web.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://www.dropbox.com/account/plan',
      steps: [
        { step: 1, instruction: 'Go to dropbox.com → sign in → click your profile → Settings → Plan.' },
        { step: 2, instruction: 'Click "Change plan" or "Cancel plan".' },
        { step: 3, instruction: 'Select the free plan (2GB) → confirm downgrade.', note: 'Files exceeding 2GB will not sync after downgrading. Download or delete files to stay within the free limit. Files are not immediately deleted.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Dropbox does not support plan changes through the iOS app. Visit dropbox.com on your browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Dropbox → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit dropbox.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Dropbox → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my files when I downgrade to free?',
      answer: "Your files stay in Dropbox but syncing stops once you exceed 2GB. Files over the limit aren't deleted but become read-only on Dropbox's servers. You have 1 year to sort them out.",
    },
    {
      question: 'I have a Dropbox Business team account — can I cancel it the same way?',
      answer: 'Business accounts require the team admin to cancel. Go to the Admin Console → Billing → Cancel plan. Individual members cannot cancel a team account.',
    },
  ],
  alternatives: [
    { name: 'Google One', url: '/cancel/google-one', description: '$1.99/mo for 100GB' },
    { name: 'iCloud+', url: '/cancel/icloud-plus', description: '$0.99/mo for 50GB' },
  ],
  tags: ['cloud', 'storage', 'files', 'backup', 'sync'],
}
