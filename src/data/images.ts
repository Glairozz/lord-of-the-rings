/**
 * Centralised registry of content images.
 *
 * Filenames are verified to exist on disk. Two homes are used:
 *  - `public/images/**` (kebab-case) for the shared content art added with the
 *    encyclopedia pass;
 *  - the legacy themed folders (`public/hobbitimages`, `public/manimages`,
 *    `public/elvesimages`, `public/dwarfimages`, `public/wizardimages`,
 *    `public/necromancerimages`, `public/orcsimages`, `public/dragonimages`)
 *    for portraits.
 *
 * Do not construct paths dynamically — import from here (or from a data record
 * that references this registry) so a missing file is a build-time typo, not a
 * broken image.
 */

export const FALLBACK_IMAGE = '/images/fallback.svg';

export const artifactImages = {
  oneRing: '/images/artifacts/the-one-ring.jpg',
  threeElvenRings: '/images/artifacts/the-three-elven-rings.jpg',
  sevenDwarfRings: '/images/artifacts/the-seven-dwarf-rings.jpg',
  nineRingsOfMen: '/images/artifacts/the-nine-rings-of-men.png',
  silmarils: '/images/artifacts/the-silmarils.jpg',
  palantiri: '/images/artifacts/the-palantiri.jpg',
  narsilAnduril: '/images/artifacts/narsil-and-anduril.jpg',
  glamdringOrcristSting: '/images/artifacts/glamdring-orcrist-and-sting.jpg',
  arkenstone: '/images/artifacts/the-arkenstone.jpg',
  phialOfGaladriel: '/images/artifacts/the-phial-of-galadriel.jpg',
} as const;

/** Character portraits, kept in their original themed folders. */
export const characterImages = {
  // Hobbits
  bilbo: '/hobbitimages/bilbo.webp',
  frodo: '/hobbitimages/frodo.jpg',
  samwise: '/hobbitimages/samwise.webp',
  meriadoc: '/hobbitimages/merry.webp',
  peregrin: '/hobbitimages/pippin.jpg',
  // Dwarves
  thorin: '/dwarfimages/thorin.webp',
  durin: '/dwarfimages/durin.jpg',
  // Elves
  galadriel: '/elvesimages/galadriel.webp',
  elrond: '/elvesimages/elrond.webp',
  arwen: '/elvesimages/arwen.jpg',
  legolas: '/elvesimages/legolas.webp',
  thranduil: '/elvesimages/thranduil.webp',
  celeborn: '/elvesimages/celeborn.webp',
  haldir: '/elvesimages/haldir.jpg',
  glorfindel: '/elvesimages/glorfindel.webp',
  tauriel: '/elvesimages/tauriel.webp',
  arondir: '/elvesimages/arondir.jpg',
  // Wizards
  gandalf: '/wizardimages/gandalf.webp',
  saruman: '/wizardimages/saruman.jpg',
  radagast: '/wizardimages/radagast.jpg',
  alatar: '/wizardimages/alatar.jpg',
  pallando: '/wizardimages/pallando.jpg',
  // Men
  aragorn: '/manimages/aragorn.webp',
  boromir: '/manimages/boromir.jpg',
  faramir: '/manimages/faramir.webp',
  eomer: '/manimages/eomer.webp',
  theoden: '/manimages/theoden.jpg',
  denethor: '/manimages/denethor.webp',
  // Dark figures
  morgoth: '/necromancerimages/morgoth.webp',
  sauron: '/necromancerimages/sauron.webp',
  witchking: '/necromancerimages/witchking.webp',
  gollum: '/necromancerimages/gollum.jpg',
  // Dragons
  smaug: '/dragonimages/smaug.webp',
  glaurung: '/dragonimages/glaurung.webp',
  ancalagon: '/dragonimages/ancalagon.jpg',
  scatha: '/dragonimages/scatha.webp',
  chrysophylax: '/dragonimages/chrysophylax.jpg',
  // Dwarves
  balin: '/dwarfimages/balin.webp',
  bifur: '/dwarfimages/bifur.webp',
  bombur: '/dwarfimages/bombur.jpg',
  dain: '/dwarfimages/dain.jpg',
  dori: '/dwarfimages/dori.webp',
  dwalin: '/dwarfimages/dwalin.webp',
  fili: '/dwarfimages/fili.webp',
  gimli: '/dwarfimages/gimli.jpg',
  gloin: '/dwarfimages/gloin.webp',
  kili: '/dwarfimages/kili.webp',
  nori: '/dwarfimages/nori.webp',
  oin: '/dwarfimages/oin.webp',
  thrain: '/dwarfimages/thrain.jpg',
  thror: '/dwarfimages/thror.jpg',
  // Orcs
  azog: '/orcsimages/azog.webp',
  bolg: '/orcsimages/bolg.webp',
  gorbag: '/orcsimages/gorbag.webp',
  grishnakh: '/orcsimages/grishnakh.jpg',
  lurtz: '/orcsimages/lurtz.webp',
  mauhur: '/orcsimages/mauhúr.webp',
  shagrat: '/orcsimages/shagrat.jpg',
  ugluk: '/orcsimages/uglúk.webp',
  // Other figures
  grima: '/necromancerimages/grima.webp',
} as const;

export const locationImages = {
  edoras: '/images/locations/edoras.jpg',
  erebor: '/images/locations/erebor.jpg',
  helmsDeep: '/images/locations/helms-deep.jpg',
  isengard: '/images/locations/isengard.jpg',
  ithilien: '/images/locations/ithilien.jpg',
  lakeTown: '/images/locations/lake-town.jpg',
  lothlorien: '/images/locations/lothlorien.jpg',
  minasTirith: '/images/locations/minas-tirith.jpg',
  mirkwood: '/images/locations/mirkwood.jpg',
  mordor: '/images/locations/mordor.jpg',
  moria: '/images/locations/moria.jpg',
  osgiliath: '/images/locations/osgiliath.jpg',
  pathsOfTheDead: '/images/locations/paths-of-the-dead.jpg',
  pelennorFields: '/images/locations/pelennor-fields.jpg',
  rivendell: '/images/locations/rivendell.jpg',
  theShire: '/images/locations/the-shire.jpg',
  trollshaws: '/images/locations/trollshaws.jpg',
} as const;

export const mapImages = {
  middleEarth: '/images/maps/middle-earth.jpg',
} as const;

export const historyImages = {
  historyOfArda: '/images/history/history-of-arda.jpg',
} as const;

/** All verified content images, useful for validation and tooling. */
export const allContentImages: string[] = [
  ...Object.values(artifactImages),
  ...Object.values(locationImages),
  ...Object.values(mapImages),
  ...Object.values(historyImages),
];
