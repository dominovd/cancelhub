import { CancelGuide } from '@/types/guide'

export const thriveMarket: CancelGuide = {
  slug: 'thrive-market',
  service: 'Thrive Market',
  category: 'Food & Grocery',
  logo: '🛒',
  difficulty: 'medium',
  difficultyReason: 'Thrive Market membership cancellation requires contacting support or navigating account settings, and the cancel option is not prominently displayed.',
  darkPatternScore: 5,
  lastVerified: '2026-05-01',
  monthlyPrice: '$12/mo · $59.99/yr (annual saves ~58%)',
  refundPolicy: 'Annual memberships are refundable within 30 days. Monthly memberships have no refund.',
  description: 'Cancel Thrive Market membership in under 5 minutes via account settings or live chat.',
  platforms: [
    {
      platform: 'web',
      label: 'Website',
      deepLink: 'https://thrivemarket.com/account/membership',
      steps: [
        { step: 1, instruction: 'Go to thrivemarket.com → sign in → Account → Membership.' },
        { step: 2, instruction: 'Click "Cancel Membership" (may be labeled "Manage Membership").' },
        { step: 3, instruction: 'If no cancel button is visible, use live chat at thrivemarket.com/help.' },
        { step: 4, instruction: 'Confirm cancellation and request a confirmation email.', note: 'Annual members can get a full refund if cancelled within 30 days of purchase.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'Thrive Market does not support in-app cancellation. Visit thrivemarket.com on your mobile browser.' },
        { step: 2, instruction: 'If subscribed via App Store: Settings → Apple ID → Subscriptions → Thrive Market → Cancel.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Visit thrivemarket.com on your mobile browser to cancel.' },
        { step: 2, instruction: 'If subscribed via Google Play: Play Store → Subscriptions → Thrive Market → Cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'I just joined — can I get a refund on the annual plan?',
      answer: 'Yes. Thrive Market offers a 30-day money-back guarantee on annual memberships. Contact support via live chat at thrivemarket.com/help and request the refund.',
    },
    {
      question: 'I can\'t find the cancel button in my account.',
      answer: 'Thrive Market sometimes doesn\'t show a direct cancel button. Use the live chat option at thrivemarket.com/help and ask to cancel your membership.',
    },
  ],
  alternatives: [
    { name: 'Costco', url: '#', description: '$65/yr membership — warehouse club' },
    { name: 'Amazon Prime', url: '/cancel/amazon-prime', description: '$14.99/mo — free shipping + more' },
  ],
  tags: ['grocery', 'organic', 'food', 'delivery', 'membership'],
}
