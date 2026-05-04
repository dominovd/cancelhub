import { CancelGuide } from '@/types/guide'

export const icloudPlus: CancelGuide = {
  slug: 'icloud-plus',
  service: 'iCloud+',
  category: 'Cloud Storage',
  logo: '☁️',
  difficulty: 'easy',
  difficultyReason: 'Apple makes iCloud+ cancellation (downgrade to free) very straightforward on all devices.',
  darkPatternScore: 1,
  lastVerified: '2025-05-01',
  monthlyPrice: '$0.99/mo (50GB) · $2.99/mo (200GB) · $9.99/mo (2TB)',
  refundPolicy: 'No refunds. You can downgrade to the free 5GB plan at any time.',
  description: 'Cancel iCloud+ (downgrade to free 5GB) in under 2 minutes on iPhone, Mac, or web.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://appleid.apple.com/',
      steps: [
        { step: 1, instruction: 'Go to appleid.apple.com and sign in.' },
        { step: 2, instruction: 'Click "iCloud+".' },
        { step: 3, instruction: 'Click "Manage Storage".' },
        { step: 4, instruction: 'Click "Change Storage Plan".' },
        { step: 5, instruction: 'Click "Downgrade Options".' },
        { step: 6, instruction: 'Select the free 5GB plan.' },
        { step: 7, instruction: 'Confirm the downgrade.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → iCloud.' },
        { step: 2, instruction: 'Tap "Manage Account Storage".' },
        { step: 3, instruction: 'Tap "Change Storage Plan".' },
        { step: 4, instruction: 'Select the free 5GB plan.' },
        { step: 5, instruction: 'Tap "Downgrade to Free" → confirm.' },
      ],
    },
    {
      platform: 'other',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'iCloud+ cannot be managed from Android. Visit appleid.apple.com or use an Apple device.' },
        { step: 2, instruction: 'After downgrading, data exceeding 5GB may be deleted — download important files first.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my data if I downgrade to free?',
      answer: 'If your iCloud storage exceeds 5GB, new data won\'t sync and backups may stop. Download important files before downgrading. Apple gives you warnings before deleting data.',
    },
    {
      question: 'Can I cancel iCloud+ without losing my photos?',
      answer: 'Yes — download your photos to your device or Mac first. Use iCloud.com to download in bulk. After downgrading, photos already on your device remain safe.',
    },
  ],
  alternatives: [
    { name: 'Google One', url: '#', description: '$1.99/mo for 100GB — works on all devices' },
    { name: 'Dropbox', url: '#', description: 'From $9.99/mo — cross-platform cloud storage' },
  ],
  tags: ['cloud', 'storage', 'apple', 'backup'],
}
