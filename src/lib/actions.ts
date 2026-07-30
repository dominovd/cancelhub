import type { CancelGuide } from '@/types/guide'

export type ActionType = 'pause' | 'refund'

export const SUPPORTED_ACTIONS: ActionType[] = ['pause', 'refund']

/**
 * Pause availability must be editorially asserted. Text matching is not
 * reliable: many cancellation flows mention a pause only to say it is
 * unavailable or to present it as a retention offer.
 */
const PAUSE_STATUS_BY_SLUG: Partial<Record<string, boolean>> = {
  audible: true,
  butcherbox: true,
  chegg: false,
  'chewy-autoship': true,
  curology: true,
  'dollar-shave-club': true,
  fabfitfun: false,
  'factor-meals': true,
  hims: true,
  'kindle-unlimited': true,
  netflix: true,
  philo: false,
  scribd: true,
  'youtube-tv': true,
}

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
      `Can you pause ${s} instead of cancelling? Check whether a verified pause option is available and what it means for billing.`,
  },
  refund: {
    type: 'refund',
    label: 'Get a refund',
    title: (s) => `How to Get a ${s} Refund`,
    description: (s) =>
      `${s} refund policy explained: eligibility, how to request one, and what to do if you were charged after cancelling.`,
  },
}

// ─── Pause ────────────────────────────────────────────────────────────────────

export interface PauseInfo {
  supported: boolean
  answer?: string
  source: 'editorial'
}

export function getPauseInfo(guide: CancelGuide): PauseInfo | null {
  const supported = PAUSE_STATUS_BY_SLUG[guide.slug]
  if (supported === undefined) return null

  const pauseIssue = guide.commonIssues.find((i) =>
    /pause|pausing/i.test(i.question)
  )

  return {
    supported,
    answer: pauseIssue?.answer,
    source: 'editorial',
  }
}

// ─── Refund ───────────────────────────────────────────────────────────────────

export interface RefundInfo {
  policy: string
  policySaysNoRefunds: boolean
}

export function getRefundInfo(guide: CancelGuide): RefundInfo {
  const policy = guide.refundPolicy ?? 'No refund policy information available for this service.'
  const policySaysNoRefunds = /^no refunds?\b/i.test(policy.trim())

  return { policy, policySaysNoRefunds }
}

export function getPublishedActions(guide: CancelGuide): ActionType[] {
  const actions: ActionType[] = ['refund']
  if (PAUSE_STATUS_BY_SLUG[guide.slug] !== undefined) actions.unshift('pause')
  return actions
}

export function isPublishedAction(
  guide: CancelGuide,
  action: string,
): action is ActionType {
  return getPublishedActions(guide).includes(action as ActionType)
}
