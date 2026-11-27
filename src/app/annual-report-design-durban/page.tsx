import AreaLandingPage, { areaMetadata } from '@/components/AreaLandingPage';
import { getAreaPage } from '@/data/area-pages';

// All content for this page lives in src/data/areas/annual-report-design-durban.ts.
const area = getAreaPage('annual-report-design-durban');

export const metadata = areaMetadata(area);

export default function Page() {
  return <AreaLandingPage area={area} />;
}
