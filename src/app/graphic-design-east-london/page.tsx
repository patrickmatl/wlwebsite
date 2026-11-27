import AreaLandingPage, { areaMetadata } from '@/components/AreaLandingPage';
import { getAreaPage } from '@/data/area-pages';

// All content for this page lives in src/data/areas/graphic-design-east-london.ts.
const area = getAreaPage('graphic-design-east-london');

export const metadata = areaMetadata(area);

export default function Page() {
  return <AreaLandingPage area={area} />;
}
