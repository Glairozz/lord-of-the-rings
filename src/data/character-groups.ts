import { characterImages, locationImages } from './images';

/**
 * The race-and-creature taxonomy that organises the character archive.
 *
 * The directory used to be alphabetical, which made discovery depend on knowing
 * a name in advance. It is now grouped by what a figure *is*: the race, culture
 * or creature-kind they belong to.
 *
 * Rules for this file:
 *  - A character record is never duplicated. Membership is expressed here, as
 *    a list of ids, so a figure can appear in more than one group (Gandalf is
 *    both a Wizard and a Maia) while remaining a single record.
 *  - Only groups with real members are published. The `visibleGroups` export
 *    filters out empty groups automatically.
 *  - Counts are always derived from the character data, never hard-coded.
 */
export interface CharacterGroup {
  /** Stable id used in urls and as a filter value. */
  id: string;
  /** Full display name, e.g. "Hobbits & Halflings". */
  label: string;
  /** Compact name for chips and badges, e.g. "Hobbits". */
  shortLabel: string;
  /** One-line hook used on cards. */
  tagline: string;
  /** A short paragraph explaining the group. */
  description: string;
  /** lucide-react icon name. */
  icon: string;
  /** Artwork used on category cards. */
  image: string;
  /** Character ids belonging to this group. */
  members: string[];
}

