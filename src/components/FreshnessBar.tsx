/**
 * Freshness bar — shown on each guide page.
 * Displays the last-verified date and a pre-filled "report outdated" mailto link.
 * Server component — no interactivity needed.
 */

interface FreshnessBarProps {
  lastVerified: string // ISO date, e.g. '2026-04-10'
  service: string
  slug: string
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export function FreshnessBar({ lastVerified, service, slug }: FreshnessBarProps) {
  const label = formatDate(lastVerified)
  const subject = encodeURIComponent(`[CancelHub] Outdated guide: ${service}`)
  const body = encodeURIComponent(
    `Hi,\n\nThe cancellation guide for ${service} (cancelhub.app/cancel/${slug}) appears to be outdated.\n\nWhat changed:\n\n`
  )
  const mailto = `mailto:hello@cancelhub.app?subject=${subject}&body=${body}`

  return (
    <div
      className="flex items-center justify-between flex-wrap gap-3 border border-rule rounded-[6px] px-4 py-3 mt-10"
      style={{ background: 'var(--accent-soft)' }}
    >
      <div className="flex items-center gap-2">
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--c-easy)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span className="text-[13px] ink-2">
          Verified <span style={{ fontWeight: 500 }}>{label}</span>
        </span>
      </div>

      <a
        href={mailto}
        className="text-[12px] hover:accent transition-colors"
        style={{ color: 'var(--accent)' }}
      >
        Steps changed? Report it →
      </a>
    </div>
  )
}
