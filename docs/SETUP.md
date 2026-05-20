# CancelHub — backend & auth setup

One-time configuration for Supabase (Postgres + Auth), Google OAuth, and
Resend (transactional email). All three are free to start; Resend you
already pay for.

Estimated time end-to-end: **~25 minutes** (most of it is waiting on DNS
verification for the Resend domain).

You only need to do this once. After it's set up, the app uses env vars.

---

## 1. Supabase project (~5 min)

1. Go to **<https://supabase.com>** → **New project**
2. Name it `cancelhub` (or whatever). Pick a strong DB password and **save
   it** in your password manager — you'll need it again only if you want
   direct DB access.
3. Region: closest to your users (EU West for Europe, US East for US).
4. Wait ~2 minutes for the project to provision.

### 1a. Run the schema migration

5. In the left sidebar → **SQL Editor** → **New query**.
6. Open `supabase/migrations/0001_init.sql` from this repo, **copy the entire
   file**, paste it into the editor, click **Run** (bottom-right). You
   should see `Success. No rows returned.`
7. Verify in the left sidebar → **Database** → **Tables**: you should see
   `subscriptions`, `notification_settings`, `notification_events`.

### 1b. Copy env vars

8. Left sidebar → **Project Settings** → **API**.
9. Copy these two values:
   - `Project URL` → goes in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → goes in `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → goes in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
     (**server-only**, never expose to browser — used only by edge functions
     and trusted server actions)

---

## 2. Google OAuth (~10 min)

You need an OAuth client in Google Cloud Console, then paste the
credentials into Supabase.

### 2a. Create the OAuth client

1. Go to **<https://console.cloud.google.com>**. Pick or create a project.
2. Left sidebar → **APIs & Services** → **OAuth consent screen**.
   - User type: **External**. Click **Create**.
   - App name: `CancelHub`. User support email: yours. Developer email:
     yours. Save.
   - **Scopes** screen — leave empty (the defaults `email` + `profile` are
     added automatically), Save.
   - **Test users** screen — add your own email so you can test before
     publishing. Save.
3. Left sidebar → **APIs & Services** → **Credentials** → **Create
   credentials** → **OAuth client ID**.
   - Application type: **Web application**
   - Name: `CancelHub web`
   - **Authorized redirect URIs**: paste this **exactly**
     (replace `YOUR-PROJECT-REF` with your Supabase ref — the random
     string in your `NEXT_PUBLIC_SUPABASE_URL`, e.g. `abcdefghijkl`):

     ```
     https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback
     ```

   - Click **Create**.
4. Copy the **Client ID** and **Client Secret** shown in the dialog.

### 2b. Paste into Supabase

5. Back in Supabase → **Authentication** → **Providers** → scroll to
   **Google**.
6. Toggle **Enabled**. Paste the Client ID + Client Secret. Click **Save**.

### 2c. (Optional) Publish the consent screen

While testing, only emails added in step 2a as "test users" can sign in.
Once you're ready to open to the public:

7. Google Cloud Console → **OAuth consent screen** → **Publish app**.
   Google won't require a security review unless you request sensitive
   scopes, so it'll go live within minutes.

---

## 3. Resend (~10 min, half of it is DNS waiting)

You already pay for Resend, so this is mostly DNS verification + telling
Supabase to use Resend as its SMTP relay for magic-link emails.

### 3a. Verify your sending domain

1. Go to **<https://resend.com>** → **Domains** → **Add Domain**.
2. Enter `cancelhub.app` (or whatever subdomain you want to send from,
   e.g. `mail.cancelhub.app` — subdomain is recommended so you don't mix
   transactional with marketing).
3. Resend shows you DNS records (SPF, DKIM, return-path). Add them to
   your DNS provider (Vercel DNS / Cloudflare / Namecheap / whatever).
4. Click **Verify**. Usually 5–10 minutes for DNS propagation, can be up
   to an hour. Refresh until all three records show ✓.

### 3b. Get the SMTP credentials

5. Resend left sidebar → **API Keys** → **Create API Key**.
   - Name: `cancelhub-supabase-smtp`
   - Permission: **Sending access** → `cancelhub.app`
   - Copy the key (`re_...`). **Save it** — Resend won't show it again.
6. Resend also has an **SMTP** view (left sidebar → **SMTP**) — note the
   server details:
   - Host: `smtp.resend.com`
   - Port: `465` (TLS) or `587` (STARTTLS)
   - Username: `resend`
   - Password: the API key from step 5

### 3c. Configure Supabase to use Resend for auth emails

7. Supabase → **Project Settings** → **Authentication** → scroll to
   **SMTP Settings**.
8. Toggle **Enable Custom SMTP**.
9. Fill in:
   - Sender email: `hello@cancelhub.app` (or whatever address on your
     verified domain)
   - Sender name: `CancelHub`
   - Host: `smtp.resend.com`
   - Port: `587`
   - Username: `resend`
   - Password: the Resend API key from step 5
10. Click **Save**. Then click **Send test email** — should arrive in
    seconds. If not, double-check the API key and that the sender domain
    is fully verified in Resend.

### 3d. (Optional) Customise the magic-link email template

11. Supabase → **Authentication** → **Email Templates** → **Magic Link**.
    Replace the default template with our branded one (see
    `docs/email-templates/magic-link.html` in this repo — TODO, branded
    cream + terracotta version coming next).

### 3e. Save the Resend key in `.env.local`

12. Even though Supabase handles magic-link sending via SMTP, we'll also
    call Resend **directly** from edge functions later (for the weekly
    Sunday brief, monthly summary, trial-ending alerts). Add:

    ```env
    RESEND_API_KEY=re_...
    RESEND_FROM_EMAIL=hello@cancelhub.app
    ```

---

## 4. Local environment

1. Create `.env.local` in the repo root by copying the template:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in everything you collected above. The full list:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=hello@cancelhub.app
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. For **Vercel** (production): copy the same vars into Vercel project
   settings → **Environment variables**. Set
   `NEXT_PUBLIC_SITE_URL=https://cancelhub.app` for production scope only.

