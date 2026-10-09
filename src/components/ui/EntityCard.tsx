import Link from 'next/link';
import type { EntityRef } from '@/lib/content';
import { entityTypeMeta } from '@/lib/content';
import LoreImage from './LoreImage';

export default function EntityCard({
  entity,
  showType = true,
  priority = false,
}: {
  entity: EntityRef;
  showType?: boolean;
  priority?: boolean;
}) {
  const meta = entityTypeMeta[entity.type];
  return (
    <Link
      href={entity.href}
      className="group panel flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-night-2">
        <LoreImage
          src={entity.image}
          alt={entity.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
        {showType && (
          <span className="absolute left-3 top-3 rounded-full border border-gold/40 bg-night/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold-light">
            {meta.label}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base leading-snug text-parchment transition-colors group-hover:text-gold-light">
          {entity.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist">{entity.summary}</p>
      </div>
    </Link>
  );
}
