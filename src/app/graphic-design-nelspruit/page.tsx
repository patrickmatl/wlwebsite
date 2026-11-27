import AreaLandingPage, { areaMetadata } from '@/components/AreaLandingPage';
import { getAreaPage } from '@/data/area-pages';

// All content for this page lives in src/data/areas/graphic-design-nelspruit.ts.
const area = getAreaPage('graphic-design-nelspruit');

export const metadata = areaMetadata(area);

export default function Page() {
  return <AreaLandingPage area={area} />;
}
