/**
 * Neon serverless PostgreSQL client.
 *
 * Usage (server components, server actions, route handlers):
 *
 *   import { sql } from '@/lib/db'
 *   const rows = await sql`SELECT * FROM subscriptions WHERE user_id = ${userId}`
 *
 * The `neon()` function returns a tagged-template SQL executor that:
 *   - Automatically parameterises values (safe from SQL injection)
 *   - Runs over HTTP (no persistent connection needed — perfect for serverless)
 *   - Returns typed row arrays
 *
 * Never import this file in 'use client' components.
 */

import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.DATABASE_URL)
