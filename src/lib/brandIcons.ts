/**
 * Curated brand icon library.
 *
 * Maps our guide slugs to Simple Icons (https://simpleicons.org) + the
 * brand's primary hex color. The result is rendered as a rounded square
 * with a white logo silhouette — the iOS app-icon look.
 *
 * If a guide isn't in this map, BrandLogo falls back to the favicon /
 * letter behaviour from lib/brandIcon.ts.
 *
 * Coverage philosophy: hand-pick the top ~60 brands that have clean
 * Simple Icons entries. The long tail isn't worth curating — favicons
 * are good enough for niche services.
 *
 * To add a brand: find its slug at https://simpleicons.org (search,
 * then copy from URL like /icons?q=netflix), check its `hex` color
 * shown on the same page.
 */

export interface BrandIcon {
  /** Simple Icons slug, see https://simpleicons.org. Used in CDN URL. */
  si: string
  /** Primary brand hex without #. Background of the rounded square. */
  color: string
  /**
   * Optional white-foreground override. Some brands (e.g. with very
   * dark primary colors) need a different foreground color. Default is
   * white (`ffffff`).
   */
  fg?: string
}

export const BRAND_ICONS: Record<string, BrandIcon> = {
  // ── Streaming ─────────────────────────────────────────────────────────────
  netflix: { si: 'netflix', color: 'E50914' },
  'disney-plus': { si: 'disneyplus', color: '113CCF' },
  hulu: { si: 'hulu', color: '1CE783', fg: '0B0C0F' },
  'apple-tv-plus': { si: 'appletv', color: '000000' },
  'paramount-plus': { si: 'paramountplus', color: '0064FF' },
  peacock: { si: 'peacock', color: '000000' },
  'youtube-tv': { si: 'youtube', color: 'FF0000' },
  'youtube-premium': { si: 'youtube', color: 'FF0000' },
  'amazon-prime': { si: 'primevideo', color: '00A8E1' },
  'sling-tv': { si: 'sling', color: '0072EC' },
  fubotv: { si: 'fubo', color: 'E64C25' },
  'espn-plus': { si: 'espn', color: 'FF0033' },
  starz: { si: 'starz', color: '000000' },
  shudder: { si: 'shudder', color: '000000' },
  britbox: { si: 'britbox', color: '177EDB' },
  'discovery-plus': { si: 'discoveryplus', color: '0072EC' },
  'acorn-tv': { si: 'acorntv', color: '00B259' },
  dazn: { si: 'dazn', color: 'F8F8F8', fg: '000000' },
  philo: { si: 'philo', color: '4F2D8A' },

  // ── Music ─────────────────────────────────────────────────────────────────
  spotify: { si: 'spotify', color: '1DB954' },
  'apple-music': { si: 'applemusic', color: 'FA243C' },
  'amazon-music': { si: 'amazonmusic', color: '25D1DA' },
  tidal: { si: 'tidal', color: '000000' },
  pandora: { si: 'pandora', color: '224099' },
  'youtube-music': { si: 'youtubemusic', color: 'FF0000' },

  // ── Software ──────────────────────────────────────────────────────────────
  adobe: { si: 'adobe', color: 'FF0000' },
  'microsoft-365': { si: 'microsoft365', color: 'D83B01' },
  'canva-pro': { si: 'canva', color: '00C4CC' },
  capcut: { si: 'capcut', color: '000000' },
  notion: { si: 'notion', color: '000000' },
  dropbox: { si: 'dropbox', color: '0061FF' },
  'google-one': { si: 'googleone', color: '4285F4' },
  'icloud-plus': { si: 'icloud', color: '3693F3' },

  // ── AI ────────────────────────────────────────────────────────────────────
  chatgpt: { si: 'openai', color: '412991' },
  claude: { si: 'anthropic', color: 'D97757' },

  // ── Audiobooks / Books ────────────────────────────────────────────────────
  audible: { si: 'audible', color: 'F8991C' },
  scribd: { si: 'scribd', color: '1E7B85' },
  'kindle-unlimited': { si: 'amazon', color: 'FF9900' },

  // ── Education ────────────────────────────────────────────────────────────
  masterclass: { si: 'masterclass', color: '000000' },
  skillshare: { si: 'skillshare', color: '00FF84', fg: '002333' },
  chegg: { si: 'chegg', color: 'FFCC00', fg: '000000' },
  duolingo: { si: 'duolingo', color: '58CC02' },
  'duolingo-plus': { si: 'duolingo', color: '58CC02' },

  // ── Productivity ─────────────────────────────────────────────────────────
  grammarly: { si: 'grammarly', color: '15C39A' },
  'linkedin-premium': { si: 'linkedin', color: '0A66C2' },

  // ── Cloud / Security ─────────────────────────────────────────────────────
  nordvpn: { si: 'nordvpn', color: '4687FF' },
  norton: { si: 'norton', color: 'FFE01B', fg: '000000' },
  'norton-360': { si: 'norton', color: 'FFE01B', fg: '000000' },

  // ── Health & Fitness ─────────────────────────────────────────────────────
  peloton: { si: 'peloton', color: '000000' },
  calm: { si: 'calm', color: '2596BE' },
  headspace: { si: 'headspace', color: 'F47D31' },
  whoop: { si: 'whoop', color: '000000' },

  // ── Food & Meal Kits ─────────────────────────────────────────────────────
  hellofresh: { si: 'hellofresh', color: '99CC33' },
  doordash: { si: 'doordash', color: 'FF3008' },
  'uber-eats': { si: 'ubereats', color: '06C167' },
  'uber-one': { si: 'uber', color: '000000' },
  grubhub: { si: 'grubhub', color: 'F63440' },
  instacart: { si: 'instacart', color: '43B02A' },

  // ── Dating ──────────────────────────────────────────────────────────────
  tinder: { si: 'tinder', color: 'FF6B6B' },
  'tinder-gold': { si: 'tinder', color: 'FF6B6B' },
  bumble: { si: 'bumble', color: 'FFC629', fg: '000000' },
  hinge: { si: 'hinge', color: 'E5447B' },

  // ── Gaming ──────────────────────────────────────────────────────────────
  'xbox-game-pass': { si: 'xbox', color: '107C10' },
  'playstation-plus': { si: 'playstation', color: '003791' },
  'ea-play': { si: 'ea', color: '000000' },
  crunchyroll: { si: 'crunchyroll', color: 'F47521' },

  // ── Shopping / Misc ──────────────────────────────────────────────────────
  patreon: { si: 'patreon', color: 'FF424D' },
  substack: { si: 'substack', color: 'FF6719' },
  onlyfans: { si: 'onlyfans', color: '00AFF0' },
  'amazon-prime-video': { si: 'primevideo', color: '00A8E1' },
}

/**
 * Build the Simple Icons CDN URL for a logo silhouette in the given color.
 *
 * Simple Icons hosts SVG icons at cdn.simpleicons.org. The second path
 * segment is a hex color (no #), or one of the named keywords: white,
 * black, default.
 */
export function brandIconUrl(si: string, fg: string = 'ffffff'): string {
  return `https://cdn.simpleicons.org/${si}/${fg}`
}
