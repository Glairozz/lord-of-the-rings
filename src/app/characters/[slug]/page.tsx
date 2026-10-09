import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { characters, characterBySlug } from '@/data/characters';
import { books } from '@/data/books';
import type { RelationType } from '@/types/content';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, TagList, BulletList, InfoList, SourceList, Callout } from '@/components/ui/blocks';
import { resolveAny, resolveRef, resolveMany } from '@/lib/content';
import { toRef, humanize } from '@/lib/pages';

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = characterBySlug.get(slug);
  if (!character) return { title: 'Character not found' };
  return {
    title: character.name,
    description: character.summary,
    alternates: { canonical: `/characters/${character.slug}` },
    openGraph: { title: character.name, description: character.summary },
  };
}

const relationLabels: Record<RelationType, string> = {
  parent: 'Parent',
  child: 'Child',
  spouse: 'Spouse',
  sibling: 'Sibling',
  grandparent: 'Grandparent',
  grandchild: 'Grandchild',
  ancestor: 'Ancestor',
  descendant: 'Descendant',
  ally: 'Ally',
  rival: 'Rival',
  enemy: 'Enemy',
  mentor: 'Mentor',
  student: 'Student',
  member: 'Member of',
  ruler: 'Ruler',
  founder: 'Founder',
  owner: 'Owner',
  servant: 'Served',
  friend: 'Friend',
  relative: 'Kin',
};

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = characterBySlug.get(slug);
  if (!character) notFound();

  const toc: TocItem[] = [];
  if (character.biography?.length) toc.push({ id: 'biography', label: 'Biography' });
  if (character.personality?.length || character.motivations?.length || character.fears?.length)
    toc.push({ id: 'character', label: 'Character' });
  if (character.abilities?.length || character.limitations?.length)
    toc.push({ id: 'abilities', label: 'Abilities & limits' });
  if (character.deeds?.length) toc.push({ id: 'deeds', label: 'Deeds' });
  if (character.relationships?.length) toc.push({ id: 'relationships', label: 'Relationships' });
  if (character.locationIds?.length) toc.push({ id: 'places', label: 'Places' });
  if (character.eventIds?.length) toc.push({ id: 'events', label: 'History' });
  if (character.artifactIds?.length) toc.push({ id: 'artifacts', label: 'Artifacts' });
  if (character.appearances?.length) toc.push({ id: 'appearances', label: 'Appearances' });
  if (character.adaptations?.length) toc.push({ id: 'adaptations', label: 'Adaptations' });
  if (character.quotes?.length) toc.push({ id: 'quotes', label: 'Quotations' });
  toc.push({ id: 'sources', label: 'Sources' });

  const places = resolveMany(character.locationIds);
  const events = resolveMany(character.eventIds);
  const artifacts = resolveMany(character.artifactIds);
  const related = resolveMany(character.relatedIds);

  const meta = [
    { label: 'People', value: humanize(character.race) },
    character.titles?.length ? { label: 'Titles', value: character.titles.join(', ') } : null,
    character.gender ? { label: 'Gender', value: character.gender } : null,
    character.birthDate ? { label: 'Born', value: character.birthDate } : null,
    character.deathDate ? { label: 'Died', value: character.deathDate } : null,
    character.languages?.length ? { label: 'Languages', value: character.languages.join(', ') } : null,
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return (
    <>
      <EntityHero
        eyebrow="Character"
        name={character.name}
        aliases={character.aliases}
        summary={character.summary}
        image={character.image}
        continuity={character.continuity}
        crumbs={[{ label: 'Characters', href: '/characters' }, { label: character.name }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            <section>
              <h2 className="mb-4 font-display text-2xl text-parchment">Overview</h2>
              <div className="rule-gold mb-6" />
              <Prose text={character.overview} />
              {character.ancestry && (
                <div className="mt-6">
                  <InfoList items={[{ label: 'Ancestry', value: character.ancestry }]} />
                </div>
              )}
            </section>

            {character.biography?.length ? (
              <EntitySection id="biography" title="Biography">
                <div className="space-y-8">
                  {character.biography.map((s) => (
                    <div key={s.heading}>
                      <h3 className="mb-2 font-display text-lg text-gold-light">{s.heading}</h3>
                      <Prose text={s.body} />
                    </div>
                  ))}
                </div>
                {character.development && (
                  <div className="mt-8">
                    <Callout title="Arc & development">{character.development}</Callout>
                  </div>
                )}
              </EntitySection>
            ) : null}

            {character.personality?.length || character.motivations?.length || character.fears?.length ? (
              <EntitySection id="character" title="Character">
                <div className="grid gap-8 sm:grid-cols-2">
                  <TagList label="Personality" items={character.personality} />
                  <TagList label="Fears" items={character.fears} />
                </div>
                {character.motivations?.length ? (
                  <div className="mt-8">
                    <BulletList items={character.motivations} />
                  </div>
                ) : null}
              </EntitySection>
            ) : null}

            {character.abilities?.length || character.limitations?.length ? (
              <EntitySection id="abilities" title="Abilities & limits">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-gold">Strengths</p>
                    <BulletList icon="◆" items={character.abilities} />
                  </div>
                  <div>
                    <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-gold">Limitations</p>
                    <BulletList icon="·" items={character.limitations} />
                  </div>
                </div>
              </EntitySection>
            ) : null}

            {character.deeds?.length ? (
              <EntitySection id="deeds" title="Deeds">
                <BulletList items={character.deeds} />
              </EntitySection>
            ) : null}

            {character.relationships?.length ? (
              <EntitySection id="relationships" title="Relationships">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {character.relationships.map((rel) => {
                    const target = resolveAny(rel.targetId);
                    if (!target) return null;
                    return (
                      <li key={`${rel.targetId}-${rel.type}`}>
                        <RelatedLink
                          entity={target}
                          note={`${relationLabels[rel.type]}${rel.note ? ` · ${rel.note}` : ''}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </EntitySection>
            ) : null}

            {places.length ? (
              <EntitySection id="places" title="Places">
                <RelatedGrid entities={places} columns={3} />
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

            {artifacts.length ? (
              <EntitySection id="artifacts" title="Artifacts">
                <RelatedGrid entities={artifacts} columns={3} />
              </EntitySection>
            ) : null}

            {character.appearances?.length ? (
              <EntitySection id="appearances" title="Appearances">
                <ul className="space-y-4">
                  {character.appearances.map((a) => {
                    const book = resolveRef('book', a.bookId) ?? books.find((b) => b.id === a.bookId);
                    const ref = book ? toRef('book', book) : undefined;
                    return (
                      <li key={`${a.bookId}-${a.detail}`} className="border-l-2 border-gold/40 pl-4">
                        {ref ? (
                          <RelatedLink entity={ref} />
                        ) : (
                          <p className="text-sm text-parchment">{a.bookId}</p>
                        )}
                        <p className="mt-2 text-sm leading-relaxed text-mist">{a.detail}</p>
                      </li>
                    );
                  })}
                </ul>
              </EntitySection>
            ) : null}

            {character.adaptations?.length ? (
              <EntitySection id="adaptations" title="In adaptation">
                <Callout title="Adaptation note">
                  <BulletList icon="·" items={character.adaptations} />
                </Callout>
              </EntitySection>
            ) : null}

            {character.quotes?.length ? (
              <EntitySection id="quotes" title="Quotations">
                <div className="space-y-6">
                  {character.quotes.map((q) => (
                    <blockquote key={q.text} className="panel-soft p-5">
                      <p className="font-serif text-lg italic leading-relaxed text-parchment">
                        &ldquo;{q.text}&rdquo;
                      </p>
                      <cite className="mt-3 block text-xs not-italic text-mist">— {q.citation}</cite>
                    </blockquote>
                  ))}
                </div>
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={character.sourceIds} />
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
