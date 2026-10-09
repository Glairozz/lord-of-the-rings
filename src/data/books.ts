import type { Book, ReadingPath } from '@/types/content';

/**
 * The library of Middle-earth.
 *
 * This file deliberately separates three very different kinds of "book":
 *
 *  1. Works Tolkien published himself in his lifetime (`continuity: 'tolkien-texts'`).
 *  2. Works assembled and published after his death by Christopher Tolkien and
 *     others (`continuity: 'supplementary'`).
 *  3. Film and television adaptations (`continuity: 'adaptation'`, workType
 *     `'film'` / `'tv'`). These are NOT Tolkien novels. "The Desolation of Smaug"
 *     and "The Battle of the Five Armies", for example, are Peter Jackson film
 *     titles, not books — so they appear only as parts of the film trilogy entry.
 */

export const books: Book[] = [
  {
    id: 'the-hobbit',
    slug: 'the-hobbit',
    name: 'The Hobbit',
    summary:
      'A reluctant hobbit joins a company of dwarves and a wizard to reclaim a treasure-hoard from the dragon Smaug.',
    image: '/bookimages/UnexpectedJourney.jpg',
    sourceIds: ['hobbit'],
    continuity: 'tolkien-texts',
    tags: ['third-age', 'quest', 'erebor', 'bilbo', 'dragon'],
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    published: '1937',
    workType: 'novel',
    setting:
      'The Shire, the Wilderland of Rhovanion, the Misty Mountains, Mirkwood and the Lonely Mountain (Erebor), in the later Third Age.',
    synopsis:
      'Tolkien’s first published Middle-earth tale follows Bilbo Baggins, a comfortably settled hobbit, who is swept into a quest by Gandalf and thirteen dwarves led by Thorin Oakenshield. Crossing troll-infested wilds, the goblin tunnels beneath the Misty Mountains and the enchanted gloom of Mirkwood, Bilbo discovers a courage — and a magic ring — he never knew he had. The journey ends at the Lonely Mountain, where the dragon Smaug guards the dwarves’ stolen gold and where a sudden battle draws elves, men, goblins and wargs into a single field. Written at first as a children’s story, it quietly became the doorway into the larger legendarium.',
    themes: ['courage and growth', 'greed and its cost', 'the value of the ordinary', 'luck and providence', 'home versus adventure'],
    chapters: [
      { title: 'An Unexpected Party', summary: 'Gandalf contrives a visit from thirteen dwarves; Bilbo is hired as the expedition’s burglar and rushes out without so much as a pocket-handkerchief.' },
      { title: 'Roast Mutton', summary: 'Bilbo first proves his usefulness when the company is captured by three trolls, and Gandalf tricks the trolls into quarrelling until dawn turns them to stone.' },
      { title: 'A Short Rest', summary: 'The travellers shelter at Rivendell, where Elrond reads the moon-letters on Thorin’s map and identifies the runes of the hidden door.' },
      { title: 'Over Hill and Under Hill', summary: 'In the passes of the Misty Mountains the company is captured by goblins; Gandalf slays the Great Goblin and the dwarves flee in the dark.' },
      { title: 'Riddles in the Dark', summary: 'Lost and alone, Bilbo meets Gollum and wins a riddle contest — and, by accident, takes the strange golden ring that makes its wearer invisible.' },
      { title: 'Queer Lodgings', summary: 'Beorn the skin-changer shelters and supplies the company before they dare the black eaves of Mirkwood.' },
      { title: 'Flies and Spiders', summary: 'Bilbo rescues the dwarves from giant spiders, names his sword Sting, and reveals the ring’s power to his companions.' },
      { title: 'Barrels Out of Bond', summary: 'Imprisoned by the Elvenking, Bilbo frees the dwarves by sealing them inside empty wine-barrels and floating them down the Forest River.' },
      { title: 'Inside Information', summary: 'At the Lonely Mountain Bilbo enters by the secret door, speaks riddling words with the dragon Smaug, and glimpses the weakness in the great worm’s jewelled armour.' },
      { title: 'Fire and Water', summary: 'Smaug flies in wrath to Lake-town; there Bard the Bowman, warned by an old thrush, drives the black arrow into the bare patch and fells the dragon.' },
      { title: 'The Clouds Burst', summary: 'Goblins and wargs attack just as dwarves, elves and men are about to fight one another, and the Battle of the Five Armies is joined.' },
      { title: 'The Return Journey', summary: 'Thorin is mortally wounded and reconciled with Bilbo; the treasure is shared out, and Bilbo turns for home richer, but chiefly in experience.' },
    ],
    publicationNote:
      'First published by George Allen & Unwin in 1937 and revised in 1951 and 1966 to bring it into line with The Lord of the Rings. It is the only Middle-earth narrative Tolkien saw through the press himself before the great sequel.',
    followUp: ['fellowship-of-the-ring'],
  },
  {
    id: 'fellowship-of-the-ring',
    slug: 'fellowship-of-the-ring',
    name: 'The Fellowship of the Ring',
    summary:
      'The first volume of The Lord of the Rings: a hobbit inherits a Ring of Power and sets out from the Shire to unmake it.',
    image: '/bookimages/TheFellowshipOfTheRing.jpg',
    sourceIds: ['lotr'],
    continuity: 'tolkien-texts',
    tags: ['third-age', 'ring', 'fellowship', 'frodo', 'rivendell'],
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    published: '1954',
    workType: 'volume',
    series: 'The Lord of the Rings',
    setting:
      'The Shire, the Old Forest, Bree, the Weather Hills, Rivendell, the Misty Mountains, Moria and Lothlórien.',
    synopsis:
      'Sixty years after Bilbo’s journey, his nephew Frodo inherits the ring Bilbo found under the mountains — and learns from Gandalf that it is the One Ring, forged by Sauron to master all others. Pursued by the Nazgûl, Frodo leaves the Shire with Sam, Merry and Pippin, gathers allies at Bree and Rivendell, and there learns that the Ring can only be destroyed in the fires of Mount Doom. So begins the Fellowship of the Ring: nine walkers, elves and men, dwarves and hobbits, set against the Nine Riders. The volume closes in grief and division at the falls of Rauros, as the company is scattered and Frodo and Sam row on alone toward Mordor.',
    themes: ['friendship and loyalty', 'the corrupting lure of power', 'providence and pity', 'the small overcoming the great', 'loss of innocence'],
    chapters: [
      { title: 'A Long-Expected Party', summary: 'Bilbo’s farewell feast marks his hundred-and-eleventh birthday and his sudden departure, leaving the Shire and the Ring behind.' },
      { title: 'The Shadow of the Past', summary: 'Gandalf explains the true history of the Ring, the forging of the rings and the Danger of Sauron’s search; Frodo must leave the Shire.' },
      { title: 'Three is Company', summary: 'Frodo slips away eastward with Sam, and the Black Riders are first glimpsed upon the roads and in the woods.' },
      { title: 'The Old Forest', summary: 'The hobbits cut through the Old Forest with Pippin’s recklessness and are nearly swallowed by Old Man Willow.' },
      { title: 'In the House of Tom Bombadil', summary: 'Bombadil rescues the hobbits and offers a strange reminder that some powers lie far outside the war of the Ring.' },
      { title: 'A Knife in the Dark', summary: 'At the ruined watchtower of Weathertop Frodo is wounded by the Witch-king’s Morgul-blade, a hurt that never fully heals.' },
      { title: 'Flight to the Ford', summary: 'Glorfindel finds the company, and Frodo is carried across the Bruinen before the flood-horses and Elrond’s enchantment sweep the Riders away.' },
      { title: 'The Council of Elrond', summary: 'Envoys of many peoples debate the fate of the Ring; Frodo volunteers to bear it, and the Fellowship of nine is chosen.' },
      { title: 'The Bridge of Khazad-dûm', summary: 'In the Mines of Moria the company is assailed; Gandalf faces the Balrog on the narrow bridge and falls into the abyss.' },
      { title: 'The Mirror of Galadriel', summary: 'In Lothlórien Galadriel shows Frodo and Sam visions past and possible, and refuses the Ring offered freely to her.' },
      { title: 'The Breaking of the Fellowship', summary: 'At Amon Hen the company is divided in battle; Boromir dies defending the hobbits, and Frodo and Sam cross the river alone.' },
    ],
    publicationNote:
      'Published 29 July 1954, the opening volume of The Lord of the Rings. Tolkien conceived the three volumes not as separate novels but as one long work, and its awkward division by length still leaves Book I ending at the Council of Elrond.',
    followUp: ['the-two-towers'],
  },
  {
    id: 'the-two-towers',
    slug: 'the-two-towers',
    name: 'The Two Towers',
    summary:
      'The second volume of The Lord of the Rings: broken alliances, the war in Rohan, and the long road of Frodo and Sam eastward.',
    image: '/bookimages/TheTwoTowers.jpg',
    sourceIds: ['lotr'],
    continuity: 'tolkien-texts',
    tags: ['third-age', 'rohan', 'isengard', 'shelob', 'gollum'],
    title: 'The Two Towers',
    author: 'J.R.R. Tolkien',
    published: '1954',
    workType: 'volume',
    series: 'The Lord of the Rings',
    setting:
      'Rohan, Fangorn Forest, Helm’s Deep, Isengard, Ithilien, the Dead Marshes, Cirith Ungol and the western borders of Mordor.',
    synopsis:
      'The scattered Fellowship now walks two roads at once. In the West, Aragorn, Legolas and Gimli pursue the orcs who took Merry and Pippin into the grasslands of Rohan, and are caught up in the war of the horsemen against the treasons of Saruman; the volume rises to the battle of Helm’s Deep and the fall of Isengard, with the rekindling of Gandalf the White. In the East and South, Frodo and Sam take the treacherous Gollum as a guide toward Mordor, cross the Dead Marshes, and pass through Ithilien and the stairs of Cirith Ungol, where Gollum’s old hunger at last betrays them and the spider Shelob strikes.',
    themes: ['divided loyalties', 'the price of power', 'mercy toward the fallen', 'endurance against despair', 'renewal after catastrophe'],
    chapters: [
      { title: 'The Departure of Boromir', summary: 'Aragorn finds Boromir dying among the orcs, and the three hunters choose to follow the captured hobbits rather than the Ring.' },
      { title: 'The Riders of Rohan', summary: 'The hunters meet the outlaw riders of Rohan; Éomer freely lends them horses, and they ride toward Fangorn.' },
      { title: 'Treebeard', summary: 'Merry and Pippin, escaped into Fangorn, meet the Ent Treebeard and awaken his slow anger against Saruman.' },
      { title: 'The White Rider', summary: 'Aragorn’s company is astounded when Gandalf returns from death, now the White, and leads them toward Rohan.' },
      { title: 'The King of the Golden Hall', summary: 'At Edoras Gandalf frees Théoden from Gríma Wormtongue’s counsel and rouses the Rohirrim to war.' },
      { title: 'Helm’s Deep', summary: 'In the Hornburg the men of Rohan and a handful of elves and dwarves hold the Deeping Wall against Saruman’s hordes until dawn.' },
      { title: 'The Road to Isengard', summary: 'Riding to Isengard, the company finds the Ents have razed it and left Saruman trapped in his own tower.' },
      { title: 'The Voice of Saruman', summary: 'Saruman’s honeyed voice nearly beguiles Théoden and Gandalf; the offer of peace is rejected and Gríma hurls down the palantír.' },
      { title: 'The Taming of Sméagol', summary: 'Frodo and Sam capture Gollum in the Emyn Muil and, with Frodo’s mercy, bind him by an oath to serve as guide.' },
      { title: 'The Passage of the Marshes', summary: 'The three cross the Dead Marshes, where the Ring’s hunger and the faces of the slain test Frodo’s resolve.' },
      { title: 'The Window on the West', summary: 'In Henneth Annûn Faramir questions Frodo, and, learning of the Ring, refuses to seize it, proving his quality.' },
      { title: 'The Stairs of Cirith Ungol', summary: 'Gollum leads the hobbits up the secret stair, where Frodo senses betrayal and Sam suspects it.' },
      { title: 'Shelob’s Lair', summary: 'In the tunnels of the spider Gollum springs his trap; Shelob stings Frodo, and Sam takes up the Ring to finish the quest alone.' },
    ],
    publicationNote:
      'Published 11 November 1954. The volume famously splits Frodo’s journey from the war in Rohan, so that Book III and Book IV run in parallel rather than by strict chronology.',
    followUp: ['the-return-of-the-king'],
  },
  {
    id: 'the-return-of-the-king',
    slug: 'the-return-of-the-king',
    name: 'The Return of the King',
    summary:
      'The final volume of The Lord of the Rings: the siege of Gondor, the Ring’s destruction and the crowning of Aragorn.',
    image: '/bookimages/TheReturnOfTheKing.jpg',
    sourceIds: ['lotr'],
    continuity: 'tolkien-texts',
    tags: ['third-age', 'minas-tirith', 'pelennor', 'mount-doom', 'aragorn'],
    title: 'The Return of the King',
    author: 'J.R.R. Tolkien',
    published: '1955',
    workType: 'volume',
    series: 'The Lord of the Rings',
    setting:
      'Minas Tirith, the Pelennor Fields, the Paths of the Dead, Mordor, Mount Doom, the Field of Cormallen and the Shire.',
    synopsis:
      'As the West gathers for a war it cannot win by strength, the Ringbearer crawls into the dark. The volume opens with Gandalf and Pippin in Minas Tirith and Aragorn’s passage through the Paths of the Dead; it rises through the siege of the White City, the ride of the Rohirrim and the Battle of the Pelennor Fields, where Théoden falls and Éowyn and Merry slay the Witch-king. The last debate turns on hope disguised as a diversion: an army marches on the Black Gate so that Frodo may reach Mount Doom. There, at the very end of his endurance, Frodo claims the Ring — and only Gollum’s final, greedy stumbling sends it into the fire. Sauron is unmade, Aragorn is crowned, the hobbits return to a Shire that needs healing, and the Elves pass away into the West.',
    themes: ['hope against despair', 'the end of an age', 'kingship and stewardship', 'the cost of victory', 'mercy repaid'],
    chapters: [
      { title: 'Minas Tirith', summary: 'Gandalf and Pippin reach the White City, where Denethor’s despair and Faramir’s loyalty darken the defence.' },
      { title: 'The Passing of the Grey Company', summary: 'Aragorn, with the Rangers of the North, takes the Paths of the Dead and calls the oathbreakers who cannot rest.' },
      { title: 'The Muster of Rohan', summary: 'Théoden rides to war at last, while Merry is taken to the field by the disguised Éowyn.' },
      { title: 'The Siege of Gondor', summary: 'Mordor’s armies invest Minas Tirith; Denethor burns himself and the city’s gates are shattered before the Riders come.' },
      { title: 'The Battle of the Pelennor Fields', summary: 'Théoden is slain, Éowyn and Merry destroy the Witch-king, and Aragorn arrives with the black fleet to turn the battle.' },
      { title: 'The Houses of Healing', summary: 'Aragorn proves the true king by healing Faramir, Éowyn and Merry from the Black Breath.' },
      { title: 'The Last Debate', summary: 'The captains resolve to march on the Black Gate, accepting that they must draw Sauron’s eye from Frodo.' },
      { title: 'Mount Doom', summary: 'Frodo at last claims the Ring in the fire, Gollum bites it from him and falls, and the Ring is destroyed with Sauron.' },
      { title: 'The Field of Cormallen', summary: 'The host is saved from ruin, the Eagles come, and the Ringbearer and his companion are honoured before all.' },
      { title: 'The Steward and the King', summary: 'Aragorn is crowned Elessar in Minas Tirith and weds Arwen Evenstar, uniting the lines of Elendil and Isildur.' },
      { title: 'The Scouring of the Shire', summary: 'The hobbits return to find their home bullied by Saruman’s agents, and lead a rising that restores it.' },
      { title: 'The Grey Havens', summary: 'After long healing, Frodo, Bilbo, Gandalf, Elrond and Galadriel take ship into the West, and the Third Age ends.' },
    ],
    publicationNote:
      'Published 20 October 1955, concluding The Lord of the Rings. Tolkien appended the massive Appendix — annals, calendars, genealogies and linguistic essays — which is itself a major source for the history of Middle-earth.',
    followUp: ['the-silmarillion'],
  },
  {
    id: 'the-silmarillion',
    slug: 'the-silmarillion',
    name: 'The Silmarillion',
    summary:
      'The mythological foundation of the legendarium: the Music of the Ainur, the First Age, and the long wars against Morgoth.',
    sourceIds: ['silmarillion'],
    continuity: 'supplementary',
    tags: ['first-age', 'morgoth', 'silmarils', 'numenor', 'ainur'],
    title: 'The Silmarillion',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '1977',
    workType: 'collection',
    setting:
      'Before the making of the world, then Valinor, Beleriand and Númenor across the first two Ages of Arda.',
    synopsis:
      'The Silmarillion is the deep backbone of Tolkien’s invented world: a cosmology and a cycle of legends assembled by his son Christopher from decades of drafts. It begins with the Ainulindalë, the great Music through which Ilúvatar creates the world, and the rebellion of Melkor. It tells of the making of the Silmarils by Fëanor, their theft by Morgoth, and the ruinous oath and wars of the Elves in Beleriand; of the sorrow of Túrin, the fall of Gondolin, and the War of Wrath that ends the First Age; and then of the rise and drowned downfall of Númenor, and the forging of the Rings of Power. It is less a novel than a sustained and solemn mythology, and its published form is an editorial achievement as much as an authorial one.',
    themes: ['creation and sub-creation', 'the pride that leads to ruin', 'oaths and their curses', 'doom and free will', 'loss and longing'],
    publicationNote:
      'Published posthumously in 1977, edited by Christopher Tolkien from his father’s unpublished manuscripts with the help of Guy Gavriel Kay. Tolkien never completed a single authoritative version, so the book represents a careful editorial selection rather than a finished text.',
    followUp: ['unfinished-tales'],
  },
  {
    id: 'unfinished-tales',
    slug: 'unfinished-tales',
    name: 'Unfinished Tales',
    summary:
      'A gathering of longer and alternate accounts spanning the First, Second and Third Ages, arranged with editorial commentary.',
    sourceIds: ['unfinished-tales'],
    continuity: 'supplementary',
    tags: ['second-age', 'tuor', 'galadriel', 'isildur', 'numenor', 'third-age'],
    title: 'Unfinished Tales',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '1980',
    workType: 'collection',
    setting:
      'Beleriand, Númenor, Eregion and the Wilderland of the Second and Third Ages, with glimpses back to the Elder Days.',
    synopsis:
      'Unfinished Tales is exactly what its title says: a collection of narratives Tolkien began and never finished, here connected and explained by Christopher Tolkien. It ranges from “Of Tuor and his Coming to Gondolin” in the First Age, through the founding of Númenor, the story of Aldarion and Erendis and the history of Galadriel and Celeborn, to Third Age pieces such as the disaster of the Gladden Fields, the quest of Erebor told alongside the hunt for the Ring, and the desperate ride to the Black Gate. Because the editor prints competing drafts side by side and comments on them, the volume is both a story collection and a window into how the legendarium was made.',
    themes: ['incompleteness and the plurality of versions', 'the histories behind the histories', 'fidelity and betrayal', 'the many hands of tradition'],
    publicationNote:
      'Published posthumously in 1980 by Christopher Tolkien. It marks his first sustained effort to annotate his father’s drafts, paving the way for the twelve-volume History of Middle-earth.',
    followUp: ['the-children-of-hurin'],
  },
  {
    id: 'the-children-of-hurin',
    slug: 'the-children-of-hurin',
    name: 'The Children of Húrin',
    summary:
      'The full, unremitting tragedy of Túrin Turambar, set against Morgoth’s curse on the house of Húrin.',
    sourceIds: ['children-of-hurin'],
    continuity: 'supplementary',
    tags: ['first-age', 'turin', 'morgoth', 'tragedy', 'beleriand'],
    title: 'The Children of Húrin',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '2007',
    workType: 'novel',
    setting:
      'Beleriand in the First Age: Doriath, Nargothrond, the marches of Brethil and the halls of the Elves.',
    synopsis:
      'Where The Silmarillion compresses, this book expands: Christopher Tolkien assembled and completed a continuous narrative of Húrin’s doomed children, Túrin and Nienor, first sketched by his father and reshaped across many drafts. Captured by Morgoth, Húrin taunts him, and the Dark Lord lays a curse on his wife and children. The story follows Túrin through fosterage in Doriath, exile, his friendship with Beleg the archer, his life in Nargothrond under the dragon Glaurung, and the long sequence of misunderstandings and false names that lead to the ruin of everyone he loves. It is the bleakest and most tightly plotted of Tolkien’s tales, its menace closer to Norse saga than to the hobbits’ adventure.',
    themes: ['fate and free will', 'the destructive power of pride', 'kinship and grief', 'the cruelty of Morgoth’s curse'],
    publicationNote:
      'Published posthumously in 2007 by Christopher Tolkien, with illustrations by Alan Lee. The tale had been told, in compressed and fragmentary forms, in The Silmarillion and Unfinished Tales; this edition is the closest thing to a complete, self-contained version.',
    followUp: ['beren-and-luthien'],
  },
  {
    id: 'beren-and-luthien',
    slug: 'beren-and-luthien',
    name: 'Beren and Lúthien',
    summary:
      'The tale of the mortal Beren and the Elven-princess Lúthien, presented in successive versions that show how the story grew.',
    sourceIds: ['beren-and-luthien'],
    continuity: 'supplementary',
    tags: ['first-age', 'beren', 'luthien', 'silmaril', 'morgoth'],
    title: 'Beren and Lúthien',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '2017',
    workType: 'collection',
    setting:
      'The First Age of Beleriand: the forests of Doriath, the fortress of Tol-in-Gaurhoth and the throne of Morgoth himself.',
    synopsis:
      'This volume traces one beloved tale through the whole span of Tolkien’s writing life. It begins with the early prose of “The Tale of Tinúviel”, moves through the poetry and the later revisions, and shows how a mortal man, Beren, and the Elven-princess Lúthien won a Silmaril from Morgoth’s crown. The central story is simple and profound: Beren and Lúthien’s love survives a quest that outdoes any of the great heroes, and Lúthien, aided by the hound Huan, sings Morgoth himself to sleep. Christopher Tolkien prints the variants largely without harmonising them, so the reader sees the story evolving — a memorial to the tale that his parents had carved on their own tombstone.',
    themes: ['love across the divide of kindreds', 'the power of song and humility', 'repayment of a debt to an elf-lord', 'mortality and mortality’s value'],
    publicationNote:
      'Published posthumously in 2017 by Christopher Tolkien, illustrated by Alan Lee. It is a comparative edition, not a single authoritative novel, and intentionally preserves its competing versions.',
    followUp: ['the-fall-of-gondolin'],
  },
  {
    id: 'the-fall-of-gondolin',
    slug: 'the-fall-of-gondolin',
    name: 'The Fall of Gondolin',
    summary:
      'The earliest legend of the First Age: the hidden city of Gondolin, its betrayal and its destruction.',
    sourceIds: ['fall-of-gondolin'],
    continuity: 'supplementary',
    tags: ['first-age', 'gondolin', 'tuor', 'morgoth', 'beleriand'],
    title: 'The Fall of Gondolin',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '2018',
    workType: 'collection',
    setting:
      'The hidden city of Gondolin in the Encircling Mountains, and the vale of Tumladen in First Age Beleriand.',
    synopsis:
      'Tolkien’s earliest Middle-earth tale, begun during the First World War, tells how Tuor is guided by Ulmo to the secret city of Gondolin, how he weds Idril the Elven-princess, and how the city is at last betrayed by Maeglin and overrun by Morgoth’s dragons and orcs. Christopher Tolkien assembles the versions — from the vivid, archaic early prose through the condensed account in The Silmarillion and the later, unfinished retellings — so that the reader can follow the complete arc of the story. Like Beren and Lúthien, the book is a study of a tale’s growth as much as a narrative in its own right.',
    themes: ['the doom of secrecy and pride', 'betrayal from within', 'hope and flight', 'the earliest roots of the legendarium'],
    publicationNote:
      'Published posthumously in 2018 by Christopher Tolkien, illustrated by Alan Lee. It draws together early prose, poetry and later drafts to give the most complete available account of the city’s ruin.',
    followUp: ['the-silmarillion'],
  },
  {
    id: 'the-adventures-of-tom-bombadil',
    slug: 'the-adventures-of-tom-bombadil',
    name: 'The Adventures of Tom Bombadil',
    summary:
      'A collection of verse, framed as a manuscript of Middle-earth songs and legends found in the Red Book.',
    sourceIds: ['tom-bombadil'],
    continuity: 'supplementary',
    tags: ['poetry', 'third-age', 'bombadil', 'song', 'red-book'],
    title: 'The Adventures of Tom Bombadil',
    author: 'J.R.R. Tolkien',
    published: '1962',
    workType: 'collection',
    setting:
      'Mostly the Shire and its borders, presented as fragments of the Red Book of Westmarch, with a few pieces reaching into legend and dream.',
    synopsis:
      'This is a slim book of verse, framed by a scholarly preface that imagines the poems as Shire tradition collected in the Red Book. The title poem recounts Bombadil’s comic encounters with the river-daughter Goldberry, an alder-man, a badger and a barrow-wight; other poems include “Oliphaunt”, “Errantry”, “The Man in the Moon Stayed Up Too Late” and “The Sea-bell”. It is not a novel and does not advance the war of the Ring, but it deepens the world by showing what ordinary Middle-earth people sang and believed. Some of the poems — Errantry above all — echo into the larger legendarium.',
    themes: ['song as memory', 'the comic and the eerie side by side', 'folklore within a fictional frame', 'the texture of ordinary life'],
    publicationNote:
      'Published in 1962 with illustrations by Pauline Baynes. Several poems had appeared earlier in magazines, and “The Man in the Moon Stayed Up Too Late” and “The Stone Troll” appear in The Lord of the Rings as songs.',
    followUp: ['the-history-of-middle-earth'],
  },
  {
    id: 'the-history-of-middle-earth',
    slug: 'the-history-of-middle-earth',
    name: 'The History of Middle-earth',
    summary:
      'Christopher Tolkien’s twelve-volume scholarly record of how his father wrote, revised and reimagined the legendarium.',
    sourceIds: ['history-of-me'],
    continuity: 'supplementary',
    tags: ['scholarship', 'drafts', 'legendarium', 'textual-history', 'twelve-volumes'],
    title: 'The History of Middle-earth',
    author: 'J.R.R. Tolkien (edited by Christopher Tolkien)',
    published: '1983–1996',
    workType: 'reference',
    setting:
      'A textual rather than geographic setting: the manuscripts, notebooks and typescripts of the legendarium from the 1910s to the 1970s.',
    synopsis:
      'This twelve-volume series is the most complete published window into Tolkien’s creative process. Christopher Tolkien traces the earliest “Book of Lost Tales” through the poetry and prose that became The Silmarillion, the drafting of The Lord of the Rings, the appendices, the Annals and the later “Myths Transformed”, constantly comparing versions and explaining his editorial choices. It is not a story to read straight through like a novel; it is a variorum, invaluable for anyone who wants to know where a given passage came from and how it changed. The final volumes, especially the largely philosophical “Morgoth’s Ring” and “The Peoples of Middle-earth”, extend the legendarium in ways the published Silmarillion does not.',
    themes: ['the instability of texts', 'creation as revision', 'editorial responsibility', 'the unfinished nature of myth'],
    publicationNote:
      'Published between 1983 and 1996 in twelve volumes by Christopher Tolkien. It documents, and partially constitutes, the expanded legendarium; readers should treat it as scholarship and drafts rather than as a single narrative.',
  },
  /* ------------------------------------------------------------------ */
  /* Adaptations — films and television. NOT Tolkien novels.            */
  /* ------------------------------------------------------------------ */
  {
    id: 'the-hobbit-film-trilogy',
    slug: 'the-hobbit-film-trilogy',
    name: 'The Hobbit (film trilogy)',
    summary:
      'Peter Jackson’s three-part film adaptation of The Hobbit — an invented expansion, not a Tolkien novel.',
    sourceIds: ['peter-jackson-hobbit'],
    continuity: 'adaptation',
    tags: ['adaptation', 'film', 'peter-jackson', 'erebor', 'smaug'],
    title: 'The Hobbit (film trilogy)',
    author: 'Peter Jackson (director)',
    published: '2012–2014',
    workType: 'film',
    series: 'The Hobbit',
    studio: 'New Line Cinema / Metro-Goldwyn-Mayer / WingNut Films',
    setting:
      'A film version of the same Wilderland geography as the novel: the Shire, Rivendell, the Misty Mountains, Mirkwood, Lake-town and Erebor.',
    synopsis:
      'These three films — An Unexpected Journey (2012), The Desolation of Smaug (2013) and The Battle of the Five Armies (2014) — are Peter Jackson’s adaptation of Tolkien’s single short novel, expanded to fill a trilogy with material drawn loosely from the appendices and invented wholesale. Important characters such as Tauriel and Alfrid do not appear in Tolkien’s text, and “The Desolation of Smaug” and “The Battle of the Five Armies” are film titles only, not separate books. Watch them as spectacles inspired by the legendarium, and distinguish them sharply from what Tolkien actually wrote.',
    themes: ['fidelity versus invention', 'spectacle and scale', 'the pressure of adapting a single book into three films'],
    publicationNote:
      'A cinematic adaptation, released in three parts between 2012 and 2014. The two later film titles must never be catalogued as Tolkien novels; the entire trilogy corresponds to the one 1937 book.',
  },
  {
    id: 'the-lord-of-the-rings-film-trilogy',
    slug: 'the-lord-of-the-rings-film-trilogy',
    name: 'The Lord of the Rings (film trilogy)',
    summary:
      'Peter Jackson’s acclaimed three-film adaptation of Tolkien’s novel — an interpretation, not the original work.',
    sourceIds: ['peter-jackson-lotr'],
    continuity: 'adaptation',
    tags: ['adaptation', 'film', 'peter-jackson', 'ring', 'minas-tirith'],
    title: 'The Lord of the Rings (film trilogy)',
    author: 'Peter Jackson (director)',
    published: '2001–2003',
    workType: 'film',
    series: 'The Lord of the Rings',
    studio: 'New Line Cinema / WingNut Films',
    setting:
      'A filmed Middle-earth spanning the Shire, Rivendell, Moria, Rohan, Gondor and Mordor, compressed in time for the screen.',
    synopsis:
      'The three films — The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003) — adapt Tolkien’s three-volume novel with unusual care and equally famous departures. Characters and episodes are cut, rearranged or invented: Arwen’s role is enlarged, Tom Bombadil is absent, Faramir, Frodo and Denethor are changed, and the timeline is tightened. The achievement is a coherent, visually rich Middle-earth and a landmark of fantasy cinema. It is an adaptation and an interpretation, however faithful in spirit, and should not be cited as though it were the text.',
    themes: ['adaptation as interpretation', 'compression and invention', 'visualising an imagined world', 'the cost of fidelity'],
    publicationNote:
      'Cinematic adaptation released 2001–2003, later re-released in extended editions. Three films correspond to the three published volumes of one novel; they are not themselves Tolkien’s books.',
  },
  {
    id: 'the-rings-of-power',
    slug: 'the-rings-of-power',
    name: 'The Lord of the Rings: The Rings of Power',
    summary:
      'A streaming television series set in the Second Age — an original adaptation that heavily departs from Tolkien’s texts.',
    sourceIds: ['rings-of-power'],
    continuity: 'adaptation',
    tags: ['adaptation', 'tv', 'second-age', 'amazon', 'numenor', 'sauron'],
    title: 'The Lord of the Rings: The Rings of Power',
    author: 'J.D. Payne & Patrick McKay (showrunners)',
    published: '2022–',
    workType: 'tv',
    studio: 'Amazon MGM Studios / Prime Video',
    setting:
      'A compressed, reordered Second Age: Valinor, the Southlands, Eregion, Khazad-dûm, Númenor and the early realms of Middle-earth.',
    synopsis:
      'This television series draws on the Second Age as sketchily related in The Lord of the Rings’ appendices and the Akallabêth, then invents freely around it. Invented characters such as Arondir, Halbrand and the Stranger, and a drastically compressed timeline, mark it as an original adaptation rather than a retelling. It can be a gateway into curiosity about the Second Age, but its events, chronology and characters should not be confused with Tolkien’s account of Númenor, the forging of the Rings or the Last Alliance.',
    themes: ['adaptation as invention', 'the appeal and danger of prequels', 'canon versus licensed storytelling'],
    publicationNote:
      'A television adaptation premiering in 2022 on Prime Video. It is not a Tolkien work and takes large liberties with Second Age chronology and personnel.',
  },
];

