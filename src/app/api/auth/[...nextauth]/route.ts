/**
 * Auth.js v5 catch-all route handler.
 *
 * Handles all Auth.js endpoints:
 *   GET/POST /api/auth/signin
 *   GET/POST /api/auth/signout
 *   GET/POST /api/auth/callback/google
 *   GET/POST /api/auth/callback/resend
 *   GET      /api/auth/session
 *   GET      /api/auth/csrf
 *   GET      /api/auth/providers
 */
export { handlers as GET, handlers as POST } from '@/auth'

// Re-export named to satisfy the Next.js route handler convention.
import { handlers } from '@/auth'
export { handlers }
