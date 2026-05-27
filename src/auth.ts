/**
 * Auth.js v5 (NextAuth) configuration.
 *
 * Providers:
 *   - Google OAuth  (same credentials as before, just update redirect URL)
 *   - Resend email  (magic link — requires AUTH_RESEND_KEY + AUTH_RESEND_FROM)
 *
 * Strategy: JWT sessions (stateless — no sessions table needed).
 * user.id is the token `sub` (Google: numeric string, email: email address).
 *
 * For email magic links Auth.js needs to store short-lived verification
 * tokens. We use Neon via a minimal PG adapter (see below). If you only
 * need Google login, remove the Resend provider and the adapter entirely.
 */

import NextAuth, { type DefaultSession } from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { neon } from '@neondatabase/serverless'

// ── Extend the Session type so session.user.id is always present ────────────
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

// ── Minimal DB adapter for verification tokens (email magic link only) ──────
// Auth.js needs to persist short-lived tokens between "send email" and
// "user clicks link". We implement only the two methods it actually calls.
function makeAdapter(databaseUrl: string) {
  const sql = neon(databaseUrl)
  return {
    async createVerificationToken(token: {
      identifier: string
      token: string
      expires: Date
    }) {
      await sql`
        INSERT INTO verification_tokens (identifier, token, expires)
        VALUES (${token.identifier}, ${token.token}, ${token.expires.toISOString()})
        ON CONFLICT (identifier, token) DO NOTHING
      `
      return token
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string
      token: string
    }) {
      const rows = await sql`
        DELETE FROM verification_tokens
        WHERE identifier = ${identifier} AND token = ${token}
        RETURNING *
      `
      if (!rows[0]) return null
      return {
        identifier: rows[0].identifier as string,
        token: rows[0].token as string,
        expires: new Date(rows[0].expires as string),
      }
    },
  }
}

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID!,
    clientSecret: process.env.AUTH_GOOGLE_SECRET!,
  }),
  // Email magic link — only enabled when BOTH Resend key AND DATABASE_URL are
  // set. Auth.js requires a DB adapter for email providers (to store
  // verification tokens). Without DATABASE_URL the adapter can't be created
  // and Auth.js would fail to initialise ALL providers, including Google.
  ...((process.env.RESEND_API_KEY ?? process.env.AUTH_RESEND_KEY) && process.env.DATABASE_URL
    ? [
        Resend({
          apiKey: (process.env.RESEND_API_KEY ?? process.env.AUTH_RESEND_KEY)!,
          from: process.env.AUTH_RESEND_FROM ?? 'noreply@cancelhub.app',
        }),
      ]
    : []),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,

  // Only attach the DB adapter when Resend is configured (it's only needed
  // for verification token storage). Google OAuth works fine without it.
  ...((process.env.RESEND_API_KEY ?? process.env.AUTH_RESEND_KEY) && process.env.DATABASE_URL
    ? { adapter: makeAdapter(process.env.DATABASE_URL) }
    : {}),

  session: { strategy: 'jwt' },

  callbacks: {
    // Expose user.id (= token.sub) on the session object so server actions
    // and server components can call session.user.id without extra lookups.
    jwt({ token, account }) {
      // On first sign-in, `account` and `profile` are present.
      // On subsequent requests only `token` is populated.
      if (account?.providerAccountId) {
        // Use provider's unique ID as the stable sub so it stays consistent
        // across email-change scenarios.
        token.sub = account.providerAccountId
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.sub!
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login', // Auth errors redirect to /login?error=...
  },
})
