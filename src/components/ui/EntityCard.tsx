import Link from 'next/link';
import type { EntityRef } from '@/lib/content';
import { entityTypeMeta } from '@/lib/content';
import LoreImage from './LoreImage';

export default function EntityCard({
  entity,
  showType = true,
  priority = false,
  badge,
}: {
  entity: EntityRef;
  showType?: boolean;
  priority?: boolean;
  /** Overrides the badge label (e.g. a directory facet value like "Culture"). */
  badge?: string;
}) {
  const meta = entityTypeMeta[entity.type];
  const badgeLabel = badge ?? (showType ? meta.label : null);
  return (
    <Link
      href={entity.href}
      className="group panel flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      {entity.image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-night-2">
          <LoreImage
            src={entity.image}
            alt={entity.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
          {badgeLabel && (
            <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-night/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold-light">
              {badgeLabel}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        {badgeLabel && !entity.image && (
          <span className="mb-2 self-start rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
            {badgeLabel}
          </span>
        )}
        <h3 className="font-display text-base leading-snug text-parchment transition-colors group-hover:text-gold-light">
          {entity.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">{entity.summary}</p>
      </div>
    </Link>
  );
}
