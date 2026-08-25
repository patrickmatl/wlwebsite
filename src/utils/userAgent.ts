/**
 * REMOVED: isSearchEngine() / search-engine user-agent sniffing.
 *
 * This helper existed only to branch behaviour on whether the visitor was a
 * crawler. Serving crawlers something different from users is cloaking and
 * risks a manual action. Nothing in the app imports it any more.
 *
 * This file is safe to delete.
 */
export {};
