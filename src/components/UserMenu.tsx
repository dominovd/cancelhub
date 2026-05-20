'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/dashboard/actions'

interface Props {
  email: string
  dashboardHref: string
  notificationsHref: string
}

function initials(email: string): string {
  if (!email) return '?'
  const left = email.split('@')[0] ?? email
  const parts = left.split(/[._-]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return left.slice(0, 2).toUpperCase()
}

export function UserMenu({ email, dashboardHref, notificationsHref }: Props) {
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      router.push('/')
      router.refresh()
    } finally {
      setSigningOut(false)
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: 12,
          border: 0,
          cursor: 'pointer',
          letterSpacing: '0.02em',
        }}
      >
        {initials(email)}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            width: 240,
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            zIndex: 60,
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--line)',
              fontSize: 12,
              color: 'var(--ink-3)',
              lineHeight: 1.4,
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                fontWeight: 600,
                marginBottom: 3,
              }}
            >
              Signed in as
            </div>
            <div
              className="truncate"
              style={{ color: 'var(--ink)', fontWeight: 500, fontSize: 13.5 }}
              title={email}
            >
              {email}
            </div>
          </div>

          <Link
            href={dashboardHref}
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              padding: '11px 16px',
              fontSize: 14,
              color: 'var(--ink-2)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
            }}
          >
            My subscriptions
          </Link>
          <Link
            href={notificationsHref}
            role="menuitem"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              padding: '11px 16px',
              fontSize: 14,
              color: 'var(--ink-2)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--line)',
            }}
          >
            Notifications
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            style={{
              display: 'block',
              width: '100%',
              padding: '11px 16px',
              fontSize: 14,
              color: 'var(--hard)',
              textAlign: 'left',
              background: 'transparent',
              border: 0,
              cursor: signingOut ? 'wait' : 'pointer',
              fontWeight: 500,
            }}
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  )
}
