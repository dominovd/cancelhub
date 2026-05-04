export type Difficulty = 'easy' | 'medium' | 'hard'
export type Platform = 'web' | 'ios' | 'android'

export interface CancelStep {
  step: number
  instruction: string
  note?: string
}

export interface PlatformGuide {
  platform: Platform
  label: string
  steps: CancelStep[]
  deepLink?: string // direct URL to cancellation settings
}

export interface CancelGuide {
  slug: string
  service: string
  category: string
  logo: string // emoji fallback
  logoUrl?: string
  difficulty: Difficulty
  difficultyReason: string
  darkPatternScore: number // 0–10: how hard the service makes it intentionally
  lastVerified: string // ISO date
  monthlyPrice?: string
  annualPrice?: string
  refundPolicy?: string
  description: string
  platforms: PlatformGuide[]
  commonIssues: { question: string; answer: string }[]
  alternatives?: { name: string; url: string; description: string }[]
  tags: string[]
}
