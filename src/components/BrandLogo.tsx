'use client'

import { useEffect, useState } from 'react'
import { brandIconSlug, brandIconUrl, brandInitial } from '@/lib/brandIcon'

interface BrandLogoProps {
  /** Guide slug (e.g. 'netflix', 'apple-tv-plus'). */
  slug: string
  /** Service name — used for the initial fallback and as alt text when alt is empty. */
  service?: string
  alt?: string
  /** Pixel size (square). Defaults to 20. */
  size?: number
  className?: string
}

/**
 * Brand logo rendered via the simple-icons CDN with a graceful initial-box
 * fallback when the icon is missing.
 */
export function BrandLogo({ slug, service, alt, size = 20, className = '' }: BrandLogoProps) {
  const mappedSlug = brandIconSlug(slug)
  const skipFetch = mappedSlug === null

  // src is null when we already know the brand isn't in simple-icons.
  const [src, setSrc] = useState<string | null>(() =>
    skipFetch ? null : brandIconUrl(slug, 'light')
  )
  const [failed, setFailed] = useState(skipFetch)

  useEffect(() => {
    if (skipFetch) return
    const apply = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      const resolved: 'light' | 'dark' =
        theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
          ? 'dark'
          : 'light'
      setSrc(brandIconUrl(slug, resolved))
      setFailed(false) // give the new URL a chance on theme change
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
  }, [slug, skipFetch])

  // Fallback: hairline square with service initial. Same physical footprint
  // as the icon so list rows don't reflow.
  if (failed || !src) {
    const initial = brandInitial(service ?? slug)
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
          fontSize: Math.max(9, Math.round(size * 0.42)),
          letterSpacing: '-0.02em',
          color: 'var(--ink-2)',
          border: '1px solid var(--rule-strong)',
          borderRadius: 4,
          flexShrink: 0,
          fontWeight: 500,
          fontFamily: 'inherit',
        }}
      >
        {initial}
      </span>
    )
  }

  return (
    // simple-icons returns SVGs which next/image cannot optimise.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? service ?? ''}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: 'contain', flexShrink: 0 }}
      data-brand-slug={mappedSlug}
    />
  )
}
