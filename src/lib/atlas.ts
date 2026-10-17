/**
 * Presentation model for the interactive Atlas.
 *
 * This module keeps *presentation* logic (map size, marker de-overlap,
 * clustering, geographic grouping, categories) out of the raw content data
 * (`src/data/locations.ts`). The coordinates in the data remain the single
 * source of truth; anything derived from them for the map lives here.
 */
import type { Location, LocationType } from '@/types/content';
import { locations, locationById } from '@/data/locations';

/* ------------------------------------------------------------------ */
/* Stage geometry                                                      */
/* ------------------------------------------------------------------ */

/** The atlas stage is drawn at this fixed size and scaled by `zoom`. */
export const MAP_W = 1000;
export const MAP_H = 1013; // source image is 2370×2401, near square

/** A location that can actually be placed on the shared atlas image. */
export type AtlasPlace = Location & { coordinates: { x: number; y: number } };

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type AtlasCategoryId = 'region' | 'settlement' | 'landmark';

export interface AtlasCategory {
  id: AtlasCategoryId;
  /** Plural label used for group headings and filter chips. */
  label: string;
  singular: string;
  description: string;
  /** A shape glyph so category is never communicated by colour alone. */
  glyph: string;
  /** Tailwind text-colour class for the glyph/marker. */
  tone: string;
}

export const atlasCategories: AtlasCategory[] = [
  {
    id: 'region',
    label: 'Regions & Realms',
    singular: 'Region or realm',
    description: 'Lands, kingdoms and territories.',
    glyph: '◆',
    tone: 'text-gold',
  },
  {
    id: 'settlement',
    label: 'Settlements & Strongholds',
    singular: 'Settlement or stronghold',
    description: 'Cities, towns, fortresses and towers.',
    glyph: '●',
    tone: 'text-emerald',
  },
  {
    id: 'landmark',
    label: 'Landmarks & Features',
    singular: 'Landmark',
    description: 'Forests, mountains, plains and other features.',
    glyph: '▲',
    tone: 'text-bronze',
  },
];

const CATEGORY_BY_TYPE: Record<LocationType, AtlasCategoryId> = {
  region: 'region',
  realm: 'region',
  kingdom: 'region',
  city: 'settlement',
  settlement: 'settlement',
  fortress: 'settlement',
  tower: 'settlement',
  forest: 'landmark',
  mountain: 'landmark',
  plain: 'landmark',
  water: 'landmark',
  landmark: 'landmark',
};

export function atlasCategoryOf(type: LocationType): AtlasCategoryId {
  return CATEGORY_BY_TYPE[type] ?? 'landmark';
}

export function atlasCategoryMeta(id: AtlasCategoryId): AtlasCategory {
  return atlasCategories.find((c) => c.id === id) ?? atlasCategories[2];
}

/** The category a location belongs to, in one call. */
export function atlasCategoryOfLocation(location: Location): AtlasCategory {
  return atlasCategoryMeta(atlasCategoryOf(location.type));
}

/** Category counts for a set of places, used by the legend. */
export function atlasCategoryCounts(places: Location[]): Record<AtlasCategoryId, number> {
  const counts: Record<AtlasCategoryId, number> = { region: 0, settlement: 0, landmark: 0 };
  for (const place of places) counts[atlasCategoryOf(place.type)] += 1;
  return counts;
}

/* ------------------------------------------------------------------ */
/* Geographic grouping                                                 */
/* ------------------------------------------------------------------ */

/**
 * Curated geographic regions used to group places for browsing.
 *
 * The `region` string stored on each entry is written for prose and is not
 * always a clean group name (e.g. "between the Misty Mountains and Anduin").
 * These labels are the canonical geographical groupings of the Westlands,
 * ordered west-to-east / north-to-south, and are used only for presentation.
 */
export const atlasRegionOrder = [
  'Eriador',
  'The North',
  'The Misty Mountains',
  'The Vales of Anduin',
  'Rhovanion',
  'Rohan',
  'Gondor',
  'Mordor',
  'The Great Sea',
  'Beleriand',
  'Other',
] as const;

const REGION_BY_LOCATION: Record<string, string> = {
  'the-shire': 'Eriador',
  bree: 'Eriador',
  rivendell: 'Eriador',
  weathertop: 'Eriador',
  'grey-havens': 'Eriador',
  'old-forest': 'Eriador',
  trollshaws: 'Eriador',
  angmar: 'The North',
  moria: 'The Misty Mountains',
  lothlorien: 'The Vales of Anduin',
  fangorn: 'The Vales of Anduin',
  mirkwood: 'Rhovanion',
  'dol-guldur': 'Rhovanion',
  erebor: 'Rhovanion',
  'lake-town': 'Rhovanion',
  isengard: 'Rohan',
  rohan: 'Rohan',
  edoras: 'Rohan',
  'helms-deep': 'Rohan',
  gondor: 'Gondor',
  'minas-tirith': 'Gondor',
  osgiliath: 'Gondor',
  ithilien: 'Gondor',
  'pelennor-fields': 'Gondor',
  'paths-of-the-dead': 'Gondor',
  mordor: 'Mordor',
  'barad-dur': 'Mordor',
  'mount-doom': 'Mordor',
  'minas-ithil': 'Mordor',
  numenor: 'The Great Sea',
  gondolin: 'Beleriand',
  doriath: 'Beleriand',
};

export function atlasRegionOf(location: Location): string {
  return REGION_BY_LOCATION[location.id] ?? 'Other';
}

export interface AtlasRegionGroup {
  region: string;
  places: Location[];
}

