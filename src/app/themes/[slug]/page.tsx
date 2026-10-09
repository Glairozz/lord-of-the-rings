import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { themes } from '@/data/themes';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import { TagList, BulletList, SourceList, Callout } from '@/components/ui/blocks';
import { getSources, resolveMany } from '@/lib/content';

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);
  if (!theme) return { title: 'Theme not found' };
  return {
    title: theme.name,
    description: theme.summary,
    alternates: { canonical: `/themes/${theme.slug}` },
    openGraph: { title: theme.name, description: theme.summary },
  };
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = themes.find((t) => t.slug === slug);
  if (!theme) notFound();

  const toc: TocItem[] = [{ id: 'question', label: 'The question' }];
  toc.push({ id: 'thesis', label: 'The thesis' });
  if (theme.evidence.length) toc.push({ id: 'evidence', label: 'The evidence' });
  if (theme.counterarguments.length) toc.push({ id: 'counterarguments', label: 'Counterarguments' });
  if (theme.connections?.length) toc.push({ id: 'connections', label: 'Connections' });
  if (theme.discussionPrompt) toc.push({ id: 'discussion', label: 'For discussion' });
  toc.push({ id: 'sources', label: 'Sources' });

  const relatedThemes = resolveMany(theme.relatedThemeIds);

  // Union of the page-level citations and any cited by individual evidence points.
  const pageSourceIds = Array.from(
    new Set([...theme.sourceIds, ...theme.evidence.flatMap((e) => e.sourceIds ?? [])]),
  );

  return (
    <>
      <EntityHero
        eyebrow="Theme"
        name={theme.name}
        aliases={theme.aliases}
        summary={theme.summary}
        image={theme.image}
        continuity={theme.continuity}
        crumbs={[{ label: 'Themes', href: '/themes' }, { label: theme.name }]}
        meta={[{ label: 'Question', value: theme.question }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            <EntitySection id="question" title="The question">
              <p className="font-serif text-xl italic leading-relaxed text-parchment md:text-2xl">
                {theme.question}
              </p>
            </EntitySection>

            <EntitySection id="thesis" title="The thesis">
              <p className="text-base leading-relaxed text-parchment-2">{theme.thesis}</p>
              <div className="mt-6">
                <Callout title="An interpretation">
                  This thesis is a reasoned reading of the texts, not a claim about Tolkien’s
                  settled intent. The counterarguments below are part of the analysis, not an
                  afterthought.
                </Callout>
              </div>
            </EntitySection>

            {theme.evidence.length ? (
              <EntitySection id="evidence" title="The evidence">
                <ol className="space-y-4">
                  {theme.evidence.map((e) => (
                    <li key={e.point} className="panel-soft p-5">
                      <h3 className="font-display text-base text-gold-light">{e.point}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-parchment-2">{e.detail}</p>
                      {e.sourceIds?.length ? (
                        <div className="mt-3">
                          <TagList
                            label="Sources"
                            items={getSources(e.sourceIds).map((s) => s.label)}
                          />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </EntitySection>
            ) : null}

            {theme.counterarguments.length ? (
              <EntitySection id="counterarguments" title="Counterarguments">
                <BulletList icon="·" items={theme.counterarguments} />
              </EntitySection>
            ) : null}

            {theme.connections?.length ? (
              <EntitySection id="connections" title="Connections">
                <BulletList items={theme.connections} />
              </EntitySection>
            ) : null}

            {theme.discussionPrompt ? (
              <EntitySection id="discussion" title="For discussion">
                <Callout title="Discussion prompt">
                  <p className="font-serif italic text-parchment">{theme.discussionPrompt}</p>
                </Callout>
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={pageSourceIds} />
            </EntitySection>

            {relatedThemes.length ? (
              <section>
                <h2 className="mb-4 font-display text-2xl text-parchment">Related themes</h2>
                <div className="rule-gold mb-6" />
                <RelatedGrid entities={relatedThemes} columns={3} />
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