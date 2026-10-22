import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, ScrollText } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about The Legend of Middle-earth, our editorial policy, and our sources.',
  alternates: { canonical: '/about' },
};

const links = [
  {
    href: '/about/sources',
    title: 'Sources',
    description: 'The works, editions and references that anchor the archive.',
    icon: BookOpen,
  },
  {
    href: '/about/editorial-policy',
    title: 'Editorial Policy',
    description: 'How we label continuity, handle uncertainty, and treat adaptations.',
    icon: FileText,
  },
  {
    href: '/search',
    title: 'Search the archive',
    description: 'Find characters, places, artifacts, events and themes.',
    icon: ScrollText,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'About' }]} />
      <SectionHeading
        eyebrow="About the archive"
        title="The Legend of Middle-earth"
        intro="An independent, source-referenced encyclopedia of Tolkien’s legendarium — written to keep canon, supplementary material, adaptations and interpretation clearly apart."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group panel flex flex-col gap-3 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon size={22} className="text-gold" />
              <div>
                <h3 className="font-display text-lg text-parchment group-hover:text-gold-light">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.description}</p>
              </div>
              <div className="mt-auto flex items-center gap-2 pt-2 text-sm text-gold-light">
                <span>Learn more</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
