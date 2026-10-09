import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { books } from '@/data/books';
import EntityHero from '@/components/entity/EntityHero';
import EntitySection from '@/components/entity/EntitySection';
import TableOfContents, { type TocItem } from '@/components/entity/TableOfContents';
import RelatedGrid from '@/components/entity/RelatedGrid';
import RelatedLink from '@/components/ui/RelatedLink';
import { Prose, TagList, SourceList, Callout } from '@/components/ui/blocks';
import { resolveMany, resolveType } from '@/lib/content';
import { humanize } from '@/lib/pages';

const bookBySlug = new Map(books.map((book) => [book.slug, book]));

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = bookBySlug.get(slug);
  if (!book) return { title: 'Book not found' };
  return {
    title: book.title,
    description: book.summary,
    alternates: { canonical: `/library/${book.slug}` },
    openGraph: { title: book.title, description: book.summary },
  };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = bookBySlug.get(slug);
  if (!book) notFound();

  const toc: TocItem[] = [{ id: 'synopsis', label: 'Synopsis' }];
  if (book.setting) toc.push({ id: 'setting', label: 'Setting' });
  if (book.chapters?.length) toc.push({ id: 'chapters', label: 'Chapters' });
  if (book.themes?.length) toc.push({ id: 'themes', label: 'Themes' });
  if (book.characterIds?.length) toc.push({ id: 'characters', label: 'Characters' });
  if (book.locationIds?.length) toc.push({ id: 'locations', label: 'Locations' });
  if (book.eventIds?.length) toc.push({ id: 'events', label: 'In the histories' });
  if (book.followUp?.length) toc.push({ id: 'next', label: 'Where to go next' });
  if (book.publicationNote) toc.push({ id: 'publication-note', label: 'Publication note' });
  toc.push({ id: 'sources', label: 'Sources' });

  const characters = resolveType(book.characterIds, 'character');
  const locations = resolveType(book.locationIds, 'location');
  const events = resolveMany(book.eventIds);
  const followUp = resolveType(book.followUp, 'book');

  const meta = [
    { label: 'Author', value: book.author },
    { label: 'Published', value: book.published },
    { label: 'Format', value: humanize(book.workType) },
    book.series ? { label: 'Series', value: book.series } : null,
    book.studio ? { label: 'Studio', value: book.studio } : null,
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return (
    <>
      <EntityHero
        eyebrow="Library"
        name={book.title}
        summary={book.summary}
        image={book.image}
        continuity={book.continuity}
        crumbs={[{ label: 'Library', href: '/library' }, { label: book.title }]}
        meta={meta}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <article className="space-y-14">
            {book.continuity === 'adaptation' && (
              <section aria-label="Adaptation notice">
                <Callout title="This is an adaptation, not a Tolkien novel">
                  This entry describes a film or television production inspired by Tolkien’s work. It is
                  not one of the author’s books, and its events, characters and timeline should not be
                  cited as his text — the sources below record what the production actually is.
                </Callout>
              </section>
            )}

            <EntitySection id="synopsis" title="Synopsis">
              <Prose text={book.synopsis} />
            </EntitySection>

            {book.setting ? (
              <EntitySection id="setting" title="Setting">
                <Prose text={book.setting} />
              </EntitySection>
            ) : null}

            {book.chapters?.length ? (
              <EntitySection id="chapters" title="Chapters">
                <ol className="grid gap-4 md:grid-cols-2">
                  {book.chapters.map((chapter, i) => (
                    <li
                      key={`${chapter.title}-${i}`}
                      className="rounded-lg border border-border bg-night-2/40 p-4"
                    >
                      <p className="font-display text-sm text-gold-light">
                        <span className="mr-2 font-serif text-mist">{i + 1}.</span>
                        {chapter.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-parchment-2">{chapter.summary}</p>
                    </li>
                  ))}
                </ol>
              </EntitySection>
            ) : null}

            {book.themes?.length ? (
              <EntitySection id="themes" title="Themes">
                <TagList items={book.themes} />
              </EntitySection>
            ) : null}

            {characters.length ? (
              <EntitySection id="characters" title="Characters">
                <RelatedGrid entities={characters} columns={4} />
              </EntitySection>
            ) : null}

            {locations.length ? (
              <EntitySection id="locations" title="Locations">
                <RelatedGrid entities={locations} columns={4} />
              </EntitySection>
            ) : null}

            {events.length ? (
              <EntitySection id="events" title="In the histories">
                <ul className="space-y-3">
                  {events.map((event) => (
                    <li key={event.id}>
                      <RelatedLink entity={event} />
                    </li>
                  ))}
                </ul>
              </EntitySection>
            ) : null}

            {followUp.length ? (
              <EntitySection id="next" title="Where to go next">
                <RelatedGrid entities={followUp} columns={4} />
              </EntitySection>
            ) : null}

            {book.publicationNote ? (
              <EntitySection id="publication-note" title="Publication note">
                <Callout title="Publication note">{book.publicationNote}</Callout>
              </EntitySection>
            ) : null}

            <EntitySection id="sources" title="Sources">
              <SourceList sourceIds={book.sourceIds} />
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