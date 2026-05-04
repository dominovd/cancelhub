import { CancelGuide } from '@/types/guide'

export const claude: CancelGuide = {
  slug: 'claude',
  service: 'Claude Pro',
  category: 'AI',
  logo: '🤖',
  difficulty: 'easy',
  difficultyReason: 'Anthropic provides a simple cancellation flow with no retention friction.',
  darkPatternScore: 1,
  lastVerified: '2025-04-09',
  monthlyPrice: '$20/mo (Pro) · $25/mo per user (Team)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel Claude Pro or Team subscription in under 3 minutes via web or Apple settings.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://claude.ai/settings/billing',
      steps: [
        { step: 1, instruction: 'Go to claude.ai and sign in.' },
        { step: 2, instruction: 'Click your profile icon → "Settings".' },
        { step: 3, instruction: 'Go to "Billing" in the sidebar.' },
        { step: 4, instruction: 'Click "Cancel plan" or "Cancel subscription".' },
        { step: 5, instruction: 'Confirm the cancellation.', note: 'Pro access continues until your billing period ends.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Claude → Cancel.' },
        { step: 2, instruction: 'If subscribed via Anthropic directly: use the website steps above.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile → Subscriptions.' },
        { step: 2, instruction: 'Find Claude → tap "Cancel subscription" → confirm.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Will I lose my conversation history?',
      answer: 'No. All your conversations are saved and accessible even on the free plan.',
    },
    {
      question: 'What do I lose when I downgrade to free?',
      answer: 'You lose priority access during peak times, access to Claude\'s most capable models (Opus), and higher usage limits.',
    },
  ],
  alternatives: [
    { name: 'ChatGPT Plus', url: '/cancel/chatgpt', description: '$20/mo — OpenAI\'s GPT-4o and more' },
    { name: 'Gemini Advanced', url: '#', description: '$19.99/mo — Google\'s most capable AI' },
  ],
  tags: ['ai', 'chatbot', 'productivity', 'anthropic'],
}
