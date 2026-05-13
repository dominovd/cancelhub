import type { CancelGuide } from '@/types/guide'

export type ActionType = 'pause' | 'refund' | 'delete'

export const SUPPORTED_ACTIONS: ActionType[] = ['pause', 'refund', 'delete']

export interface ActionMeta {
  type: ActionType
  label: string
  title: (service: string) => string
  description: (service: string) => string
}

export const ACTION_META: Record<ActionType, ActionMeta> = {
  pause: {
    type: 'pause',
    label: 'Pause',
    title: (s) => `How to Pause ${s}`,
    description: (s) =>
      `Can you pause ${s} instead of cancelling? Here's what the pause option includes, how long it lasts, and step-by-step instructions.`,
  },
  refund: {
    type: 'refund',
    label: 'Get a refund',
    title: (s) => `How to Get a ${s} Refund`,
    description: (s) =>
      `${s} refund policy explained: eligibility, how to request one, and what to do if you were charged after cancelling.`,
  },
  delete: {
    type: 'delete',
    label: 'Delete account',
    title: (s) => `How to Delete Your ${s} Account`,
    description: (s) =>
      `How to permanently delete your ${s} account and all associated data. Cancelling a subscription and deleting an account are two different things — here's how to do both.`,
  },
}

// ─── Pause ────────────────────────────────────────────────────────────────────

export interface PauseInfo {
  supported: boolean
  answer?: string    // from commonIssues
  stepHint?: string  // from steps if mentioned
  source: 'commonIssues' | 'steps' | 'none'
}

export function derivePauseInfo(guide: CancelGuide): PauseInfo {
  // 1. Check commonIssues for a pause-related question
  const pauseIssue = guide.commonIssues.find((i) =>
    /pause|pausing/i.test(i.question)
  )
  if (pauseIssue) {
    return { supported: true, answer: pauseIssue.answer, source: 'commonIssues' }
  }

  // 2. Check steps across all platforms for a pause mention
  for (const platform of guide.platforms) {
    for (const step of platform.steps) {
      if (/\bpause\b/i.test(step.instruction)) {
        return { supported: true, stepHint: step.instruction, source: 'steps' }
      }
    }
  }

  return { supported: false, source: 'none' }
}

// ─── Refund ───────────────────────────────────────────────────────────────────

export interface RefundInfo {
  policy: string
  eligible: boolean   // true if there's any chance of a refund
  window?: string     // extracted: "30 days", "14 days"…
  hasMBG: boolean     // money-back guarantee
}

export function deriveRefundInfo(guide: CancelGuide): RefundInfo {
  const policy = guide.refundPolicy ?? 'No refund policy information available for this service.'
  const noRefund = /^no refunds?/i.test(policy.trim())
  const eligible = !noRefund

  // Extract time window
  const windowMatch = policy.match(/(\d+)[\s-]day/i)
  const window = windowMatch ? `${windowMatch[1]} days` : undefined

  const hasMBG =
    /money.back guarantee|satisfaction guarantee/i.test(policy)

  return { policy, eligible, window, hasMBG }
}
