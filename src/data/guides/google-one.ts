import { CancelGuide } from '@/types/guide'

export const googleOne: CancelGuide = {
  slug: 'google-one',
  service: 'Google One',
  category: 'Cloud Storage',
  logo: '☁️',
  difficulty: 'easy',
  difficultyReason: 'Google One cancellation (downgrade to free) is straightforward through Google Account settings.',
  darkPatternScore: 2,
  lastVerified: '2025-05-01',
  monthlyPrice: '$1.99/mo (100GB) · $2.99/mo (200GB) · $9.99/mo (2TB)',
  refundPolicy: 'No refunds. Downgrade takes effect at end of billing period. Free plan includes 15GB.',
  description: 'Cancel Google One (downgrade to free 15GB) in under 3 minutes via web or Android.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://one.google.com/storage',
      steps: [
        { step: 1, instruction: 'Go to one.google.com and sign in.' },
        { step: 2, instruction: 'Click "Storage" in the left sidebar.' },
        { step: 3, instruction: 'Click "Manage storage".' },
        { step: 4, instruction: 'Click "Downgrade plan".' },
        { step: 5, instruction: 'Select the free plan.' },
        { step: 6, instruction: 'Confirm the downgrade.', note: 'Google gives 15GB free. After downgrading, data over 15GB won\'t sync. Download important files before downgrading.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Google One app → Storage → Manage → Downgrade.' },
        { step: 2, instruction: 'Alternatively: Settings → Apple ID → Subscriptions → Google One → Cancel (if subscribed via App Store).' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google One app → Settings → Manage storage plan → Downgrade → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my Google Drive files if I downgrade?',
      answer: 'Files over 15GB won\'t be deleted immediately, but new files won\'t sync and Gmail will stop sending/receiving if you\'re over the limit. Google gives a grace period before taking action.',
    },
    {
      question: 'Does cancelling Google One affect Google Photos?',
      answer: 'Yes — Google Photos storage counts toward your Google account total. If you\'ve exceeded 15GB, photos may stop backing up after you downgrade.',
    },
  ],
  alternatives: [
    { name: 'iCloud+', url: '/cancel/icloud-plus', description: '$0.99/mo for 50GB — Apple devices' },
    { name: 'Dropbox', url: '#', description: 'From $9.99/mo — cross-platform cloud storage' },
  ],
  tags: ['cloud', 'storage', 'google', 'backup', 'photos'],
}
