import { redirect } from 'next/navigation';

/**
 * This URL was a thin near-duplicate of /pricing/internal-communications-design-pretoria
 * targeting the same keyword - classic keyword cannibalization plus duplicate
 * content. It now permanently redirects to the full page so link equity and
 * relevance consolidate on one URL.
 */
export default function Page() {
  redirect('/pricing/internal-communications-design-pretoria');
}