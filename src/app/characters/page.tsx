import type { Metadata } from 'next';
import Link from 'next/link';
import { characterDirectoryItems } from '@/lib/characters';
import CharacterDirectory from '@/components/characters/CharacterDirectory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Characters',
  description:
    'Browse the characters of Middle-earth by race and creature type — hobbits, humans, elves, dwarves, wizards, orcs, Uruk-hai, Maiar, dragons and more.',
  alternates: { canonical: '/characters' },
};

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const items = characterDirectoryItems();

  const initialQuery = typeof params.q === 'string' ? params.q : '';
  const initialFilters: Record<string, string> = {};
  if (typeof params.race === 'string') initialFilters.race = params.race;
  if (typeof params.group === 'string') initialFilters.race = params.group;
  if (typeof params.people === 'string') initialFilters.people = params.people;
  if (typeof params.affiliation === 'string') initialFilters.affiliation = params.affiliation;
  if (typeof params.role === 'string') initialFilters.role = params.role;
  if (typeof params.continuity === 'string') initialFilters.continuity = params.continuity;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Characters' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Characters"
        intro="Explore the peoples and powers of Middle-earth by race and creature type. Search by name, then narrow the archive by allegiance, role or source — some figures belong to more than one kind."
        action={
          <Link href="/races" className="text-sm text-gold-light hover:text-parchment">
            Race overviews →
          </Link>
        }
      />
      <CharacterDirectory items={items} initialQuery={initialQuery} initialFilters={initialFilters} />
    </div>
  );
}
