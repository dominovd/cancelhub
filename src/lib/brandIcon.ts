// Maps a CancelGuide slug to its simple-icons CDN slug.
//
// Strategy: simple-icons has limited coverage of subscription brands (only
// ~35% of our catalogue is there at all). For services that aren't in the
// registry, BrandLogo falls back to a service initial in a hairline square.
// This map exists for the cases where the simple-icons slug differs from the
// guide slug (e.g. apple-tv-plus → appletv, youtube-premium → youtube).
//
// `null` means: don't even attempt a CDN fetch — go straight to the initial
// fallback. Use this for guides where probing confirmed no matching icon.
type SlugOverride = string | null

const OVERRIDES: Record<string, SlugOverride> = {
  // Real overrides (guide slug → known-working simple-icons slug)
  'youtube-premium':  'youtube',
  'youtube-tv':       'youtube',
  'apple-tv-plus':    'appletv',
  'amazon-prime':     'primevideo',     // amazonprime doesn't exist; primevideo does
  'apple-music':      'applemusic',
  'amazon-music':     null,             // not in registry → fallback
  'icloud-plus':      'icloud',
  'google-one':       'google',
  'microsoft-365':    null,             // microsoft365 not in registry
  'kindle-unlimited': null,             // amazonkindle not in registry
  'tinder-gold':      'tinder',
  'snapchat-plus':    'snapchat',
  'playstation-plus': 'playstation',
  'xbox-game-pass':   null,             // xbox not in registry
  'crunch-fitness':   null,
  'blink-fitness':    null,
  'discovery-plus':   null,             // discoveryplus not in registry
  'paramount-plus':   'paramountplus',
  'disney-plus':      'disneyplus',
  'espn-plus':        'espn',
  'fubotv':           'fubo',
  'sling-tv':         null,
  'home-chef':        null,
  'blue-apron':       null,
  'sun-basket':       null,
  'every-plate':      null,
  'dollar-shave-club':null,
  'stitch-fix':       null,
  'thrive-market':    null,
  'linkedin-premium': 'linkedin',
  'canva-pro':        null,             // canva not in registry
  'duolingo-plus':    'duolingo',
  'chewy-autoship':   null,
  'factor-meals':     null,
  'ring-protect':     'ring',
  'ea-play':          'ea',
  'chatgpt':          null,             // openai removed from simple-icons
  'claude':           'claude',         // anthropic claude icon is present
  'uber-eats':        'ubereats',
  'uber-one':         'uber',
}

// Some brand logos render near-black by default; in dark mode they vanish.
// Force a light fill for those.
const DARK_OVERRIDE_FOREGROUND_COLOR = 'f5f5f4'
const DARK_OVERRIDE_SLUGS = new Set([
  'apple', 'appletv', 'github', 'x', 'macos', 'ios', 'claude',
])

export function brandIconSlug(guideSlug: string): string | null {
  if (guideSlug in OVERRIDES) return OVERRIDES[guideSlug]
  // Default: strip dashes and lowercase (already lowercase, but be safe)
  return guideSlug.replace(/-/g, '').toLowerCase()
}

export function brandIconUrl(guideSlug: string, theme: 'light' | 'dark' = 'light'): string | null {
  const slug = brandIconSlug(guideSlug)
  if (!slug) return null
  const needsOverride = theme === 'dark' && DARK_OVERRIDE_SLUGS.has(slug)
  return needsOverride
    ? `https://cdn.simpleicons.org/${slug}/${DARK_OVERRIDE_FOREGROUND_COLOR}`
    : `https://cdn.simpleicons.org/${slug}`
}

/**
 * Returns the 1–2 character initial used by the fallback square when no icon
 * is available. Tries to pick the most recognisable letter(s):
 *   "Netflix" → "N", "Apple TV+" → "A", "Disney+" → "D"
 *   "WeightWatchers" → "WW"
 */
export function brandInitial(service: string): string {
  const cleaned = service.replace(/[+\-_().]/g, ' ').trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) {
    // Single word — uppercase first letter, plus an internal cap if present
    const w = words[0]
    const internalCap = w.slice(1).match(/[A-Z]/)
    return internalCap ? (w[0] + internalCap[0]).toUpperCase() : w[0].toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}
