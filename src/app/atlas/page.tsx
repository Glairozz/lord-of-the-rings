import type { Metadata } from 'next';
import AtlasExplorer from '@/components/atlas/AtlasExplorer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { Callout, InlineLink } from '@/components/ui/blocks';

export const metadata: Metadata = {
  title: 'The Atlas of Middle-earth',
  description:
    'An interactive map of the Westlands in the late Third Age. Pan and zoom across Middle-earth, explore the places of The Hobbit and The Lord of the Rings, and find the lands of earlier Ages documented as text entries.',
  alternates: { canonical: '/atlas' },
};

const readingNotes = [
  {
    title: 'Approximate positions',
    body: 'Each marker sits at percentage coordinates on the atlas image, placed for orientation rather than cartographic precision. Realms and regions cover more ground than a single point can show, and a few places deliberately share a broad location (Minas Tirith stands within Gondor). Marker size carries no meaning.',
  },
  {
    title: 'One Age, one geography',
    body: 'The image reflects the Westlands of the late Third Age. Beleriand was drowned at the end of the First Age and Númenor sank beneath the Sea in the Second, so places of those Ages are documented as text entries rather than dropped onto this map.',
  },
  {
    title: 'Continuity labels',
    body: 'Every place carries an Age, and the archive records where each entry comes from — Tolkien’s published texts or supplementary writings. The atlas deliberately does not blur the geographies of different Ages into a single image.',
  },
];

export default function AtlasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'The Atlas' }]} />
      <SectionHeading
        eyebrow="Interactive map"
        title="The Atlas of Middle-earth"
        intro="Pan and zoom across the Westlands. Marker positions are approximate and the map reflects the geography of the late Third Age."
      />
      <Callout title="A map of the Third Age">
        <p>
          This atlas shows the Westlands as they stood in the late Third Age, so the lands of
          earlier Ages cannot sit on it: Beleriand was drowned at the end of the First Age and
          Númenor sank beneath the Sea in the Second. Those places are documented as text entries
          in the archive — <InlineLink href="/locations">browse all locations</InlineLink>.
        </p>
      </Callout>
      <div className="mt-6">
        <AtlasExplorer />
      </div>
      <section aria-labelledby="reading-the-map" className="mt-12">
        <SectionHeading
          as="h2"
          id="reading-the-map"
          title="Reading the map"
          intro="How to read what the atlas shows — and what it deliberately leaves off."
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {readingNotes.map((note) => (
            <li key={note.title} className="panel p-5">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold">
                {note.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-parchment-2">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}