import type { ReactNode } from 'react';

export default function EntitySection({
  id,
  title,
  children,
  aside,
}: {
  id: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-4 font-display text-2xl text-parchment">{title}</h2>
      <div className="rule-gold mb-6" />
      <div className={aside ? 'grid gap-8 md:grid-cols-[1fr_16rem]' : ''}>
        <div>{children}</div>
        {aside && <div className="space-y-6">{aside}</div>}
      </div>
    </section>
  );
}
