import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { peoples } from '@/data/peoples';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, TagList, BulletList, SourceList, Callout } from '@/components/ui/blocks';
import { resolveAny, resolveMany } from '@/lib/content';
import { humanize } from '@/lib/pages';

export function generateStaticParams() {
  return peoples.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const people = peoples.find((p) => p.slug === slug);
  if (!people) return { title: 'People not found' };
  return {
    title: people.name,
    description: people.summary,
    alternates: { canonical: `/peoples/${people.slug}` },
    openGraph: { title: people.name, description: people.summary },
  };
}

export default async function PeoplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const people = peoples.find((p) => p.slug === slug);
  if (!people) notFound();

  const toc: TocItem[] = [];
  if (people.distinction) toc.push({ id: 'what-this-is', label: 'What this is' });
  if (people.origins) toc.push({ id: 'origins', label: 'Origins' });
  if (people.culture) toc.push({ id: 'culture', label: 'Culture' });
  if (people.language) toc.push({ id: 'language', label: 'Language' });
  if (people.history) toc.push({ id: 'history', label: 'History' });
  if (people.leaders?.length) toc.push({ id: 'leaders', label: 'Leaders' });
  if (people.settlements?.length) toc.push({ id: 'settlements', label: 'Settlements' });
  if (people.alliances?.length) toc.push({ id: 'alliances', label: 'Alliances' });
  if (people.conflicts?.length) toc.push({ id: 'conflicts', label: 'Conflicts' });
  if (people.characterIds?.length) toc.push({ id: 'members', label: 'Notable members' });
  toc.push({ id: 'sources', label: 'Sources' });

  const members = resolveMany(people.characterIds);
  const related = resolveMany(people.relatedIds);

  const meta = [
    { label: 'Category', value: humanize(people.kind) },
    people.language ? { label: 'Language', value: people.language } : null,
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return (
    <>
      <EntityHero
        eyebrow={humanize(people.kind)}
        name={people.name}
        aliases={people.aliases}
        summary={people.summary}
        image={people.image}
        continuity={people.continuity}
        crumbs={[{ label: 'Peoples', href: '/peoples' }, { label: people.name }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            {people.distinction ? (
              <EntitySection id="what-this-is" title="What this is">
                <Callout title="In brief">{people.distinction}</Callout>
              </EntitySection>
            ) : null}

            {people.origins ? (
              <EntitySection id="origins" title="Origins">
                <Prose text={people.origins} />
              </EntitySection>
            ) : null}

            {people.culture ? (
              <EntitySection id="culture" title="Culture">
                <Prose text={people.culture} />
              </EntitySection>
            ) : null}

            {people.language ? (
              <EntitySection id="language" title="Language">
                <Prose text={people.language} />
              </EntitySection>
            ) : null}

            {people.history ? (
              <EntitySection id="history" title="History">
                <Prose text={people.history} />
              </EntitySection>
            ) : null}

            {people.leaders?.length ? (
              <EntitySection id="leaders" title="Leaders">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {people.leaders.map((id) => {
                    const leader = resolveAny(id);
                    return (
                      <li key={id}>
                        {leader ? (
                          <RelatedLink entity={leader} />
                        ) : (
                          <p className="rounded-lg border border-border/70 bg-night-2/40 px-3 py-2.5 text-sm text-parchment-2">
                            {humanize(id)}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </EntitySection>
            ) : null}

            {people.settlements?.length ? (
              <EntitySection id="settlements" title="Settlements">
                <BulletList items={people.settlements} />
              </EntitySection>
            ) : null}

            {people.alliances?.length ? (
              <EntitySection id="alliances" title="Alliances">
                <TagList items={people.alliances} />
              </EntitySection>
            ) : null}

            {people.conflicts?.length ? (
              <EntitySection id="conflicts" title="Conflicts">
                <TagList items={people.conflicts} />
              </EntitySection>
            ) : null}

            {members.length ? (
              <EntitySection id="members" title="Notable members">
                <RelatedGrid entities={members} columns={3} />
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={people.sourceIds} />
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