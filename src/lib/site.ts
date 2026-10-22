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
      { label: 'Home', href: '/', description: 'Return to the gateway', icon: 'home' },
      { label: 'The Atlas', href: '/atlas', description: 'Interactive map of Middle-earth', icon: 'map' },
      { label: 'Locations', href: '/locations', description: 'Regions, cities and landmarks', icon: 'mountain' },
    ],
  },
  {
    label: 'Characters',
    items: [
      { label: 'Characters', href: '/characters', description: 'Profiles, lineages and deeds', icon: 'users' },
      { label: 'Races & Creatures', href: '/races', description: 'Browse by kind and creature type', icon: 'trees' },
      { label: 'Peoples & Cultures', href: '/peoples', description: 'Races, kingdoms and factions', icon: 'flag' },
    ],
  },
  {
    label: 'Lore',
    items: [
      { label: 'Artifacts', href: '/artifacts', description: 'Rings, weapons and jewels', icon: 'gem' },
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
    label: 'About',
    items: [
      { label: 'About', href: '/about', description: 'The archive and its aims', icon: 'info' },
      { label: 'Editorial Policy', href: '/about/editorial-policy', description: 'Sources, continuity and corrections', icon: 'file' },
      { label: 'Sources', href: '/about/sources', description: 'Works cited', icon: 'book' },
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
    { label: 'Home', href: '/' },
    { label: 'Atlas', href: '/atlas' },
    { label: 'Locations', href: '/locations' },
    { label: 'Characters', href: '/characters' },
    { label: 'Races & Creatures', href: '/races' },
  ],
  study: [
    { label: 'Peoples & Cultures', href: '/peoples' },
    { label: 'History of Arda', href: '/history' },
    { label: 'Artifacts', href: '/artifacts' },
    { label: 'Books & Adaptations', href: '/library' },
    { label: 'Themes', href: '/themes' },
  ],
  about: [
    { label: 'About', href: '/about' },
    { label: 'Discussion Hall', href: '/discussions' },
    { label: 'Search', href: '/search' },
    { label: 'Editorial Policy', href: '/about/editorial-policy' },
    { label: 'Sources', href: '/about/sources' },
  ],
};
