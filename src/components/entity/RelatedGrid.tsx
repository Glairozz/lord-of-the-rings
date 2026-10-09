import type { EntityRef } from '@/lib/content';
import EntityCard from '@/components/ui/EntityCard';

export default function RelatedGrid({
  title,
  entities,
  emptyMessage,
  columns = 4,
}: {
  title?: string;
  entities: EntityRef[];
  emptyMessage?: string;
  columns?: 3 | 4;
}) {
  if (entities.length === 0) return null;
  return (
    <div>
      {title && <h2 className="mb-4 font-display text-xl text-parchment">{title}</h2>}
      <div
        className={`grid gap-5 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
      >
        {entities.map((e) => (
          <EntityCard key={`${e.type}-${e.id}`} entity={e} />
        ))}
      </div>
      {emptyMessage && entities.length === 0 && <p className="text-sm text-mist">{emptyMessage}</p>}
    </div>
  );
}
