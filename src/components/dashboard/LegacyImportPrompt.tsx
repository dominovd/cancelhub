'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  readLegacySubscriptions,
  isLegacyMigrationHandled,
  clearLegacyStorage,
  markLegacyMigrationHandled,
} from '@/lib/dashboard-store'
import { bulkImportSubscriptions } from '@/lib/dashboard/actions'

interface Props {
  /** Optional callback fired after a successful import. */
  onImported?: () => void
}

/**
 * After a user signs in, check localStorage for guest-mode subscriptions
 * left over from the pre-auth version of the dashboard. If found, offer to
 * import them into the new account.
 *
 * Renders nothing if:
 *  - we're SSR
 *  - the migration has already been handled (success or dismissed)
 *  - there are no legacy subs
 */
export function LegacyImportPrompt({ onImported }: Props) {
  const router = useRouter()
  const [legacyCount, setLegacyCount] = useState<number | null>(null)
  const [phase, setPhase] = useState<'idle' | 'importing' | 'done'>('idle')
  const [result, setResult] = useState<{ imported: number; failed: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLegacyMigrationHandled()) return
    const subs = readLegacySubscriptions()
    if (subs.length === 0) {
      // Nothing to migrate — mark handled so we never run this again
      markLegacyMigrationHandled()
      return
    }
    setLegacyCount(subs.length)
  }, [])

  if (legacyCount === null) return null

  if (phase === 'done') return null

  const handleImport = async () => {
    setError(null)
    setPhase('importing')
    try {
      const subs = readLegacySubscriptions()
      const res = await bulkImportSubscriptions(subs)
      setResult(res)
      clearLegacyStorage()
      onImported?.()
      router.refresh()
      // Show success briefly then hide
      setTimeout(() => setPhase('done'), 2400)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      setPhase('idle')
    }
  }

  const handleDismiss = () => {
    clearLegacyStorage()
    setPhase('done')
  }

  return (
    <div
      role="alert"
      style={{
        marginBottom: 16,
        background: 'var(--accent-soft)',
        border: '1px solid var(--accent-border)',
        borderRadius: 14,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: 9,
          background: 'var(--accent)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        ↑
      </div>

      <div style={{ flex: 1, minWidth: 200 }}>
        {result ? (
          <p style={{ fontSize: 14, color: 'var(--accent-deep)', fontWeight: 500 }}>
            ✓ Imported{' '}
            <strong style={{ color: 'var(--accent-deeper)' }}>{result.imported}</strong>{' '}
            {result.imported === 1 ? 'subscription' : 'subscriptions'} into your account.
            {result.failed > 0 && (
              <>
                {' '}({result.failed} skipped — duplicates or invalid data.)
              </>
            )}
          </p>
        ) : (
          <>
            <div
              className="font-serif-display"
              style={{
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: '-0.005em',
                color: 'var(--accent-deeper)',
                marginBottom: 4,
              }}
            >
              You have {legacyCount} guest{' '}
              {legacyCount === 1 ? 'subscription' : 'subscriptions'} from before you signed in.
            </div>
            <div style={{ fontSize: 13, color: 'var(--accent-deep)', lineHeight: 1.5 }}>
              Want to import them into your account so they sync across devices?
            </div>
            {error && (
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--hard)',
                  marginTop: 6,
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}
          </>
        )}
      </div>

      {!result && (
        <div className="flex items-center gap-[8px]" style={{ flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleDismiss}
            disabled={phase === 'importing'}
            style={{
              fontSize: 13,
              color: 'var(--accent-deep)',
              fontWeight: 600,
              background: 'transparent',
              border: 0,
              padding: '7px 12px',
              cursor: 'pointer',
              borderRadius: 9,
            }}
          >
            No thanks
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={phase === 'importing'}
            className="btn-accent"
            style={{ padding: '8px 14px', fontSize: 13, opacity: phase === 'importing' ? 0.6 : 1 }}
          >
            {phase === 'importing' ? 'Importing…' : `Import ${legacyCount}`}
          </button>
        </div>
      )}
    </div>
  )
}
