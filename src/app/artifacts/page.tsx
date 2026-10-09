import type { Metadata } from 'next';
import { artifacts } from '@/data/artifacts';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet, humanize } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Artifacts',
  description:
    'Rings of power, blades of the Elder Days, jewels and heirlooms of Middle-earth — with makers, powers, owners, fate and source references.',
  alternates: { canonical: '/artifacts' },
};

export default function ArtifactsPage() {
  const items = artifacts.map((a) =>
    item(
      'artifact',
      a,
      baseFacets(a.continuity, { type: humanize(a.type) }),
      [a.aliases?.join(' ') ?? '', a.creator ?? '', a.type].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Artifacts' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Artifacts"
        intro="Rings of power, blades of the Elder Days, jewels and heirlooms. Each entry distinguishes what the texts record from what later writers or adaptations have added."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by name, alias or maker…"
        facets={[{ key: 'type', label: 'Type' }, continuityFacet]}
        pageSize={12}
      />
    </div>
  );
}