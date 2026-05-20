-- CancelHub initial schema.
--
-- Three tables: subscriptions, notification_settings, notification_events.
-- All scoped to auth.users via user_id. Row-level security enforces that
-- a user can only see / modify their own rows.
--
-- Run this once via Supabase SQL Editor on a fresh project. Safe to
-- re-run (it uses IF NOT EXISTS / CREATE OR REPLACE).

set local search_path = public, extensions;

-- ── Helpers ─────────────────────────────────────────────────────────────────

-- updated_at auto-touch trigger (used on notification_settings).
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── subscriptions ───────────────────────────────────────────────────────────

create table if not exists public.subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  name            text not null check (length(name) between 1 and 200),
  guide_slug      text,
  category        text not null default 'Other',
  monthly_price   numeric(10, 2) not null check (monthly_price >= 0),
  currency        text not null default 'USD' check (length(currency) = 3),
  next_charge_date date not null,
  trial_ends_on   date,
  difficulty      text check (difficulty in ('easy', 'medium', 'hard')),
  last_used_date  date,
  notes           text,
  created_at      timestamptz not null default now()
);

create index if not exists subscriptions_user_idx on public.subscriptions (user_id);
create index if not exists subscriptions_next_charge_idx on public.subscriptions (user_id, next_charge_date);

alter table public.subscriptions enable row level security;

-- Re-create policies idempotently
drop policy if exists "users read own subscriptions" on public.subscriptions;
create policy "users read own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

drop policy if exists "users insert own subscriptions" on public.subscriptions;
create policy "users insert own subscriptions" on public.subscriptions
  for insert with check (auth.uid() = user_id);

drop policy if exists "users update own subscriptions" on public.subscriptions;
create policy "users update own subscriptions" on public.subscriptions
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "users delete own subscriptions" on public.subscriptions;
create policy "users delete own subscriptions" on public.subscriptions
  for delete using (auth.uid() = user_id);

-- ── notification_settings ───────────────────────────────────────────────────

create table if not exists public.notification_settings (
  user_id      uuid primary key references auth.users(id) on delete cascade,

  -- JSONB so we can evolve the shape without migrations. Mirrors the
  -- TypeScript NotificationSettings type. Defaults match
  -- DEFAULT_NOTIFICATION_SETTINGS in src/types/dashboard.ts.
  channels     jsonb not null default jsonb_build_object(
    'email',    jsonb_build_object('enabled', true,  'address', '', 'verified', false),
    'push',     jsonb_build_object('enabled', true),
    'sms',      jsonb_build_object('enabled', false, 'phone', ''),
    'calendar', jsonb_build_object('enabled', false, 'feedUrl', '')
  ),
  alerts       jsonb not null default jsonb_build_object(
    'trialEnding',       jsonb_build_object('enabled', true,  'leadDays', 2),
    'priceIncrease',     jsonb_build_object('enabled', true),
    'renewalThreshold',  jsonb_build_object('enabled', true,  'leadDays', 3, 'threshold', 25),
    'idleSubscription',  jsonb_build_object('enabled', true),
    'weeklyBrief',       jsonb_build_object('enabled', true),
    'monthlySummary',    jsonb_build_object('enabled', false)
  ),
  quiet_hours  jsonb not null default jsonb_build_object('start', '22:00', 'end', '08:00'),
  digest_mode  text  not null default 'immediate' check (digest_mode in ('immediate', 'daily', 'smart', 'calendar')),
  updated_at   timestamptz not null default now()
);

drop trigger if exists notification_settings_touch_updated_at on public.notification_settings;
create trigger notification_settings_touch_updated_at
  before update on public.notification_settings
  for each row execute function public.touch_updated_at();

alter table public.notification_settings enable row level security;

drop policy if exists "users manage own settings" on public.notification_settings;
create policy "users manage own settings" on public.notification_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a settings row when a user signs up so the dashboard never
-- has to handle "settings missing" edge cases.
create or replace function public.handle_new_user_settings()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.notification_settings (user_id, channels)
  values (
    new.id,
    jsonb_build_object(
      'email',    jsonb_build_object('enabled', true,  'address', coalesce(new.email, ''), 'verified', new.email_confirmed_at is not null),
      'push',     jsonb_build_object('enabled', true),
      'sms',      jsonb_build_object('enabled', false, 'phone', ''),
      'calendar', jsonb_build_object('enabled', false, 'feedUrl', '')
    )
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user_settings();

-- ── notification_events ─────────────────────────────────────────────────────

create table if not exists public.notification_events (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  type            text not null check (type in (
                    'trial-ending',
                    'renewal',
                    'price-increase',
                    'idle',
                    'weekly-brief',
                    'monthly-summary',
                    'subscription-added',
                    'subscription-cancelled'
                  )),
  title           text not null,
  body            text not null,
  channels        text[] not null default '{}',
  subscription_id uuid references public.subscriptions(id) on delete set null,
  sent_at         timestamptz not null default now(),
  read            boolean not null default false
);

create index if not exists notification_events_user_recent_idx
  on public.notification_events (user_id, sent_at desc);

create index if not exists notification_events_unread_idx
  on public.notification_events (user_id) where read = false;

alter table public.notification_events enable row level security;

drop policy if exists "users read own events" on public.notification_events;
create policy "users read own events" on public.notification_events
  for select using (auth.uid() = user_id);

-- Users can flip events to read; only the service role inserts.
drop policy if exists "users mark events read" on public.notification_events;
create policy "users mark events read" on public.notification_events
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "users delete own events" on public.notification_events;
create policy "users delete own events" on public.notification_events
  for delete using (auth.uid() = user_id);

-- ── Realtime (optional) ─────────────────────────────────────────────────────
--
-- Uncomment if you want the dashboard to live-update across tabs when
-- another tab adds a subscription. Slight extra load on the realtime
-- service; safe to leave off until needed.
--
-- alter publication supabase_realtime add table public.subscriptions;
-- alter publication supabase_realtime add table public.notification_events;

-- ── Grants ──────────────────────────────────────────────────────────────────
-- (RLS does the heavy lifting; these grants just allow authenticated
-- users to interact with the tables at all.)

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.subscriptions to authenticated;
grant select, insert, update, delete on public.notification_settings to authenticated;
grant select, update, delete on public.notification_events to authenticated;
