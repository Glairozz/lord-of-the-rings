/**
 * Shared content types for The Legend of Middle-earth encyclopedia.
 *
 * These types are the contract between the structured content data
 * (`src/data/*`) and the presentation layer (`src/components/*`, `src/app/*`).
 *
 * Design principles:
 *  - Every entity has a stable `id`, a `slug`, a canonical `name`, a short
 *    `summary`, source references and a continuity label.
 *  - Relationships are typed objects, not bare id lists.
 *  - Dates are structured so different Ages, calendars and uncertainty can be
 *    represented honestly.
 */

/** Where a piece of information comes from. Never present interpretation as canon. */
export type Continuity =
  | 'tolkien-texts' // published by Tolkien in his lifetime (The Hobbit, LOTR, etc.)
  | 'supplementary' // posthumously published writings, notes, drafts, appendices
  | 'adaptation' // films, television, radio, games
  | 'interpretation'; // reasoned reader analysis, not authorial statement

export type AgeId = 'before-ages' | 'first-age' | 'second-age' | 'third-age' | 'fourth-age';

export interface Age {
  id: AgeId;
  name: string;
  summary: string;
  /** Human-readable span, e.g. "Years of the Trees / First Age". */
  span: string;
}

export type DateCertainty = 'exact' | 'approximate' | 'disputed' | 'unknown';

export interface TimelineDate {
  /** Sortable numeric key. Years relative to the start of the Age when possible. */
  sort: number;
  age: AgeId;
  /** Display string, e.g. "T.A. 3019 · 15 March". */
  display: string;
  certainty: DateCertainty;
  /** Notes on calendars, competing accounts or uncertainty. */
  note?: string;
}

/** A citation into a source work. */
export interface SourceRef {
  id: string;
  label: string;
  detail?: string;
}

export interface Source extends SourceRef {
  /** Short type used for filters and chips. */
  kind:
    | 'primary-text'
    | 'supplementary'
    | 'appendix'
    | 'adaptation'
    | 'reference'
    | 'web';
  author?: string;
  year?: string;
  note?: string;
}

/** A named section of long-form prose. */
export interface Section {
  heading: string;
  body: string;
}

export interface Quote {
  text: string;
  citation: string;
}

export type RelationType =
  | 'parent'
  | 'child'
  | 'spouse'
  | 'sibling'
  | 'grandparent'
  | 'grandchild'
  | 'ancestor'
  | 'descendant'
  | 'ally'
  | 'rival'
  | 'enemy'
  | 'mentor'
  | 'student'
  | 'member'
  | 'ruler'
  | 'founder'
  | 'owner'
  | 'servant'
  | 'friend'
  | 'relative';

export interface Relation {
  targetId: string;
  type: RelationType;
  note?: string;
}

export interface Appearance {
  bookId: string;
  detail: string;
}

export interface BaseEntity {
  id: string;
  slug: string;
  name: string;
  aliases?: string[];
  summary: string;
  image?: string;
  sourceIds: string[];
  continuity: Continuity;
  tags?: string[];
}

/* ------------------------------------------------------------------ */
/* Characters                                                          */
/* ------------------------------------------------------------------ */