export const readingPaths: ReadingPath[] = [
  {
    id: 'beginner',
    name: 'New to Middle-earth',
    description:
      'A gentle recommended order for a first encounter. Note that the three orderings genuinely differ: publication order is The Hobbit first, then the three Lord of the Rings volumes; chronological order would begin with the First Age material in The Silmarillion; and the recommended order below puts the most approachable storytelling before the mythology. Start small, then decide whether you want depth or breadth.',
    steps: [
      { bookId: 'the-hobbit', note: 'The natural doorway: a self-contained adventure with a light, storytelling voice. No prior knowledge needed.' },
      { bookId: 'fellowship-of-the-ring', note: 'Move straight into the sequel, written for readers who already love Bilbo and the Shire.' },
      { bookId: 'the-two-towers', note: 'The war widens and the story splits in two; keep the momentum rather than pausing for lore.' },
      { bookId: 'the-return-of-the-king', note: 'Finish the quest and read the appendices lightly — they are a doorway to everything else.' },
      { bookId: 'the-silmarillion', note: 'Optional next step. Only now, after the novels, attempt the dense mythology; expect it to feel like a history, not a story.' },
    ],
  },
  {
    id: 'main-story',
    name: 'The Core Quest',
    description:
      'The narrow path through the central narrative only. This is publication order restricted to the quest itself: The Hobbit and the three volumes of The Lord of the Rings. If you read nothing else, this is the story. The order here matches publication order, which is also the order of in-world chronology for these four works.',
    steps: [
      { bookId: 'the-hobbit', note: 'The prelude: how Bilbo found the Ring and how the dwarves reclaimed Erebor.' },
      { bookId: 'fellowship-of-the-ring', note: 'The Ring passes to Frodo; the Fellowship forms and is broken.' },
      { bookId: 'the-two-towers', note: 'The war in Rohan and the long road of Frodo and Sam toward Mordor.' },
      { bookId: 'the-return-of-the-king', note: 'The siege of Gondor, the Ring destroyed in Mount Doom, and the crowning of Aragorn.' },
    ],
  },
  {
    id: 'ancient-world',
    name: 'The Elder Days',
    description:
      'A path into the First Age, the deep past that overshadows the novels. In strict in-world chronology this material comes first, though it was published last — a reminder that chronological order and publication order are not the same thing. Read these after at least The Lord of the Rings, and accept that they are assembled and edited texts rather than a single finished novel.',
    steps: [
      { bookId: 'the-silmarillion', note: 'The framework: the Music of the Ainur, the Silmarils and the wars against Morgoth.' },
      { bookId: 'the-children-of-hurin', note: 'One tragedy from that Age told in full and at close range.' },
      { bookId: 'beren-and-luthien', note: 'The tale of the mortal and the Elf-princess, shown across its many versions.' },
      { bookId: 'the-fall-of-gondolin', note: 'The earliest legend of the hidden city and its ruin.' },
      { bookId: 'unfinished-tales', note: 'Filling the gaps and alternative tellings, with the editor’s commentary as a guide.' },
    ],
  },
  {
    id: 'deep-lore',
    name: 'Deep Lore and Textual History',
    description:
      'For readers who want to see how the legendarium was built, not just what it says. This path deliberately mixes primary stories with editorial scholarship and verse. Be aware that these works are not a chronological sequence; they are a cabinet of drafts, variants and annotations, and reading them means reading about the making of Middle-earth as much as the world itself.',
    steps: [
      { bookId: 'the-silmarillion', note: 'Establish the canonical overview before studying its seams.' },
      { bookId: 'unfinished-tales', note: 'See alternative and expanded accounts, with the first sustained editorial apparatus.' },
      { bookId: 'the-children-of-hurin', note: 'A single, fully assembled narrative built from those drafts.' },
      { bookId: 'the-adventures-of-tom-bombadil', note: 'Verse and folklore that round out the culture behind the histories.' },
      { bookId: 'the-history-of-middle-earth', note: 'The twelve-volume variorum: the deepest available record of revision and invention.' },
    ],
  },
  {
    id: 'theme',
    name: 'Themes and Tragedies',
    description:
      'A comparative path organised by theme rather than by chronology or publication. It pairs the heroic quest with the great First Age tragedies to show recurring ideas — fate and free will, pride and ruin, mercy and endurance — and finishes with an adaptation step so readers can judge for themselves how screen versions handle those same themes. Because it is thematic, it deliberately breaks with both publication order and chronological order.',
    steps: [
      { bookId: 'the-children-of-hurin', note: 'Fate versus free will in its bleakest and clearest form.' },
      { bookId: 'beren-and-luthien', note: 'Love and humility against overwhelming power — the counterweight to Húrin’s doom.' },
      { bookId: 'the-fall-of-gondolin', note: 'Pride, secrecy and the fall of a perfect city.' },
      { bookId: 'the-return-of-the-king', note: 'The same themes resolved in hope: mercy repaid and an age ended well.' },
      { bookId: 'the-rings-of-power', note: 'Optional adaptation frame: compare how a screen production reworks Second Age power and temptation.' },
    ],
  },
];