export const characterGroups: CharacterGroup[] = [
  {
    id: 'hobbits',
    label: 'Hobbits & Halflings',
    shortLabel: 'Hobbits',
    tagline: 'The small, stubborn folk of the Shire — and the one who broke the Ring.',
    description:
      'Hobbits are counted among the Children of Ilúvatar, though their first awakening is unrecorded. Divided into Harfoots, Fallohides and Stoors, they settled the Shire in T.A. 1601 and were long forgotten by the great powers — until four of them carried the One Ring to Mount Doom. The name means “halfling”, and the world has never quite forgiven them for it.',
    icon: 'Rabbit',
    image: locationImages.theShire,
    members: ['bilbo', 'frodo', 'samwise', 'merry', 'pippin', 'gollum'],
  },
  {
    id: 'men',
    label: 'Men of Middle-earth',
    shortLabel: 'Men',
    tagline: 'Mortal, brief-lived, and responsible for every kingdom in the West.',
    description:
      'The Secondborn Children of Ilúvatar: the Edain, the sea-kings of Númenor, the horse-lords of Rohan and the Dúnedain of Gondor and Arnor. Men are mortal, and every choice they make is therefore urgent. Their kingdoms — Gondor, Rohan, Arnor — are the political shapes that dominate the Third Age, and their longings are what the Enemy learns to exploit.',
    icon: 'Sword',
    image: locationImages.minasTirith,
    members: [
      'aragorn',
      'boromir',
      'faramir',
      'eowyn',
      'eomer',
      'theoden',
      'denethor',
      'arathorn',
      'gilraen',
      'isildur',
      'elendil',
      'grima',
    ],
  },
  {
    id: 'elves',
    label: 'Elves of Middle-earth',
    shortLabel: 'Elves',
    tagline: 'The Firstborn, waking beneath the stars, remembering a world before this one.',
    description:
      'The Elves awoke at Cuiviénen in the Elder Days, the first of the Children of Ilúvatar to come into being. They are divided into kindreds — Noldor, Sindar, Silvan — and into realms such as Rivendell, Lothlórien and Mirkwood. They do not die of age but can be slain, and in the Third Age they begin to fade, passing west with the Three Rings still in their keeping.',
    icon: 'Trees',
    image: locationImages.lothlorien,
    members: [
      'galadriel',
      'elrond',
      'arwen',
      'legolas',
      'thranduil',
      'celeborn',
      'haldir',
      'glorfindel',
      'tauriel',
      'arondir',
    ],
  },
  {
    id: 'dwarves',
    label: 'Dwarves of Durin’s Folk',
    shortLabel: 'Dwarves',
    tagline: 'Stone-cutters, smiths and oath-keepers made before the Elves awoke.',
    description:
      'Aulë made the Seven Fathers of the Dwarves in secret while the Children of Ilúvatar were still waiting to come. Durin was the eldest, and his line — the Longbeards — held Khazad-dûm and later the Lonely Mountain. Dwarves are the finest miners, smiths and stone-workers in Middle-earth, and they keep every oath and every grudge with equal seriousness.',
    icon: 'Pickaxe',
    image: locationImages.erebor,
    members: [
      'thorin',
      'balin',
      'gimli',
      'thrain',
      'thror',
      'dain',
      'durin',
      'gloin',
      'bombur',
      'dwalin',
      'kili',
      'fili',
      'nori',
      'dori',
      'oin',
      'bifur',
    ],
  },
  {
    id: 'wizards',
    label: 'Wizards & the Istari',
    shortLabel: 'Wizards',
    tagline: 'Five Maiar in the shape of old men, sent to counsel rather than to rule.',
    description:
      'Around T.A. 1000 the Valar sent five Maiar into Middle-earth in the guise of elderly Men, charged with stirring the free peoples against Sauron by persuasion alone. Only Gandalf remained faithful to the end. Saruman the White fell to pride, Radagast the Brown served the beasts, and the two Blue Wizards went east, their fates left deliberately unrecorded.',
    icon: 'Wand',
    image: locationImages.isengard,
    members: ['gandalf', 'saruman', 'radagast', 'alatar', 'pallando'],
  },
  {
    id: 'orcs',
    label: 'Orcs, Goblins & Uruk-hai',
    shortLabel: 'Orcs',
    tagline: 'The standing soldiery of the Dark Powers — bred, corrupted, and never truly loyal.',
    description:
      'Orcs — called Yrch, Goblins or Uruk-hai — were bred or corrupted into the service of Morgoth and Sauron. Tolkien returned to their origin more than once and never settled it, so this archive records the question as open. Their societies are militarised and fractious: captains vie for favour, and loyalty runs only to the strongest leader or the promise of plunder.',
    icon: 'Shield',
    image: locationImages.mordor,
    members: ['azog', 'bolg', 'lurtz', 'ugluk', 'grishnakh', 'mauhur', 'gorbag', 'shagrat'],
  },
  {
    id: 'uruk-hai',
    label: 'Uruk-hai',
    shortLabel: 'Uruk-hai',
    tagline: 'The larger, sun-hardened soldiers of Isengard and the Morgul vale.',
    description:
      'Uruk-hai — the “Uruk-folk” — are the great soldier-orcs of the late Third Age: taller, stronger and more disciplined than common Orcs, and able to march under the sun. Saruman bred his own companies at Isengard, while the Uruks of Minas Morgul held the pass of Cirith Ungol. They remain Orcs in kind, so this archive also lists them among the Orcs, Goblins & Uruk-hai.',
    icon: 'Swords',
    image: locationImages.isengard,
    members: ['lurtz', 'ugluk', 'gorbag', 'shagrat'],
  },
  {
    id: 'dragons',
    label: 'Dragons & Great Beasts',
    shortLabel: 'Dragons',
    tagline: 'Fire-breathing serpents, cunning enough to talk and to lie.',
    description:
      'Dragons were bred by Morgoth in Angband in the First Age, Glaurung the Father of Dragons first of all. They are solitary, proud and covetous, guarding hoards with a jealous intelligence that rivals that of Men. Glaurung ruined Beleriand, Ancalagon fell at the War of Wrath, and Smaug held the Lonely Mountain until Bard the Bowman found the hollow of his breast.',
    icon: 'Flame',
    image: characterImages.smaug,
    members: ['smaug', 'glaurung', 'ancalagon', 'scatha', 'chrysophylax'],
  },
  {
    id: 'dark-lords',
    label: 'Dark Lords & Necromancers',
    shortLabel: 'Dark Lords',
    tagline: 'The servants of the Shadow who shaped every age of Arda.',
    description:
      'Morgoth was the first Dark Lord, a fallen Vala whose wars shaped the First Age; Sauron, his greatest lieutenant, became the second and forged the One Ring. Their servants include the Necromancer of Dol Guldur — Sauron himself under another name — and the Witch-king of Angmar, a Man hollowed out by one of the Nine. Sauron appears once in this archive, under every name he bore.',
    icon: 'Crown',
    image: characterImages.sauron,
    members: ['sauron', 'morgoth', 'witchking'],
  },
  {
    id: 'maiar',
    label: 'Maiar & Spirits',
    shortLabel: 'Maiar',
    tagline: 'Servants of the Valar, bound to mortal form for a single errand.',
    description:
      'The Maiar are the lesser Ainur, chosen for a task and sent into the world in a shape of their choosing. The Istari were five of them, sent east in the bodies of old Men; Sauron was a Maia of Aulë before he was a Dark Lord. Their natures are hidden rather than merely unknown, and Tolkien used that hiddenness as a theme: a Maia in disguise can be a guide or a ruin, and usually is both.',
    icon: 'Sparkles',
    image: characterImages.glorfindel,
    members: ['gandalf', 'saruman', 'radagast', 'alatar', 'pallando', 'sauron', 'morgoth'],
  },
];

