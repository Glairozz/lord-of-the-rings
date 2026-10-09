import type { People } from '@/types/content';
import { characterImages, locationImages } from './images';

/**
 * Peoples, cultures, kingdoms, realms, organizations and armies.
 *
 * This collection deliberately keeps conceptual categories apart:
 *  - a `race` is a biological kind (Elves, Dwarves, Orcs …);
 *  - a `culture` is a shared people, language and custom (Noldor, Rohirrim …);
 *  - a `kingdom` or `realm` is a political territory ruled and organised;
 *  - an `organization` is a body with a purpose and members;
 *  - an `army` is a body of forces raised for war, not a people.
 *
 * The `distinction` field states, for every entry, what kind of thing it is
 * and what neighbouring entries it should not be confused with.
 */
export const peoples: People[] = [
  /* ---------------------------------------------------------------- */
  /* Races                                                             */
  /* ---------------------------------------------------------------- */
  {
    id: 'hobbits',
    slug: 'hobbits',
    image: characterImages.frodo,
    name: 'Hobbits',
    aliases: ['Halflings', 'Periannath', 'Kuduk'],
    summary:
      'A small, quietly hardy people of the Shire, fond of food, comfort and peace, whose unobtrusive courage repeatedly decided the fate of the Ring.',
    sourceIds: ['hobbit', 'lotr', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A biological race of small folk, not a kingdom or state. The Shire is the realm in which most hobbits live; “hobbit” describes the people, “the Shire” their homeland.',
    origins:
      'Hobbits are counted among the Children of Ilúvatar, though their first awakening is not recorded in the ancient tales. Their own traditions say they dwelt long ago by the upper reaches of the Anduin before migrating west across the Misty Mountains into Eriador. Tolkien presents their true beginnings as largely unrecorded.',
    culture:
      'An agrarian and parochial culture centred on the family, the village and the calendar of meals. Hobbits value hospitality, genealogy, gardening and the quiet ordering of daily life. They are suspicious of adventure yet capable of sudden, unassuming heroism.',
    history:
      'Divided into three branches — Harfoots, Fallohides and Stoors — they migrated westward and founded the Shire in T.A. 1601 under the protection of the Kings of Arthedain. Largely forgotten by the great powers, they sheltered the One Ring for generations until Frodo and Sam carried it to Mordor. After the War of the Ring the Shire was scoured and then restored, and hobbits were granted their own stewardship of the land.',
    language: 'Westron (the Common Speech), with a hobbit dialect and older words of their own.',
    leaders: ['thain', 'mayor-of-michel-delving', 'bilbo-baggins', 'frodo-baggins'],
    settlements: ['hobbiton', 'bree', 'michel-delving', 'tuckborough', 'buckland'],
    alliances: ['arnor', 'the-shire', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-ring', 'scouring-of-the-shire', 'battle-of-bywater'],
    relatedIds: ['the-shire', 'arnor', 'ents'],
    characterIds: ['bilbo-baggins', 'frodo-baggins', 'samwise-gamgee', 'meriadoc-brandybuck', 'peregrin-took'],
  },
  {
    id: 'elves',
    slug: 'elves',
    image: characterImages.galadriel,
    name: 'Elves',
    aliases: ['Quendi', 'Eldar', 'Firstborn'],
    summary:
      'The Firstborn Children of Ilúvatar, deathless and beautiful, whose long history spans the awakening at Cuiviénen, the wars of Beleriand and the slow fading of the Third Age.',
    sourceIds: ['silmarillion', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A race of the Children of Ilúvatar, not a single kingdom. Elves are divided into many kindreds (Noldor, Sindar, Silvan and others) and live in separate realms such as Rivendell and Lothlórien.',
    origins:
      'The Elves awoke at Cuiviénen under the stars in the Elder Days, the first of the Children of Ilúvatar to come into being. The Valar summoned them to Aman; some went west and were counted the Eldar, others remained in Middle-earth. Their fate is bound to Arda until the world’s end.',
    culture:
      'A culture of memory, craft and song. Elves do not die of age but can be slain or fade as the ages wear on; many are gifted in lore, music, healing and the making of things. Pride, grief and the longing for the Sea run through their stories.',
    history:
      'From Cuiviénen and the Great Journey, through the kinslaying and the exile of the Noldor, the Siege of Angband, the ruin of Beleriand and the War of Wrath, the Elves never wholly left the story of Arda. In the Second and Third Ages they held the great realms of Eregion, Lindon, Rivendell, Lothlórien and Mirkwood, and with the passing of the Three Rings departed at last into the West.',
    language: 'Quenya and Sindarin are chief among the Elven tongues; many other dialects existed.',
    leaders: ['elrond', 'galadriel', 'celeborn', 'gil-galad', 'thranduil', 'thingol'],
    settlements: ['rivendell', 'lothlorien', 'grey-havens', 'mirkwood', 'eregion', 'gondolin'],
    alliances: ['dunedain', 'gondor', 'arnor', 'the-white-council', 'last-alliance'],
    conflicts: ['war-of-the-jewels', 'battle-of-the-last-alliance', 'war-of-the-ring', 'fall-of-gondolin'],
    relatedIds: ['noldor', 'sindar', 'silvan-elves', 'men', 'dwarves'],
    characterIds: ['elrond', 'galadriel', 'legolas', 'arwen', 'glorfindel', 'thranduil'],
  },
  {
    id: 'dwarves',
    slug: 'dwarves',
    image: characterImages.thorin,
    name: 'Dwarves',
    aliases: ['Khazâd', 'Naugrim', 'Durin’s Folk'],
    summary:
      'A stone-hewing race of great craft and endurance, made by Aulë before the Children awoke and famed for their smithing, their halls and their long grudges.',
    sourceIds: ['silmarillion', 'hobbit', 'lotr'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A race shaped by Aulë, not a kingdom. The dwarves are the people; Erebor, Khazad-dûm and the Iron Hills are the halls and kingdoms they built.',
    origins:
      'Aulë the Smith made the Seven Fathers of the Dwarves in secret, impatient for the coming of the Children of Ilúvatar. Ilúvatar accepted them but ordained they should sleep until after the Elves awoke. Durin was the eldest of the Fathers and the founder of the line that ruled Khazad-dûm.',
    culture:
      'A culture of stone, metal and oath. Dwarves are miners, masons and smiths without peer, covetous of beautiful things, loyal in friendship and unforgiving in feud. They remember every wrong done to them, and their songs are full of labour, gold and grief.',
    history:
      'From the mansions of Khazad-dûm and the halls of the Ered Luin, the Dwarves spread through the Misty Mountains and the Lonely Mountain. They warred with dragons and Orcs, lost Khazad-dûm to the Balrog, and were driven from Erebor by Smaug. The quest of Thorin Oakenshield reclaimed the mountain, and in the War of the Ring dwarves fought beside Elves and Men at the Battle of Dale.',
    language: 'Khuzdul, kept largely secret, alongside the Common Speech and the cirth runes.',
    leaders: ['durin', 'thorin-oakenshield', 'dain-ironfoot', 'balin'],
    settlements: ['khazad-dum', 'erebor', 'iron-hills', 'ered-luin', 'grey-mountains'],
    alliances: ['men', 'elves', 'the-fellowship-of-the-ring', 'bardings'],
    conflicts: ['battle-of-azanulbizar', 'war-of-the-dwarves-and-orcs', 'battle-of-five-armies', 'battle-of-dale'],
    relatedIds: ['durins-folk', 'erebor', 'men', 'elves'],
    characterIds: ['gimli', 'thorin-oakenshield', 'balin', 'durin', 'dain-ironfoot'],
  },
  {
    id: 'men',
    slug: 'men',
    image: characterImages.aragorn,
    name: 'Men',
    aliases: ['Edain', 'Hildor', 'Secondborn', 'Aftercomers'],
    summary:
      'The Secondborn Children of Ilúvatar, mortal and brief-lived, whose kingdoms and choices dominate the later ages of Middle-earth.',
    sourceIds: ['silmarillion', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'The mortal race as a whole, not one kingdom or culture. Númenóreans, Rohirrim and Bardings are cultures of Men; Gondor or Rohan are the kingdoms some of them built.',
    origins:
      'Men awoke in Hildórien in the first years of the Sun, after the Elves. They were the Secondborn, whose gift is death and departure beyond the circles of the world. Those who came west and allied with the Elves against Morgoth were called the Edain.',
    culture:
      'Enormously varied: nomadic hunters, sea-kings, horse-lords and city-dwellers alike. Mortality shapes their art and ambition, giving rise to both great courage and the fear of death that Sauron exploited.',
    history:
      'The Edain of the First Age earned the island of Númenor as reward. Its people rose to unmatched power, then fell through pride under Sauron’s influence, and the world was changed. Survivors founded Arnor and Gondor in Middle-earth. Later peoples — Rohirrim, Bardings and countless others — filled the lands as the Elves faded, until the Dominion of Men began in the Fourth Age.',
    language: 'Many tongues; Westron became the common speech across the west of Middle-earth.',
    leaders: ['elros', 'elendil', 'isildur', 'anarion', 'aragorn', 'theoden'],
    settlements: ['numenor', 'gondor', 'arnor', 'rohan', 'dale', 'bree'],
    alliances: ['elves', 'dwarves', 'the-fellowship-of-the-ring', 'last-alliance'],
    conflicts: ['war-of-the-jewels', 'war-of-the-ring', 'battle-of-the-pelennor-fields', 'battle-of-the-last-alliance'],
    relatedIds: ['dunedain', 'numenoreans', 'rohirrim', 'bardings', 'gondor'],
    characterIds: ['aragorn', 'boromir', 'faramir', 'theoden', 'eomer', 'beren'],
  },
  {
    id: 'orcs',
    slug: 'orcs',
    image: characterImages.azog,
    name: 'Orcs',
    aliases: ['Yrch', 'Goblins', 'Uruk-hai', 'Uruks'],
    summary:
      'A cruel and warlike race bred or corrupted into the service of the Dark Powers, the standing soldiery of Morgoth and Sauron.',
    sourceIds: ['silmarillion', 'lotr', 'history-of-me'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A race in its own right as presented in the texts, though its origin is debated. Orcs are the people; Isengard, Mordor and the armies they form are political or military bodies, not the race itself.',
    origins:
      'The origin of the Orcs is genuinely uncertain and Tolkien revisited it repeatedly. The Silmarillion states that Morgoth bred and corrupted Elves into Orcs, but Tolkien later doubted whether Orcs could have souls or be wholly derived from Elves, and considered other accounts. This encyclopedia records the question as unresolved rather than asserting one answer.',
    culture:
      'Orcish society is militarised, fractious and dominated by fear and force. Tribes and captains vie for favour, and loyalty is generally to the strongest leader or the promise of plunder. Their language and customs are little recorded, and much of what is shown is filtered through the hostility of their enemies.',
    history:
      'Bred in the Elder Days, Orcs served Morgoth through the wars of Beleriand and then Sauron in Mordor and beyond. They held the Misty Mountains and founded Gundabad and Moria’s later occupation. In the Third Age their hosts mustered for the War of the Ring, while Saruman bred the Uruk-hai at Isengard. They were broken but never wholly destroyed.',
    language: 'The Black Speech in Sauron’s service, along with debased Common Speech and many tribal jargons.',
    leaders: ['sauron', 'witch-king-of-angmar', 'azog', 'bolg', 'grishnakh', 'ugluk'],
    settlements: ['mordor', 'isengard', 'gundabad', 'cirith-ungol', 'minas-morgul'],
    alliances: ['mordor', 'isengard'],
    conflicts: ['war-of-the-ring', 'battle-of-five-armies', 'battle-of-the-pelennor-fields'],
    relatedIds: ['mordor', 'isengard', 'the-nazgul', 'men'],
    characterIds: ['sauron', 'witch-king-of-angmar', 'azog', 'bolg', 'ugluk', 'gorbag'],
  },
  {
    id: 'ents',
    slug: 'ents',
    name: 'Ents',
    aliases: ['Onodrim', 'Shepherds of the Trees', 'Ents of Fangorn'],
    summary:
      'Ancient tree-herds created to guard the forests, slow of speech and thought, who awoke to march against Isengard in the War of the Ring.',
    sourceIds: ['lotr', 'silmarillion', 'history-of-me'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A distinct created race, not a forest or a kingdom. Fangorn is the wood where they dwell; the Ents themselves are the people, and Treebeard is one of them.',
    origins:
      'The Ents were made, according to Treebeard, when the thought of Yavanna moved Eru: she feared for the trees that Aulë’s children would fell, and the Ents were created as their shepherds. They are therefore older than many of the later peoples and were already ancient before the Third Age.',
    culture:
      'Deliberate, patient and deeply rooted in memory. Ents speak in long, resonant phrases and take counsel slowly; the Entmoot is their assembly. They tend the forests and remember the names of trees, but Entwives, who loved gardens and growing things, were lost to them, and no new Ents are born.',
    history:
      'Ents guarded the woods through the ages, retreating as forests shrank. In T.A. 3019 the Entmoot resolved to attack Isengard, and the Ents broke the dam and drowned the fortress, ending Saruman’s power. Their future is uncertain: Treebeard believed the Ents were fading, their wives lost and their race without offspring.',
    language: 'Entish, a slow and ancient tongue, along with learned Elvish and the Common Speech.',
    leaders: ['treebeard'],
    settlements: ['fangorn'],
    alliances: ['the-fellowship-of-the-ring', 'rohan'],
    conflicts: ['war-of-the-ring', 'battle-of-isengard'],
    relatedIds: ['fangorn', 'isengard', 'elves'],
    characterIds: ['treebeard', 'meriadoc-brandybuck', 'peregrin-took'],
  },
  {
    id: 'istari',
    slug: 'istari',
    image: characterImages.gandalf,
    name: 'Istari',
    aliases: ['Wizards', 'the Five Wizards', 'Heren Istarion'],
    summary:
      'The five Wizards sent from the West in the guise of old men to move the free peoples against Sauron, of whom only Gandalf remained faithful to the end.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    kind: 'organization',
    distinction:
      'A small purposeful order of Maiar clothed in mortal form, not a race or kingdom. Gandalf, Saruman and Radagast are individual members of this order, not a people; the peoples they guide are Men, Elves and Hobbits.',
    origins:
      'The Istari were Maiar of the Valar, sent about T.A. 1000 by the Valar, at the prompting of Manwë and with Eru’s sanction, to contest Sauron by counsel rather than by force. Saruman the White, Gandalf the Grey, Radagast the Brown and the two Blue Wizards (Alatar and Pallando) came to Middle-earth; their true names and natures were hidden.',
    culture:
      'Bound in the bodies of elderly Men, the Istari were forbidden to dominate others by power or fear, and were commanded to persuade and to inspire. They wielded subtle arts, kept counsel and travelled widely, but their mission was fragile against pride and weariness.',
    history:
      'For a thousand years the Wizards worked against the Shadow. Saruman, chief of the order, grew proud, studied the Enemy’s craft and fell, becoming a tyrant of Isengard. Gandalf remained true, helped to found the White Council, and was reborn as the White after Moria, guiding the free peoples to the fall of Sauron. Radagast served the beasts and birds; the Blue Wizards went into the East and their fates are debated.',
    language: 'They spoke the tongues of the peoples they served, including Westron and Elvish.',
    leaders: ['saruman', 'gandalf'],
    settlements: ['isengard', 'rosgobel'],
    alliances: ['the-white-council', 'the-fellowship-of-the-ring', 'elves', 'men'],
    conflicts: ['war-of-the-ring', 'council-of-elrond'],
    relatedIds: ['the-white-council', 'isengard', 'gandalf', 'saruman'],
    characterIds: ['gandalf', 'saruman', 'radagast', 'alatar', 'pallando'],
  },
  {
    id: 'dragons',
    slug: 'dragons',
    image: characterImages.smaug,
    name: 'Dragons',
    aliases: ['Great Worms', 'Drakes', 'Urulóki'],
    summary:
      'Vast winged and fire-breathing serpents bred by Morgoth, the most terrible creatures of the Elder Days and the ruin of dwarven and mannish kingdoms alike.',
    sourceIds: ['hobbit', 'silmarillion', 'children-of-hurin'],
    continuity: 'tolkien-texts',
    kind: 'race',
    distinction:
      'A species of great reptiles, not a kingdom or a faction. Glaurung and Smaug are individual dragons, not nations; the “Worm” of the Lonely Mountain is one member of the race.',
    origins:
      'Dragons were bred by Morgoth in Angband in the First Age. Glaurung, the Father of Dragons, was the first to crawl from the pits, and later winged dragons were loosed in the War of Wrath. Their origin is one of deliberate making and corruption rather than natural awakening.',
    culture:
      'Dragons are solitary, proud and covetous, accumulating hoards and guarding them jealously. The great worms are cunning, capable of speech and deception, and some command a dreadful hypnotic power. They produce few offspring and are ruled by appetite rather than any society.',
    history:
      'Glaurung devastated Beleriand in the First Age and was slain by Túrin’s sword and Turin’s own hand, and by Túrin’s story. Winged dragons fought in the War of Wrath. In the Third Age Smaug destroyed Dale and Erebor and ruled the Lonely Mountain until Bard the Bowman slew him. Dragons are said to persist in the far North though few are seen.',
    language: 'Dragons spoke, and their speech was understood by the wise; the language itself is not preserved.',
    leaders: ['glaurung', 'smaug'],
    settlements: ['angband', 'erebor', 'withered-heath'],
    alliances: ['mordor'],
    conflicts: ['battle-of-five-armies', 'fall-of-gondolin', 'war-of-wrath'],
    relatedIds: ['erebor', 'dwarves', 'men'],
    characterIds: ['smaug', 'glaurung', 'bard-the-bowman', 'thorin-oakenshield'],
  },

  /* ---------------------------------------------------------------- */
  /* Elven kindreds (culture)                                          */
  /* ---------------------------------------------------------------- */
  {
    id: 'noldor',
    slug: 'noldor',
    image: characterImages.elrond,
    name: 'Noldor',
    aliases: ['Deep Elves', 'Golodhrim', 'Noldoli'],
    summary:
      'The second great kindred of the Eldar, master craftsmen and lore-masters, whose exile and wars against Morgoth shaped the whole history of the First Age.',
    sourceIds: ['silmarillion', 'unfinished-tales', 'history-of-me'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A cultural kindred of the Elven race, not a realm. They founded and held many kingdoms — Gondolin, Nargothrond, Eregion — which are political places, whereas “Noldor” names the people and their shared heritage.',
    origins:
      'The Noldor were the second kindred to journey to Aman, led by Finwë. They learned much from Aulë and became the most skilled of the Eldar in smithcraft and lore. Fëanor’s pride and the theft of the Silmarils drove a great part of them back to Middle-earth in exile.',
    culture:
      'A proud, inventive and learned people, devoted to craft, language and the making of beautiful things. Their smiths created the palantíri and, under Celebrimbor, the Rings of Power. The oath and the kinslaying darkened their reputation, and their history is one of brilliance shadowed by grief.',
    history:
      'From Valinor the exiled Noldor returned to Beleriand, raised the Siege of Angband, and built the hidden kingdoms of Gondolin and Nargothrond. They suffered defeat in the Dagor Bragollach and the Nirnaeth Arnoediad, and their realms fell one by one. Survivors remained in Middle-earth and founded Eregion and later Rivendell and Lothlórien’s noble houses; Gil-galad was their last great king.',
    language: 'Quenya, the ancient speech of the Noldor, and later Sindarin in Middle-earth.',
    leaders: ['feanor', 'fingolfin', 'turgon', 'gil-galad', 'celebrimbor', 'galadriel'],
    settlements: ['gondolin', 'nargothrond', 'eregion', 'rivendell', 'grey-havens'],
    alliances: ['sindar', 'silvan-elves', 'men', 'dunedain'],
    conflicts: ['war-of-the-jewels', 'kinslaying', 'fall-of-gondolin'],
    relatedIds: ['elves', 'sindar', 'silvan-elves', 'rivendell'],
    characterIds: ['galadriel', 'elrond', 'glorfindel', 'celebrimbor', 'gil-galad', 'feanor'],
  },
  {
    id: 'sindar',
    slug: 'sindar',
    image: characterImages.celeborn,
    name: 'Sindar',
    aliases: ['Grey Elves', 'Grey-elves of Doriath'],
    summary:
      'The Grey Elves of Beleriand, the great kindred who remained in Middle-earth under Thingol and Melian and whose tongue became the common Elvish speech of later ages.',
    sourceIds: ['silmarillion', 'unfinished-tales', 'beren-and-luthien'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A cultural kindred of the Elven race, distinct from a kingdom. Doriath was the realm Thingol ruled; the Sindar are the people, and their descendants live on in Rivendell, Lothlórien and Greenwood.',
    origins:
      'The Sindar were Eldar who set out on the Great Journey but did not cross the Sea, lingering in Beleriand under Elu Thingol and the Maia Melian. They were thus named the Grey Elves, neither of the Light nor of the Dark, and they were the first to meet the Dwarves and to forge links with the Edain.',
    culture:
      'A refined woodland and courtly culture of music, song and woodcraft, less obsessed with craft than the Noldor but steeped in ancient memory. Thingol’s court at Menegroth was famed for its beauty, and Sindarin became the everyday tongue of most Elves who remained in Middle-earth.',
    history:
      'The Sindar of Doriath were drawn into the wars against Morgoth through the Silmaril of Beren and Lúthien, and Doriath was destroyed by the Sons of Fëanor. Survivors carried Sindarin culture to Lindon, Eregion, Rivendell and Lothlórien. Celeborn and Thranduil are counted among their line.',
    language: 'Sindarin, the most widely spoken Elvish tongue of the later ages.',
    leaders: ['thingol', 'melian', 'celeborn', 'thranduil', 'cirdan'],
    settlements: ['doriath', 'menegroth', 'rivendell', 'lothlorien', 'mirkwood', 'grey-havens'],
    alliances: ['noldor', 'men', 'dwarves'],
    conflicts: ['war-of-the-jewels', 'sack-of-doriath', 'fall-of-gondolin'],
    relatedIds: ['elves', 'noldor', 'silvan-elves', 'lothlorien'],
    characterIds: ['legolas', 'thranduil', 'celeborn', 'elrond', 'luthien'],
  },
  {
    id: 'silvan-elves',
    slug: 'silvan-elves',
    image: characterImages.haldir,
    name: 'Silvan Elves',
    aliases: ['Wood-elves', 'Woodland Elves', 'Tawarwaith'],
    summary:
      'The woodland Elves of Mirkwood and Lothlórien, largely of Nandorin descent, who loved the forests and never journeyed to the West.',
    sourceIds: ['hobbit', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A cultural kindred of the Elven race, not a realm. Mirkwood and Lothlórien are the realms; the Silvan Elves are the people who dwell there, ruled in time by Sindarin and Noldorin lords.',
    origins:
      'Many of the Silvan Elves descended from the Nandor, Elves who turned back from the Great Journey and lingered in the woods, and from kindreds who never went west. They settled the great forests of Rhovanion and were later joined by Sindarin and Noldorin rulers.',
    culture:
      'A woodland culture of hunting, archery and song, more secluded and less lordly than the Noldor. The Silvan Elves of Mirkwood lived in caverns and halls beneath the trees, and those of Lothlórien in the great city of the mallorn trees. They were suspicious of strangers yet fierce in defence.',
    history:
      'The Silvan Elves of Greenwood the Great became the Woodland Realm under Thranduil, reduced in later years to the north of a forest darkened by Sauron and renamed Mirkwood. In Lothlórien, Galadriel and Celeborn ruled the Silvan people. Their forces fought at the Battle of Five Armies and harried Dol Guldur during the War of the Ring.',
    language: 'Sindarin, adopted widely, with Silvan dialects and Elvish songs of their own.',
    leaders: ['thranduil', 'galadriel', 'celeborn', 'oropher'],
    settlements: ['mirkwood', 'lothlorien', 'greenwood'],
    alliances: ['sindar', 'noldor', 'elves', 'the-white-council'],
    conflicts: ['battle-of-five-armies', 'war-of-the-ring', 'battle-of-dol-guldur'],
    relatedIds: ['elves', 'sindar', 'noldor', 'lothlorien'],
    characterIds: ['legolas', 'thranduil', 'galadriel', 'tauriel'],
  },

  /* ---------------------------------------------------------------- */
  /* Dwarven house (culture)                                           */
  /* ---------------------------------------------------------------- */
  {
    id: 'durins-folk',
    slug: 'durins-folk',
    image: characterImages.durin,
    name: 'Durin’s Folk',
    aliases: ['Longbeards', 'Durin’s line', 'House of Durin'],
    summary:
      'The eldest house of the Dwarves, descended from Durin the Deathless and long seated at Khazad-dûm and later at the Lonely Mountain.',
    sourceIds: ['hobbit', 'lotr', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A cultural house or lineage within the Dwarven race, not a kingdom. Erebor and Khazad-dûm are the kingdoms and halls that Durin’s Folk ruled; the house itself is the ancestral people.',
    origins:
      'Durin was the eldest of the Seven Fathers of the Dwarves made by Aulë, and it was said he slept alone and woke to found his people in the halls beneath Mount Gundabad and then Khazad-dûm. He was called the Deathless because the Dwarves believed he was reborn in his heirs.',
    culture:
      'The Longbeards are the archetypal dwarven house: master miners and smiths, keepers of runes and genealogies, fiercely loyal to kin and oath. Their kings wear the beard and heirlooms of the line, and their halls are works of stone-craft and treasure.',
    history:
      'Durin’s Folk ruled Khazad-dûm for ages until the Balrog was loosed in T.A. 1980 and the realm was lost. Thráin I and his heirs went north and founded Erebor, which became their greatest kingdom until Smaug drove them out. Thorin Oakenshield retook the mountain, and Dáin II Ironfoot and his people held the North in the War of the Ring.',
    language: 'Khuzdul, the secret dwarven tongue; Westron in daily dealings.',
    leaders: ['durin', 'thrain', 'thror', 'thorin-oakenshield', 'dain-ironfoot'],
    settlements: ['khazad-dum', 'erebor', 'iron-hills', 'grey-mountains'],
    alliances: ['bardings', 'elves', 'men', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-dwarves-and-orcs', 'battle-of-five-armies', 'battle-of-dale'],
    relatedIds: ['dwarves', 'erebor', 'men'],
    characterIds: ['durin', 'thorin-oakenshield', 'balin', 'dain-ironfoot', 'gloin', 'gimli'],
  },

  /* ---------------------------------------------------------------- */
  /* Peoples of Men (culture)                                          */
  /* ---------------------------------------------------------------- */
  {
    id: 'dunedain',
    slug: 'dunedain',
    image: characterImages.faramir,
    name: 'Dúnedain',
    aliases: ['Men of the West', 'Rangers of the North'],
    summary:
      'The long-lived descendants of Númenor in Middle-earth, the remnant of Arnor in the North and the royal line that produced Aragorn.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A culture and lineage of Men, not a kingdom. Arnor and Gondor were the kingdoms the Dúnedain founded; “Dúnedain” names the people and their noble descent, and the Northern Rangers are the dwindled remnant of Arnor’s people.',
    origins:
      'The Dúnedain were the Faithful Númenóreans who escaped the Downfall and were led by Elendil and his sons to Middle-earth, where they founded Arnor and Gondor. Their line was long-lived and gifted through the mingling of Númenórean and Elvish blood in Elros.',
    culture:
      'A culture of high lineage, ancient lore and grim duty. The Northern Dúnedain declined into the secret Rangers who guarded Eriador unnoticed, while their southern kin ruled Gondor. They kept the memory of Númenor and the hope of a returning king.',
    history:
      'Elendil and his heirs built Arnor and Gondor after the Downfall. Arnor was destroyed by Angmar, and its survivors became wandering Rangers; Gondor endured through the Stewards. Aragorn, heir of Isildur, reclaimed the kingship and was crowned Elessar after the War of the Ring, reuniting the kingdoms.',
    language: 'Westron, with Sindarin preserved among the high Dúnedain.',
    leaders: ['elendil', 'isildur', 'anarion', 'aragorn'],
    settlements: ['arnor', 'gondor', 'minas-tirith', 'annuminas', 'bree'],
    alliances: ['elves', 'gondor', 'arnor', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-ring', 'battle-of-the-last-alliance', 'angmar-wars'],
    relatedIds: ['numenoreans', 'men', 'gondor', 'arnor'],
    characterIds: ['aragorn', 'elendil', 'isildur', 'arwen', 'halbarad'],
  },
  {
    id: 'numenoreans',
    slug: 'numenoreans',
    image: characterImages.denethor,
    name: 'Númenóreans',
    aliases: ['Men of Númenor', 'Kings of Men', 'Dúnedain of Númenor'],
    summary:
      'The great sea-going people of the island kingdom of Númenor, blessed with long life and great power, whose pride brought about the Downfall.',
    sourceIds: ['silmarillion', 'unfinished-tales', 'history-of-me'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A culture of Men, not the island realm itself. Númenor is the kingdom; the Númenóreans are its people, whose descendants in Middle-earth became the Dúnedain.',
    origins:
      'The Númenóreans descended from the Edain who fought against Morgoth, rewarded by the Valar with the island of Elenna and a lifespan far beyond that of other Men. Elros, son of Eärendil and Elwing, chose mortality and became their first king.',
    culture:
      'A maritime civilisation of navigators, builders and loremasters, sitting between the wisdom of the Elves and the pride of Men. At its height Númenor explored the coasts of Middle-earth and taught and commanded its peoples; at its fall it turned to Sauron’s counsel and the worship of the Darkness.',
    history:
      'For an age the Númenóreans were the mightiest of Men. Tar-Minastir helped defeat Sauron, and later kings grew arrogant and forbade the Elvish tongues. Ar-Pharazôn humbled Sauron but was corrupted by him, and in S.A. 3319 he assailed Valinor; Númenor was drowned and the world made round. The Faithful under Elendil survived to build Arnor and Gondor.',
    language: 'Adûnaic, the native tongue, alongside Sindarin and Quenya among the learned.',
    leaders: ['elros', 'tar-minastir', 'ar-pharazon', 'elendil'],
    settlements: ['numenor', 'armenenelos', 'romenna'],
    alliances: ['elves', 'gil-galad'],
    conflicts: ['war-of-sauron', 'downfall-of-numenor', 'battle-of-the-last-alliance'],
    relatedIds: ['dunedain', 'men', 'gondor', 'arnor'],
    characterIds: ['elendil', 'isildur', 'ar-pharazon', 'elros'],
  },
  {
    id: 'rohirrim',
    slug: 'rohirrim',
    image: characterImages.theoden,
    name: 'Rohirrim',
    aliases: ['Horse-lords', 'Eorlingas', 'Men of Rohan'],
    summary:
      'The horse-loving people of Rohan, descended from the Éothéod of the North, famed for their cavalry and their loyalty to Gondor.',
    sourceIds: ['lotr', 'unfinished-tales', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A culture and people of Men, not a kingdom. Rohan is the land and political realm; the Rohirrim are the people. The Muster of Rohan is their army, an entirely separate thing again.',
    origins:
      'The Rohirrim were the Éothéod, a people of the northern vales who came south and were granted the land of Calenardhon by the Steward Cirion of Gondor in T.A. 2510 as reward for their aid at the Field of Celebrant. They named the land the Riddermark and themselves the Eorlingas after Eorl the Young.',
    culture:
      'A pastoral, martial and open-handed society centred on horses, mead-halls and the bonds of oath and kin. Their kings ride at the head of their riders, their songs are of valour and mourning, and hospitality to strangers is a sacred duty.',
    history:
      'From Eorl the Young to Helm Hammerhand and Theoden, the Rohirrim defended their plains against Dunlendings, Orcs and Saruman. In the War of the Ring they rode to the rescue at Helm’s Deep and then, led by Theoden, broke the siege of Minas Tirith on the Pelennor Fields, where the king fell. Éomer became king and renewed their oath to the Reunited Kingdom.',
    language: 'The Rohirric tongue, related to the northern speech of the Éothéod, with Westron for dealings abroad.',
    leaders: ['eorl-the-young', 'helm-hammerhand', 'theoden', 'eomer', 'eowyn'],
    settlements: ['edoras', 'helms-deep', 'aldeburg', 'dunharrow'],
    alliances: ['gondor', 'the-fellowship-of-the-ring', 'ents'],
    conflicts: ['battle-of-helms-deep', 'battle-of-the-pelennor-fields', 'war-of-the-ring'],
    relatedIds: ['rohan', 'muster-of-rohan', 'men', 'gondor'],
    characterIds: ['theoden', 'eomer', 'eowyn', 'grima-wormtongue'],
  },
  {
    id: 'bardings',
    slug: 'bardings',
    image: locationImages.lakeTown,
    name: 'Bardings',
    aliases: ['Men of Dale', 'Men of the Lonely Mountain'],
    summary:
      'The people of Dale by the Lonely Mountain, led in legend by Bard the Bowman who slew Smaug, and restored to prosperity beside the dwarves of Erebor.',
    sourceIds: ['hobbit', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'culture',
    distinction:
      'A culture of Men, not a kingdom. Dale is the town and lordship they built; the Bardings are the people, related to the Northmen of Rhovanion and distinct from the Rohirrim though both descend from northern Mannish stock.',
    origins:
      'The Bardings were the Men of Dale and the surrounding lands, akin to the Northmen of Rhovanion and to the Éothéod. Their town of Dale grew rich on trade with Erebor until Smaug destroyed both. Girion was their last lord before the dragon came.',
    culture:
      'A trading and valley culture of merchants, archers and craftsmen, friendly with the Dwarves of the Mountain. The Barding people prized the bow, the forge and free dealings, and rebuilt a prosperous town under the shadow of Erebor.',
    history:
      'Girion’s Dale fell to Smaug. Generations later Bard the Bowman, heir of Girion, slew the dragon during the attack on Lake-town, and after the Battle of Five Armies he became King of restored Dale. His descendants, including Brand, ruled there in the War of the Ring, when the Men of Dale and the Dwarves of Erebor stood together against Sauron’s northern armies.',
    language: 'A northern Mannish speech akin to that of the Rohirrim, with Westron in trade.',
    leaders: ['girion', 'bard-the-bowman', 'brand'],
    settlements: ['dale', 'lake-town', 'esgaroth'],
    alliances: ['dwarves', 'durins-folk', 'elves', 'the-fellowship-of-the-ring'],
    conflicts: ['battle-of-five-armies', 'battle-of-dale'],
    relatedIds: ['men', 'dwarves', 'erebor', 'rohirrim'],
    characterIds: ['bard-the-bowman', 'brand', 'thorin-oakenshield'],
  },

  /* ---------------------------------------------------------------- */
  /* Kingdoms and realms                                               */
  /* ---------------------------------------------------------------- */
  {
    id: 'gondor',
    slug: 'gondor',
    image: locationImages.minasTirith,
    name: 'Gondor',
    aliases: ['South-kingdom', 'Kingdom of the South', 'Reunited Kingdom (with Arnor)'],
    summary:
      'The great Dúnedain kingdom in the south, heir of Númenor, whose cities of Minas Tirith and Osgiliath stood against Mordor for an age.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political kingdom, not a people. Its citizens were largely Dúnedain and later Men of mixed blood; the Dúnedain are the culture, Gondor is the state and its territory.',
    origins:
      'Founded in S.A. 3320 by Isildur and Anárion, sons of Elendil, after the Downfall of Númenor. Its first capital was Osgiliath, and it grew to dominate the south of Middle-earth, planting the fortress of Minas Ithil and the tower of Minas Anor.',
    culture:
      'A proud, orderly and learned realm, conscious of its Númenórean heritage. It preserved Elvish lore, stone-work and the palantíri, but declined over the Third Age as its line failed and its watch on Mordor faltered.',
    history:
      'Gondor fought Sauron throughout the Second Age and joined the Last Alliance that overthrew him. In the Third Age it was weakened by kin-strife, plague and the loss of Minas Ithil to the Nazgûl. Ruled by Stewards after the line of kings failed, it held Mordor at bay until the War of the Ring, and was saved at the Pelennor Fields. Aragorn was crowned there as King Elessar, reuniting Gondor and Arnor.',
    language: 'Westron, with Sindarin kept for ceremony and high matters.',
    leaders: ['isildur', 'anarion', 'earnil', 'denethor', 'aragorn'],
    settlements: ['minas-tirith', 'osgiliath', 'dol-amroth', 'pelargir', 'minas-ithil'],
    alliances: ['arnor', 'rohan', 'elves', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-ring', 'battle-of-the-pelennor-fields', 'battle-of-the-last-alliance'],
    relatedIds: ['arnor', 'dunedain', 'rohan', 'mordor'],
    characterIds: ['aragorn', 'boromir', 'faramir', 'denethor', 'isildur'],
  },
  {
    id: 'arnor',
    slug: 'arnor',
    name: 'Arnor',
    aliases: ['North-kingdom', 'Kingdom of the North'],
    summary:
      'The northern Dúnedain kingdom founded by Elendil, long divided and finally destroyed by Angmar, leaving only Rangers and ruins behind.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political kingdom, not a people. The Dúnedain of the North were its people; Arnor was the state, later split into Arthedain, Cardolan and Rhudaur.',
    origins:
      'Elendil founded Arnor in S.A. 3320 when he came to Middle-earth, making Annúminas his capital. On his death it passed to Isildur and his heirs, and for a time the North-kingdom was the chief of the Dúnedain realms.',
    culture:
      'A northern realm of Dúnedain lords, with the palantíri of Annúminas and Amon Sûl and close ties to the Elves of Lindon and Rivendell. Its people declined in numbers and power over the centuries.',
    history:
      'After Isildur’s death the kingdom weakened. Under Eärendur it was divided among his sons into Arthedain, Cardolan and Rhudaur, which quarrelled and fell to the Witch-king of Angmar. Arthedain lasted longest and was destroyed in T.A. 1974, and the last king Arvedui was lost. The line survived in the Chieftains of the Dúnedain, from whom Aragorn descended, and the Reunited Kingdom restored the North.',
    language: 'Westron, with Sindarin among the Dúnedain.',
    leaders: ['elendil', 'isildur', 'valandil', 'arvedui', 'arainarth'],
    settlements: ['annuminas', 'fornost', 'amon-sul', 'bree'],
    alliances: ['gondor', 'rivendell', 'the-shire', 'elves'],
    conflicts: ['angmar-wars', 'war-of-the-ring'],
    relatedIds: ['gondor', 'dunedain', 'the-shire'],
    characterIds: ['aragorn', 'elendil', 'isildur', 'arwen'],
  },
  {
    id: 'rohan',
    slug: 'rohan',
    image: locationImages.edoras,
    name: 'Rohan',
    aliases: ['Riddermark', 'Calenardhon', 'Mark of the Riders'],
    summary:
      'The horse-realm of the Rohirrim between the White Mountains and the Entwash, sworn ally of Gondor and bulwark of the West.',
    sourceIds: ['lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political kingdom, not a people. The Rohirrim are the culture that lives there; Rohan is the land and state. The Muster of Rohan is the army raised by that state.',
    origins:
      'Rohan was the former Gondorian province of Calenardhon, granted by Steward Cirion to Eorl the Young and the Éothéod in T.A. 2510 for their help at the Field of Celebrant. The name means “land of the horse-lords” in the Elvish tongues.',
    culture:
      'A kingdom of open plains, horse-breeding and mead-halls, bound by oaths of loyalty. Its kings rule from Edoras and its great fortress is Helm’s Deep; the Rohirrim honour courage, kinship and generosity.',
    history:
      'Rohan endured raids by Dunlendings and Orcs and a long feud with Saruman at Isengard. In the War of the Ring Theoden broke free of Wormtongue’s counsel, fought at Helm’s Deep, and rode to Minas Tirith, dying on the Pelennor. Éomer succeeded him and renewed the alliance with the Reunited Kingdom.',
    language: 'Rohirric, with Westron for wider dealings.',
    leaders: ['eorl-the-young', 'helm-hammerhand', 'theoden', 'eomer'],
    settlements: ['edoras', 'helms-deep', 'aldeburg', 'dunharrow'],
    alliances: ['gondor', 'ents', 'the-fellowship-of-the-ring'],
    conflicts: ['battle-of-helms-deep', 'battle-of-the-pelennor-fields', 'war-of-the-ring'],
    relatedIds: ['rohirrim', 'muster-of-rohan', 'gondor', 'isengard'],
    characterIds: ['theoden', 'eomer', 'eowyn', 'grima-wormtongue'],
  },
  {
    id: 'erebor',
    slug: 'erebor',
    image: locationImages.erebor,
    name: 'Erebor',
    aliases: ['Lonely Mountain', 'Kingdom under the Mountain'],
    summary:
      'The great dwarven kingdom within the Lonely Mountain, founded by Thráin I and restored by Thorin Oakenshield after the death of Smaug.',
    sourceIds: ['hobbit', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political dwarven kingdom, not the dwarven race or house. The dwarves of Durin’s Folk are the people; Erebor is the mountain-realm and its throne.',
    origins:
      'After the loss of Khazad-dûm, Thráin I led Durin’s Folk north and founded a kingdom in the Lonely Mountain in T.A. 1999, discovering the Arkenstone and amassing great wealth. It became the chief seat of the Longbeards until the coming of Smaug.',
    culture:
      'A wealthy dwarven court of carven halls, treasure and fine craft, with strong ties to the Men of Dale. The Arkenstone was its greatest heirloom and the king its central figure.',
    history:
      'Smaug destroyed Erebor and Dale in T.A. 2770, scattering Durin’s Folk. Thorin Oakenshield’s quest in T.A. 2941 reclaimed the mountain; Thorin fell at the Battle of Five Armies and Dáin II Ironfoot became King under the Mountain. In the War of the Ring Dáin and Brand died at the Battle of Dale, but the kingdom survived under Thorin III Stonehelm.',
    language: 'Khuzdul, with Westron in trade with Dale and beyond.',
    leaders: ['thrain', 'thror', 'thorin-oakenshield', 'dain-ironfoot'],
    settlements: ['erebor', 'dale', 'lake-town'],
    alliances: ['bardings', 'men', 'elves', 'the-fellowship-of-the-ring'],
    conflicts: ['battle-of-five-armies', 'battle-of-dale', 'war-of-the-ring'],
    relatedIds: ['durins-folk', 'dwarves', 'bardings', 'khazad-dum'],
    characterIds: ['thorin-oakenshield', 'dain-ironfoot', 'bilbo-baggins', 'bard-the-bowman'],
  },
  {
    id: 'lothlorien',
    slug: 'lothlorien',
    image: locationImages.lothlorien,
    name: 'Lothlórien',
    aliases: ['Lórien', 'Lothlorien', 'Golden Wood', 'Dwimordene'],
    summary:
      'The golden Elven realm between the Celebrant and the Anduin, ruled by Galadriel and Celeborn, where the power of the Elven-ring Nenya held time at bay.',
    sourceIds: ['lotr', 'unfinished-tales', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'realm',
    distinction:
      'A realm or domain rather than a race or people. Its inhabitants are largely Silvan Elves with Sindarin and Noldorin lords; Lórien is the place and polity, not the people.',
    origins:
      'Lothlórien grew from the Silvan Elves of the wood between the Celebrant and the Anduin. After the fall of Eregion, Galadriel and Celeborn came to rule there, and the realm was protected and enriched by Nenya, the Ring of Water.',
    culture:
      'A hidden, timeless woodland realm built in and among the great mallorn trees. Its people are skilled in song, archery and woodcraft, distrustful of outsiders, and preserved from change by the power of the Elven-ring while it lasted.',
    history:
      'Lórien was the heart of resistance in the region; it sheltered the Fellowship after Moria. Its forces, led by Celeborn and Galadriel’s captains, attacked Dol Guldur during the War of the Ring and cast down its walls. After the One Ring was destroyed Nenya’s power faded, and Galadriel passed into the West; the realm gradually emptied of Elves.',
    language: 'Sindarin, with Silvan speech and song, and Quenya among the high lords.',
    leaders: ['galadriel', 'celeborn'],
    settlements: ['caras-galadhon', 'lothlorien'],
    alliances: ['rivendell', 'elves', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-ring', 'battle-of-dol-guldur'],
    relatedIds: ['silvan-elves', 'elves', 'rivendell'],
    characterIds: ['galadriel', 'celeborn', 'haldir', 'frodo-baggins'],
  },
  {
    id: 'rivendell',
    slug: 'rivendell',
    image: locationImages.rivendell,
    name: 'Rivendell',
    aliases: ['Imladris', 'The Last Homely House', 'The Last Homely House East of the Sea'],
    summary:
      'The hidden refuge of Elrond in a valley of the Misty Mountains, a haven of lore and healing and the place where the Fellowship was formed.',
    sourceIds: ['hobbit', 'lotr', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'realm',
    distinction:
      'A realm and refuge, not a race. Its people are Noldor, Sindar and others gathered under Elrond; Rivendell is the place and its household, not a biological people.',
    origins:
      'Rivendell was founded in S.A. 1697 by Elrond after the ruin of Eregion, as a refuge in a hidden valley at the western feet of the Misty Mountains. It sheltered the remnants of the Noldor in the North and became a centre of memory and counsel.',
    culture:
      'A house of open hospitality, music, healing and ancient lore. Elrond’s household preserves Elvish tradition, welcomes travellers and keeps the histories of Middle-earth, and the valley is kept safe from enemies by Elrond’s power.',
    history:
      'Rivendell hosted the dwarves of Thorin’s quest and later the Council of Elrond, where the Fellowship of the Ring was chosen. It was a steadfast ally of the Dúnedain and Gondor, guarding the North and supporting the war against Sauron. After the Ring’s destruction Elrond passed into the West, and the realm waned.',
    language: 'Sindarin and Westron, with Quenya and lore in many tongues.',
    leaders: ['elrond'],
    settlements: ['rivendell'],
    alliances: ['arnor', 'gondor', 'lothlorien', 'dunedain', 'the-fellowship-of-the-ring'],
    conflicts: ['war-of-the-ring'],
    relatedIds: ['elves', 'noldor', 'lothlorien', 'the-fellowship-of-the-ring'],
    characterIds: ['elrond', 'arwen', 'glorfindel', 'gandalf', 'frodo-baggins'],
  },
  {
    id: 'the-shire',
    slug: 'the-shire',
    image: locationImages.theShire,
    name: 'The Shire',
    aliases: ['Sûza', 'The Four Farthings'],
    summary:
      'The quiet green land of the hobbits in Eriador, sheltered by the Dúnedain, and the unlikely starting point of the quest to destroy the One Ring.',
    sourceIds: ['lotr', 'hobbit', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'realm',
    distinction:
      'A political and geographic realm, not a race. Hobbits are the people; the Shire is their homeland and, after the War of the Ring, a self-governing land.',
    origins:
      'The Shire was granted to the hobbits in T.A. 1601 by King Argeleb II of Arthedain, when Marcho and Blanco led a migration from Bree across the Brandywine. The hobbits had drifted west for generations, and the Shire was the land where they settled and prospered.',
    culture:
      'A peaceful, insular and agrarian realm of gentry and farmers, governed by a Thain, a Mayor and the Master of Buckland, with the Watch making the borders. Its people value comfort, food and good-neighbourliness above glory.',
    history:
      'The Shire flourished for centuries under the distant protection of the Dúnedain, largely forgotten by the great powers but remembered by Gandalf. In T.A. 3018 Frodo left it with the Ring, and in 3019 it was overrun by Saruman’s ruffians and then liberated at the Battle of Bywater. It was made a free land under the King’s protection in the Reunited Kingdom, and Samwise Gamgee served as Mayor.',
    language: 'Westron with a hobbit dialect; the Shire Reckoning counts years from its founding.',
    leaders: ['thain', 'mayor-of-michel-delving', 'aragorn'],
    settlements: ['hobbiton', 'michel-delving', 'tuckborough', 'bree'],
    alliances: ['arnor', 'dunedain', 'the-fellowship-of-the-ring'],
    conflicts: ['scouring-of-the-shire', 'battle-of-bywater', 'war-of-the-ring'],
    relatedIds: ['hobbits', 'arnor', 'bree'],
    characterIds: ['frodo-baggins', 'bilbo-baggins', 'samwise-gamgee', 'meriadoc-brandybuck', 'peregrin-took'],
  },
  {
    id: 'isengard',
    slug: 'isengard',
    image: locationImages.isengard,
    name: 'Isengard',
    aliases: ['Nan Curunír', 'The Ring of Isengard', 'Angrenost'],
    summary:
      'The fortress of the wizard Saruman at the southern end of the Misty Mountains, once a Gondorian watch-tower, later a hostile power and breeder of the Uruk-hai.',
    sourceIds: ['lotr', 'unfinished-tales', 'silmarillion'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political power and fortified domain, not a people. The Orcs and Uruk-hai who served it are the race and army; Isengard is the state ruled by Saruman.',
    origins:
      'Isengard was built by the Númenóreans of Gondor in the Second Age as the fortress of Angrenost, guarding the Gap of Rohan, with the tower of Orthanc at its centre. The palantír of Orthanc was set there. It was given into Saruman’s keeping by the Steward Beren in T.A. 2759.',
    culture:
      'A place of machinery, industry and domination rather than a settled people. Saruman’s Isengard bred a disciplined army, felled the trees of Fangorn and turned the valley into a workshop of war.',
    history:
      'Long a western outpost, Isengard passed to Saruman, who fortified it and betrayed the free peoples. He loosed the Uruk-hai against Rohan and the Fellowship, and sent his forces to Helm’s Deep, where they were destroyed. The Ents then flooded the Ring of Isengard and broke Saruman’s power; the fortress was later given to the Ents, and Saruman was slain by Gríma at Bag End.',
    language: 'Westron among its servants; the Black Speech and Orcish among the Uruk-hai.',
    leaders: ['saruman'],
    settlements: ['orthanc', 'isengard'],
    alliances: ['mordor', 'orcs'],
    conflicts: ['battle-of-helms-deep', 'battle-of-isengard', 'war-of-the-ring'],
    relatedIds: ['istari', 'rohan', 'orcs', 'fangorn'],
    characterIds: ['saruman', 'grima-wormtongue', 'ugluk'],
  },
  {
    id: 'mordor',
    slug: 'mordor',
    image: locationImages.mordor,
    name: 'Mordor',
    aliases: ['The Black Land', 'Land of Shadow', 'Nurn'],
    summary:
      'The volcanic black realm of Sauron east of the Ephel Dúath, sealed by mountains and guarded by the Black Gate, from which he directed his wars against the West.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'kingdom',
    distinction:
      'A political realm and fortress-domain, not a people. Orcs, Uruks and Men serve there, but Mordor is the state and territory ruled by Sauron, not a race.',
    origins:
      'Mordor was a natural fastness of the plateau of Gorgoroth, ringed by the Ered Lithui and Ephel Dúath, first fortified by Sauron in the Second Age after he chose it as a base safe from the Valar. He built Barad-dûr and the Black Gate to hold it.',
    culture:
      'A realm of shadow, industry and terror, organised entirely around its master’s will. Its plains support vast armies and slave-farms, and its towers and forges drive Sauron’s war-machine.',
    history:
      'From Mordor Sauron forged the One Ring and made war on the Elves and Númenor. He was overthrown and Mordor garrisoned by the Last Alliance, but he returned in T.A. 2941 and rebuilt Barad-dûr. The Ring was destroyed in S.A. 3019 at Mount Doom, the Dark Tower fell and Mordor was left a broken, barren land.',
    language: 'The Black Speech, devised by Sauron, with Orcish and Westron among his servants.',
    leaders: ['sauron', 'witch-king-of-angmar'],
    settlements: ['barad-dur', 'minas-morgul', 'cirith-ungol', 'mount-doom', 'black-gate'],
    alliances: ['isengard', 'orcs', 'harad', 'rhun'],
    conflicts: ['war-of-the-ring', 'battle-of-the-pelennor-fields', 'battle-of-the-morannon'],
    relatedIds: ['isengard', 'orcs', 'the-nazgul', 'gondor'],
    characterIds: ['sauron', 'witch-king-of-angmar', 'gollum', 'frodo-baggins', 'samwise-gamgee'],
  },

  /* ---------------------------------------------------------------- */
  /* Organizations, factions and armies                                */
  /* ---------------------------------------------------------------- */
  {
    id: 'the-fellowship-of-the-ring',
    slug: 'the-fellowship-of-the-ring',
    name: 'The Fellowship of the Ring',
    aliases: ['The Nine Walkers', 'The Company of the Ring'],
    summary:
      'The nine companions chosen at Rivendell to carry the One Ring to Mordor and destroy it: four hobbits, an Elf, a Dwarf, two Men and a Wizard.',
    sourceIds: ['lotr'],
    continuity: 'tolkien-texts',
    kind: 'organization',
    distinction:
      'A small purpose-bound company, not a people, kingdom or army. Its members came from many races and realms; the Fellowship itself is an organisation formed for a single quest.',
    origins:
      'The Fellowship was formed at the Council of Elrond in T.A. 3018, after the Council resolved that the Ring must be unmade in the fires of Mount Doom. Nine walkers were chosen, to set against the nine Nazgûl.',
    culture:
      'A company bound by oath and shared purpose rather than any single tradition. Its members were chosen to represent the free peoples, and its strength lay in loyalty, endurance and the unlikely courage of the small.',
    history:
      'The Fellowship crossed Eriador and the Misty Mountains, passing through Moria where Gandalf fell, and came to Lothlórien. At Amon Hen it broke when Boromir was slain and Frodo and Sam went on alone; the others pursued the captive hobbits, fought at Helm’s Deep and the Pelennor, and reunited in victory after the Ring was destroyed.',
    language: 'Westron was their common speech, with each member keeping their own tongue.',
    leaders: ['gandalf', 'aragorn', 'frodo-baggins'],
    settlements: ['rivendell', 'lothlorien'],
    alliances: ['gondor', 'rohan', 'rivendell', 'lothlorien', 'erebor'],
    conflicts: ['war-of-the-ring', 'battle-of-the-pelennor-fields', 'battle-of-the-morannon'],
    relatedIds: ['rivendell', 'hobbits', 'gandalf', 'aragorn'],
    characterIds: ['frodo-baggins', 'samwise-gamgee', 'meriadoc-brandybuck', 'peregrin-took', 'gandalf', 'aragorn', 'boromir', 'legolas', 'gimli'],
  },
  {
    id: 'the-white-council',
    slug: 'the-white-council',
    image: characterImages.saruman,
    name: 'The White Council',
    aliases: ['Council of the Wise', 'The Wise'],
    summary:
      'The assembly of the great loremasters and rulers of the West, led by Saruman and including Gandalf, Elrond and Galadriel, formed to oppose Sauron.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'organization',
    distinction:
      'A deliberative council of individuals, not a people or an army. Its members belonged to separate realms and races; it was an organisation for counsel and coordinated action against the Shadow.',
    origins:
      'The White Council grew out of the earlier Council of the Wise, the order of the Istari and the chief Eldar and Dúnedain who watched for Sauron’s return. Saruman was appointed its head, though Galadriel wished Gandalf to lead it.',
    culture:
      'A body of lore and counsel rather than a state, meeting rarely and acting slowly. Its debates turned on the Rings of Power, the Necromancer of Dol Guldur and the danger of assaulting the Enemy before the time was ripe.',
    history:
      'The Council met when the Necromancer was discovered in Dol Guldur but Saruman dissuaded attack, hoping to find the One Ring himself. Only in T.A. 2941 did the Council, led by Saruman and prompted by Gandalf, drive Sauron from Dol Guldur — a victory that proved hollow, as Sauron had already planned to return to Mordor. After Saruman’s treachery the Council effectively ceased.',
    language: 'Sindarin, Quenya and Westron among its members.',
    leaders: ['saruman', 'gandalf', 'elrond', 'galadriel'],
    settlements: ['rivendell', 'lothlorien', 'isengard'],
    alliances: ['elves', 'gondor', 'arnor'],
    conflicts: ['war-of-the-ring', 'battle-of-dol-guldur'],
    relatedIds: ['istari', 'rivendell', 'lothlorien', 'isengard'],
    characterIds: ['gandalf', 'saruman', 'elrond', 'galadriel'],
  },
  {
    id: 'the-nazgul',
    slug: 'the-nazgul',
    image: characterImages.witchking,
    name: 'The Nazgûl',
    aliases: ['Ringwraiths', 'The Nine', 'Black Riders', 'Ulairi'],
    summary:
      'The nine mortal Men enslaved by the Nine Rings of Sauron, wraiths of terror and his most feared servants, chief among them the Witch-king of Angmar.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'organization',
    distinction:
      'A body of nine wraith-servants, not a race or kingdom. The Witch-king and his fellows are individually Men degraded into wraiths; the Nazgûl are an organisation of Sauron’s servants, some of whom later ruled Minas Morgul and Angmar.',
    origins:
      'Sauron gave the Nine Rings to great lords of Men in the Second Age, ensnaring them; they became the Nazgûl, neither living nor dead, their wills bound to the Ring. The Witch-king, once a Númenórean lord, was their chief.',
    culture:
      'A shadow-host, not a society. They serve Sauron absolutely, ride flying fell beasts, cloak themselves in black and wield fear as a weapon. Their captain held the Witch-realm of Angmar and later Minas Morgul.',
    history:
      'The Nine served Sauron through the wars of the Second and Third Ages. The Witch-king destroyed Arnor as lord of Angmar, captured Minas Ithil and ruled it as Minas Morgul, and pursued the Ring-bearer from the Shire in T.A. 3018. At Weathertop he wounded Frodo with a Morgul-blade. He fell at the Battle of the Pelennor Fields, slain by Éowyn and Meriadoc; the Ring’s destruction ended the rest.',
    language: 'The Black Speech and the tongues of long-dead men; they spoke rarely and terribly.',
    leaders: ['witch-king-of-angmar'],
    settlements: ['minas-morgul', 'angmar', 'barad-dur'],
    alliances: ['mordor', 'isengard'],
    conflicts: ['war-of-the-ring', 'battle-of-the-pelennor-fields', 'angmar-wars'],
    relatedIds: ['mordor', 'orcs', 'minas-morgul', 'sauron'],
    characterIds: ['witch-king-of-angmar', 'sauron', 'frodo-baggins', 'eowyn', 'meriadoc-brandybuck'],
  },
  {
    id: 'muster-of-rohan',
    slug: 'muster-of-rohan',
    image: locationImages.pelennorFields,
    name: 'Muster of Rohan',
    aliases: ['The Riders of Rohan', 'The Rohirrim Muster', 'The Ride of the Rohirrim'],
    summary:
      'The host that Rohan raised at Dunharrow in the War of the Ring, which rode to the relief of Gondor and broke the siege of Minas Tirith.',
    sourceIds: ['lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'army',
    distinction:
      'An army, not a people or kingdom. The Rohirrim are the culture and Rohan is the state; the Muster is the specific body of riders gathered for war under King Theoden, and it disperses when the campaign ends.',
    origins:
      'The Muster was summoned by Theoden at Dunharrow after Helm’s Deep and the deliverance of Rohan, in answer to the Red Arrow and the beacons of Gondor. It gathered the riders of the Mark for a single great effort.',
    culture:
      'A cavalry host of horse-lords, organised by the eoreds and led by the king and his marshals. Its strength lay in shock, speed and the loyalty of riders to their lord.',
    history:
      'The Muster rode from Dunharrow through the Stonewain Valley and across the Anórien, gathering at the Grey Wood. Warned by the Wild Men of the paths, Theoden came to the Pelennor Fields on 15 March T.A. 3019, when the Muster charged into the siege and broke it. Theoden fell, and Éomer led the survivors in the subsequent battle and the march on the Black Gate.',
    language: 'Rohirric, with Westron used with allies.',
    leaders: ['theoden', 'eomer', 'eowyn', 'meriadoc-brandybuck'],
    settlements: ['dunharrow', 'edoras', 'harondor'],
    alliances: ['gondor', 'rohirrim', 'rohan'],
    conflicts: ['battle-of-the-pelennor-fields', 'battle-of-the-morannon', 'war-of-the-ring'],
    relatedIds: ['rohan', 'rohirrim', 'gondor', 'pelennor-fields'],
    characterIds: ['theoden', 'eomer', 'eowyn', 'meriadoc-brandybuck', 'dunhere'],
  },
  {
    id: 'last-alliance',
    slug: 'last-alliance',
    name: 'Last Alliance of Elves and Men',
    aliases: ['The Last Alliance', 'Army of the Last Alliance'],
    summary:
      'The great host of Elves and Men that marched against Sauron at the end of the Second Age and cast him down in a seven-year siege of Barad-dûr.',
    sourceIds: ['silmarillion', 'lotr', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    kind: 'army',
    distinction:
      'An army or coalition, not a people, kingdom or lasting organisation. It was raised for one war, gathered from many peoples, and dissolved after Sauron’s fall; Elves and Men remain the peoples it joined.',
    origins:
      'The Last Alliance was formed in S.A. 3430 when Gil-galad, High King of the Noldor, and Elendil, High King of the Dúnedain, joined forces against Sauron, who had taken the One Ring and threatened all the West. Círdan, Elrond, Isildur, Anárion and Oropher led contingents.',
    culture:
      'A coalition army of distinct units: Noldor, Sindar, Silvan Elves, Dwarves and the Dúnedain of Arnor and Gondor. Its campaigns moved through Eriador and down into Mordor and Gorgoroth.',
    history:
      'The Alliance marched against Sauron in S.A. 3431 and fought the Battle of Dagorlad, then besieged Barad-dûr for seven years. In S.A. 3441 Sauron came forth; Gil-galad and Elendil were slain, and Isildur cut the One Ring from Sauron’s hand, ending the war. The Alliance then dispersed, and Isildur’s failure to destroy the Ring doomed the peace.',
    language: 'Sindarin, Quenya and Westron, with each contingent using its own tongue.',
    leaders: ['gil-galad', 'elendil', 'isildur', 'elrond', 'oropher'],
    settlements: ['rivendell', 'arnor', 'gondor', 'mordor'],
    alliances: ['elves', 'men', 'gondor', 'arnor', 'durins-folk'],
    conflicts: ['battle-of-the-last-alliance', 'battle-of-dagorlad', 'war-of-sauron'],
    relatedIds: ['elves', 'men', 'mordor', 'arnor', 'gondor'],
    characterIds: ['gil-galad', 'elendil', 'isildur', 'elrond', 'sauron', 'anarion'],
  },
];
