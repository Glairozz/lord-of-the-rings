import type { Metadata } from 'next';
import { locations } from '@/data/locations';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet, ageFacet, ageName, humanize } from '@/lib/pages';
import { atlasCategories, atlasCategoryOfLocation, atlasRegionOf, atlasRegionOrder } from '@/lib/atlas';

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
        kind: atlasCategoryOfLocation(l).label,
        region: atlasRegionOf(l),
        importance: (l.eventIds?.length ?? 0) >= 2 ? 'Important places' : 'Other places',
        ...(l.age ? { age: ageName(l.age) } : {}),
      }),
      [l.aliases?.join(' ') ?? '', l.region ?? '', l.type, humanize(l.type)].join(' '),
    ),
  );

  // Canonical ordering so the filters match the grouped view, not the alphabet.
  const presentRegions = new Set(locations.map((l) => atlasRegionOf(l)));
  const usedRegions = atlasRegionOrder.filter((r) => presentRegions.has(r));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Locations' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Locations"
        intro="Regions, cities, realms and landmarks drawn from the legendarium, gathered by geography by default — from Eriador in the west to Mordor in the east. Coordinates are approximate positions on the shared atlas map, good for orientation but not cartographic precision."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by name, alias or region…"
        facets={[
          { key: 'kind', label: 'Kind' },
          {
            key: 'region',
            label: 'Region',
            options: usedRegions.map((r) => ({ value: r, label: r })),
          },
          {
            key: 'importance',
            label: 'Importance',
            options: [{ value: 'Important places', label: 'Important places' }],
          },
          ageFacet,
          continuityFacet,
        ]}
        groupOptions={[
          { key: 'region', label: 'Geographic region' },
          { key: 'kind', label: 'Kind of place' },
          { key: 'importance', label: 'Importance' },
        ]}
        defaultGroupBy="region"
        groupOrder={{
          region: usedRegions,
          kind: atlasCategories.map((c) => c.label),
          importance: ['Important places', 'Other places'],
        }}
        pageSize={12}
      />
    </div>
  );
}
