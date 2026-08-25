/**
 * REMOVED: a second, conflicting /sitemap.xml handler.
 *
 * Two problems with the version that used to live here:
 *
 * 1. It competed with app/sitemap.ts, which Next.js already serves at
 *    /sitemap.xml. Two handlers for one URL meant whichever won was a
 *    coin flip.
 * 2. Its BASE_URL was `process.env.VERCEL_URL ? ... : 'http://localhost:3000'`.
 *    Anywhere VERCEL_URL was not set - including a self-hosted or GitHub Pages
 *    deploy - it published a sitemap full of http://localhost:3000/... URLs.
 *
 * app/sitemap.ts is now the single source of truth and hardcodes the real
 * production origin. This file is inert and safe to delete.
 */
export {};
