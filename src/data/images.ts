/**
 * Centralised registry of content images.
 *
 * Filenames are verified to exist under `public/images/**`. Do not construct
 * paths dynamically — import from here (or from a data record that references
 * this registry) so a missing file is a build-time typo, not a broken image.
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
