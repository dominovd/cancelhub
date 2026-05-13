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

export interface DarkPatternFlags {
  /** Cancel button/link is buried or non-obvious */
  hiddenButton?: boolean
  /** Must call customer support to cancel */
  requiresCall?: boolean
  /** Must use live chat to cancel (no self-serve) */
  requiresChat?: boolean
  /** Shows guilt-trip offers, countdown timers, or "pause instead" pop-ups */
  retentionTactics?: boolean
  /** Uses shame-y or manipulative language on cancel confirmation screen */
  confirmationShaming?: boolean
  /** How clearly refund eligibility is communicated */
  refundClarity?: 'clear' | 'murky' | 'none'
  /** Typical minutes needed to complete cancellation */
  estimatedMinutes?: number
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
  darkPatternFlags?: DarkPatternFlags
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

// ─── Localization types ───────────────────────────────────────────────────────

export interface GuideStepTranslation {
  instruction: string
  note?: string
}

export interface GuidePlatformTranslation {
  steps: GuideStepTranslation[]
}

export interface GuideContentTranslation {
  description?: string
  difficultyReason?: string
  refundPolicy?: string
  platforms?: Partial<Record<Platform, GuidePlatformTranslation>>
  commonIssues?: { question: string; answer: string }[]
  alternatives?: { description: string }[]
}

export type AllGuidesTranslations = Partial<Record<string, GuideContentTranslation>>
