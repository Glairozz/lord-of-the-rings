import type { Metadata } from 'next';
import { locations } from '@/data/locations';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet, ageFacet, ageName, humanize } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Locations',
  description:
    'Regions, cities, realms and landmarks of Middle-earth — from the Shire to Mordor — with geography, history, inhabitants and approximate positions on the atlas.',
  alternates: { canonical: '/locations' },
};

export default function LocationsPage() {
  const items = locations.map((l) =>
    item(
      'location',
      l,
      baseFacets(l.continuity, {
        type: humanize(l.type),
        region: l.region ?? '',
        ...(l.age ? { age: ageName(l.age) } : {}),
      }),
      [l.aliases?.join(' ') ?? '', l.region ?? '', l.type].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Locations' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Locations"
        intro="Regions, cities, realms and landmarks drawn from the legendarium. Coordinates are approximate positions on the shared atlas map — good for orientation, not cartographic precision."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by name, alias or region…"
        facets={[
          { key: 'type', label: 'Type' },
          { key: 'region', label: 'Region' },
          ageFacet,
          continuityFacet,
        ]}
        pageSize={12}
      />
    </div>
  );
}