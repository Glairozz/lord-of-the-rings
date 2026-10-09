export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items: NavItem[];
}

/** Primary navigation. Kept compact; secondary sections live in dropdowns. */
export const navGroups: NavGroup[] = [
  {
    label: 'Explore',
    items: [
      { label: 'The Atlas', href: '/atlas', description: 'Interactive map of Middle-earth', icon: 'map' },
      { label: 'Locations', href: '/locations', description: 'Regions, cities and landmarks', icon: 'mountain' },
    ],
  },
  {
    label: 'Lore Archives',
    items: [
      { label: 'Characters', href: '/characters', description: 'Profiles, lineages and deeds', icon: 'users' },
      { label: 'Peoples & Cultures', href: '/peoples', description: 'Races, kingdoms and factions', icon: 'flag' },
      { label: 'Artifacts', href: '/artifacts', description: 'Rings, weapons and jewels', icon: 'gem' },
    ],
  },
  {
    label: 'History',
    items: [
      { label: 'The History of Arda', href: '/history', description: 'Ages, wars and turning points', icon: 'scroll' },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Books', href: '/library', description: 'Works, volumes and adaptations', icon: 'book' },
      { label: 'Themes & Analysis', href: '/themes', description: 'Literary questions and essays', icon: 'quote' },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Discussion Hall', href: '/discussions', description: 'Theories, debates and questions', icon: 'message' },
    ],
  },
];

export const siteConfig = {
  name: 'The Legend of Middle-earth',
  shortName: 'Middle-earth',
  tagline: 'A living atlas and archive of Tolkien’s legendarium.',
  description:
    'An independent, source-referenced encyclopedia of Middle-earth: characters, places, artifacts, history, books and literary analysis.',
  url: 'https://the-legend-of-middle-earth.vercel.app',
};

export const footerLinks = {
  explore: [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Locations', href: '/locations' },
    { label: 'Characters', href: '/characters' },
    { label: 'Peoples', href: '/peoples' },
  ],
  study: [
    { label: 'History of Arda', href: '/history' },
    { label: 'Artifacts', href: '/artifacts' },
    { label: 'Books & Adaptations', href: '/library' },
    { label: 'Themes', href: '/themes' },
  ],
  about: [
    { label: 'Discussion Hall', href: '/discussions' },
    { label: 'Search', href: '/search' },
    { label: 'Editorial Policy', href: '/about/editorial-policy' },
    { label: 'Sources', href: '/about/sources' },
  ],
};