/** Group places by their canonical region, in west-to-east order. */
export function groupByRegion(places: Location[]): AtlasRegionGroup[] {
  const groups = new Map<string, Location[]>();
  for (const place of places) {
    const region = atlasRegionOf(place);
    const list = groups.get(region);
    if (list) list.push(place);
    else groups.set(region, [place]);
  }
  return atlasRegionOrder
    .filter((region) => groups.has(region))
    .map((region) => ({ region, places: groups.get(region) as Location[] }));
}

/**
 * Places of especially high narrative weight, derived from the data itself:
 * a place that is the setting of two or more recorded events. Used as a
 * browse filter, never as a replacement for the geographical grouping.
 */
export function isKeyPlace(location: Location): boolean {
  return (location.eventIds?.length ?? 0) >= 2;
}

/* ------------------------------------------------------------------ */
/* Layers                                                              */
/* ------------------------------------------------------------------ */

/** Places the Third-Age image can honestly hold. */
export const atlasPlaces: AtlasPlace[] = locations.filter(
  (l): l is AtlasPlace => l.mapLayer === 'third-age' && l.coordinates !== undefined,
);

/** Places documented as text entries because the image cannot hold them. */
export const atlasOffMap = locations.filter(
  (l) => !(l.mapLayer === 'third-age' && l.coordinates !== undefined),
);

export const atlasSecondAge = atlasOffMap.filter((l) => l.mapLayer === 'second-age');

/** Quick lookup of the on-map places by id. */
export const atlasPlaceById = new Map(atlasPlaces.map((place) => [place.id, place]));

/**
 * Resolve a place's related locations to real entries. Only ids that exist are
 * returned, so a stale reference can never produce a broken link.
 */
export function relatedLocations(location: Location): Location[] {
  const ids = location.relatedIds ?? [];
  const seen = new Set<string>();
  const out: Location[] = [];
  for (const id of ids) {
    if (id === location.id || seen.has(id)) continue;
    const related = locationById.get(id);
    if (related) {
      seen.add(id);
      out.push(related);
    }
  }
  return out;
}

/** Does a place match a free-text atlas query? */
export function matchesAtlasQuery(location: Location, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    location.name,
    ...(location.aliases ?? []),
    location.region ?? '',
    location.type,
    location.summary,
  ]
    .join(' ')
    .toLowerCase();
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

/* ------------------------------------------------------------------ */
/* Marker layout                                                       */
/* ------------------------------------------------------------------ */

export interface AtlasMarker {
  location: AtlasPlace;
  /** Percentage position on the atlas image, as actually rendered. */
  x: number;
  y: number;
}

/** Are two raw data points effectively on top of one another? */
const DUP_EPSILON = 0.75; // percent of the image

/**
 * Produce renderable marker positions.
 *
 * Two entries in the data share the same coordinate (the realm of Gondor and
 * its capital, Minas Tirith). Left alone, one marker would sit invisibly on
 * top of the other and could never be selected. Coincident markers are
 * therefore pushed apart by a small, deterministic offset — a fraction of a
 * percent of the image, far smaller than any real distance between two
 * distinct places, so geography is preserved while every marker stays
 * clickable.
 */
export function resolveMarkers(places: AtlasPlace[]): AtlasMarker[] {
  const placed: AtlasMarker[] = [];
  for (const location of places) {
    let x = location.coordinates.x;
    let y = location.coordinates.y;
    let attempt = 0;
    while (placed.some((m) => Math.hypot(m.x - x, m.y - y) < DUP_EPSILON) && attempt < 12) {
      attempt += 1;
      const angle = attempt * 2.399963; // golden angle, in radians
      const radius = DUP_EPSILON * (1 + attempt * 0.55);
      x = location.coordinates.x + Math.cos(angle) * radius;
      y = location.coordinates.y + Math.sin(angle) * radius;
    }
    placed.push({ location, x, y });
  }
  return placed;
}

/* ------------------------------------------------------------------ */
/* Clustering                                                          */
/* ------------------------------------------------------------------ */

export interface AtlasCluster {
  id: string;
  x: number;
  y: number;
  markers: AtlasMarker[];
}

/** Distance in stage pixels between two markers. */
function stageDistance(a: AtlasMarker, b: AtlasMarker): number {
  const dx = ((a.x - b.x) / 100) * MAP_W;
  const dy = ((a.y - b.y) / 100) * MAP_H;
  return Math.hypot(dx, dy);
}

/**
 * Group markers that would overlap on screen at the current zoom into
 * clickable clusters. `minScreenDistance` is in screen pixels and is
 * converted to stage pixels using the zoom factor.
 */
export function clusterMarkers(
  markers: AtlasMarker[],
  zoom: number,
  minScreenDistance = 30,
): AtlasCluster[] {
  const safeZoom = Math.max(zoom, 0.05);
  const threshold = minScreenDistance / safeZoom;
  const clusters: AtlasCluster[] = [];

  for (const marker of markers) {
    let best: AtlasCluster | null = null;
    let bestDist = threshold;
    for (const cluster of clusters) {
      const dist = stageDistance(marker, { location: marker.location, x: cluster.x, y: cluster.y });
      if (dist < bestDist) {
        bestDist = dist;
        best = cluster;
      }
    }
    if (best) {
      best.markers.push(marker);
      best.x = best.markers.reduce((sum, m) => sum + m.x, 0) / best.markers.length;
      best.y = best.markers.reduce((sum, m) => sum + m.y, 0) / best.markers.length;
    } else {
      clusters.push({ id: marker.location.id, x: marker.x, y: marker.y, markers: [marker] });
    }
  }

  return clusters;
}
