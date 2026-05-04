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
import { espnPlus } from './espn-plus'
import { youtubeTv } from './youtube-tv'
import { paramountPlus } from './paramount-plus'
import { appleTvPlus } from './apple-tv-plus'
import { dazn } from './dazn'
import { philo } from './philo'
import { slingTv } from './sling-tv'
import { whoop } from './whoop'
import { factorMeals } from './factor-meals'
import { stitchFix } from './stitch-fix'
import { norton } from './norton'
import { tinderGold } from './tinder-gold'
import { bumble } from './bumble'
import { kindleUnlimited } from './kindle-unlimited'
import { hims } from './hims'
import { icloudPlus } from './icloud-plus'
import { uberOne } from './uber-one'
import { onstar } from './onstar'
import { ipsy } from './ipsy'
import { capcut } from './capcut'
import { classpass } from './classpass'
import { blinkFitness } from './blink-fitness'
import { snapchatPlus } from './snapchat-plus'
import { eaPlay } from './ea-play'
import { amazonMusic } from './amazon-music'
import { peloton } from './peloton'
import { ringProtect } from './ring-protect'
import { grubhub } from './grubhub'
import { crunchyroll } from './crunchyroll'
import { weightwatchers } from './weightwatchers'

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
  espnPlus,
  youtubeTv,
  paramountPlus,
  appleTvPlus,
  dazn,
  philo,
  slingTv,
  whoop,
  factorMeals,
  stitchFix,
  norton,
  tinderGold,
  bumble,
  kindleUnlimited,
  hims,
  icloudPlus,
  uberOne,
  onstar,
  ipsy,
  capcut,
  classpass,
  blinkFitness,
  snapchatPlus,
  eaPlay,
  amazonMusic,
  peloton,
  ringProtect,
  grubhub,
  crunchyroll,
  weightwatchers,
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
