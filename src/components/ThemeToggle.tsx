'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function resolveCurrent(): Theme {
  if (typeof window === 'undefined') return 'light'
  const explicit = document.documentElement.getAttribute('data-theme') as Theme | null
  if (explicit === 'light' || explicit === 'dark') return explicit
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(resolveCurrent())
    setMounted(true)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setTheme(next)
  }

  // Render a stable, identical placeholder until mounted to avoid hydration
  // mismatch (the inline bootstrap script may have already set data-theme).
  const label = mounted ? (theme === 'dark' ? 'Light' : 'Dark') : '·'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="text-[11px] tracking-wider uppercase ink-2 hover:accent transition-colors"
      style={{ minWidth: 36, textAlign: 'right' }}
    >
      {label}
    </button>
  )
}