export interface Character extends BaseEntity {
  /** People / race identifier, e.g. "hobbits", "dunedain". */
  race: string;
  peopleId?: string;
  gender?: string;
  titles?: string[];
  languages?: string[];
  /** Compelling introduction explaining why the character matters. */
  overview: string;
  /** Chronologically ordered life story, rendered as sections. */
  biography?: Section[];
  ancestry?: string;
  personality?: string[];
  motivations?: string[];
  fears?: string[];
  abilities?: string[];
  limitations?: string[];
  deeds?: string[];
  relationships?: Relation[];
  development?: string;
  appearances?: Appearance[];
  adaptations?: string[];
  quotes?: Quote[];
  birthDate?: string;
  deathDate?: string;
  locationIds?: string[];
  eventIds?: string[];
  artifactIds?: string[];
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export type LocationType =
  | 'region'
  | 'realm'
  | 'city'
  | 'kingdom'
  | 'fortress'
  | 'settlement'
  | 'forest'
  | 'mountain'
  | 'tower'
  | 'plain'
  | 'water'
  | 'landmark';

export interface Location extends BaseEntity {
  type: LocationType;
  region?: string;
  /** Primary historical age for the place, if one dominates. */
  age?: AgeId;
  /** Which atlas layer the place belongs to (geography changes by Age). */
  mapLayer?: string;
  coordinates?: { x: number; y: number };
  geography: string;
  history: string;
  inhabitants?: string;
  significance?: string;
  connections?: string;
  eventIds?: string[];
  characterIds?: string[];
  relatedIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Artifacts                                                           */
/* ------------------------------------------------------------------ */

export type ArtifactType = 'ring' | 'weapon' | 'jewel' | 'object' | 'heirloom';

export interface OwnershipPeriod {
  holder: string;
  holderId?: string;
  period: string;
  note?: string;
}

export interface Artifact extends BaseEntity {
  type: ArtifactType;
  creator?: string;
  description: string;
  powers?: string[];
  limitations?: string[];
  ownership: OwnershipPeriod[];
  symbolism?: string;
  fate?: string;
  eventIds?: string[];
  characterIds?: string[];
  relatedIds?: string[];
  /** Interpretation vs documented properties separation. */
  interpretation?: string;
}

/* ------------------------------------------------------------------ */
/* Historical events                                                   */
/* ------------------------------------------------------------------ */

export type EventType =
  | 'creation'
  | 'founding'
  | 'battle'
  | 'journey'
  | 'disaster'
  | 'council'
  | 'discovery'
  | 'downfall'
  | 'departure'
  | 'other';

export interface HistoricalEvent extends BaseEntity {
  date: TimelineDate;
  eventType: EventType;
  /** Ordered narrative used to sort within an Age. */
  order: number;
  participants?: string[]; // character ids
  factions?: string[];
  locationId?: string;
  causes?: string;
  consequences?: string;
  characterIds?: string[];
  artifactIds?: string[];
  relatedEventIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Library                                                             */
/* ------------------------------------------------------------------ */

export type WorkType =
  | 'novel'
  | 'collection'
  | 'volume'
  | 'reference'
  | 'film'
  | 'tv'
  | 'essay';

export type ReadingPathId =
  | 'beginner'
  | 'main-story'
  | 'ancient-world'
  | 'deep-lore'
  | 'theme';

export interface Chapter {
  title: string;
  summary: string;
}

export interface Book extends BaseEntity {
  title: string;
  author: string;
  published: string;
  workType: WorkType;
  /** Optional grouping, e.g. "The Lord of the Rings". */
  series?: string;
  /** For adaptations, the studio / medium. */
  studio?: string;
  setting?: string;
  synopsis: string;
  themes?: string[];
  chapters?: Chapter[];
  characterIds?: string[];
  locationIds?: string[];
  eventIds?: string[];
  followUp?: string[];
  publicationNote?: string;
}

export interface ReadingPath {
  id: ReadingPathId;
  name: string;
  description: string;
  steps: { bookId: string; note: string }[];
}

/* ------------------------------------------------------------------ */
/* Themes & analysis                                                   */
/* ------------------------------------------------------------------ */

export interface EvidencePoint {
  point: string;
  detail: string;
  sourceIds?: string[];
}

export interface Theme extends BaseEntity {
  question: string;
  thesis: string;
  evidence: EvidencePoint[];
  counterarguments: string[];
  connections?: string[];
  discussionPrompt?: string;
  relatedThemeIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Peoples, cultures, kingdoms, factions                               */
/* ------------------------------------------------------------------ */

export type PeopleKind =
  | 'race'
  | 'culture'
  | 'kingdom'
  | 'realm'
  | 'faction'
  | 'organization'
  | 'army';

export interface People extends BaseEntity {
  kind: PeopleKind;
  /** Distinct from a kingdom: a people is cultural, a kingdom is political. */
  distinction?: string;
  origins: string;
  culture?: string;
  history?: string;
  language?: string;
  leaders?: string[];
  settlements?: string[];
  alliances?: string[];
  conflicts?: string[];
  relatedIds?: string[];
  characterIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Community (Supabase-backed) — typed shapes for scaffolding           */
/* ------------------------------------------------------------------ */

export interface DiscussionCategory {
  id: string;
  name: string;
  description: string;
  /** Distinguishes canon, evidence, interpretation, opinion, adaptation, speculation. */
  evidenceKinds: string[];
}
