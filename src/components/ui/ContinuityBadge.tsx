import type { Continuity } from '@/types/content';
import { continuityMeta } from '@/lib/content';

const toneClasses: Record<string, string> = {
  canon: 'border-emerald/60 text-emerald',
  supplementary: 'border-bronze/60 text-bronze',
  adaptation: 'border-morgul/60 text-morgul',
  interpretation: 'border-gold/60 text-gold',
};

export default function ContinuityBadge({
  continuity,
  withDescription = false,
}: {
  continuity: Continuity;
  withDescription?: boolean;
}) {
  const meta = continuityMeta[continuity];
  return (
    <span className="inline-flex flex-col gap-1">
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${toneClasses[meta.tone]}`}
        title={meta.description}
      >
        {meta.label}
      </span>
      {withDescription && <span className="text-xs text-mist">{meta.description}</span>}
    </span>
  );
}
