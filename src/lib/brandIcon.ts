// Brand logos via Google's faviconV2 service.
//
// This gives us 100% coverage of real brands without curating anything by
// hand: every service we cover has a public website with a favicon, and
// Google's service returns it (cached, fast, free, no API key).
//
// The only mapping we need is guide slug → primary brand domain. For most
// services we can derive it from the slug, but a number of cases need an
// explicit override (sub-brands, country variants, edge cases).

const DOMAIN_OVERRIDES: Record<string, string> = {
  // Subscription product → parent company domain
  'apple-tv-plus':    'tv.apple.com',
  'apple-music':      'music.apple.com',
  'amazon-prime':     'primevideo.com',
  'amazon-music':     'music.amazon.com',
  'kindle-unlimited': 'amazon.com',
  'youtube-premium':  'youtube.com',
  'youtube-tv':       'tv.youtube.com',
  'icloud-plus':      'icloud.com',
  'google-one':       'one.google.com',
  'microsoft-365':    'microsoft365.com',
  'tinder-gold':      'tinder.com',
  'snapchat-plus':    'snapchat.com',
  'playstation-plus': 'playstation.com',
  'xbox-game-pass':   'xbox.com',
  'discovery-plus':   'discoveryplus.com',
  'paramount-plus':   'paramountplus.com',
  'disney-plus':      'disneyplus.com',
  'espn-plus':        'espn.com',
  'linkedin-premium': 'linkedin.com',
  'canva-pro':        'canva.com',
  'duolingo-plus':    'duolingo.com',
  'chewy-autoship':   'chewy.com',
  'factor-meals':     'factor75.com',
  'ring-protect':     'ring.com',
  'ea-play':          'ea.com',
  'chatgpt':          'openai.com',
  'chatgpt-plus':     'openai.com',
  'claude':           'claude.ai',
  'claude-pro':       'claude.ai',
  'uber-eats':        'ubereats.com',
  'uber-one':         'uber.com',
  'sling-tv':         'sling.com',
  'fubotv':           'fubo.tv',
  // Hyphenated brand names that don't simply lose the hyphen
  'apple-tv':         'tv.apple.com',
  'home-chef':        'homechef.com',
  'blue-apron':       'blueapron.com',
  'sun-basket':       'sunbasket.com',
  'every-plate':      'everyplate.com',
  'dollar-shave-club':'dollarshaveclub.com',
  'stitch-fix':       'stitchfix.com',
  'thrive-market':    'thrivemarket.com',
  'weight-watchers':  'weightwatchers.com',
  'crunch-fitness':   'crunch.com',
  'blink-fitness':    'blinkfitness.com',
  'acorn-tv':         'acorn.tv',
  // 'norton' default would resolve to norton.com — fine. Same for 'adt', 'starz', 'shudder', 'philo'.
}

function defaultDomain(slug: string): string {
  // Strip dashes, append .com. e.g. 'amazon-prime' → 'amazonprime.com'
  // We use this only as a last-resort default; manual overrides above
  // handle the cases where this would be wrong.
  return `${slug.replace(/-/g, '')}.com`
}

export function brandDomain(guideSlug: string): string {
  return DOMAIN_OVERRIDES[guideSlug] ?? defaultDomain(guideSlug)
}

/**
 * URL for the brand favicon at the requested visual size.
 * Google's CDN can serve any size; 64 gives us crisp results at our 20–36px
 * render targets after Retina scaling.
 */
export function brandIconUrl(guideSlug: string, size = 64): string {
  const domain = brandDomain(guideSlug)
  return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=${size}`
}

/* ── Initial fallback (rare — only when favicon load fails) ──────────────── */

export function brandInitial(service: string): string {
  const cleaned = service.replace(/[+\-_().]/g, ' ').trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) {
    const w = words[0]
    const internalCap = w.slice(1).match(/[A-Z]/)
    return internalCap ? (w[0] + internalCap[0]).toUpperCase() : w[0].toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

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
