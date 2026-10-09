import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  as: Tag = 'h2',
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  as?: 'h2' | 'h3';
  action?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <Tag id={id} className="scroll-mt-24 font-display text-2xl text-parchment md:text-3xl">
          {title}
        </Tag>
        {action}
      </div>
      {intro && <p className="mt-3 max-w-3xl leading-relaxed text-mist">{intro}</p>}
      <div className="mt-5 rule-gold" />
    </div>
  );
}
