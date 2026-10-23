import type { Metadata } from 'next';
import { visibleCharacterGroups } from '@/data/character-groups';
import { charactersInGroup } from '@/lib/characters';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import RaceCard from '@/components/characters/RaceCard';

export const metadata: Metadata = {
  title: 'Races & Creatures',
  description: 'Browse Middle-earth by race and creature type: hobbits, elves, dwarves, men, wizards, orcs, dragons, and more.',
  alternates: { canonical: '/races' },
};

export default function RacesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Races & Creatures' }]} />
      <SectionHeading
        eyebrow="By kind"
        title="Races & Creatures of Middle-earth"
        intro="Browse the figures of Middle-earth by what they are — race, kindred or creature-kind. Only categories with recorded members are shown, and some figures belong to more than one kind."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCharacterGroups.map((group) => (
          <RaceCard key={group.id} group={group} count={charactersInGroup(group.id).length} />
        ))}
      </div>
    </div>
  );
}
