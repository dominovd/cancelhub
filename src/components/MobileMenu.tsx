'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Item {
  href: string
  label: string
  cta?: boolean
}

interface Props {
  items: Item[]
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transition: 'transform .2s ease', transform: open ? 'rotate(90deg)' : 'rotate(0)' }}
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  )
}

export function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on outside click + Escape
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

  return (
    <div ref={ref} className="relative sm:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ink-2 hover:accent transition-colors flex items-center justify-center"
        style={{ width: 32, height: 32, borderRadius: 8 }}
      >
        <HamburgerIcon open={open} />
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            width: 220,
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            zIndex: 60,
          }}
        >
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '11px 16px',
                  fontSize: 14,
                  fontWeight: item.cta ? 600 : 500,
                  color: item.cta
                    ? 'var(--accent)'
                    : isActive
                      ? 'var(--ink)'
                      : 'var(--ink-2)',
                  background: isActive ? 'var(--paper-2)' : 'transparent',
                  borderBottom: '1px solid var(--line)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
