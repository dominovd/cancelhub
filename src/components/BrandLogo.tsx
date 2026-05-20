'use client'

import { useEffect, useState } from 'react'
import { brandIconUrl as faviconUrl, brandInitial, brandPalette } from '@/lib/brandIcon'
import { BRAND_ICONS, brandIconUrl as simpleIconUrl } from '@/lib/brandIcons'

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
 * Three-tier brand logo:
 *   1. Curated Simple Icons silhouette on brand-colored rounded square
 *      (best, ~60 services covered in src/lib/brandIcons.ts).
 *   2. Google faviconV2 image if no curated entry (works for any site
 *      with a favicon — quality varies).
 *   3. Coloured initial square (palette stable per service name).
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

  // Border radius scales with size — small badges get 4-5px, big tiles 12-14px.
  const radius = Math.max(4, Math.round(size * 0.22))

  // ── Tier 1: curated Simple Icons brand tile ─────────────────────────────
  const curated = BRAND_ICONS[slug]
  if (curated && !failed) {
    const fg = curated.fg ?? 'ffffff'
    return (
      <span
        aria-label={alt ?? service ?? slug}
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          background: `#${curated.color}`,
          borderRadius: radius,
          flexShrink: 0,
          padding: Math.max(2, Math.round(size * 0.2)),
          boxSizing: 'border-box',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={simpleIconUrl(curated.si, fg)}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </span>
    )
  }

  // ── Tier 3: coloured initial (also used when image loads fail) ──────────
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
          borderRadius: radius,
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

  // ── Tier 2: Google faviconV2 fallback ───────────────────────────────────
  // Request a slightly larger asset than render size for crisp Retina output.
  const requestSize = Math.max(32, size * 2)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(slug, requestSize)}
      alt={alt ?? service ?? ''}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={{
        objectFit: 'contain',
        flexShrink: 0,
        borderRadius: radius,
      }}
    />
  )
}
