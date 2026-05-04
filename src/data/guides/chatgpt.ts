import { CancelGuide } from '@/types/guide'

export const chatgpt: CancelGuide = {
  slug: 'chatgpt',
  service: 'ChatGPT Plus',
  category: 'AI',
  logo: '🤖',
  difficulty: 'easy',
  difficultyReason: 'OpenAI provides a simple cancellation flow with no retention friction.',
  darkPatternScore: 1,
  lastVerified: '2025-04-09',
  monthlyPrice: '$20/mo (Plus) · $200/mo (Pro)',
  refundPolicy: 'No refunds. Access continues until end of billing period.',
  description: 'Cancel ChatGPT Plus or Pro in under 2 minutes. Stop the next charge without losing current access.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://chatgpt.com/#settings/Subscription',
      steps: [
        { step: 1, instruction: 'Go to chatgpt.com and sign in.' },
        { step: 2, instruction: 'Click your name or profile icon in the bottom-left.' },
        { step: 3, instruction: 'Go to "Settings" → "Subscription".' },
        { step: 4, instruction: 'Click "Manage my subscription".' },
        { step: 5, instruction: 'Click "Cancel plan" → Confirm.' },
        { step: 6, instruction: 'You\'ll receive a confirmation email. Plus access continues until end of period.', note: 'ChatGPT reverts to the free plan automatically.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Open Settings → tap your Apple ID name → Subscriptions.' },
        { step: 2, instruction: 'Find "ChatGPT" → tap it.' },
        { step: 3, instruction: 'Tap "Cancel Subscription" → Confirm.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Open Google Play Store → profile icon → "Payments & subscriptions" → "Subscriptions".' },
        { step: 2, instruction: 'Find "ChatGPT" → tap "Cancel subscription".' },
        { step: 3, instruction: 'Follow the confirmation prompts.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I cancelled but I\'m still on the free plan immediately.',
      answer: 'That\'s expected for some accounts. Plus access should continue until the billing period ends. If not, contact support.openai.com.',
    },
    {
      question: 'Will I lose my conversation history?',
      answer: 'No. Your chats are saved regardless of plan. You just lose GPT-4 access, DALL-E, and other Plus features.',
    },
  ],
  alternatives: [
    { name: 'Claude', url: '/cancel/claude', description: 'Anthropic\'s AI — free tier + $20/mo Pro' },
    { name: 'Gemini Advanced', url: '#', description: 'Google\'s AI — $19.99/mo, included in Google One AI Premium' },
    { name: 'Perplexity', url: '#', description: '$20/mo — AI search engine' },
  ],
  tags: ['ai', 'chatbot', 'productivity'],
}
