import Link from 'next/link';
import type { Source } from '@/types/content';
import { getSources } from '@/lib/content';

/** Renders plain prose, treating blank lines as paragraph breaks. */
export function Prose({ text, className = '' }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n{2,}/).filter(Boolean);
  return (
    <div className={`prose-lore text-parchment-2 ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function TagList({ items, label }: { items?: string[]; label?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      {label && <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">{label}</p>}
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-night-2/60 px-3 py-1 text-xs text-parchment-2"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InfoList({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  const visible = items.filter((i) => i.value !== undefined && i.value !== null && i.value !== '');
  if (visible.length === 0) return null;
  return (
    <dl className="divide-y divide-border/70 overflow-hidden rounded-lg border border-border">
      {visible.map((item) => (
        <div key={item.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <dt className="font-display text-xs uppercase tracking-wider text-gold">{item.label}</dt>
          <dd className="text-sm text-parchment-2">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SourceList({ sourceIds }: { sourceIds: string[] }) {
  const sources: Source[] = getSources(sourceIds);
  if (sources.length === 0) return null;
  return (
    <ul className="space-y-3">
      {sources.map((s) => (
        <li key={s.id} className="border-l-2 border-gold/40 pl-4">
          <p className="text-sm text-parchment">
            {s.label}
            {s.year ? <span className="text-mist"> · {s.year}</span> : null}
          </p>
          {s.detail && <p className="text-xs text-mist">{s.detail}</p>}
          {s.note && <p className="mt-1 text-xs leading-relaxed text-mist">{s.note}</p>}
        </li>
      ))}
    </ul>
  );
}

export function BulletList({ items, icon = '✦' }: { items?: string[]; icon?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-parchment-2">
          <span className="mt-0.5 text-gold" aria-hidden>
            {icon}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
      <p className="mb-1 font-display text-sm text-gold-light">{title}</p>
      <div className="text-sm leading-relaxed text-parchment-2">{children}</div>
    </div>
  );
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gold-light underline underline-offset-2 hover:text-parchment">
      {children}
    </Link>
  );
}
