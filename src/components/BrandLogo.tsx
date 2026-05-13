'use client'

import { useEffect, useState } from 'react'
import { brandIconUrl, brandInitial, brandPalette } from '@/lib/brandIcon'

interface BrandLogoProps {
  /** Guide slug (e.g. 'netflix', 'apple-tv-plus'). */
  slug: string
  /** Service name — used for the initial fallback and as alt text. */
  service?: string
  alt?: string
  /** Pixel size (square). Defaults to 20. */
  size?: number
  className?: string
}

/**
 * Brand logo from Google's faviconV2 service.
 * Falls back to a coloured initial square (palette stable per service) if
 * the favicon is unavailable for any reason.
 */
export function BrandLogo({ slug, service, alt, size = 20, className = '' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const apply = () => {
      const explicit = document.documentElement.getAttribute('data-theme')
      const resolved: 'light' | 'dark' =
        explicit === 'dark' ||
        (!explicit && window.matchMedia('(prefers-color-scheme: dark)').matches)
          ? 'dark'
          : 'light'
      setTheme(resolved)
    }
    apply()

    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)

    return () => {
      observer.disconnect()
      mq.removeEventListener('change', apply)
    }
  }, [])

  if (failed) {
    const initial = brandInitial(service ?? slug)
    const palette = brandPalette(service ?? slug, theme)
    return (
      <span
        aria-label={alt || service || slug}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          fontSize: Math.max(9, Math.round(size * 0.46)),
          letterSpacing: '-0.02em',
          color: palette.fg,
          background: palette.bg,
          borderRadius: 5,
          flexShrink: 0,
          fontWeight: 600,
          fontFamily: 'inherit',
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    )
  }

  // Request a slightly larger asset than render size for crisp Retina output.
  const requestSize = Math.max(32, size * 2)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brandIconUrl(slug, requestSize)}
      alt={alt ?? service ?? ''}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={{
        objectFit: 'contain',
        flexShrink: 0,
        borderRadius: 4,
      }}
    />
  )
}
