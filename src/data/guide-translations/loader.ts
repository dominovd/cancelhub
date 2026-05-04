import type { CancelGuide, AllGuidesTranslations } from '@/types/guide'

/** Load guide-content translations for a given locale. Falls back to {} on missing file. */
export async function getGuideTranslations(locale: string): Promise<AllGuidesTranslations> {
  try {
    switch (locale) {
      case 'de':    return (await import('./de.json')).default as AllGuidesTranslations
      case 'es':    return (await import('./es.json')).default as AllGuidesTranslations
      case 'fr':    return (await import('./fr.json')).default as AllGuidesTranslations
      case 'pt-PT': return (await import('./pt-PT.json')).default as AllGuidesTranslations
      case 'pt-BR': return (await import('./pt-BR.json')).default as AllGuidesTranslations
      case 'it':    return (await import('./it.json')).default as AllGuidesTranslations
      case 'ja':    return (await import('./ja.json')).default as AllGuidesTranslations
      case 'ko':    return (await import('./ko.json')).default as AllGuidesTranslations
      case 'nl':    return (await import('./nl.json')).default as AllGuidesTranslations
      case 'ru':    return (await import('./ru.json')).default as AllGuidesTranslations
      case 'ar':    return (await import('./ar.json')).default as AllGuidesTranslations
      case 'zh-TW': return (await import('./zh-TW.json')).default as AllGuidesTranslations
      case 'sv':    return (await import('./sv.json')).default as AllGuidesTranslations
      case 'hi':    return (await import('./hi.json')).default as AllGuidesTranslations
      case 'id':    return (await import('./id.json')).default as AllGuidesTranslations
      case 'tr':    return (await import('./tr.json')).default as AllGuidesTranslations
      default:      return {}
    }
  } catch {
    return {}
  }
}

/** Merge base English guide with translated content fields. Non-translated fields fall back to English. */
export function applyGuideTranslations(
  guide: CancelGuide,
  translations: AllGuidesTranslations,
): CancelGuide {
  const t = translations[guide.slug]
  if (!t) return guide

  return {
    ...guide,
    description: t.description ?? guide.description,
    difficultyReason: t.difficultyReason ?? guide.difficultyReason,
    ...(t.refundPolicy !== undefined ? { refundPolicy: t.refundPolicy } : {}),
    platforms: guide.platforms.map((p) => {
      const pt = t.platforms?.[p.platform]
      if (!pt) return p
      return {
        ...p,
        steps: p.steps.map((s, i) => ({
          ...s,
          instruction: pt.steps[i]?.instruction ?? s.instruction,
          ...(pt.steps[i]?.note !== undefined ? { note: pt.steps[i].note } : {}),
        })),
      }
    }),
    commonIssues: t.commonIssues
      ? guide.commonIssues.map((issue, i) => ({
          question: t.commonIssues![i]?.question ?? issue.question,
          answer:   t.commonIssues![i]?.answer   ?? issue.answer,
        }))
      : guide.commonIssues,
    alternatives:
      t.alternatives && guide.alternatives
        ? guide.alternatives.map((alt, i) => ({
            ...alt,
            description: t.alternatives![i]?.description ?? alt.description,
          }))
        : guide.alternatives,
  }
}
