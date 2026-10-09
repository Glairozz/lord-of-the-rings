import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Gem,
  Map as MapIcon,
  MessageSquare,
  Quote,
  ScrollText,
  Sparkles,
  Users,
} from 'lucide-react';
import { characters } from '@/data/characters';
import { locations } from '@/data/locations';
import { artifacts } from '@/data/artifacts';
import { chronologicalEvents } from '@/data/events';
import { themes } from '@/data/themes';
import { peoples } from '@/data/peoples';
import { mapImages } from '@/data/images';
import { hrefFor } from '@/lib/content';
import { toRef } from '@/lib/pages';
import { siteConfig } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import EntityCard from '@/components/ui/EntityCard';
import LoreImage from '@/components/ui/LoreImage';

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — A Tolkien Encyclopedia & Atlas` },
  description: siteConfig.description,
  alternates: { canonical: '/' },
};

const archiveLinks = [
  { label: 'Characters', href: '/characters', icon: Users, description: 'Profiles, lineages and deeds' },
  { label: 'Locations', href: '/locations', icon: Compass, description: 'Regions, cities and landmarks' },
  { label: 'Artifacts', href: '/artifacts', icon: Gem, description: 'Rings, weapons and jewels' },
  { label: 'History', href: '/history', icon: ScrollText, description: 'Ages, wars and turning points' },
  { label: 'Library', href: '/library', icon: BookOpen, description: 'Works, volumes and adaptations' },
  { label: 'Themes & Analysis', href: '/themes', icon: Quote, description: 'Literary questions and essays' },
  { label: 'Peoples', href: '/peoples', icon: Sparkles, description: 'Races, kingdoms and factions' },
];

const featuredCharacterIds = ['frodo', 'galadriel', 'aragorn', 'gollum', 'sauron', 'samwise'];

export default function HomePage() {
  const featuredCharacters = featuredCharacterIds
    .map((id) => characters.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const atlasLocations = locations
    .filter((l) => l.mapLayer === 'third-age' && l.coordinates)
    .slice(0, 6);

  const timelinePreview = chronologicalEvents
    .filter((e) => e.date.age === 'third-age')
    .slice(0, 6);

  const featuredThemes = themes.slice(0, 3);

  const stats = [
    { label: 'Characters', value: characters.length },
    { label: 'Places', value: locations.length },
    { label: 'Artifacts', value: artifacts.length },
    { label: 'Recorded events', value: chronologicalEvents.length },
    { label: 'Peoples & realms', value: peoples.length },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0" aria-hidden>
          <LoreImage
            src={mapImages.middleEarth}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/80 to-night" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="mb-4 font-display text-xs uppercase tracking-[0.35em] text-gold">
            A living atlas &amp; archive
          </p>
          <h1 className="max-w-4xl font-display text-4xl leading-tight text-parchment md:text-6xl">
            The Legend of <span className="gold-text">Middle-earth</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment-2">
            An independent, source-referenced encyclopedia of Tolkien&rsquo;s legendarium — the
            characters, places, artifacts and ages of Arda, gathered with their origins and
            uncertainties stated plainly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/atlas"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-sm text-ink transition-colors hover:bg-gold-light"
            >
              <MapIcon size={16} />
              Enter the Atlas
            </Link>
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-display text-sm text-parchment transition-colors hover:border-gold hover:text-gold-light"
            >
              Browse Characters
              <ArrowRight size={16} />
            </Link>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xs uppercase tracking-wider text-gold">{s.label}</dt>
                <dd className="mt-1 font-display text-2xl text-parchment">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Archives */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="The Archive"
          title="Seven ways into the legendarium"
          intro="Every entry is written in our own words and anchored to the works it comes from. Where Tolkien left a matter open, we say so."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {archiveLinks.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="panel group flex flex-col gap-3 p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <Icon size={22} className="text-gold" />
                <span className="font-display text-base text-parchment group-hover:text-gold-light">
                  {a.label}
                </span>
                <span className="text-sm text-mist">{a.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Atlas teaser */}
      <section className="border-y border-border bg-night-2/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <LoreImage
              src={mapImages.middleEarth}
              alt="Map of Middle-earth"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
          </div>
          <div>
            <p className="mb-2 font-display text-xs uppercase tracking-[0.3em] text-gold">Interactive Atlas</p>
            <h2 className="font-display text-3xl text-parchment">Walk the map of Middle-earth</h2>
            <div className="rule-gold my-5" />
            <p className="leading-relaxed text-parchment-2">
              Pan and zoom across the Westlands, from the Shire to the Black Gate. Every marker
              opens a source-referenced entry, and ages that do not share a geography — above all
              First-Age Beleriand — are kept on separate layers rather than forced onto one map.
            </p>
            <ul className="mt-6 space-y-2">
              {atlasLocations.map((l) => (
                <li key={l.id}>
                  <Link
                    href={hrefFor('location', l.slug)}
                    className="inline-flex items-center gap-2 text-sm text-parchment-2 transition-colors hover:text-gold-light"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                    {l.name}
                    <span className="text-mist">· {l.region}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/atlas"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 font-display text-sm text-gold-light transition-colors hover:bg-gold/10"
            >
              Open the full atlas
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured characters */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Figures of note"
          title="Characters that shaped the tale"
          action={
            <Link href="/characters" className="text-sm text-gold-light hover:text-parchment">
              All characters →
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {featuredCharacters.map((c) => (
            <EntityCard key={c.id} entity={toRef('character', c)} />
          ))}
        </div>
      </section>

      {/* Timeline teaser */}
      <section className="border-y border-border bg-night-2/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading
            eyebrow="The History of Arda"
            title="From the making of the world to the end of the Age"
            action={
              <Link href="/history" className="text-sm text-gold-light hover:text-parchment">
                Full chronology →
              </Link>
            }
          />
          <ol className="relative border-l border-border pl-6">
            {timelinePreview.map((e) => (
              <li key={e.id} className="mb-7 last:mb-0">
                <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border border-gold bg-night" aria-hidden />
                <p className="font-display text-xs uppercase tracking-wider text-gold">{e.date.display}</p>
                <Link
                  href={hrefFor('event', e.slug)}
                  className="mt-1 block font-display text-lg text-parchment transition-colors hover:text-gold-light"
                >
                  {e.name}
                </Link>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-mist">{e.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Themes */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          eyebrow="Themes &amp; analysis"
          title="Questions the legendarium keeps asking"
          intro="Each theme states a thesis, gathers textual evidence and then records the strongest competing readings. Interpretation is labelled as interpretation."
          action={
            <Link href="/themes" className="text-sm text-gold-light hover:text-parchment">
              All themes →
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {featuredThemes.map((t) => (
            <Link
              key={t.id}
              href={hrefFor('theme', t.slug)}
              className="panel group flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <Quote size={20} className="mb-3 text-gold" />
              <h3 className="font-display text-lg text-parchment group-hover:text-gold-light">{t.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{t.summary}</p>
              <p className="mt-4 font-display text-xs uppercase tracking-wider text-gold">
                {t.question}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="border-t border-border bg-night-2/60">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="panel flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.3em] text-gold">
                <MessageSquare size={14} /> The Discussion Hall
              </p>
              <h2 className="font-display text-2xl text-parchment">Debate the lore, not the facts</h2>
              <p className="mt-3 leading-relaxed text-parchment-2">
                A community space where every claim can carry a source. Posts are tagged as canon,
                evidence, interpretation, opinion, adaptation or speculation — so a theory never
                masquerades as a quotation.
              </p>
            </div>
            <Link
              href="/discussions"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-sm text-ink transition-colors hover:bg-gold-light"
            >
              Visit the Hall
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
