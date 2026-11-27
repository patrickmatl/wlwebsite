import AreaLandingPage, { areaMetadata } from '@/components/AreaLandingPage';
import { getAreaPage } from '@/data/area-pages';

// All content for this page lives in src/data/areas/annual-report-design-cape-town.ts.
const area = getAreaPage('annual-report-design-cape-town');

export const metadata = areaMetadata(area);

export default function Page() {
  return <AreaLandingPage area={area} />;
}
