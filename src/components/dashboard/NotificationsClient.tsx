'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useDashboard, type DashboardInitial } from '@/lib/dashboard/use-dashboard'
import type { NotificationEvent, NotificationType } from '@/types/dashboard'

interface Props {
  locale: string
  initial: DashboardInitial
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000
  if (d < 60) return 'just now'
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  if (d < 86400 * 7) return `${Math.round(d / 86400)}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const TYPE_META: Record<NotificationType, { icon: string; tone: 'urgent' | 'idle' | 'price' | 'summary' | 'success' }> = {
  'trial-ending': { icon: '⏳', tone: 'urgent' },
  renewal: { icon: '💳', tone: 'urgent' },
  'price-increase': { icon: '↑', tone: 'price' },
  idle: { icon: '🌿', tone: 'idle' },
  'weekly-brief': { icon: '📅', tone: 'summary' },
  'monthly-summary': { icon: '📊', tone: 'summary' },
  'subscription-added': { icon: '✓', tone: 'success' },
  'subscription-cancelled': { icon: '✓', tone: 'success' },
}

function toneStyle(tone: keyof typeof TONE_COLORS) {
  return TONE_COLORS[tone]
}
const TONE_COLORS = {
  urgent: { bg: 'var(--accent-soft)', fg: 'var(--accent)' },
  idle: { bg: 'var(--green-soft)', fg: 'var(--green)' },
  price: { bg: 'var(--hard-soft)', fg: 'var(--hard)' },
  summary: { bg: 'var(--med-soft)', fg: 'var(--med)' },
  success: { bg: 'var(--green-soft)', fg: 'var(--green)' },
} as const

// ── Small UI primitives ──────────────────────────────────────────────────────

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        flex: 'none',
        width: 42,
        height: 24,
        background: on ? 'var(--accent)' : 'var(--line)',
        borderRadius: 999,
        position: 'relative',
        cursor: 'pointer',
        transition: 'background .15s ease',
        border: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: on ? 21 : 3,
          top: 3,
          width: 18,
          height: 18,
          background: '#fff',
          borderRadius: '50%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left .18s cubic-bezier(.4,1.4,.6,1)',
        }}
      />
    </button>
  )
}

function VisStepper({
  value,
  options,
  onChange,
  formatter,
}: {
  value: number
  options: number[]
  onChange: (v: number) => void
  formatter: (v: number) => string
}) {
  return (
    <div className="flex gap-[4px] flex-1">
      {options.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          style={{
            flex: 1,
            height: 32,
            borderRadius: 8,
            background: value === v ? 'var(--accent)' : 'var(--paper)',
            border: '1px solid ' + (value === v ? 'var(--accent)' : 'var(--line)'),
            color: value === v ? '#fff' : 'var(--ink-3)',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all .12s ease',
          }}
        >
          {formatter(v)}
        </button>
      ))}
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function NotificationsClient({ locale, initial }: Props) {
  const store = useDashboard(initial)
  const [tab, setTab] = useState<'settings' | 'history'>('settings')
  const [savedFlash, setSavedFlash] = useState(false)

  const unreadCount = useMemo(() => store.events.filter((e) => !e.read).length, [store.events])

  const s = store.settings
  const update = store.updateSettings

  const flashSaved = () => {
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
  }

  return (
    <>
      <nav
        style={{
          fontSize: 13,
          color: 'var(--ink-3)',
          padding: '20px 0 0',
          display: 'flex',
          gap: 7,
        }}
        aria-label="Breadcrumb"
      >
        <Link href={`/${locale}/dashboard`} className="hover:accent transition-colors">
          My subscriptions
        </Link>
        <span>/</span>
        <span>Notifications</span>
      </nav>

      <header className="flex items-end justify-between gap-4 flex-wrap" style={{ padding: '14px 0 6px' }}>
        <div>
          <h1
            className="font-serif-display"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(28px, 4.5vw, 38px)',
              letterSpacing: '-0.022em',
              lineHeight: 1.05,
            }}
          >
            Tell us when to{' '}
            <em className="font-serif-display" style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)' }}>
              tap you on the shoulder
            </em>
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14.5, marginTop: 6, maxWidth: '54ch' }}>
            We&apos;ll only ping you when something actually needs attention — no marketing, no &ldquo;we miss you,&rdquo; ever.
          </p>
        </div>
        <button
          type="button"
          className="btn-dark"
          onClick={flashSaved}
          style={{ background: savedFlash ? 'var(--green)' : 'var(--ink)' }}
        >
          {savedFlash ? '✓ Saved' : 'Save changes'}
        </button>
      </header>

      {/* Tabs */}
      <div
        style={{
          display: 'inline-flex',
          gap: 3,
          background: 'var(--card)',
          border: '1px solid var(--line)',
          borderRadius: 12,
          padding: 3,
          margin: '22px 0 18px',
        }}
      >
        {(['settings', 'history'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 9,
              cursor: 'pointer',
              border: 0,
              background: tab === t ? 'var(--ink)' : 'transparent',
              color: tab === t ? 'var(--paper)' : 'var(--ink-3)',
              transition: 'all .12s ease',
            }}
          >
            {t === 'settings' ? 'Settings' : `History${unreadCount > 0 ? ` · ${unreadCount}` : ''}`}
          </button>
        ))}
      </div>

      {tab === 'settings' ? (
        <SettingsPanel
          s={s}
          update={update}
          channels={s.channels}
          alerts={s.alerts}
        />
      ) : (
        <HistoryPanel
          events={store.events}
          onMarkRead={store.markEventRead}
          onMarkAllRead={store.markAllEventsRead}
        />
      )}
    </>
  )
}

// ── Settings panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  s,
  update,
  channels,
  alerts,
}: {
  s: ReturnType<typeof useDashboard>['settings']
  update: ReturnType<typeof useDashboard>['updateSettings']
  channels: ReturnType<typeof useDashboard>['settings']['channels']
  alerts: ReturnType<typeof useDashboard>['settings']['alerts']
}) {
  return (
    <>
      {/* Live preview */}
      <div className="mb-[22px]">
        <div
          style={{
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            color: 'var(--ink-3)',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          A preview of your next alert
        </div>
        <div className="dark-card flex items-center gap-[14px]" style={{ padding: '20px 22px' }}>
          <div
            style={{
              flexShrink: 0,
              width: 42,
              height: 42,
              borderRadius: 11,
              background: 'var(--accent)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            🔔
          </div>
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#a59e8c',
                fontWeight: 600,
                marginBottom: 3,
              }}
            >
              CancelHub · {channels.email.enabled ? 'email' : channels.push.enabled ? 'push' : 'no channel'} ·{' '}
              {alerts.trialEnding.leadDays} days before
            </div>
            <div
              className="font-serif-display"
              style={{ fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.005em', lineHeight: 1.25 }}
            >
              <span style={{ color: '#f0a878' }}>Audible</span> trial ends in 2 days — you&apos;ll be charged $14.95
            </div>
            <div style={{ fontSize: 13, color: '#a59e8c', marginTop: 6 }}>
              It&apos;s an Easy cancel — about 90 seconds in your Amazon account.
            </div>
          </div>
        </div>
      </div>

      {/* Channels */}
      <Section title="Where to ping you" subtitle="Verified channels we can deliver alerts to.">
        <ChannelRow
          icon="✉"
          name="Email"
          tag="Verified"
          meta="All alerts. Digest options below."
          value={channels.email.address}
          placeholder="you@example.com"
          on={channels.email.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, channels: { ...prev.channels, email: { ...prev.channels.email, enabled: v } } }))
          }
          onInputChange={(v) =>
            update((prev) => ({
              ...prev,
              channels: { ...prev.channels, email: { ...prev.channels.email, address: v } },
            }))
          }
        />
        <ChannelRow
          icon="📱"
          name="Browser push"
          meta="Same-day, time-sensitive only (trials, big charges)."
          value="Chrome on this device"
          on={channels.push.enabled}
          disabled
          onToggle={(v) =>
            update((prev) => ({ ...prev, channels: { ...prev.channels, push: { enabled: v } } }))
          }
        />
        <ChannelRow
          icon="📞"
          name="SMS"
          tagBeta
          meta="Trial-ending only · we pay per message, so it's narrow."
          value={channels.sms.phone}
          placeholder="+1 555 000 0000"
          on={channels.sms.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, channels: { ...prev.channels, sms: { ...prev.channels.sms, enabled: v } } }))
          }
          onInputChange={(v) =>
            update((prev) => ({
              ...prev,
              channels: { ...prev.channels, sms: { ...prev.channels.sms, phone: v } },
            }))
          }
        />
        <ChannelRow
          icon="📅"
          name="Calendar (.ics)"
          tagBeta
          meta="Drops every charge into your calendar with a cancel link."
          value={channels.calendar.feedUrl || 'https://cancelhub.app/cal/your-feed.ics'}
          on={channels.calendar.enabled}
          disabled
          onToggle={(v) =>
            update((prev) => ({
              ...prev,
              channels: { ...prev.channels, calendar: { ...prev.channels.calendar, enabled: v } },
            }))
          }
        />
      </Section>

      {/* What to alert */}
      <Section title="What's worth a ping" subtitle="Pick the moments that matter. We default to 'only when it costs you money.'">
        <AlertRow
          icon="⏳"
          tone="urgent"
          name="Free trial about to convert"
          meta="Before a trial starts charging you — the highest-value alert."
          rightLabel={`${alerts.trialEnding.leadDays} days before`}
          on={alerts.trialEnding.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, alerts: { ...prev.alerts, trialEnding: { ...prev.alerts.trialEnding, enabled: v } } }))
          }
        />
        <AlertRow
          icon="↑"
          tone="price"
          name="Price increase detected"
          meta="When we spot a price hike from public sources or your inbox."
          rightLabel="As soon as found"
          on={alerts.priceIncrease.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, alerts: { ...prev.alerts, priceIncrease: { enabled: v } } }))
          }
        />
        <AlertRow
          icon="💳"
          tone="urgent"
          name={`Renewal > $${alerts.renewalThreshold.threshold}`}
          meta="Only loud about renewals over your threshold. Adjust below."
          rightLabel={`${alerts.renewalThreshold.leadDays} days before`}
          on={alerts.renewalThreshold.enabled}
          onToggle={(v) =>
            update((prev) => ({
              ...prev,
              alerts: { ...prev.alerts, renewalThreshold: { ...prev.alerts.renewalThreshold, enabled: v } },
            }))
          }
        />
        <AlertRow
          icon="🌿"
          tone="idle"
          name="Subscription looks idle"
          meta="30+ days without a check-in or login. We ask, you decide."
          rightLabel="Monthly"
          on={alerts.idleSubscription.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, alerts: { ...prev.alerts, idleSubscription: { enabled: v } } }))
          }
        />
        <AlertRow
          icon="📅"
          tone="summary"
          name="Weekly Sunday brief"
          meta="A small Sunday email: this week's charges + trials ending."
          rightLabel="Sunday 9am"
          on={alerts.weeklyBrief.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, alerts: { ...prev.alerts, weeklyBrief: { enabled: v } } }))
          }
        />
        <AlertRow
          icon="📊"
          tone="summary"
          name="Monthly spending summary"
          meta="First of the month: total spent, biggest categories, what we saved."
          rightLabel="1st of month"
          on={alerts.monthlySummary.enabled}
          onToggle={(v) =>
            update((prev) => ({ ...prev, alerts: { ...prev.alerts, monthlySummary: { enabled: v } } }))
          }
        />
      </Section>

      {/* Timing */}
      <Section title="How early to warn you" subtitle="Default lead time before a renewal or trial. You can override per-subscription.">
        <div className="flex items-center gap-[16px] my-[14px]">
          <label style={{ fontSize: 13, color: 'var(--ink-3)', width: 160, flex: 'none' }}>
            Trial ending{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
              {alerts.trialEnding.leadDays === 0 ? 'same day' : `${alerts.trialEnding.leadDays}d`}
            </strong>
          </label>
          <VisStepper
            value={alerts.trialEnding.leadDays}
            options={[0, 1, 2, 3, 7]}
            onChange={(v) =>
              update((prev) => ({
                ...prev,
                alerts: { ...prev.alerts, trialEnding: { ...prev.alerts.trialEnding, leadDays: v } },
              }))
            }
            formatter={(v) => (v === 0 ? 'Same day' : `${v}d`)}
          />
        </div>
        <div className="flex items-center gap-[16px] my-[14px]">
          <label style={{ fontSize: 13, color: 'var(--ink-3)', width: 160, flex: 'none' }}>
            Renewal{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
              {alerts.renewalThreshold.leadDays === 0 ? 'same day' : `${alerts.renewalThreshold.leadDays}d`}
            </strong>
          </label>
          <VisStepper
            value={alerts.renewalThreshold.leadDays}
            options={[0, 1, 2, 3, 7]}
            onChange={(v) =>
              update((prev) => ({
                ...prev,
                alerts: {
                  ...prev.alerts,
                  renewalThreshold: { ...prev.alerts.renewalThreshold, leadDays: v },
                },
              }))
            }
            formatter={(v) => (v === 0 ? 'Same day' : `${v}d`)}
          />
        </div>
        <div className="flex items-center gap-[16px] my-[14px]">
          <label style={{ fontSize: 13, color: 'var(--ink-3)', width: 160, flex: 'none' }}>
            Renewal threshold{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
              ${alerts.renewalThreshold.threshold}
            </strong>
          </label>
          <VisStepper
            value={alerts.renewalThreshold.threshold}
            options={[0, 10, 25, 50, 100]}
            onChange={(v) =>
              update((prev) => ({
                ...prev,
                alerts: {
                  ...prev.alerts,
                  renewalThreshold: { ...prev.alerts.renewalThreshold, threshold: v },
                },
              }))
            }
            formatter={(v) => (v === 0 ? 'All' : `>$${v}`)}
          />
        </div>
      </Section>

      {/* Digest */}
      <Section title="Bundle alerts, or send them one by one?" subtitle="If we have several alerts in a short window, how should we deliver them?">
        <div className="grid sm:grid-cols-2 gap-[10px] mt-[6px]">
          {([
            { id: 'immediate', t: 'Send immediately', m: 'Each alert lands when it fires. Best if you check email reactively.' },
            { id: 'daily', t: 'Daily digest at 8am', m: 'Bundle everything from the last 24h into one morning email.' },
            { id: 'smart', t: 'Smart batching', m: 'Urgent alerts now, non-urgent ones rolled into the Sunday brief.' },
            { id: 'calendar', t: 'Calendar only', m: 'Skip email entirely. Everything lives in your .ics feed.' },
          ] as const).map((opt) => {
            const active = s.digestMode === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => update({ digestMode: opt.id })}
                style={{
                  background: active ? 'var(--accent-soft)' : 'var(--paper)',
                  border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  transition: 'all .12s ease',
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: `1.5px solid ${active ? 'var(--accent)' : 'var(--line)'}`,
                    background: '#fff',
                    flex: 'none',
                    marginTop: 2,
                    position: 'relative',
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        inset: 3,
                        background: 'var(--accent)',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)' }}>{opt.t}</div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: active ? 'var(--accent-deep)' : 'var(--ink-3)',
                      marginTop: 3,
                      lineHeight: 1.5,
                    }}
                  >
                    {opt.m}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Section>
    </>
  )
}

// ── Channel + Alert row sub-components ──────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="card-warm" style={{ padding: '22px 24px', marginBottom: 14 }}>
      <div className="flex items-baseline justify-between gap-3 mb-[14px]">
        <div className="flex-1 min-w-0">
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.012em' }}>
            {title}
          </h3>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3 }}>{subtitle}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

function ChannelRow({
  icon,
  name,
  tag,
  tagBeta,
  meta,
  value,
  placeholder,
  on,
  onToggle,
  onInputChange,
  disabled,
}: {
  icon: string
  name: string
  tag?: string
  tagBeta?: boolean
  meta: string
  value?: string
  placeholder?: string
  on: boolean
  onToggle: (v: boolean) => void
  onInputChange?: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className="channel-row">
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          flex: 'none',
          background: on ? 'var(--accent-soft)' : 'var(--paper)',
          border: '1px solid ' + (on ? 'var(--accent-border)' : 'var(--line)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 17,
          color: on ? 'var(--accent)' : 'var(--ink-3)',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 14.5 }}>
          {name}
          {tag && (
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '2px 7px', borderRadius: 6, background: 'var(--green-soft)', color: 'var(--green)' }}>
              {tag}
            </span>
          )}
          {tagBeta && (
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '2px 7px', borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)' }}>
              Beta
            </span>
          )}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>{meta}</div>
      </div>
      <div className="channel-input">
        {onInputChange ? (
          <input
            value={value ?? ''}
            placeholder={placeholder}
            onChange={(e) => onInputChange(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 13px',
              border: '1px solid var(--line)',
              borderRadius: 9,
              background: 'var(--paper)',
              fontFamily: 'inherit',
              fontSize: 13.5,
              color: 'var(--ink)',
              outline: 0,
            }}
          />
        ) : (
          <input
            value={value ?? ''}
            disabled
            style={{
              width: '100%',
              padding: '9px 13px',
              border: '1px solid var(--line)',
              borderRadius: 9,
              background: 'var(--paper)',
              fontFamily: 'inherit',
              fontSize: 13.5,
              color: 'var(--ink-3)',
              opacity: 0.7,
            }}
          />
        )}
      </div>
      <Switch on={on} onChange={(v) => !disabled && onToggle(v)} />
    </div>
  )
}

function AlertRow({
  icon,
  tone,
  name,
  meta,
  rightLabel,
  on,
  onToggle,
}: {
  icon: string
  tone: keyof typeof TONE_COLORS
  name: string
  meta: string
  rightLabel: string
  on: boolean
  onToggle: (v: boolean) => void
}) {
  const c = toneStyle(tone)
  return (
    <div className="alert-row">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          background: c.bg,
          color: c.fg,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14.5 }}>{name}</div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1, lineHeight: 1.45 }}>{meta}</div>
      </div>
      <div className="alert-right">{rightLabel}</div>
      <Switch on={on} onChange={onToggle} />
    </div>
  )
}

// ── History panel ────────────────────────────────────────────────────────────

function HistoryPanel({
  events,
  onMarkRead,
  onMarkAllRead,
}: {
  events: NotificationEvent[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
}) {
  const unread = events.filter((e) => !e.read).length

  return (
    <div className="card-warm" style={{ padding: '22px 24px' }}>
      <div className="flex items-baseline justify-between mb-[14px]">
        <div>
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, letterSpacing: '-0.012em' }}>
            Recent alerts
          </h3>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3 }}>
            Everything we sent you in the last 30 days.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontSize: 12,
              color: 'var(--ink-3)',
              fontWeight: 600,
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              padding: '3px 9px',
              borderRadius: 999,
            }}
          >
            {events.length} total · {unread} unread
          </span>
          {unread > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              style={{
                fontSize: 12,
                color: 'var(--accent)',
                fontWeight: 600,
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '3px 6px',
              }}
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {events.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--ink-3)', padding: '20px 0', textAlign: 'center' }}>
          No alerts yet — you&apos;ll see them here once we have anything to ping you about.
        </p>
      ) : (
        events.map((e) => {
          const meta = TYPE_META[e.type]
          const c = TONE_COLORS[meta.tone]
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => !e.read && onMarkRead(e.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: e.read ? '13px 0' : '13px 12px',
                borderBottom: '1px dashed var(--line)',
                background: e.read ? 'transparent' : '#fffaf4',
                borderRadius: e.read ? 0 : 10,
                margin: e.read ? '0' : '0 -12px',
                cursor: e.read ? 'default' : 'pointer',
                textAlign: 'left',
                border: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  background: c.bg,
                  color: c.fg,
                }}
              >
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {!e.read && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        marginRight: 7,
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                  {e.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.5 }}>{e.body}</div>
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: 'var(--ink-3)',
                  flex: 'none',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                {relativeTime(e.sentAt)}
                <div style={{ fontSize: 10.5, marginTop: 3 }}>
                  {e.channels.map((ch) => (ch === 'email' ? '✉' : ch === 'push' ? '📱' : ch === 'sms' ? '📞' : '📅')).join(' · ')}
                </div>
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}
