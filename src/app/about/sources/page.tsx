import type { Metadata } from 'next';
import type { Source } from '@/types/content';
import { sources } from '@/data/sources';
import { ages } from '@/data/sources';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Sources',
  description:
    'The registry of works behind The Legend of Middle-earth: primary texts, supplementary writings, adaptations, reference works — and the Ages of Arda.',
  alternates: { canonical: '/about/sources' },
};

const kindGroups: { kind: Source['kind']; label: string }[] = [
  { kind: 'primary-text', label: 'Primary texts' },
  { kind: 'supplementary', label: 'Supplementary writings' },
  { kind: 'appendix', label: 'Appendices' },
  { kind: 'adaptation', label: 'Adaptations' },
  { kind: 'reference', label: 'Reference works' },
  { kind: 'web', label: 'Web' },
];

export default function SourcesPage() {
  const groups = kindGroups
    .map((g) => ({ ...g, items: sources.filter((s) => s.kind === g.kind) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Sources' }]} />
      <SectionHeading
        eyebrow="About the archive"
        title="Sources"
        intro="Every substantial encyclopedia entry references one or more of these records, so readers can verify claims rather than take them on faith. Sources are grouped by what kind of authority they carry."
      />

      <div className="space-y-14">
        {groups.map((g) => (
          <section key={g.kind}>
            <SectionHeading as="h3" title={g.label} />
            <ul className="space-y-3">
              {g.items.map((s) => (
                <li key={s.id} className="border-l-2 border-gold/40 pl-4">
                  <p className="text-sm text-parchment">
                    {s.label}
                    {s.year ? <span className="text-mist"> · {s.year}</span> : null}
                    <span className="ml-2 inline-flex rounded-full border border-border px-2 py-0.5 align-middle text-[10px] uppercase tracking-wider text-gold">
                      {g.label}
                    </span>
                  </p>
                  {s.author && <p className="mt-0.5 text-xs text-mist">{s.author}</p>}
                  {s.detail && <p className="text-xs text-mist">{s.detail}</p>}
                  {s.note && <p className="mt-1 text-xs leading-relaxed text-mist">{s.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <SectionHeading
            title="Ages of Arda"
            intro="The calendar the archive works in: the great spans of the history of Arda, from the creation of the world to the beginning of the Dominion of Men."
          />
          <ul className="space-y-4">
            {ages.map((a) => (
              <li key={a.id} className="panel-soft p-5">
                <p className="font-display text-lg text-parchment">{a.name}</p>
                <p className="mt-1 font-display text-xs uppercase tracking-wider text-gold">
                  {a.span}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{a.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}