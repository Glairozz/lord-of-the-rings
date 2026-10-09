import type { Metadata } from 'next';
import type { Continuity } from '@/types/content';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { Prose, Callout, InlineLink } from '@/components/ui/blocks';
import ContinuityBadge from '@/components/ui/ContinuityBadge';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How The Legend of Middle-earth is written: continuity labels, source anchoring, dates and uncertainty, adaptations, community standards and corrections.',
  alternates: { canonical: '/about/editorial-policy' },
};

const continuityOrder: Continuity[] = ['tolkien-texts', 'supplementary', 'adaptation', 'interpretation'];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />
      <SectionHeading
        eyebrow="About the archive"
        title="Editorial Policy"
        intro="How this encyclopedia is written, labelled, sourced and corrected — so readers can always tell Tolkien’s own words, later writings, adaptations and our analysis apart."
      />

      <div className="mt-6">
        <Callout title="Fan project — independent of rights holders.">
          This site is an independent, non-commercial fan encyclopedia written in our own words. It
          is not affiliated with, endorsed by, or connected to the Tolkien Estate, Middle-earth
          Enterprises, Amazon, Warner Bros., New Line Cinema, or any other rights holder.
        </Callout>
      </div>

      <div className="mt-14 space-y-14">
        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">What this site is</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`The Legend of Middle-earth is a living atlas and archive of Tolkien’s legendarium: an encyclopedia of characters, places, artifacts, events, books, themes and peoples, written so that every claim can be checked.

It is a fan project through and through. Nothing here is produced for commercial gain, and nothing here pretends to speak for Tolkien or for the estates and studios that hold the rights to his work. Our role is collector and commentator: we gather the recorded lore, mark where it comes from, and label clearly when we are interpreting rather than reporting.

Where the record is silent, contradictory, or unfinished — and the legendarium is all three, often — we say so instead of papering over it. An encyclopedia that pretends to certainty where none exists would fail its readers.`} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Continuity labels</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`Every entry carries a continuity label that tells you, at a glance, how far the material is Tolkien’s own. The labels are not a ranking — later writings and adaptations are studied seriously here — but the distinction must never blur.`} />
          <ul className="mt-4 space-y-3">
            {continuityOrder.map((c) => (
              <li key={c} className="panel-soft p-5">
                <ContinuityBadge continuity={c} withDescription />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Sources</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`Substantial claims are anchored to source records. Each of those records — a primary text, a posthumously published writing, an adaptation, a reference work — is listed in the source registry so a reader can follow any claim back to the work it rests on.`} />
          <p className="mt-4 text-sm leading-relaxed text-parchment-2">
            The full registry is on the{' '}
            <InlineLink href="/about/sources">Sources</InlineLink> page.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-parchment-2">
            Interpretations are offered throughout the archive — in the themes, in analysis, in
            article prose — but they are always labelled as interpretation, and they are never
            presented as canon.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Dates &amp; uncertainty</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`Tolkien’s history is told in more than one calendar. The Years of the Trees precede the reckoning of the First, Second, Third and Fourth Ages, and the sources do not always agree — about a date, a lineage, or even which of two accounts Tolkien finally preferred.

Every dated entry therefore carries its certainty alongside it: exact, approximate, disputed or unknown, with the competing accounts noted where they exist. When we say “S.A. 3319” we also say why that date is accepted, and when the texts disagree we record the disagreement rather than quietly picking a side.`} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Adaptations</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`Films and television series are studied here as adaptations: works about Tolkien, made by other hands, with their own strengths and their own departures. Entries drawn from them are labelled with the Adaptation continuity badge.

Characters invented for the screen are called out as such and are never presented as Tolkien’s own. Tauriel and Alfrid come from the Hobbit films, Arondir from The Rings of Power, Lurtz from the Lord of the Rings films — each is a notable figure in its production, and none of them is a character from the books.`} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Community</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`The Discussion Hall is our own community layer, distinct from the encyclopedia. Where the archive states, the Hall asks and debates.

Posts in the Hall are tagged by what kind of claim they make: canon, evidence, interpretation, opinion, adaptation or speculation — so a theory never masquerades as a quotation. Posted claims can carry source references, and we do not fabricate or misquote: any quoted text is attributed to the work it comes from. Disputes are resolved by reference to the record, not by authority of the loudest voice.`} />
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl text-parchment">Corrections</h2>
          <div className="rule-gold mb-6" />
          <Prose text={`An encyclopedia this size will carry errors. When you find one, the most useful thing you can do is report it through the project’s issue tracker — the preferred route, since each entry lists the sources it relies on, and a correction that points at the record is a correction we can verify and keep.

There is no dedicated contact address published here; use the issue tracker instead so corrections stay public and traceable.`} />
        </section>
      </div>
    </div>
  );
}