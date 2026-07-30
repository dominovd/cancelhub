import type { CancelGuide, DarkPatternFlags } from '@/types/guide'

export function hasDarkPatternAssessment(
  guide: Pick<CancelGuide, 'darkPatternFlags'>,
): guide is Pick<CancelGuide, 'darkPatternFlags'> & { darkPatternFlags: DarkPatternFlags } {
  return Boolean(
    guide.darkPatternFlags &&
      Object.keys(guide.darkPatternFlags).length > 0,
  )
}

const difficultyRank: Record<CancelGuide['difficulty'], number> = {
  hard: 3,
  medium: 2,
  easy: 1,
}

export function compareGuidesByDifficulty(a: CancelGuide, b: CancelGuide): number {
  const difficultyDifference =
    difficultyRank[b.difficulty] - difficultyRank[a.difficulty]
  if (difficultyDifference !== 0) return difficultyDifference

  if (hasDarkPatternAssessment(a) && hasDarkPatternAssessment(b)) {
    const scoreDifference = b.darkPatternScore - a.darkPatternScore
    if (scoreDifference !== 0) return scoreDifference
  }

  return a.service.localeCompare(b.service)
}