/** Groups that actually contain at least one character. */
export const visibleCharacterGroups: CharacterGroup[] = characterGroups.filter((g) => g.members.length > 0);

export const characterGroupById = new Map(characterGroups.map((g) => [g.id, g]));

/**
 * Groups a character belongs to, in taxonomy order. Characters may belong to
 * more than one group; membership never duplicates the underlying record.
 */
export function groupsForCharacter(characterId: string): CharacterGroup[] {
  return characterGroups.filter((g) => g.members.includes(characterId));
}

/** The group a character is primarily filed under (the first match). */
export function primaryGroupForCharacter(characterId: string): CharacterGroup | undefined {
  return characterGroups.find((g) => g.members.includes(characterId));
}

/* ------------------------------------------------------------------ */
/* Roles                                                               */
/* ------------------------------------------------------------------ */

/**
 * A small, curated role vocabulary used for the optional role filter.
 * Roles are editorial classifications of the existing data, not new lore.
 */
export const characterRoles = ['Hero', 'Ruler', 'Wizard', 'Villain', 'Creature'] as const;
export type CharacterRole = (typeof characterRoles)[number];

export const characterRoleById: Record<string, CharacterRole[]> = {
  // Hobbits
  bilbo: ['Hero'],
  frodo: ['Hero'],
  samwise: ['Hero'],
  merry: ['Hero'],
  pippin: ['Hero'],
  gollum: ['Creature'],
  // Men
  aragorn: ['Hero', 'Ruler'],
  boromir: ['Hero'],
  faramir: ['Hero'],
  eowyn: ['Hero'],
  eomer: ['Hero', 'Ruler'],
  theoden: ['Hero', 'Ruler'],
  denethor: ['Ruler'],
  arathorn: ['Ruler'],
  gilraen: [],
  isildur: ['Ruler'],
  elendil: ['Ruler'],
  grima: ['Villain'],
  // Elves
  galadriel: ['Ruler'],
  elrond: ['Hero', 'Ruler'],
  arwen: [],
  legolas: ['Hero'],
  thranduil: ['Ruler'],
  celeborn: ['Ruler'],
  haldir: [],
  glorfindel: ['Hero'],
  tauriel: [],
  arondir: [],
  // Dwarves
  thorin: ['Hero', 'Ruler'],
  balin: ['Hero'],
  gimli: ['Hero'],
  thrain: [],
  thror: ['Ruler'],
  dain: ['Ruler'],
  durin: ['Ruler'],
  gloin: [],
  bombur: [],
  dwalin: [],
  kili: [],
  fili: [],
  nori: [],
  dori: [],
  oin: [],
  bifur: [],
  // Wizards
  gandalf: ['Hero', 'Wizard'],
  saruman: ['Wizard', 'Villain'],
  radagast: ['Wizard'],
  alatar: ['Wizard'],
  pallando: ['Wizard'],
  // Dark powers
  sauron: ['Villain', 'Ruler'],
  morgoth: ['Villain', 'Ruler'],
  witchking: ['Villain', 'Creature', 'Ruler'],
  // Orcs
  azog: ['Villain', 'Creature'],
  bolg: ['Villain', 'Creature'],
  lurtz: ['Villain', 'Creature'],
  ugluk: ['Villain', 'Creature'],
  grishnakh: ['Villain', 'Creature'],
  mauhur: ['Villain', 'Creature'],
  gorbag: ['Villain', 'Creature'],
  shagrat: ['Villain', 'Creature'],
  // Dragons
  smaug: ['Villain', 'Creature'],
  glaurung: ['Villain', 'Creature'],
  ancalagon: ['Villain', 'Creature'],
  scatha: ['Creature'],
  chrysophylax: ['Creature'],
};

