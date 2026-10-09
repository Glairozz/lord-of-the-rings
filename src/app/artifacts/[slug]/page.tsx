import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { artifacts } from '@/data/artifacts';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, BulletList, SourceList, Callout } from '@/components/ui/blocks';
import { resolveMany } from '@/lib/content';
import { humanize } from '@/lib/pages';

const artifactBySlug = new Map(artifacts.map((a) => [a.slug, a]));

export function generateStaticParams() {
  return artifacts.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artifact = artifactBySlug.get(slug);
  if (!artifact) return { title: 'Artifact not found' };
  return {
    title: artifact.name,
    description: artifact.summary,
    alternates: { canonical: `/artifacts/${artifact.slug}` },
    openGraph: { title: artifact.name, description: artifact.summary },
  };
}

export default async function ArtifactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artifact = artifactBySlug.get(slug);
  if (!artifact) notFound();

  const toc: TocItem[] = [];
  if (artifact.description) toc.push({ id: 'description', label: 'Description' });
  if (artifact.powers?.length) toc.push({ id: 'powers', label: 'Powers' });
  if (artifact.limitations?.length) toc.push({ id: 'limitations', label: 'Limitations' });
  if (artifact.ownership?.length) toc.push({ id: 'ownership', label: 'Line of owners' });
  if (artifact.symbolism || artifact.fate) toc.push({ id: 'symbolism', label: 'Symbolism' });
  if (artifact.interpretation) toc.push({ id: 'interpretation', label: 'Interpretation' });
  if (artifact.characterIds?.length) toc.push({ id: 'characters', label: 'Characters' });
  if (artifact.eventIds?.length) toc.push({ id: 'events', label: 'In the histories' });
  toc.push({ id: 'sources', label: 'Sources' });

  const characters = resolveMany(artifact.characterIds);
  const events = resolveMany(artifact.eventIds);
  const related = resolveMany(artifact.relatedIds);

  const meta = [
    { label: 'Type', value: humanize(artifact.type) },
    artifact.creator ? { label: 'Forged by', value: artifact.creator } : null,
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return (
    <>
      <EntityHero
        eyebrow="Artifact"
        name={artifact.name}
        aliases={artifact.aliases}
        summary={artifact.summary}
        image={artifact.image}
        continuity={artifact.continuity}
        crumbs={[{ label: 'Artifacts', href: '/artifacts' }, { label: artifact.name }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            {artifact.slug === 'the-one-ring' && (
              <Callout title="Spoiler-ish care">
                The sources referenced here describe the destruction of the Ring. If you would rather not know how the
                tale ends, read no further.
              </Callout>
            )}

            {artifact.description ? (
              <EntitySection id="description" title="Description">
                <Prose text={artifact.description} />
              </EntitySection>
            ) : null}

            {artifact.powers?.length ? (
              <EntitySection id="powers" title="Powers">
                <BulletList items={artifact.powers} />
              </EntitySection>
            ) : null}

            {artifact.limitations?.length ? (
              <EntitySection id="limitations" title="Limitations">
                <BulletList icon="·" items={artifact.limitations} />
              </EntitySection>
            ) : null}

            {artifact.ownership?.length ? (
              <EntitySection id="ownership" title="Line of owners">
                <ol className="space-y-5">
                  {artifact.ownership.map((o, i) => (
                    <li key={`${o.holder}-${i}`} className="flex gap-4">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-xs text-gold-light">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-sm text-parchment">{o.holder}</p>
                        <p className="mt-0.5 text-xs text-mist">{o.period}</p>
                        {o.note ? (
                          <p className="mt-2 text-sm leading-relaxed text-parchment-2">{o.note}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </EntitySection>
            ) : null}

            {artifact.symbolism || artifact.fate ? (
              <EntitySection id="symbolism" title="Symbolism">
                <div className="space-y-8">
                  {artifact.symbolism ? (
                    <div>
                      <h3 className="mb-2 font-display text-lg text-gold-light">Symbolism</h3>
                      <Prose text={artifact.symbolism} />
                    </div>
                  ) : null}
                  {artifact.fate ? (
                    <div>
                      <h3 className="mb-2 font-display text-lg text-gold-light">Fate</h3>
                      <Prose text={artifact.fate} />
                    </div>
                  ) : null}
                </div>
              </EntitySection>
            ) : null}

            {artifact.interpretation ? (
              <EntitySection id="interpretation" title="Interpretation">
                <Callout title="Reasoned analysis — not from the books">
                  <Prose text={artifact.interpretation} />
                </Callout>
              </EntitySection>
            ) : null}

            {characters.length ? (
              <EntitySection id="characters" title="Characters">
                <RelatedGrid entities={characters} columns={3} />
              </EntitySection>
            ) : null}

            {events.length ? (
              <EntitySection id="events" title="In the histories">
                <ul className="space-y-3">
                  {events.map((e) => (
                    <li key={e.id}>
                      <RelatedLink entity={e} />
                    </li>
                  ))}
                </ul>
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={artifact.sourceIds} />
            </EntitySection>

            {related.length ? (
              <section>
                <h2 className="mb-4 font-display text-2xl text-parchment">Related entries</h2>
                <div className="rule-gold mb-6" />
                <RelatedGrid entities={related} />
              </section>
            ) : null}
          </article>

          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>
    </>
  );
}