'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'

interface Props {
  next?: string
  initialError?: string
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A10.997 10.997 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export function LoginForm({ next, initialError }: Props) {
  const t = useTranslations('login')
  const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(initialError ?? null)

  const redirectTo = next && next.startsWith('/') ? next : '/dashboard'

  const signInWithGoogle = async () => {
    setError(null)
    try {
      await signIn('google', { redirectTo })
    } catch {
      setError('Google sign-in failed. Please try again.')
    }
  }

  const submitMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setPhase('sending')
    setError(null)
    try {
      const result = await signIn('resend', {
        email: email.trim(),
        redirectTo,
        redirect: false,
      })
      if (result?.error) {
        setError(result.error)
        setPhase('idle')
      } else {
        setPhase('sent')
      }
    } catch {
      setError('Failed to send magic link. Please try again.')
      setPhase('idle')
    }
  }

  if (phase === 'sent') {
    return (
      <div className="card-warm text-center" style={{ padding: '28px 24px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'var(--green-soft)',
            color: 'var(--green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            margin: '0 auto 14px',
          }}
        >
          ✓
        </div>
        <h2
          className="font-serif-display"
          style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.015em', marginBottom: 8 }}
        >
          {t('sentTitle')}
        </h2>
        <p style={{ color: 'var(--ink-3)', fontSize: 14.5, lineHeight: 1.55 }}>
          {t('sentBody', { email })}
        </p>
        <button
          type="button"
          onClick={() => {
            setPhase('idle')
            setEmail('')
          }}
          style={{
            marginTop: 18,
            background: 'transparent',
            border: 0,
            color: 'var(--accent)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {t('useDifferentEmail')}
        </button>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div
          role="alert"
          style={{
            background: 'var(--hard-soft)',
            color: 'var(--hard)',
            padding: '11px 14px',
            borderRadius: 11,
            fontSize: 13.5,
            marginBottom: 16,
            border: '1px solid #e8b4b0',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={signInWithGoogle}
        className="btn-ghost"
        style={{
          width: '100%',
          justifyContent: 'center',
          padding: '11px 14px',
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 16,
        }}
      >
        <GoogleIcon />
        {t('googleCta')}
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          margin: '16px 0',
          fontSize: 12,
          color: 'var(--ink-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        {t('or')}
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      <form onSubmit={submitMagicLink}>
        <label
          htmlFor="login-email"
          style={{
            display: 'block',
            fontSize: 11,
            fontFamily: 'var(--font-mono, ui-monospace, monospace)',
            color: 'var(--ink-3)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          {t('emailLabel')}
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          required
          autoComplete="email"
          autoFocus
          style={{
            width: '100%',
            padding: '12px 15px',
            border: '1px solid var(--line)',
            borderRadius: 11,
            background: 'var(--paper)',
            fontFamily: 'inherit',
            fontSize: 14.5,
            color: 'var(--ink)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          className="btn-dark"
          disabled={phase === 'sending' || email.length === 0}
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: 12,
            padding: '12px 16px',
            opacity: phase === 'sending' || email.length === 0 ? 0.6 : 1,
            cursor: phase === 'sending' ? 'wait' : 'pointer',
          }}
        >
          {phase === 'sending' ? t('sending') : t('magicCta')}
        </button>
      </form>
    </>
  )
}
