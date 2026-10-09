import type { Metadata } from 'next';
import { themes } from '@/data/themes';
import Directory from '@/components/directory/Directory';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import { item, baseFacets, continuityFacet } from '@/lib/pages';

export const metadata: Metadata = {
  title: 'Themes & Analysis',
  description:
    'Reasoned readings of Tolkien’s legendarium. Every theme states a thesis, gathers the textual evidence that supports it, and records the strongest competing interpretations.',
  alternates: { canonical: '/themes' },
};

export default function ThemesPage() {
  const items = themes.map((t) =>
    item(
      'theme',
      t,
      baseFacets(t.continuity),
      [...(t.tags ?? []), t.question].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Themes' }]} />
      <SectionHeading
        eyebrow="Lore archive"
        title="Themes & Analysis"
        intro="Every theme here is labelled interpretation. Each entry states a thesis, gathers the textual evidence that supports it, and then records the strongest competing readings. None is presented as Tolkien’s own settled verdict."
      />
      <Directory
        items={items}
        searchPlaceholder="Search by theme, question or tag…"
        facets={[continuityFacet]}
        pageSize={12}
      />
    </div>
  );
}