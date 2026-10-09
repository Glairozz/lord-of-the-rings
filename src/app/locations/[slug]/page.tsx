import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations, locationBySlug } from '@/data/locations';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, SourceList, Callout, InlineLink } from '@/components/ui/blocks';
import { resolveMany } from '@/lib/content';
import { ageName, humanize } from '@/lib/pages';

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = locationBySlug.get(slug);
  if (!location) return { title: 'Location not found' };
  return {
    title: location.name,
    description: location.summary,
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: { title: location.name, description: location.summary },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationBySlug.get(slug);
  if (!location) notFound();

  const toc: TocItem[] = [];
  if (location.geography) toc.push({ id: 'geography', label: 'Geography' });
  if (location.history) toc.push({ id: 'history', label: 'History' });
  if (location.inhabitants) toc.push({ id: 'inhabitants', label: 'People & inhabitants' });
  if (location.significance) toc.push({ id: 'significance', label: 'Significance' });
  if (location.connections) toc.push({ id: 'connections', label: 'Connections' });
  if (location.eventIds?.length) toc.push({ id: 'events', label: 'Events here' });
  if (location.characterIds?.length) toc.push({ id: 'figures', label: 'Figures of this place' });
  toc.push({ id: 'sources', label: 'Sources' });

  const events = resolveMany(location.eventIds);
  const figures = resolveMany(location.characterIds);
  const related = resolveMany(location.relatedIds);

  const meta = [
    { label: 'Type', value: humanize(location.type) },
    location.region ? { label: 'Region', value: location.region } : null,
    location.age ? { label: 'Age', value: ageName(location.age) } : null,
    location.coordinates
      ? { label: 'On the map', value: `${location.coordinates.x}%, ${location.coordinates.y}%` }
      : null,
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return (
    <>
      <EntityHero
        eyebrow="Location"
        name={location.name}
        aliases={location.aliases}
        summary={location.summary}
        image={location.image}
        continuity={location.continuity}
        crumbs={[{ label: 'Locations', href: '/locations' }, { label: location.name }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            <Callout title="On the interactive atlas">
              <p className="mb-2">
                Coordinates shown here are approximate, marking this place on the shared atlas map for orientation
                rather than cartography.
                {location.mapLayer ? ` It sits on the ${humanize(location.mapLayer)} layer.` : ''}
              </p>
              <InlineLink href="/atlas">View on the interactive atlas →</InlineLink>
            </Callout>

            {location.geography ? (
              <EntitySection id="geography" title="Geography">
                <Prose text={location.geography} />
              </EntitySection>
            ) : null}

            {location.history ? (
              <EntitySection id="history" title="History">
                <Prose text={location.history} />
              </EntitySection>
            ) : null}

            {location.inhabitants ? (
              <EntitySection id="inhabitants" title="People & inhabitants">
                <Prose text={location.inhabitants} />
              </EntitySection>
            ) : null}

            {location.significance ? (
              <EntitySection id="significance" title="Significance">
                <Prose text={location.significance} />
              </EntitySection>
            ) : null}

            {location.connections ? (
              <EntitySection id="connections" title="Connections">
                <Prose text={location.connections} />
              </EntitySection>
            ) : null}

            {events.length ? (
              <EntitySection id="events" title="Events here">
                <ul className="space-y-3">
                  {events.map((e) => (
                    <li key={e.id}>
                      <RelatedLink entity={e} />
                    </li>
                  ))}
                </ul>
              </EntitySection>
            ) : null}

            {figures.length ? (
              <EntitySection id="figures" title="Figures of this place">
                <RelatedGrid entities={figures} columns={3} />
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={location.sourceIds} />
            </EntitySection>

            {related.length ? (
              <section>
                <h2 className="mb-4 font-display text-2xl text-parchment">Related places</h2>
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