import Link from 'next/link';
import type { EntityRef } from '@/lib/content';
import LoreImage from './LoreImage';

/** Compact "related content" link used in sidebars and footers. */
export default function RelatedLink({ entity, note }: { entity: EntityRef; note?: string }) {
  return (
    <Link
      href={entity.href}
      className="group flex items-center gap-3 rounded-lg border border-border/70 p-2 transition-colors hover:border-gold/60 hover:bg-night-3"
    >
      {entity.image && (
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-night-2">
          <LoreImage src={entity.image} alt={entity.name} fill sizes="44px" className="object-cover" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm text-parchment transition-colors group-hover:text-gold-light">
          {entity.name}
        </span>
        {note && <span className="block truncate text-xs text-mist">{note}</span>}
      </span>
    </Link>
  );
}
