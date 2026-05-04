import { CancelGuide } from '@/types/guide'
import { netflix } from './netflix'
import { spotify } from './spotify'
import { adobe } from './adobe'
import { chatgpt } from './chatgpt'
import { amazonPrime } from './amazon-prime'
import { disneyPlus } from './disney-plus'
import { appleMusic } from './apple-music'
import { microsoft365 } from './microsoft-365'
import { claude } from './claude'
import { youtubePremium } from './youtube-premium'
import { hulu } from './hulu'
import { nordvpn } from './nordvpn'
import { doordash } from './doordash'
import { peacock } from './peacock'
import { audible } from './audible'
import { fabletics } from './fabletics'
import { experian } from './experian'
import { crunchFitness } from './crunch-fitness'
import { xfinity } from './xfinity'
import { fuboTV } from './fubotv'
import { uberEats } from './uber-eats'
import { instacart } from './instacart'

export const allGuides: CancelGuide[] = [
  netflix,
  spotify,
  adobe,
  chatgpt,
  amazonPrime,
  disneyPlus,
  appleMusic,
  microsoft365,
  claude,
  youtubePremium,
  hulu,
  nordvpn,
  doordash,
  peacock,
  audible,
  fabletics,
  experian,
  crunchFitness,
  xfinity,
  fuboTV,
  uberEats,
  instacart,
]

export const guidesBySlug: Record<string, CancelGuide> = Object.fromEntries(
  allGuides.map((g) => [g.slug, g])
)

export const guidesByCategory = allGuides.reduce<Record<string, CancelGuide[]>>(
  (acc, guide) => {
    if (!acc[guide.category]) acc[guide.category] = []
    acc[guide.category].push(guide)
    return acc
  },
  {}
)

export const popularGuides = allGuides.filter((g) =>
  ['netflix', 'spotify', 'adobe', 'chatgpt', 'amazon-prime', 'disney-plus'].includes(g.slug)
)
