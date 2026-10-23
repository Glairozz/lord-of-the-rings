import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { characterGroupById, visibleCharacterGroups } from '@/data/character-groups';
import { charactersInGroup } from '@/lib/characters';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import CharacterCard from '@/components/characters/CharacterCard';
import { groupIcons } from '@/components/characters/groupIcons';
import LoreImage from '@/components/ui/LoreImage';

export function generateStaticParams() {
  return visibleCharacterGroups.map((group) => ({ slug: group.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const group = characterGroupById.get(slug);
  if (!group) return { title: 'Group not found' };
  return {
    title: `${group.label} — Races & Creatures`,
    description: group.tagline,
    alternates: { canonical: `/races/${group.id}` },
  };
}

export default async function RaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = characterGroupById.get(slug);
  if (!group || group.members.length === 0) notFound();

  const items = charactersInGroup(group.id);
  const Icon = groupIcons[group.icon];

  return (
    <div>
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0" aria-hidden>
          <LoreImage src={group.image} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/90 to-night" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <Breadcrumbs
            items={[
              { label: 'Races & Creatures', href: '/races' },
              { label: group.shortLabel },
            ]}
          />
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold-light">
                {Icon ? <Icon size={16} /> : null}
                {items.length} {items.length === 1 ? 'figure' : 'figures'}
              </div>
              <h1 className="font-display text-4xl text-parchment md:text-5xl">{group.label}</h1>
              <p className="mt-4 text-lg leading-relaxed text-parchment-2">{group.description}</p>
            </div>
            <Link
              href={`/characters?race=${group.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-parchment transition-colors hover:border-gold hover:text-gold-light"
            >
              Browse all characters
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeading eyebrow="Figures" title="Members" intro={group.tagline} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <CharacterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
