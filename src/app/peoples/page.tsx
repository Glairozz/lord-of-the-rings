import type { Metadata } from 'next';
import { peoples } from '@/data/peoples';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet, humanize } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Peoples & Cultures',
  description:
    'Races, cultures, kingdoms, realms, organizations and armies of Middle-earth — from hobbits and elves to the White Council and the Muster of Rohan — each labelled by what kind of thing it is.',
  alternates: { canonical: '/peoples' },
};

export default function PeoplesPage() {
  const items = peoples.map((p) =>
    item(
      'people',
      p,
      baseFacets(p.continuity, { kind: humanize(p.kind) }),
      [p.kind, ...(p.aliases ?? []), p.language ?? ''].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Peoples' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Peoples & Cultures"
        intro="Not every people is alike. A race is a kind of being; a culture is a shared people, language and custom; a kingdom or realm is a political territory; an organization is a body with a purpose; and an army is a force raised for war. Each entry states plainly which kind it is, so a kingdom is never mistaken for a culture, nor an army for a people."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by name, alias or language…"
        facets={[
          { key: 'kind', label: 'Category' },
          continuityFacet,
        ]}
        pageSize={12}
      />
    </div>
  );
}