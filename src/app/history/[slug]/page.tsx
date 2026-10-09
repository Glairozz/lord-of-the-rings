import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events, eventById } from '@/data/events';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, TagList, SourceList, Callout } from '@/components/ui/blocks';
import { resolveMany, resolveRef } from '@/lib/content';
import { ageName, humanize } from '@/lib/pages';

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = eventById.get(slug);
  if (!event) return { title: 'Event not found' };
  return {
    title: event.name,
    description: event.summary,
    alternates: { canonical: `/history/${event.slug}` },
    openGraph: { title: event.name, description: event.summary },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventById.get(slug);
  if (!event) notFound();

  // `participants` holds the named cast; `characterIds` is a fuller roster, so
  // fall back to it when the shorter list is absent.
  const participantIds = event.participants?.length ? event.participants : (event.characterIds ?? []);

  const toc: TocItem[] = [{ id: 'the-event', label: 'The event' }];
  if (event.causes) toc.push({ id: 'causes', label: 'Causes' });
  if (event.consequences) toc.push({ id: 'consequences', label: 'Consequences' });
  if (participantIds.length) toc.push({ id: 'participants', label: 'Participants' });
  if (event.factions?.length) toc.push({ id: 'factions', label: 'Factions' });
  if (event.locationId) toc.push({ id: 'place', label: 'Place' });
  if (event.artifactIds?.length) toc.push({ id: 'artifacts', label: 'Artifacts' });
  if (event.relatedEventIds?.length) toc.push({ id: 'related-events', label: 'Related events' });
  toc.push({ id: 'sources', label: 'Sources' });

  const participants = resolveMany(participantIds);
  const artifacts = resolveMany(event.artifactIds);
  const relatedEvents = resolveMany(event.relatedEventIds);
  const place = event.locationId ? resolveRef('location', event.locationId) : undefined;

  const meta = [
    { label: 'Date', value: event.date.display },
    { label: 'Age', value: ageName(event.date.age) },
    { label: 'Type', value: humanize(event.eventType) },
    { label: 'Certainty', value: humanize(event.date.certainty) },
  ];

  return (
    <>
      <EntityHero
        eyebrow="Event"
        name={event.name}
        aliases={event.aliases}
        summary={event.summary}
        continuity={event.continuity}
        crumbs={[{ label: 'History', href: '/history' }, { label: event.name }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            <EntitySection id="the-event" title="The event">
              <Prose text={event.summary} />
              {event.date.note && (
                <div className="mt-6">
                  <Callout title="On the dating">{event.date.note}</Callout>
                </div>
              )}
            </EntitySection>

            {event.causes ? (
              <EntitySection id="causes" title="Causes">
                <Prose text={event.causes} />
              </EntitySection>
            ) : null}

            {event.consequences ? (
              <EntitySection id="consequences" title="Consequences">
                <Prose text={event.consequences} />
              </EntitySection>
            ) : null}

            {participants.length ? (
              <EntitySection id="participants" title="Participants">
                <RelatedGrid entities={participants} columns={4} />
              </EntitySection>
            ) : null}

            {event.factions?.length ? (
              <EntitySection id="factions" title="Factions">
                <TagList items={event.factions} />
              </EntitySection>
            ) : null}

            {place ? (
              <EntitySection id="place" title="Place">
                <RelatedLink entity={place} />
              </EntitySection>
            ) : null}

            {artifacts.length ? (
              <EntitySection id="artifacts" title="Artifacts">
                <ul className="space-y-3">
                  {artifacts.map((artifact) => (
                    <li key={artifact.id}>
                      <RelatedLink entity={artifact} />
                    </li>
                  ))}
                </ul>
              </EntitySection>
            ) : null}

            {relatedEvents.length ? (
              <EntitySection id="related-events" title="Related events">
                <ul className="space-y-3">
                  {relatedEvents.map((related) => (
                    <li key={related.id}>
                      <RelatedLink entity={related} />
                    </li>
                  ))}
                </ul>
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={event.sourceIds} />
            </EntitySection>
          </article>

          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        </div>
      </div>
    </>
  );
}