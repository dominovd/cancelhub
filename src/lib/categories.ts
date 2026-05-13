import { allGuides } from '@/data/guides'
import type { CancelGuide } from '@/types/guide'

// ─── Slug helpers ─────────────────────────────────────────────────────────────

/** "Health & Wellness" → "health-wellness" */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** "health-wellness" → "Health & Wellness" (reverse lookup via guide data) */
export function slugToCategory(slug: string): string | undefined {
  return allCategories.find((c) => categoryToSlug(c.name) === slug)?.name
}

// ─── Category data ────────────────────────────────────────────────────────────

export interface CategoryMeta {
  name: string
  slug: string
  guides: CancelGuide[]
  count: number
  avgScore: number
  maxScore: number
}

function buildCategories(): CategoryMeta[] {
  const map = new Map<string, CancelGuide[]>()

  for (const g of allGuides) {
    const arr = map.get(g.category) ?? []
    arr.push(g)
    map.set(g.category, arr)
  }

  return Array.from(map.entries())
    .filter(([, guides]) => guides.length >= 2)
    .map(([name, guides]) => {
      const scores = guides.map((g) => g.darkPatternScore)
      return {
        name,
        slug: categoryToSlug(name),
        guides: [...guides].sort((a, b) => b.darkPatternScore - a.darkPatternScore),
        count: guides.length,
        avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        maxScore: Math.max(...scores),
      }
    })
    .sort((a, b) => b.count - a.count || b.avgScore - a.avgScore)
}

export const allCategories: CategoryMeta[] = buildCategories()
export const categoriesBySlug: Record<string, CategoryMeta> = Object.fromEntries(
  allCategories.map((c) => [c.slug, c])
)

// ─── SEO copy per category ────────────────────────────────────────────────────

const categoryIntros: Record<string, string> = {
  Streaming:
    `Streaming services compete hard for your subscription — and some make leaving just as competitive. Here's how each one ranks on cancellation friction.`,
  Music:
    `Music subscriptions range from one-click cancel to phone-only nightmares. See which services respect your time and which ones don't.`,
  'Health & Wellness':
    `Wellness apps often lock users in with long commitment plans and aggressive retention. Here's what to expect when you try to leave.`,
  'Food & Meal Kits':
    'Meal kit boxes are notorious for making cancellation harder than signing up. Check the friction score before you commit.',
  'Health & Fitness':
    'Gyms and fitness platforms lead the industry in cancellation dark patterns — in-person visits, certified mail, and long hold times are common.',
  Education:
    'Online learning platforms vary widely: some let you cancel in seconds, others make you hunt for the option buried in settings.',
  Gaming:
    'Gaming subscriptions typically offer self-serve cancellation, but retention offers and billing quirks can still trip you up.',
  'Creator Platforms':
    'Creator subscription platforms generally make cancellation straightforward, with a few exceptions worth knowing about.',
  'Cloud Storage':
    'Cloud storage services are usually easy to cancel — but watch out for data loss warnings designed to make you hesitate.',
  Productivity:
    'Productivity suites often have annual contracts with early termination clauses. Know the terms before you cancel.',
  AI:
    `AI subscription services are relatively new and cancellation flows vary. Here's how the major ones compare.`,
  'Food & Grocery':
    `Grocery and specialty food subscriptions can include auto-renewing membership fees. Here's how to get out cleanly.`,
  'Home Security':
    'Home security contracts are among the most difficult to escape — expect ETFs, required calls, and long notice periods.',
  Sports:
    'Sports streaming services tend to be seasonal — understanding their billing cycles can save you from unwanted renewals.',
  'Books & Reading':
    'Book subscription services range from completely painless to chat-only cancellation. See which ones make it easy.',
  'Beauty & Subscription Boxes':
    'Beauty box subscriptions often bury the cancel button and require you to act by a specific cutoff date each month.',
  Dating:
    `Dating app subscriptions auto-renew quietly. Here's how to cancel before the next billing cycle hits.`,
  'Creative Tools':
    'Creative software subscriptions vary from instant self-serve cancel to contracts with early termination fees.',
  Security:
    'Security software is notorious for auto-renewing at inflated prices. Cancel before renewal to avoid surprise charges.',
  'Food & Delivery':
    'Food delivery memberships are easy to cancel — but check for annual vs. monthly billing to time it right.',
  'Food Delivery':
    'Food delivery subscriptions typically offer self-serve cancellation with no major dark patterns.',
}

export function getCategoryIntro(name: string): string {
  return (
    categoryIntros[name] ??
    `Compare cancellation difficulty across ${name} subscriptions — scored on dark patterns, required calls, and refund clarity.`
  )
}
