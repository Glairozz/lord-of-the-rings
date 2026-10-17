/**
 * Shared definition of the first-run experience: the cinematic loading screen,
 * the welcome card and the "how to explore" tutorial.
 *
 * The steps and copy live here so the loading screen, welcome card and tutorial
 * dialog all read from one source. Presentation stays in the components.
 */
import { FALLBACK_IMAGE, locationImages, mapImages } from '@/data/images';

/** Set once the first-run loading + welcome sequence has been dismissed. */
export const INTRO_COMPLETE_KEY = 'lome-intro-complete';

/** Set once the tutorial has been finished or skipped. */
export const TUTORIAL_COMPLETE_KEY = 'lome-tutorial-complete';

export type TutorialIcon = 'map' | 'compass' | 'search' | 'book' | 'sliders' | 'flag';

export interface TutorialStep {
  id: string;
  /** Short label for the progress rail. */
  label: string;
  title: string;
  body: string;
  /** Optional concrete tip shown beneath the body. */
  tip?: string;
  icon: TutorialIcon;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'explore-the-map',
    label: 'Explore the Map',
    title: 'Explore the Map',
    body: 'The atlas is a living map of the Westlands. Drag with the mouse, or swipe with a finger, to pan. Scroll or pinch to zoom, or use the zoom buttons beside the map.',
    tip: 'Nothing is hidden — every control is labelled and reachable by keyboard.',
    icon: 'map',
  },
  {
    id: 'discover-locations',
    label: 'Discover Locations',
    title: 'Discover Locations',
    body: 'Each marker is a place from the legendarium. Select a marker to open its entry: a short description, its history and significance, related places and its approximate position.',
    tip: 'Marker shapes tell places apart — diamonds for regions, circles for strongholds, triangles for landmarks.',
    icon: 'compass',
  },
  {
    id: 'find-places',
    label: 'Find Places',
    title: 'Find Places',
    body: 'Use the search box to find a place by name, alternate name or region. Matching markers light up on the map, and pressing Enter flies to the closest match.',
    tip: 'The list beside the map is grouped by region, from Eriador in the west to Mordor in the east.',
    icon: 'search',
  },
  {
    id: 'learn-about-middle-earth',
    label: 'Learn About Middle-earth',
    title: 'Learn About Middle-earth',
    body: 'Entries state their sources and their continuity — what comes from Tolkien’s published texts, what from his posthumous writings. Explanations are kept separate from the stories themselves.',
    tip: 'Open any entry in full to read its geography, history, inhabitants and connections.',
    icon: 'book',
  },
  {
    id: 'navigate-the-interface',
    label: 'Navigate the Interface',
    title: 'Navigate the Interface',
    body: 'Filter the atlas by kind of place or by region, highlight the places most central to the tale, reset the view, or expand the map to fill the screen. On a phone the place list collapses so the map stays large.',
    tip: 'Use the “How to explore” button in the header any time to reopen this guide.',
    icon: 'sliders',
  },
  {
    id: 'start-exploring',
    label: 'Start Exploring',
    title: 'Start Exploring',
    body: 'That is everything you need. The map is yours — wander from the Shire to the Black Gate, and open whatever catches your eye.',
    tip: 'You can change the map’s reading theme with the sun/moon button in the header.',
    icon: 'flag',
  },
];

export const TUTORIAL_STEP_COUNT = tutorialSteps.length;

/**
 * A small set of images worth warming before the map appears: the atlas itself
 * plus the fallback placeholder. The map is the one asset the atlas cannot open
 * without, so it is loaded first. Everything else is allowed to stream in.
 */
export const preloadAssets: string[] = [
  mapImages.middleEarth,
  FALLBACK_IMAGE,
  locationImages.theShire,
  locationImages.rivendell,
  locationImages.minasTirith,
];

/** Resolve a single image, never rejecting — a failure must not block the journey. */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    const img = new window.Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    // Already-cached images can complete before the handlers attach.
    if (img.complete) finish();
  });
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function readFlag(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeFlag(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, '1');
  } catch {
    /* storage can be unavailable (private mode); the experience still works */
  }
}

export function hasCompletedIntro(): boolean {
  return readFlag(INTRO_COMPLETE_KEY);
}

export function markIntroComplete(): void {
  writeFlag(INTRO_COMPLETE_KEY);
}

export function hasCompletedTutorial(): boolean {
  return readFlag(TUTORIAL_COMPLETE_KEY);
}

export function markTutorialComplete(): void {
  writeFlag(TUTORIAL_COMPLETE_KEY);
}
