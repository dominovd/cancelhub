'use client'

import { useEffect, useState } from 'react'
import { brandIconSlug, brandIconUrl } from '@/lib/brandIcon'

interface BrandLogoProps {
  /** Guide slug (e.g. 'netflix', 'apple-tv-plus'). */
  slug: string
  /** Accessible label — usually the service name. Empty string keeps it decorative. */
  alt?: string
  /** Pixel size (square). Defaults to 20. */
  size?: number
  className?: string
}

/**
 * Brand logo rendered via the simple-icons CDN.
 * Swaps to a light fill in dark mode for logos whose default is near-black.
 */
export function BrandLogo({ slug, alt = '', size = 20, className = '' }: BrandLogoProps) {
  // Initial src uses light variant — the theme bootstrap script runs before
  // hydration so dark-mode overrides are applied on first effect.
  const [src, setSrc] = useState(() => brandIconUrl(slug, 'light'))

  useEffect(() => {
    const apply = () => {
      const theme = document.documentElement.getAttribute('data-theme')
      const resolved: 'light' | 'dark' =
        theme === 'dark' ||
        (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
          ? 'dark'
          : 'light'
      setSrc(brandIconUrl(slug, resolved))
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
  }, [slug])

  return (
    // simple-icons returns SVGs which next/image cannot optimise — using plain <img> is correct.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{ objectFit: 'contain', flexShrink: 0 }}
      data-brand-slug={brandIconSlug(slug)}
    />
  )
}
