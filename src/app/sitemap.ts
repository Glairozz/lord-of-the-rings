import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { characters } from '@/data/characters';
import { locations } from '@/data/locations';
import { artifacts } from '@/data/artifacts';
import { events } from '@/data/events';
import { books } from '@/data/books';
import { themes } from '@/data/themes';
import { peoples } from '@/data/peoples';

const monthly = 'monthly' as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/atlas', priority: 0.8 },
    { path: '/characters', priority: 0.8 },
    { path: '/locations', priority: 0.8 },
    { path: '/artifacts', priority: 0.8 },
    { path: '/history', priority: 0.8 },
    { path: '/library', priority: 0.8 },
    { path: '/themes', priority: 0.8 },
    { path: '/peoples', priority: 0.8 },
    { path: '/search', priority: 0.8 },
    { path: '/discussions', priority: 0.8 },
    { path: '/about/editorial-policy', priority: 0.8 },
    { path: '/about/sources', priority: 0.8 },
  ];

  const entityPaths = [
    ...characters.map((c) => `/characters/${c.slug}`),
    ...locations.map((l) => `/locations/${l.slug}`),
    ...artifacts.map((a) => `/artifacts/${a.slug}`),
    ...events.map((e) => `/history/${e.slug}`),
    ...books.map((b) => `/library/${b.slug}`),
    ...themes.map((t) => `/themes/${t.slug}`),
    ...peoples.map((p) => `/peoples/${p.slug}`),
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: r.path === '/' ? base : `${base}${r.path}`,
      changeFrequency: monthly,
      priority: r.priority,
    })),
    ...entityPaths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: monthly,
      priority: 0.6,
    })),
  ];
}