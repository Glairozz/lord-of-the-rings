import type { Source, Age } from '@/types/content';

/**
 * Canonical source records. Every substantial encyclopedia entry references
 * one or more of these so readers can verify claims.
 */
export const sources: Source[] = [
  {
    id: 'hobbit',
    label: 'The Hobbit',
    kind: 'primary-text',
    author: 'J.R.R. Tolkien',
    year: '1937',
    note: 'Published in Tolkien’s lifetime. The primary narrative of Bilbo’s journey.',
  },
  {
    id: 'lotr',
    label: 'The Lord of the Rings',
    kind: 'primary-text',
    author: 'J.R.R. Tolkien',
    year: '1954–55',
    note: 'Three volumes: The Fellowship of the Ring, The Two Towers, The Return of the King.',
  },
  {
    id: 'silmarillion',
    label: 'The Silmarillion',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '1977',
    note: 'Posthumously edited. Contains the Ainulindalë, Valaquenta, Quenta Silmarillion, Akallabêth and Of the Rings of Power.',
  },
  {
    id: 'unfinished-tales',
    label: 'Unfinished Tales',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '1980',
    note: 'Expanded and alternative accounts of the First, Second and Third Ages.',
  },
  {
    id: 'children-of-hurin',
    label: 'The Children of Húrin',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '2007',
    note: 'A continuous narrative assembled from earlier drafts.',
  },
  {
    id: 'beren-and-luthien',
    label: 'Beren and Lúthien',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '2017',
    note: 'Multiple versions of the tale, showing how the story evolved.',
  },
  {
    id: 'fall-of-gondolin',
    label: 'The Fall of Gondolin',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '2018',
    note: 'Assembled versions of the earliest tale of the First Age.',
  },
  {
    id: 'tom-bombadil',
    label: 'The Adventures of Tom Bombadil',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien',
    year: '1962',
    note: 'A collection of verse, some of it framing Middle-earth legend.',
  },
  {
    id: 'history-of-me',
    label: 'The History of Middle-earth',
    kind: 'supplementary',
    author: 'J.R.R. Tolkien (ed. Christopher Tolkien)',
    year: '1983–96',
    note: 'Twelve volumes documenting the evolution of the legendarium.',
  },
  {
    id: 'peter-jackson-hobbit',
    label: 'The Hobbit film trilogy (Peter Jackson)',
    kind: 'adaptation',
    author: 'Warner Bros. / New Line Cinema',
    year: '2012–14',
    note: 'An adaptation, not a Tolkien novel. Invented characters include Tauriel and Alfrid.',
  },
  {
    id: 'peter-jackson-lotr',
    label: 'The Lord of the Rings film trilogy (Peter Jackson)',
    kind: 'adaptation',
    author: 'New Line Cinema',
    year: '2001–03',
    note: 'Widely acclaimed adaptation with notable departures from the texts.',
  },
  {
    id: 'rings-of-power',
    label: 'The Lord of the Rings: The Rings of Power',
    kind: 'adaptation',
    author: 'Amazon Prime Video',
    year: '2022–',
    note: 'Television adaptation. Compresses the Second Age and invents characters such as Arondir and Halbrand.',
  },
  {
    id: 'tolkien-letters',
    label: 'The Letters of J.R.R. Tolkien',
    kind: 'reference',
    author: 'J.R.R. Tolkien (ed. Humphrey Carpenter)',
    year: '1981',
    note: 'Authorial commentary useful for interpretation, but not always narrative canon.',
  },
];

export const sourceById = new Map(sources.map((s) => [s.id, s]));

export function getSources(ids: string[]): Source[] {
  return ids.map((id) => sourceById.get(id)).filter((s): s is Source => Boolean(s));
}

export const ages: Age[] = [
  {
    id: 'before-ages',
    name: 'Before the Ages',
    span: 'Before the reckoning of time',
    summary:
      'The creation of Eä through the Music of the Ainur, and the shaping of Arda by the Valar.',
  },
  {
    id: 'first-age',
    name: 'The First Age',
    span: 'The Elder Days',
    summary:
      'The awakening of the Elves, the wars against Morgoth, and the great tragedies of Beleriand ending in the War of Wrath.',
  },
  {
    id: 'second-age',
    name: 'The Second Age',
    span: 'S.A. 1 – 3441',
    summary:
      'The rise and downfall of Númenor, the forging of the Rings of Power, and the Last Alliance of Elves and Men.',
  },
  {
    id: 'third-age',
    name: 'The Third Age',
    span: 'T.A. 1 – 3021',
    summary:
      'The kingdoms of the Dúnedain, the long history of the Ring, the quest of Erebor, and the War of the Ring.',
  },
  {
    id: 'fourth-age',
    name: 'The Fourth Age',
    span: 'After the War of the Ring',
    summary:
      'The Reunited Kingdom, the waning of the Elves, and the beginning of the Dominion of Men.',
  },
];

export const ageById = new Map(ages.map((a) => [a.id, a]));