---

## 5. Supabase redirect URLs

Supabase only accepts redirects from URLs you whitelist.

1. Supabase → **Authentication** → **URL Configuration**.
2. **Site URL**: `https://cancelhub.app` (your production URL).
3. **Redirect URLs** — add both:
   - `https://cancelhub.app/auth/callback`
   - `http://localhost:3000/auth/callback`

Without this, magic-link redirects from email will fail with
"redirect_to is not allowed".

---

## 6. First-time test

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000/login>:

1. Try **magic link** — enter your email, check inbox, click the link.
   You should land back on `/dashboard` logged in.
2. Try **Google** — should redirect to Google, then back, then to
   `/dashboard`.

If either fails, see **Troubleshooting** below.

---

## Troubleshooting

### "Magic-link email never arrives"
- Check Resend dashboard → **Emails** — was it sent? If yes but bounced,
  your `RESEND_FROM_EMAIL` domain isn't fully verified.
- Check Supabase → **Logs** → **Auth logs** for errors.
- Check spam folder.

### "Google sign-in: redirect_uri_mismatch"
- The redirect URI in Google Cloud Console must be the **Supabase
  callback**, not your app's. Should be
  `https://YOUR-REF.supabase.co/auth/v1/callback`, with no trailing slash.

### "Auth works locally but not in prod"
- You forgot to add the production callback URL to Supabase **Redirect
  URLs** (step 5).
- Env vars aren't set in Vercel.

### "rate limit exceeded"
- Supabase free tier limits magic-link emails to 4/hour per email. For
  testing, use multiple emails or wait it out. Pro tier removes this.

### "Cannot read property 'auth' of undefined"
- `.env.local` missing or `NEXT_PUBLIC_SUPABASE_URL` not set. Restart
  `pnpm dev` after creating it.

---

## What to send me when you're done

Paste in the chat (or commit to a secret-safe place):

- `NEXT_PUBLIC_SUPABASE_URL` (safe to paste in plaintext — it's public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (also public-safe)
- Confirmation that magic link + Google login both worked
- Whether you used `cancelhub.app` or a subdomain for Resend

Then I'll wire the dashboard + notifications to Supabase and add the cron
edge function that fires real notification emails through Resend.
