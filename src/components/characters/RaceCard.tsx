import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CharacterGroup } from '@/data/character-groups';
import { groupIcons } from './groupIcons';
import LoreImage from '@/components/ui/LoreImage';

export default function RaceCard({ group, count }: { group: CharacterGroup; count: number }) {
  const Icon = groupIcons[group.icon];

  return (
    <Link
      href={`/races/${group.id}`}
      className="group panel relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-night-2">
        <LoreImage
          src={group.image}
          alt={group.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-night/70 px-3 py-1 text-xs text-gold-light">
          {Icon ? <Icon size={16} /> : null}
          <span>{count} {count === 1 ? 'figure' : 'figures'}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-parchment transition-colors group-hover:text-gold-light">
          {group.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">{group.tagline}</p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-sm text-gold-light">
          <span>View the line</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
