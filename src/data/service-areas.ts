/**
 * Which /[city]/[service] pages Google is allowed to index.
 *
 * The route can render five services against every location in the data file,
 * which is forty near-identical pages: an audit found thirty-two of thirty-seven
 * text lines identical between /pretoria/web-design and /sandton/web-design,
 * every one between 206 and 225 words, and not one of them linked to from
 * anywhere else on the site. That is the shape of a doorway page, and this
 * domain has already taken one Google penalty for cloaking and thin content.
 * Leaving thirty-five templated city pages indexed after that is asking for the
 * second one.
 *
 * So the pages still exist and still answer — nothing 404s, nothing that was
 * linked breaks — but only the places the studio can honestly claim to work
 * from are offered to search engines. The studio is in Waterkloof Glen with
 * Centurion and Menlyn on its doorstep; it has no presence in Cape Town or
 * Durban, and a page saying otherwise is a page Google is right to distrust.
 *
 * To add a city here it needs original copy about that city — real projects,
 * real travel, something true that is not in the template. The list is short on
 * purpose.
 *
 * 2026-08-28: the list is now EMPTY, because the three cities left in it never
 * met the standard the paragraph above sets. A second audit measured the fifteen
 * surviving pages: 260-271 words each, and 83-85% identical to their siblings
 * across cities (centurion/graphic-design against pretoria/graphic-design is
 * 85%), 61-70% across services. Thirteen of the fifteen are linked from nowhere
 * on the site.
 *
 * They also compete with the pages that should be winning. /pretoria/graphic-
 * design is 265 templated words against 1,126 on /pricing/graphic-design-
 * pretoria; /pretoria/web-design is 267 against 833 on /pricing/website-design-
 * pretoria; /pretoria/branding is 266 against /branding-solutions-pretoria.
 * Each thin page splits the signal for a term a stronger page already targets —
 * cannibalisation on top of duplication, on a domain still recovering from a
 * thin-content penalty and with four of nine money pages unindexed.
 *
 * Nothing is deleted. The routes still answer, the two footer links still work,
 * and noindex,follow means the links inside them still pass. They are simply no
 * longer offered to Google as pages worth ranking.
 *
 * Putting a city back is the same test as before, and it is a real one: write
 * original copy about that city — named projects, actual travel, something true
 * that is not in the template — and the page earns its place. Adding a slug to
 * this set without writing that copy just rebuilds the doorway cluster.
 */
export const INDEXABLE_SERVICE_AREAS = new Set<string>([]);

export function isIndexableServiceArea(city: string): boolean {
  return INDEXABLE_SERVICE_AREAS.has(city.toLowerCase());
}
