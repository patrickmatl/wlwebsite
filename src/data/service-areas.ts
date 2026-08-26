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
 */
export const INDEXABLE_SERVICE_AREAS = new Set(['pretoria', 'centurion', 'menlyn']);

export function isIndexableServiceArea(city: string): boolean {
  return INDEXABLE_SERVICE_AREAS.has(city.toLowerCase());
}
