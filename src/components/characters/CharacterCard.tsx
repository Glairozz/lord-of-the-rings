import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CharacterDirectoryItem } from '@/lib/characters';
import { characterGroupById } from '@/data/character-groups';
import LoreImage from '@/components/ui/LoreImage';
import { groupIcons } from './groupIcons';

export default function CharacterCard({ item }: { item: CharacterDirectoryItem }) {
  const meta = [item.groupLabel, item.affiliation].filter(Boolean).join(' · ');
  const group = characterGroupById.get(item.groupId);
  const Icon = group ? groupIcons[group.icon] : undefined;

  return (
    <Link
      href={item.href}
      className="group panel flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-night-2">
        <LoreImage
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-night/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-gold-light">
            {Icon ? <Icon size={11} aria-hidden /> : null}
            {item.groupLabel}
          </span>
          {item.roles.slice(0, 1).map((role) => (
            <span
              key={role}
              className="rounded-full border border-border/80 bg-night/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-parchment-2"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg leading-snug text-parchment transition-colors group-hover:text-gold-light">
          {item.name}
        </h3>
        {meta && <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist">{meta}</p>}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist">{item.summary}</p>
        <div className="mt-auto flex items-center gap-2 pt-4 text-sm text-gold-light">
          <span>View profile</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
