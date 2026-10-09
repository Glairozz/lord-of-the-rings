import type { Metadata } from 'next';
import { ages } from '@/data/sources';
import { chronologicalEvents } from '@/data/events';
import { historyImages } from '@/data/images';
import EventTimeline from '@/components/timeline/EventTimeline';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import LoreImage from '@/components/ui/LoreImage';

export const metadata: Metadata = {
  title: 'The History of Arda',
  description:
    'A chronology of the Ages of Arda — creation, wars, kingdoms and turning points — with dates, certainty and continuity labels attached to every event.',
  alternates: { canonical: '/history' },
};

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'History' }]} />
      <SectionHeading
        eyebrow="Chronology"
        title="The History of Arda"
        intro="Tolkien used several calendars across the Ages — the Years of the Trees, Valian Years, and the reckonings of the Eldar and the Dúnedain — and he revised dates between drafts. Every event below therefore carries a display date, a certainty label, and, where sources disagree, a note on the discrepancy. Continuity labels mark whether an account comes from Tolkien’s own texts, posthumously published writings, or an adaptation."
      />

      <div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-xl border border-border">
        <LoreImage
          src={historyImages.historyOfArda}
          alt="A view of the history of Arda across the ages"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" aria-hidden />
      </div>

      <section aria-label="The Ages of Arda" className="mb-12">
        <h2 className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-gold">The Ages of Arda</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ages.map((age) => (
            <div key={age.id} className="panel p-4">
              <h3 className="font-display text-sm text-parchment">{age.name}</h3>
              <p className="mt-1 font-display text-[11px] uppercase tracking-wider text-gold">{age.span}</p>
              <p className="mt-2 text-xs leading-relaxed text-mist">{age.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <EventTimeline events={chronologicalEvents} ages={ages} />
    </div>
  );
}