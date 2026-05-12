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

/**
 * Stable 8-color palette for the fallback initial squares. Same service
 * always resolves to the same slot so users build recognition over time.
 * Pairs are sourced from Tailwind 50/700 (light) and 950/300 (dark) so they
 * stay readable in both themes.
 */
const FALLBACK_PALETTES: Array<{ lightBg: string; lightFg: string; darkBg: string; darkFg: string }> = [
  { lightBg: '#eef2ff', lightFg: '#4338ca', darkBg: '#1e1b4b', darkFg: '#a5b4fc' }, // indigo
  { lightBg: '#ecfeff', lightFg: '#0e7490', darkBg: '#083344', darkFg: '#67e8f9' }, // cyan
  { lightBg: '#fef3c7', lightFg: '#a16207', darkBg: '#422006', darkFg: '#fcd34d' }, // amber
  { lightBg: '#fce7f3', lightFg: '#a21caf', darkBg: '#4a044e', darkFg: '#f0abfc' }, // fuchsia
  { lightBg: '#dcfce7', lightFg: '#15803d', darkBg: '#052e16', darkFg: '#86efac' }, // green
  { lightBg: '#ffedd5', lightFg: '#9a3412', darkBg: '#431407', darkFg: '#fdba74' }, // orange
  { lightBg: '#e0f2fe', lightFg: '#075985', darkBg: '#082f49', darkFg: '#7dd3fc' }, // sky
  { lightBg: '#f3e8ff', lightFg: '#6b21a8', darkBg: '#3b0764', darkFg: '#d8b4fe' }, // purple
]

/** Lightweight 32-bit FNV-ish hash for stable slot assignment. */
function hash(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = (h * 0x01000193) >>> 0
  }
  return h
}

export function brandPalette(service: string, theme: 'light' | 'dark' = 'light') {
  const palette = FALLBACK_PALETTES[hash(service) % FALLBACK_PALETTES.length]
  return theme === 'dark'
    ? { bg: palette.darkBg, fg: palette.darkFg }
    : { bg: palette.lightBg, fg: palette.lightFg }
}
