import type { Continuity } from '@/types/content';
import Breadcrumbs, { type Crumb } from '@/components/layout/Breadcrumbs';
import ContinuityBadge from '@/components/ui/ContinuityBadge';
import LoreImage from '@/components/ui/LoreImage';

export default function EntityHero({
  eyebrow,
  name,
  aliases,
  summary,
  image,
  continuity,
  meta = [],
  crumbs,
}: {
  eyebrow: string;
  name: string;
  aliases?: string[];
  summary: string;
  image?: string;
  continuity: Continuity;
  meta?: { label: string; value: string }[];
  crumbs: Crumb[];
}) {
  return (
    <header className="border-b border-border bg-night-2/50">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8">
        <Breadcrumbs items={crumbs} />
        <div className={`grid gap-8 ${image ? 'md:grid-cols-[1fr_20rem]' : ''}`}>
          <div className="order-2 md:order-1">
            <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
            <h1 className="font-display text-3xl leading-tight text-parchment md:text-5xl">{name}</h1>
            {aliases && aliases.length > 0 && (
              <p className="mt-2 text-sm italic text-mist">
                Also known as {aliases.slice(0, 4).join(', ')}
              </p>
            )}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-parchment-2 md:text-lg">{summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ContinuityBadge continuity={continuity} withDescription />
            </div>

            {meta.length > 0 && (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="font-display text-[11px] uppercase tracking-wider text-gold">{m.label}</dt>
                    <dd className="text-sm text-parchment-2">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {image && (
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-night-2">
                <LoreImage src={image} alt={name} fill priority sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