export function rolesForCharacter(characterId: string): CharacterRole[] {
  return characterRoleById[characterId] ?? [];
}

/* ------------------------------------------------------------------ */
/* Allegiance                                                          */
/* ------------------------------------------------------------------ */

/**
 * Allegiance / faction labels. Where a figure has no recorded allegiance the
 * entry is omitted and the culture label is used instead, so the facet never
 * invents an affiliation.
 */
export const characterAffiliations: Record<string, string> = {
  bilbo: 'The Shire',
  frodo: 'The Fellowship',
  samwise: 'The Fellowship',
  merry: 'The Fellowship',
  pippin: 'The Fellowship',
  gollum: 'Unaffiliated',
  aragorn: 'Gondor & Arnor',
  boromir: 'Gondor',
  faramir: 'Gondor',
  eowyn: 'Rohan',
  eomer: 'Rohan',
  theoden: 'Rohan',
  denethor: 'Gondor',
  arathorn: 'Arnor',
  gilraen: 'Arnor',
  isildur: 'Gondor & Arnor',
  elendil: 'Gondor & Arnor',
  grima: 'Isengard',
  galadriel: 'Lothlórien',
  elrond: 'Rivendell',
  arwen: 'Rivendell',
  legolas: 'Mirkwood',
  thranduil: 'Mirkwood',
  celeborn: 'Lothlórien',
  haldir: 'Lothlórien',
  glorfindel: 'Rivendell',
  tauriel: 'Mirkwood',
  arondir: 'The Southlands',
  thorin: 'Erebor',
  balin: "Durin's Folk",
  gimli: "Durin's Folk",
  thrain: "Durin's Folk",
  thror: "Durin's Folk",
  dain: 'Erebor',
  durin: "Durin's Folk",
  gloin: "Durin's Folk",
  bombur: "Durin's Folk",
  dwalin: "Durin's Folk",
  kili: "Durin's Folk",
  fili: "Durin's Folk",
  nori: "Durin's Folk",
  dori: "Durin's Folk",
  oin: "Durin's Folk",
  bifur: "Durin's Folk",
  gandalf: 'The Fellowship',
  saruman: 'Isengard',
  radagast: 'Isengard',
  alatar: 'The East',
  pallando: 'The East',
  sauron: 'Mordor',
  morgoth: 'Angband',
  witchking: 'Angmar & Minas Morgul',
  azog: 'Mordor',
  bolg: 'Mordor',
  lurtz: 'Isengard',
  ugluk: 'Isengard',
  grishnakh: 'Mordor',
  mauhur: 'Isengard',
  gorbag: 'Mordor',
  shagrat: 'Mordor',
  smaug: 'Erebor',
  glaurung: 'Angband',
  ancalagon: 'Angband',
  scatha: 'The Grey Mountains',
  chrysophylax: 'The Grey Mountains',
};
