import { CancelGuide } from '@/types/guide'

export const youtubeTv: CancelGuide = {
  slug: 'youtube-tv',
  service: 'YouTube TV',
  category: 'Streaming',
  logo: '📡',
  difficulty: 'easy',
  difficultyReason: 'YouTube TV has a clean cancellation flow with no major retention friction.',
  darkPatternScore: 2,
  lastVerified: '2026-05-01',
  monthlyPrice: '$72.99/mo',
  refundPolicy: 'No refunds. Access continues through end of billing period.',
  description: 'Cancel YouTube TV in under 3 minutes on web or mobile. No hidden fees or cancellation charges.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://tv.youtube.com/settings/membership',
      steps: [
        { step: 1, instruction: 'Go to tv.youtube.com and sign in.' },
        { step: 2, instruction: 'Click "Settings" → "Membership".' },
        { step: 3, instruction: 'Click "Pause or Cancel membership".' },
        { step: 4, instruction: 'Select "Cancel" → confirm.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your name → Subscriptions.' },
        { step: 2, instruction: 'Find "YouTube TV" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → "Payments & subscriptions" → Subscriptions.' },
        { step: 2, instruction: 'Find "YouTube TV" → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'What happens to my DVR recordings after I cancel?',
      answer: 'Your DVR recordings are deleted after cancellation. Download or save anything important before you cancel.',
    },
    {
      question: 'Can I pause instead of cancel?',
      answer: 'Yes — YouTube TV allows you to pause your membership for up to 6 months, which may be better than cancelling if you plan to return.',
    },
  ],
  alternatives: [
    { name: 'Hulu + Live TV', url: '/cancel/hulu', description: 'From $82.99/mo — live TV + Hulu' },
    { name: 'FuboTV', url: '/cancel/fubotv', description: 'From $79.99/mo — sports-focused live TV' },
  ],
  tags: ['streaming', 'live-tv', 'google', 'sports'],
}
