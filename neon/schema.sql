-- CancelHub schema for Neon PostgreSQL.
--
-- Run this once in the Neon SQL Editor after creating your project.
-- Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE).
--
-- Key differences from the Supabase version:
--   - user_id is TEXT, not UUID (Auth.js JWT sub is a string, e.g. Google's numeric ID)
--   - No `references auth.users` (Neon has no built-in auth schema)
--   - No Row Level Security — security is enforced at the app level via
--     WHERE user_id = $userId in every query (see src/lib/dashboard/)
--   - verification_tokens table added for Auth.js email magic links

-- ── verification_tokens (Auth.js magic link support) ─────────────────────────

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier  text        NOT NULL,
  token       text        NOT NULL,
  expires     timestamptz NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ── Helper: auto-update updated_at ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ── subscriptions ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS subscriptions (
  id               text        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id          text        NOT NULL,
  name             text        NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
  guide_slug       text,
  category         text        NOT NULL DEFAULT 'Other',
  monthly_price    numeric(10,2) NOT NULL CHECK (monthly_price >= 0),
  currency         text        NOT NULL DEFAULT 'USD' CHECK (length(currency) = 3),
  next_charge_date date        NOT NULL,
  trial_ends_on    date,
  difficulty       text        CHECK (difficulty IN ('easy', 'medium', 'hard')),
  last_used_date   date,
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_idx
  ON subscriptions (user_id);

CREATE INDEX IF NOT EXISTS subscriptions_next_charge_idx
  ON subscriptions (user_id, next_charge_date);

-- ── notification_settings ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notification_settings (
  user_id     text        PRIMARY KEY,
  channels    jsonb       NOT NULL DEFAULT jsonb_build_object(
    'email',    jsonb_build_object('enabled', true,  'address', '', 'verified', false),
    'push',     jsonb_build_object('enabled', true),
    'sms',      jsonb_build_object('enabled', false, 'phone', ''),
    'calendar', jsonb_build_object('enabled', false, 'feedUrl', '')
  ),
  alerts      jsonb       NOT NULL DEFAULT jsonb_build_object(
    'trialEnding',      jsonb_build_object('enabled', true,  'leadDays', 2),
    'priceIncrease',    jsonb_build_object('enabled', true),
    'renewalThreshold', jsonb_build_object('enabled', true,  'leadDays', 3, 'threshold', 25),
    'idleSubscription', jsonb_build_object('enabled', true),
    'weeklyBrief',      jsonb_build_object('enabled', true),
    'monthlySummary',   jsonb_build_object('enabled', false)
  ),
  quiet_hours jsonb       NOT NULL DEFAULT jsonb_build_object('start', '22:00', 'end', '08:00'),
  digest_mode text        NOT NULL DEFAULT 'immediate'
                          CHECK (digest_mode IN ('immediate', 'daily', 'smart', 'calendar')),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS notification_settings_updated_at ON notification_settings;
CREATE TRIGGER notification_settings_updated_at
  BEFORE UPDATE ON notification_settings
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ── notification_events ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notification_events (
  id              text        PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id         text        NOT NULL,
  type            text        NOT NULL,
  title           text        NOT NULL,
  body            text        NOT NULL DEFAULT '',
  channels        text[]      NOT NULL DEFAULT '{}',
  sent_at         timestamptz NOT NULL DEFAULT now(),
  read            boolean     NOT NULL DEFAULT false,
  subscription_id text
);

CREATE INDEX IF NOT EXISTS notification_events_user_idx
  ON notification_events (user_id, sent_at DESC);
