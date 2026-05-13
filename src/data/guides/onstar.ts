import { CancelGuide } from '@/types/guide'

export const onstar: CancelGuide = {
  slug: 'onstar',
  service: 'OnStar',
  category: 'Automotive',
  logo: '🚙',
  difficulty: 'hard',
  difficultyReason: 'OnStar requires calling customer service to cancel — there is no online cancellation option. Hold times can be long.',
  darkPatternScore: 7,
  darkPatternFlags: {
    hiddenButton: false,
    requiresCall: true,
    requiresChat: false,
    retentionTactics: true,
    confirmationShaming: false,
    refundClarity: 'murky',
    estimatedMinutes: 15,
  },
  lastVerified: '2025-05-01',
  monthlyPrice: '$14.99–$49.99/mo depending on plan (Protection, Security, Remote Access, etc.)',
  refundPolicy: 'No refunds on used months. Cancel before renewal to avoid next charge.',
  description: 'Cancel OnStar by phone — there is no online cancellation. Call 1-888-466-7827 and follow the prompts.',
  platforms: [
    {
      platform: 'web',
      label: 'Phone / Website',
      deepLink: 'https://www.onstar.com/',
      steps: [
        { step: 1, instruction: 'OnStar cannot be cancelled online. Call 1-888-466-7827.' },
        { step: 2, instruction: 'Say "Cancel" or press the option for account changes.' },
        { step: 3, instruction: 'Request cancellation of your OnStar plan. The agent may offer discounts — decline if you want to cancel.' },
        { step: 4, instruction: 'Get a confirmation number or email for your records.', note: 'You can also press the blue OnStar button in your vehicle and request cancellation through the in-car system.' },
      ],
    },
    {
      platform: 'ios',
      label: 'iPhone / iPad',
      steps: [
        { step: 1, instruction: 'The myOnStar app does not support cancellation.' },
        { step: 2, instruction: 'Call 1-888-466-7827 to cancel by phone.' },
      ],
    },
    {
      platform: 'android',
      label: 'Android',
      steps: [
        { step: 1, instruction: 'Same as iOS — cancellation requires calling 1-888-466-7827.' },
        { step: 2, instruction: 'The app cannot be used to cancel.' },
      ],
    },
  ],
  commonIssues: [
    {
      question: 'Can I cancel OnStar online or in the app?',
      answer: 'No. OnStar does not offer online or in-app cancellation. You must call 1-888-466-7827. Be prepared for a retention script and possible hold times.',
    },
    {
      question: 'Will cancelling OnStar affect my vehicle\'s emergency services?',
      answer: 'Yes. Emergency services (automatic crash response, roadside assistance) are part of OnStar. After cancellation, these services stop. Your vehicle\'s built-in features (like navigation) may still work depending on your car model.',
    },
  ],
  tags: ['automotive', 'gm', 'safety', 'connected-car', 'vehicle'],
}
