import type { Metadata } from 'next';
import { characters, characterRaceGroups } from '@/data/characters';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet, humanize } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Characters',
  description:
    'Profiles of the peoples of Middle-earth — hobbits, elves, dwarves, men, wizards and the powers of the Elder Days — with lineages, deeds and source references.',
  alternates: { canonical: '/characters' },
};

const raceLabels = new Map(characterRaceGroups.map((g) => [g.id, g.label]));

export default function CharactersPage() {
  const items = characters.map((c) =>
    item(
      'character',
      c,
      baseFacets(c.continuity, { race: raceLabels.get(c.race) ?? humanize(c.race) }),
      [c.race, ...(c.aliases ?? []), ...(c.titles ?? [])].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Characters' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Characters"
        intro="Everyone from the Shire to the Elder Days, gathered in one place. Continuity labels mark whether a figure comes from Tolkien’s own texts, later published writings, or an adaptation."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by name, title or alias…"
        facets={[
          { key: 'race', label: 'People' },
          continuityFacet,
        ]}
        pageSize={12}
      />
    </div>
  );
}
