import { MetadataRoute } from 'next';

/**
 * Robots policy.
 *
 * Search crawlers AND AI crawlers are explicitly welcome. The business wants
 * to be discoverable in classic search (Google/Bing) and cited by AI answer
 * engines (Google AI Overviews, ChatGPT, Claude, Perplexity), so nothing that
 * carries content is disallowed and the major AI user agents are listed
 * explicitly rather than left to the wildcard.
 *
 * NOTE: there must be NO static public/robots.txt file — it would shadow this
 * route. This file is the single source of truth.
 */
export default function robots(): MetadataRoute.Robots {
  const contentRules = {
    allow: '/',
    // /studio is the CRM and /portal is the client area. Neither is for
    // crawlers, and both would be a poor first impression in a search result.
    // /q and /i are the unguessable share links for quotes and invoices —
    // readable by anyone holding one, but never something to index.
    disallow: ['/api/', '/studio', '/portal', '/q/', '/i/'],
  };

  return {
    rules: [
      // Default for everyone.
      { userAgent: '*', ...contentRules },
      // Classic search.
      { userAgent: 'Googlebot', ...contentRules },
      { userAgent: 'Bingbot', ...contentRules },
      // AI search / answer engines — explicitly allowed so the site can be
      // read and cited by them.
      { userAgent: 'GPTBot', ...contentRules },
      { userAgent: 'OAI-SearchBot', ...contentRules },
      { userAgent: 'ChatGPT-User', ...contentRules },
      { userAgent: 'ClaudeBot', ...contentRules },
      { userAgent: 'Claude-Web', ...contentRules },
      { userAgent: 'anthropic-ai', ...contentRules },
      { userAgent: 'PerplexityBot', ...contentRules },
      { userAgent: 'Perplexity-User', ...contentRules },
      { userAgent: 'Google-Extended', ...contentRules },
      { userAgent: 'Applebot', ...contentRules },
      { userAgent: 'Applebot-Extended', ...contentRules },
      { userAgent: 'meta-externalagent', ...contentRules },
      { userAgent: 'Amazonbot', ...contentRules },
      { userAgent: 'CCBot', ...contentRules },
      { userAgent: 'DuckAssistBot', ...contentRules },
    ],
    sitemap: 'https://wlcreationx.co.za/sitemap.xml',
    host: 'https://wlcreationx.co.za',
  };
}
