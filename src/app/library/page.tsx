import type { Metadata } from 'next';
import Link from 'next/link';
import { books, readingPaths } from '@/data/books';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { Callout } from '@/components/ui/blocks';
import { hrefFor } from '@/lib/content';
import { item, baseFacets, continuityFacet, humanize } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Library: Books & Reading Paths',
  description:
    'The written works of Middle-earth — Tolkien’s novels and collections, posthumously edited writings, and film and television adaptations — with recommended reading paths.',
  alternates: { canonical: '/library' },
};

export default function LibraryPage() {
  const items = books.map((book) =>
    item(
      'book',
      book,
      baseFacets(book.continuity, {
        workType: humanize(book.workType),
        series: book.series ?? 'Standalone',
      }),
      [book.title, book.series ?? '', book.author].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Library' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Library"
        intro="The works of Middle-earth, gathered in one shelf: Tolkien’s own novels and collections, posthumously edited writings, and film and television adaptations. Continuity labels keep them honest — a film is never passed off as a novel. Publication order, in-world chronology and a recommended reading order are three different things; the reading paths below untangle them."
      />

      <Directory
        items={items}
        searchPlaceholder="Search by title, series or author…"
        facets={[
          { key: 'workType', label: 'Format' },
          { key: 'series', label: 'Series' },
          continuityFacet,
        ]}
        pageSize={12}
      />

      <section className="mt-20">
        <SectionHeading
          eyebrow="Reading guides"
          title="Recommended reading paths"
          intro="Five curated orders through the legendarium, each chosen for a different kind of reader. Every step links to its entry in this library, with a note on why it sits where it does."
        />
        <Callout title="Adaptations are not novels">
          Film and television titles in this library — the two Peter Jackson trilogies and The Rings of
          Power — are adaptations of Tolkien’s work, not Tolkien novels. Paths that reach the screen use
          those entries only in a final, comparative step, so the distinction stays visible.
        </Callout>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {readingPaths.map((path) => (
            <article key={path.id} className="panel flex flex-col p-6">
              <h3 className="font-display text-lg text-gold-light">{path.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{path.description}</p>
              <ol className="mt-6 space-y-4">
                {path.steps.map((step, i) => {
                  const book = books.find((b) => b.id === step.bookId);
                  return (
                    <li key={step.bookId} className="flex gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-night-2 font-display text-xs text-gold-light"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        {book ? (
                          <Link
                            href={hrefFor('book', book.slug)}
                            className="font-display text-sm text-parchment transition-colors hover:text-gold-light"
                          >
                            {book.title}
                          </Link>
                        ) : (
                          <p className="font-display text-sm text-parchment">{step.bookId}</p>
                        )}
                        <p className="mt-1 text-xs leading-relaxed text-mist">{step.note}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}