// Maps a CancelGuide slug to its simple-icons CDN slug.
// Default rule: strip dashes from the guide slug.
// Overrides cover services where the guide slug doesn't match the
// canonical brand name in simple-icons (e.g. youtube-premium → youtube).
const OVERRIDES: Record<string, string> = {
  'youtube-premium': 'youtube',
  'youtube-tv': 'youtube',
  'chatgpt': 'openai',
  'apple-tv-plus': 'appletv',
  'amazon-prime': 'amazonprime',
  'apple-music': 'applemusic',
  'amazon-music': 'amazonmusic',
  'icloud-plus': 'icloud',
  'google-one': 'google',
  'microsoft-365': 'microsoft365',
  'kindle-unlimited': 'amazonkindle',
  'tinder-gold': 'tinder',
  'snapchat-plus': 'snapchat',
  'playstation-plus': 'playstation',
  'xbox-game-pass': 'xbox',
  'crunch-fitness': 'crunchbase', // closest visual match; fallback
  'blink-fitness': 'blinkist',     // no peer icon; placeholder
  'discovery-plus': 'discoveryplus',
  'paramount-plus': 'paramountplus',
  'disney-plus': 'disneyplus',
  'espn-plus': 'espn',
  'fubotv': 'fubo',
  'sling-tv': 'sling',
  'youtube': 'youtube',
  'home-chef': 'homechef',
  'blue-apron': 'blueapron',
  'sun-basket': 'sunbasket',
  'dollar-shave-club': 'dollarshaveclub',
  'stitch-fix': 'stitchfix',
  'thrive-market': 'thrivemarket',
  'linkedin-premium': 'linkedin',
  'canva-pro': 'canva',
  'duolingo-plus': 'duolingo',
  'chewy-autoship': 'chewy',
  'factor-meals': 'factor',
  'ring-protect': 'ring',
  'norton': 'norton',
  'ea-play': 'ea',
  'ms-365': 'microsoft365',
}

// Some brand logos render near-black by default; in dark mode they vanish.
// Force a light fill for those.
const DARK_OVERRIDE_FOREGROUND_COLOR = 'f5f5f4'
const DARK_OVERRIDE_SLUGS = new Set([
  'apple', 'appletv', 'openai', 'github', 'x', 'macos', 'ios',
])

export function brandIconSlug(guideSlug: string): string {
  return OVERRIDES[guideSlug] ?? guideSlug.replace(/-/g, '')
}

export function brandIconUrl(guideSlug: string, theme: 'light' | 'dark' = 'light'): string {
  const slug = brandIconSlug(guideSlug)
  const needsOverride = theme === 'dark' && DARK_OVERRIDE_SLUGS.has(slug)
  return needsOverride
    ? `https://cdn.simpleicons.org/${slug}/${DARK_OVERRIDE_FOREGROUND_COLOR}`
    : `https://cdn.simpleicons.org/${slug}`
}

export const _internal = { DARK_OVERRIDE_SLUGS }
