import { regions } from '@/data/regions';

interface PathItem {
  params: {
    city?: string;
    service?: string;
    locationId?: string;
  };
}

export function generateStaticParams(): PathItem[] {
  const paths: PathItem[] = [];

  // Add paths for each region and its locations
  regions.forEach((region) => {
    region.locations.forEach((location) => {
      // Add main location path
      paths.push({
        params: {
          locationId: location.slug
        }
      });

      // Add paths for sublocations if they exist
      if (location.subLocations) {
        location.subLocations.forEach((sub) => {
          paths.push({
            params: {
              locationId: sub.slug
            }
          });
        });
      }
    });
  });

  return paths;
}

export function generateServiceLocationParams(): PathItem[] {
  const paths: PathItem[] = [];

  // Add paths for each region and its locations
  regions.forEach((region) => {
    region.locations.forEach((location) => {
      // Add main location path
      paths.push({
        params: {
          city: location.slug,
          service: 'web-design'
        }
      });

      paths.push({
        params: {
          city: location.slug,
          service: 'graphic-design'
        }
      });

      paths.push({
        params: {
          city: location.slug,
          service: 'digital-marketing'
        }
      });

      // Add paths for sublocations if they exist
      if (location.subLocations) {
        location.subLocations.forEach((sub) => {
          paths.push({
            params: {
              city: sub.slug,
              service: 'web-design'
            }
          });

          paths.push({
            params: {
              city: sub.slug,
              service: 'graphic-design'
            }
          });

          paths.push({
            params: {
              city: sub.slug,
              service: 'digital-marketing'
            }
          });
        });
      }
    });
  });

  return paths;
}
