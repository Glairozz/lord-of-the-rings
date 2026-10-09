import type { Artifact } from '@/types/content';
import { artifactImages } from './images';

/**
 * Artifacts of Middle-earth.
 *
 * Every entry references only canonical source ids (see `sources.ts`) and,
 * where an image exists, a value from the `artifactImages` registry. Prose is
 * original summary and analysis; no passages are quoted from the books.
 *
 * Where the legendarium is silent, contradictory or unfinished, that fact is
 * stated in the relevant field rather than resolved by invention.
 */
export const artifacts: Artifact[] = [
  {
    id: 'the-one-ring',
    slug: 'the-one-ring',
    name: 'The One Ring',
    aliases: ["The Ruling Ring", "The Great Ring", "Isildur's Bane", 'The Ring of Power'],
    summary:
      "Sauron's master-ring, forged in secret to dominate the other Rings of Power and their bearers. Its passage through Middle-earth drives the central drama of The Lord of the Rings.",
    image: artifactImages.oneRing,
    sourceIds: ['lotr', 'hobbit', 'silmarillion', 'unfinished-tales', 'history-of-me', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'ring',
    tags: ['rings-of-power', 'sauron', 'domination', 'third-age', 'war-of-the-ring'],
    creator: 'Sauron, forged in the fires of Mount Orodruin during the Second Age',
    description:
      "A plain gold ring that is far more than it appears. Sauron made it as an instrument of control, binding into it a great part of his own native strength so that it could master the other Rings and the wills of those who wore them. Because so much of himself passed into the metal, the Ring and its maker are joined: while it endures he endures, and where it is he seeks to be. To most eyes it is a trifle, easily overlooked, which is part of why it survives so many hands and so many centuries.",
    powers: [
      'Makes a mortal wearer invisible, drawing them partly into the wraith-world.',
      'Unnaturally prolongs the life of a mortal holder, though not their contentment.',
      'Offers domination over the other Rings of Power and the minds of those who bear them.',
      'Exerts a constant seductive pressure on its keeper, presenting itself as an opportunity rather than a danger.',
      'Endures and preserves its own existence, slipping from danger and slipping back to its maker when it can.',
    ],
    limitations: [
      'While Sauron lives the Ring cannot be unmade, except in the fires where it was forged.',
      'It cannot be used with safety by anyone weaker than Sauron; every attempt at mastery is a trap.',
      'It can dominate and preserve, but it cannot create or bestow true freedom.',
      'The texts leave its effect on Tom Bombadil unexplained; he alone is simply untouched by it.',
    ],
    ownership: [
      {
        holder: 'Sauron',
        holderId: 'sauron',
        period: 'Second Age, c. S.A. 1600-3441',
        note: 'Wears it while forging the Rings of Power and throughout the war against the Elves.',
      },
      {
        holder: 'Isildur',
        holderId: 'isildur',
        period: 'S.A. 3441 - T.A. 2',
        note: 'Cuts the Ring from Sauron hand at the close of the War of the Last Alliance, then keeps it as weregild.',
      },
      {
        holder: 'The river Anduin',
        period: 'T.A. 2 - c. 2463',
        note: 'Lost when Isildur is ambushed at the Gladden Fields and the Ring slips from his hand into the water.',
      },
      {
        holder: "Deagol, then Smeagol (Gollum)",
        holderId: 'smeagol',
        period: 'c. T.A. 2463-2941',
        note: 'Found in the Gladden; Smeagol murders Deagol for it and is slowly ruined by it.',
      },
      {
        holder: 'Bilbo Baggins',
        holderId: 'bilbo-baggins',
        period: 'T.A. 2941-3001',
        note: 'Found in the tunnels of the Misty Mountains and later gives it up of his own will, with difficulty.',
      },
      {
        holder: 'Frodo Baggins',
        holderId: 'frodo-baggins',
        period: 'T.A. 3001-3019',
        note: 'Carries it toward Orodruin; Samwise and Gandalf each bear it briefly along the way.',
      },
      {
        holder: 'Destroyed in Orodruin',
        period: '25 March T.A. 3019',
        note: 'Gollum seizes it at the Fire and falls with it into the mountain.',
      },
    ],
    symbolism:
      'The clearest image in the legendarium of the will to power and the corruption that domination brings. A small, beautiful, easily carried thing whose influence is wildly out of proportion to its size, it preys on the desire to set the world right by force.',
    fate: 'Destroyed in the fires of Orodruin by accident and obsession rather than by the free choice of its bearer. With it Sauron is unmade and the Third Age ends.',
    eventIds: [
      'forging-of-the-rings-of-power',
      'war-of-the-last-alliance',
      'gladden-fields',
      'quest-of-erebor',
      'council-of-elrond',
      'war-of-the-ring',
      'destruction-of-the-one-ring',
    ],
    characterIds: [
      'sauron',
      'isildur',
      'smeagol',
      'bilbo-baggins',
      'frodo-baggins',
      'samwise-gamgee',
      'gandalf',
      'galadriel',
      'tom-bombadil',
      'deagol',
    ],
    relatedIds: ['the-three-elven-rings', 'the-seven-dwarf-rings', 'the-nine-rings-of-men', 'the-silmarils'],
    interpretation:
      'Tolkien resisted reading the Ring as a simple political allegory; he spoke of it as a fable about the machine and the danger of seizing power for supposedly good ends. The book deliberately withholds a clean moral triumph at the Cracks of Doom: the Ring is destroyed against the hero will.',
  },
  {
    id: 'the-three-elven-rings',
    slug: 'the-three-elven-rings',
    name: 'The Three Elven Rings',
    aliases: ['Nenya', 'Narya', 'Vilya', 'The Three'],
    summary:
      'The three Rings of Power made by Celebrimbor alone, never touched by Sauron, and kept hidden while the One endured. Their preservation of all that Elves loved ended when the One was destroyed.',
    image: artifactImages.threeElvenRings,
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'ring',
    tags: ['rings-of-power', 'elves', 'preservation', 'third-age', 'lothlorien', 'rivendell'],
    creator: 'Celebrimbor and the smiths of Eregion, made last and never handled by Sauron',
    description:
      'Unlike the Seven and the Nine, the Three were forged without Sauron direct instruction and were never touched by him, so they carried no taint of his hand. Celebrimbor gave them into hiding before Sauron could seize them. Each works chiefly to preserve: to slow decay, to keep memory and beauty alive, and to shelter the Elven realms from the wear of time. They do not confer invisibility and they were never openly worn while Sauron still held the One, for once he wore it the makers understood they had been deceived.',
    powers: [
      'Nenya, the Ring of Water or Adamant, preserves and protects, and its power was greatest in Lothlorien.',
      'Narya, the Ring of Fire, kindles courage and resistance to despair and weariness.',
      'Vilya, the Ring of Air, held by Elrond, is accounted the mightiest of the Three.',
      'Together they sustain the hidden Elven realms and their works of healing and memory.',
    ],
    limitations: [
      'They confer no invisibility and no domination over others; their gift is preservation, not conquest.',
      'Their whole power to hold back time depended on the One; when it was destroyed that power waned.',
      'They could not be used openly while Sauron held the One, lest he perceive and claim them.',
    ],
    ownership: [
      {
        holder: 'Celebrimbor and the smiths of Eregion',
        holderId: 'celebrimbor',
        period: 'Second Age, c. S.A. 1590',
        note: 'Made in secret after the Seven and the Nine, and never touched by Sauron.',
      },
      {
        holder: 'Galadriel',
        holderId: 'galadriel',
        period: 'Second Age to the end of the Third Age',
        note: 'Bearer of Nenya, the Ring of Water, in Lothlorien.',
      },
      {
        holder: 'Gil-galad',
        holderId: 'gil-galad',
        period: 'Second Age',
        note: 'Received two of the Three; gave Narya to Cirdan, and Vilya later passed to Elrond.',
      },
      {
        holder: 'Cirdan, then Gandalf',
        holderId: 'gandalf',
        period: 'Second Age to T.A. 3021',
        note: 'Cirdan gave Narya to Gandalf when the Istari came to Middle-earth.',
      },
      {
        holder: 'Elrond',
        holderId: 'elrond',
        period: 'Second Age to the end of the Third Age',
        note: 'Bearer of Vilya, the Ring of Air, in Rivendell.',
      },
    ],
    symbolism:
      'The Elvish longing to preserve what is beautiful and old, and the melancholy that clings to it. Their power is noble but backward-looking, a wish to hold a fading world still.',
    fate: 'When the One was destroyed the Three lost their strength to resist time. Their bearers carried them over the Sea into the West at the close of the Third Age.',
    eventIds: [
      'forging-of-the-rings-of-power',
      'war-of-the-last-alliance',
      'council-of-elrond',
      'war-of-the-ring',
      'destruction-of-the-one-ring',
    ],
    characterIds: ['celebrimbor', 'galadriel', 'gil-galad', 'cirdan', 'elrond', 'gandalf'],
    relatedIds: ['the-one-ring', 'the-seven-dwarf-rings', 'the-nine-rings-of-men'],
  },
  {
    id: 'the-seven-dwarf-rings',
    slug: 'the-seven-dwarf-rings',
    name: 'The Seven Dwarf Rings',
    aliases: ['The Seven'],
    summary:
      'Seven Rings given to the seven houses of the Dwarves. They bred wealth and gold-lust rather than the wraithdom Sauron intended, and most were consumed by dragons or reclaimed by their maker.',
    image: artifactImages.sevenDwarfRings,
    sourceIds: ['silmarillion', 'lotr', 'unfinished-tales', 'history-of-me', 'tolkien-letters'],
    continuity: 'supplementary',
    type: 'ring',
    tags: ['rings-of-power', 'dwarves', 'greed', 'dragons', 'erebor'],
    creator: 'Celebrimbor and the smiths of Eregion, made under Sauron teaching',
    description:
      'The Seven were part of Sauron scheme for binding the peoples of Middle-earth, and he gave them out to the Dwarf-lords. The Dwarves, being made tough in body and slow to be mastered, did not fade into wraiths as Men did. Instead the rings sharpened the desire for gold and fine work, the very hunger for which dragons are drawn, and so the Seven hastened the ruin they were meant to prevent. Their history is bound up with the long misfortunes of Durin line.',
    powers: [
      'Multiplied the wealth and craft of their Dwarf-bearers, especially the getting of gold.',
      'Sharpened skill in mining and smithing in the eyes of their owners.',
      'Made their bearers successful and, in time, endlessly dissatisfied.',
    ],
    limitations: [
      'They could not make a Dwarf a wraith; the Dwarves proved resistant to Sauron dreams of domination.',
      'Their chief effect was a creeping greed that drew dragons and feuds.',
      'They remained subject to the One, and Sauron regarded them as his to gather or buy back.',
    ],
    ownership: [
      {
        holder: 'The seven houses of the Dwarves',
        period: 'Second Age',
        note: 'Distributed by Sauron; each house plied its ring to enlarge its hoards.',
      },
      {
        holder: 'Thror',
        holderId: 'thror',
        period: 'Third Age',
        note: 'Bearer of a ring of the line of Durin, with which he grew wealthy and proud under the Mountain.',
      },
      {
        holder: 'Thrain',
        holderId: 'thrain',
        period: 'T.A. up to c. 2850',
        note: 'Held the ring after Thror; taken from him when Sauron captured him at Dol Guldur.',
      },
      {
        holder: 'Sauron',
        holderId: 'sauron',
        period: 'c. T.A. 2850 onward',
        note: 'Recovered the ring of Durin line; he later offered it in vain to Dain Ironfoot.',
      },
    ],
    symbolism:
      'The ring as an accelerator of whatever appetite a people already has, and the way treasure and doom are entangled in Dwarvish history.',
    fate: 'Several were consumed with their bearers by dragons; the rest were gathered again by Sauron. The texts do not account for every one of the Seven by name.',
    eventIds: ['forging-of-the-rings-of-power', 'capture-of-thrain', 'quest-of-erebor'],
    characterIds: ['celebrimbor', 'sauron', 'thror', 'thrain', 'dain-ironfoot'],
    relatedIds: ['the-one-ring', 'the-three-elven-rings', 'the-nine-rings-of-men', 'the-arkenstone'],
    interpretation:
      'Tolkien leaves the fates of individual rings largely unfixed. The surviving accounts agree on their general tendency, greed leading to loss, but differ on particular hoards and particular dragons.',
  },
  {
    id: 'the-nine-rings-of-men',
    slug: 'the-nine-rings-of-men',
    name: 'The Nine Rings of Men',
    aliases: ['The Nine', 'The Rings of the Nazgul'],
    summary:
      'The nine Rings given to mortal lords, whose wearers were stretched into unending life and became the Ringwraiths, the Nazgul, Sauron most terrible servants.',
    image: artifactImages.nineRingsOfMen,
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'ring',
    tags: ['rings-of-power', 'nazgul', 'men', 'wraiths', 'sauron'],
    creator: 'Celebrimbor and the smiths of Eregion, made under Sauron teaching',
    description:
      'The Nine were the gifts Sauron used to recruit the most promising of mortal lords, kings and sorcerers of the Second Age. A ring of the Nine gave its bearer invisibility, long life and a vast increase of personal power, and for a time they seemed to be the lucky ones. But Sauron had made them as snares: the longer they were worn the more the wearers faded out of the visible world and into the wraith-world, until they were wholly subject to the One and to its master. Thus they became the Nazgul, neither living nor dead.',
    powers: [
      'Bestowed invisibility and entrance into the wraith-world on mortal wearers.',
      'Greatly prolonged life and multiplied whatever power the bearer already had.',
      'Enabled their bearers to see and to move partly outside the visible world.',
    ],
    limitations: [
      'They slowly stripped the wearer of body and of free will, turning them into wraiths.',
      'They made the wearer wholly subject to the One and to Sauron.',
      'Men, being mortal, could not bear them as the Dwarves bore the Seven.',
    ],
    ownership: [
      {
        holder: 'Nine mortal lords and sorcerers',
        period: 'Second Age',
        note: 'Chosen and given the rings by Sauron; their names are mostly not preserved.',
      },
      {
        holder: 'The Nazgul',
        holderId: 'witch-king-of-angmar',
        period: 'Second Age through the Third Age',
        note: 'The wraiths, chief among them the Witch-king, serve Sauron as his most feared servants.',
      },
      {
        holder: 'Sauron',
        holderId: 'sauron',
        period: 'Third Age',
        note: 'The rings are accounted to remain in Sauron keeping or with the wraiths; the texts do not state their final disposition plainly.',
      },
    ],
    symbolism:
      'The bargain of borrowed power: the promise of mastery that delivers its holder into servitude. The Nine are the dark mirror of the Three, taking rather than preserving.',
    fate: 'The rings remained bound to Sauron and his wraiths. When the One was destroyed the Nine lost their power and the Ringwraiths came to nothing; the surviving rings are not individually accounted for in the texts.',
    eventIds: ['forging-of-the-rings-of-power', 'war-of-the-last-alliance', 'war-of-the-ring', 'destruction-of-the-one-ring'],
    characterIds: ['sauron', 'witch-king-of-angmar', 'celebrimbor'],
    relatedIds: ['the-one-ring', 'the-three-elven-rings', 'the-seven-dwarf-rings', 'the-morgul-blade'],
    interpretation:
      'The accounts do not give the individual names of the Nine. Claims that a particular character can be matched to a particular ring rest on adaptation and conjecture, not on the published texts.',
  },
  {
    id: 'the-silmarils',
    slug: 'the-silmarils',
    name: 'The Silmarils',
    aliases: ['The Great Jewels', 'The Jewels of Feanor'],
    summary:
      'Three unearthly jewels made by Feanor to hold the blended light of the Two Trees. Their theft by Morgoth and the oath sworn to recover them set the whole tragedy of the First Age in motion.',
    image: artifactImages.silmarils,
    sourceIds: ['silmarillion', 'unfinished-tales', 'history-of-me', 'beren-and-luthien', 'fall-of-gondolin', 'tolkien-letters'],
    continuity: 'supplementary',
    type: 'jewel',
    tags: ['first-age', 'feanor', 'light', 'oath', 'beleriand'],
    creator: 'Feanor, in Aman, using the light of the Two Trees of Valinor',
    description:
      'The Silmarils are the greatest work of Elven craft: three crystalline jewels in which Feanor captured and fixed the blended light of Telperion and Laurelin, the Two Trees. They are said to shine with their own living radiance and to be, in effect, the last uncorrupted sample of the light of the Trees after Morgoth and Ungoliant destroyed them. Their beauty made them both priceless and cursed: the desire to possess them, and the oath sworn to reclaim them, cost the Noldor and Beleriand almost everything.',
    powers: [
      'Contained and shone with the undying light of the Two Trees of Valinor.',
      'Were hallowed by Varda so that no unclean or mortal hand could touch them without pain.',
      'Their light could burn and expose evil, as it did when they were set upon Morgoth crown.',
    ],
    limitations: [
      'They could not be remade; Feanor heart was so bound to them that their loss unhinged him.',
      'They could not restore the Two Trees themselves, only preserve their light.',
      'The oath sworn over them bound the sons of Feanor to an impossible, ruinous purpose.',
    ],
    ownership: [
      {
        holder: 'Feanor',
        holderId: 'feanor',
        period: 'Years of the Trees',
        note: 'Made them and refused to surrender them even to restore the Two Trees.',
      },
      {
        holder: 'Morgoth',
        holderId: 'morgoth',
        period: 'Years of the Trees to the end of the First Age',
        note: 'Stole them with Ungoliant and set them in his iron crown.',
      },
      {
        holder: 'Beren and Luthien',
        holderId: 'beren',
        period: 'First Age',
        note: 'Cut one from Morgoth crown and carried it out of Angband.',
      },
      {
        holder: 'Thingol, then Dior, then Elwing',
        holderId: 'elwing',
        period: 'First Age',
        note: 'The recovered jewel passed down through Doriath until Elwing bore it to the havens.',
      },
      {
        holder: 'Earendil',
        holderId: 'earendil',
        period: 'First Age onward',
        note: 'Bore the jewel to the West; it was set in the sky as the morning and evening star.',
      },
      {
        holder: 'Maedhros and Maglor',
        holderId: 'maedhros',
        period: 'End of the First Age',
        note: 'Took the remaining two by force, and were burned by them as unworthy holders.',
      },
    ],
    symbolism:
      'The pure light that cannot be possessed without corruption, and the ruin that follows an oath pursued beyond right and reason. They are both the summit of Elven art and the seed of its worst grief.',
    fate: 'One was set in the heavens as the star of Earendil. The two taken by the last sons of Feanor were, in their despair, cast away: one into a fiery chasm in the earth and one into the sea. A prophecy holds that at the remaking of the world they will be recovered and the light of the Trees renewed.',
    eventIds: ['making-of-the-silmarils', 'theft-of-the-silmarils', 'quest-of-the-silmaril', 'war-of-wrath'],
    characterIds: ['feanor', 'morgoth', 'ungoliant', 'beren', 'luthien', 'thingol', 'elwing', 'earendil', 'maedhros', 'maglor'],
    relatedIds: ['the-one-ring', 'narsil-and-anduril'],
    interpretation:
      'The recovery of the jewels at the end of days is a prophecy within the legendarium rather than a narrated event. Tolkien left the matter in the unfinished material, and versions differ.',
  },
  {
    id: 'the-palantiri',
    slug: 'the-palantiri',
    name: 'The Palantiri',
    aliases: ['The Seeing-stones', 'The Stones of Seeing'],
    summary:
      'Seven great seeing-stones made in the Elder Days, brought to Middle-earth by the Numenoreans. Powerful, difficult and easily turned to evil, they play a decisive part in the War of the Ring.',
    image: artifactImages.palantiri,
    sourceIds: ['lotr', 'unfinished-tales', 'silmarillion', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'object',
    tags: ['numenor', 'gondor', 'arnor', 'seeing', 'war-of-the-ring'],
    creator: 'Feanor, in Eldamar, in the Elder Days',
    description:
      'The palantiri are spheres of dark crystal in which a person of sufficient will can see things far away and, with another stone, speak to a distant viewer. They were a gift of the Eldar to the Numenoreans and were divided between the kingdoms in exile: some kept in Gondor, some in Arnor, with the chief stone of the north in the Tower Hills. They are not magic mirrors of simple convenience. Their use demands strength of mind, the images are not always reliable, and a stone can be seized and turned by a stronger will on the other side, which is exactly what Sauron does with the stone of Minas Ithil.',
    powers: [
      'Allow a strong-willed user to see distant places and events.',
      'Allow two stones to communicate across great distances.',
      'Can reveal hidden things and far countries to a sufficiently powerful viewer.',
    ],
    limitations: [
      'Require strength of will; the untrained or the proud can be hurt or deceived by them.',
      'Can be dominated from the other end by a stronger will such as Sauron.',
      'Some stones are limited: the stone of the Tower Hills is said to look only westward toward Eressea, and one account describes a stone that shows little but hands.',
    ],
    ownership: [
      {
        holder: 'Feanor and the Eldar',
        holderId: 'feanor',
        period: 'Elder Days',
        note: 'Originally made in Aman and later given to the Numenoreans.',
      },
      {
        holder: 'Elendil and his sons',
        holderId: 'elendil',
        period: 'Second Age',
        note: 'Divided between the northern and southern kingdoms after the Downfall of Numenor.',
      },
      {
        holder: 'The kingdoms of Gondor and Arnor',
        period: 'Second Age into the Third',
        note: 'Kept at Osgiliath, Minas Anor, Minas Ithil, Orthanc, Annuminas and the Tower Hills.',
      },
      {
        holder: 'Saruman, then the Reunited Kingdom',
        holderId: 'saruman',
        period: 'Third Age into the Fourth',
        note: 'The Orthanc stone passes from Saruman to the hands of the rightful kings.',
      },
    ],
    symbolism:
      'Knowledge as a temptation and a danger: the wish to see everything, and the ease with which foresight becomes manipulation.',
    fate: 'Several were lost in the wars and misfortunes of the North-kingdom. The stone of Orthanc survives into the Fourth Age under the Reunited Kingdom. The Master-stone of the Tower Hills is said in later tradition to have gone back over the Sea.',
    eventIds: ['downfall-of-numenor', 'war-of-the-ring', 'siege-of-minas-tirith'],
    characterIds: ['feanor', 'elendil', 'sauron', 'saruman', 'denethor', 'pippin-took', 'aragorn'],
    relatedIds: ['the-one-ring', 'narsil-and-anduril'],
    interpretation:
      'The systematic rules of the palantiri come mostly from the essay on them in Unfinished Tales; the narrative books show their use and abuse without spelling out every limit.',
  },
  {
    id: 'narsil-and-anduril',
    slug: 'narsil-and-anduril',
    name: 'Narsil and Anduril',
    aliases: ['The Sword that was Broken', 'The Flame of the West', 'The Sword of Elendil'],
    summary:
      'The sword of Elendil, broken when he fell before Sauron and reforged in Rivendell as Anduril, the Flame of the West, the blade that passes to the heir of Isildur.',
    image: artifactImages.narsilAnduril,
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'weapon',
    tags: ['numenor', 'gondor', 'aragorn', 'last-alliance', 'war-of-the-ring'],
    creator: 'Narsil was made by Telchar of Nogrod in the First Age; Anduril was reforged by Elven smiths in Rivendell',
    description:
      'Narsil is an heirloom sword of the Numenorean kings, long and bright, and it entered the deepest history when Elendil bore it in the War of the Last Alliance. When Elendil fell, the blade broke beneath him, and its shards were kept by his heirs in the north as a relic and a claim. Nearly three thousand years later the shards were reforged in Rivendell and given to Aragorn as Anduril, and the reforged sword became the visible sign of the returning king. Its edge is real, but its greatest weight is symbolic: whoever holds it carries the inheritance of Isildur.',
    powers: [
      'A strong and keen blade that shines with light, said to have gleamed in the battles of the Last Alliance.',
      'As Narsil it cut the One Ring from Sauron hand in the moment of his overthrow.',
      'As Anduril it rallies the heirs of Numenor and serves as the token of the king returned.',
    ],
    limitations: [
      'Narsil was broken in the fall of Elendil and could not be used again until reforged.',
      'The reforged blade is a sword like any other in battle; its power is chiefly the claim it embodies.',
    ],
    ownership: [
      {
        holder: 'The line of Elendil',
        holderId: 'elendil',
        period: 'Second Age',
        note: 'Narsil is borne by Elendil at the War of the Last Alliance.',
      },
      {
        holder: 'Isildur',
        holderId: 'isildur',
        period: 'S.A. 3441 - T.A. 2',
        note: 'Uses the blade to cut the Ring from Sauron hand; the sword is later broken at the Gladden Fields.',
      },
      {
        holder: 'The shards kept in Rivendell',
        holderId: 'elrond',
        period: 'Third Age',
        note: 'Held by the heirs of Isildur and guarded by Elrond until the reforging.',
      },
      {
        holder: 'Aragorn',
        holderId: 'aragorn',
        period: 'T.A. 3019 onward',
        note: 'Reforged as Anduril and carried through the War of the Ring and into the Reunited Kingdom.',
      },
    ],
    symbolism:
      'Kingship restored, and the long patience of a broken line waiting to be made whole again. The break and the reforging mirror the ruin and renewal of the kingdoms of Men.',
    fate: 'Anduril survives the War of the Ring and remains with Aragorn as king. Its later keeping by his heirs is not narrated in detail.',
    eventIds: ['war-of-the-last-alliance', 'gladden-fields', 'council-of-elrond', 'war-of-the-ring', 'battle-of-the-pelennor-fields'],
    characterIds: ['elendil', 'isildur', 'elrond', 'aragorn', 'sauron'],
    relatedIds: ['the-one-ring', 'the-silmarils', 'the-ring-of-barahir'],
    interpretation:
      'The earlier history of Narsil before Elendil is only lightly told. Its maker and its passage through the Elder Days rest on brief references rather than a full account.',
  },
  {
    id: 'glamdring-orcrist-and-sting',
    slug: 'glamdring-orcrist-and-sting',
    name: 'Glamdring, Orcrist and Sting',
    aliases: ['The Swords of Gondolin', 'The Troll-blades'],
    summary:
      'Three blades forged in Gondolin in the First Age and rediscovered in a troll-hoard in the Third, feared by orcs and divided among Gandalf, Thorin and Bilbo.',
    image: artifactImages.glamdringOrcristSting,
    sourceIds: ['hobbit', 'lotr', 'silmarillion', 'unfinished-tales', 'history-of-me'],
    continuity: 'tolkien-texts',
    type: 'weapon',
    tags: ['gondolin', 'first-age', 'erebor', 'orcrist', 'glamdring', 'sting'],
    creator: 'Elven smiths of Gondolin in the First Age',
    description:
      'These three swords were made in the hidden city of Gondolin and bear marks of that craft: long straight Elven blades, well wrought, and named. They were lost for ages until Thorin company found them in a trolls cave on the road east. Orcrist, the Goblin-cleaver, and Glamdring, the Foe-hammer, were blades the orcs of the Misty Mountains still dreaded by name; Sting, small enough for a hobbit, proved over time to be one of the sharpest edges in the legendarium. All three are weapons, but the narrative treats them almost as characters, carrying the memory of lost Gondolin into Bilbo and Frodo story.',
    powers: [
      'Excellent Elven blades, keen and enduring, that strike fear into orcs and goblins.',
      'Sting and the goblin-swords are described as glowing when enemies are near.',
      'Their names and lineage carry weight even among the enemies who remember Gondolin.',
    ],
    limitations: [
      'They are simply very good swords; they hold no curse and no special magic beyond their quality and their glow.',
      'Their long concealment means much of their First Age history is unknown.',
    ],
    ownership: [
      {
        holder: 'The smiths and defenders of Gondolin',
        period: 'First Age',
        note: 'Forged and borne before the fall of the hidden city.',
      },
      {
        holder: 'Thorin and company',
        holderId: 'thorin-oakenshield',
        period: 'T.A. 2941',
        note: 'Found in a troll-hoard on the journey to Erebor; Orcrist goes to Thorin, Glamdring to Gandalf, Sting to Bilbo.',
      },
      {
        holder: 'Thorin tomb and Gandalf and Bilbo',
        holderId: 'bilbo-baggins',
        period: 'T.A. 2941 onward',
        note: 'Orcrist is laid on Thorin tomb; Glamdring stays with Gandalf; Sting passes to Bilbo and later to Frodo.',
      },
      {
        holder: 'Frodo, then Samwise',
        holderId: 'frodo-baggins',
        period: 'T.A. 3018-3019',
        note: 'Sting is worn through the quest to destroy the Ring and later kept by Sam.',
      },
    ],
    symbolism:
      'The survival of the Elder Days in small things: old light and old craftsmanship resurfacing to serve unlikely hands. Sting in particular turns a Hobbit reluctance into genuine courage.',
    fate: 'Orcrist remains on Thorin tomb in Erebor. Sting remains in Middle-earth, kept by the hobbits who bore it. Glamdring goes with Gandalf over the Sea at the end of the Third Age.',
    eventIds: ['fall-of-gondolin', 'quest-of-erebor', 'war-of-the-ring'],
    characterIds: ['gandalf', 'thorin-oakenshield', 'bilbo-baggins', 'frodo-baggins', 'samwise-gamgee'],
    relatedIds: ['the-one-ring', 'the-arkenstone'],
  },
  {
    id: 'the-arkenstone',
    slug: 'the-arkenstone',
    name: 'The Arkenstone',
    aliases: ['The Heart of the Mountain'],
    summary:
      'A great jewel of Erebor, prized above all treasure by the Dwarves and used by Bilbo in a desperate attempt to prevent war. Its beauty brings out the dragon-sickness in Thorin.',
    image: artifactImages.arkenstone,
    sourceIds: ['hobbit', 'lotr', 'unfinished-tales', 'history-of-me'],
    continuity: 'tolkien-texts',
    type: 'jewel',
    tags: ['erebor', 'dwarves', 'smaug', 'quest-of-erebor', 'dragon-sickness'],
    creator: 'Formed by nature, not made by craft; found in the heart of the Lonely Mountain',
    description:
      'The Arkenstone is a natural jewel of extraordinary size and light, carved and shaped by the Dwarves but not created by them. It became the single most prized possession of the kings under the Mountain, the Heart of the Mountain, and its loss and recovery lie at the center of the quest of Erebor. It has no magical power in the sense of the Rings, but its beauty and worth act on those who desire it with almost the force of an enchantment. Thorin willingness to risk war over it, and Bilbo decision to give it away, are the moral hinge of the story.',
    powers: [
      'A jewel of surpassing beauty that casts its own inner light.',
      'As the greatest treasure of Erebor it commands loyalty, pride and, dangerously, greed.',
    ],
    limitations: [
      'It has no supernatural power; its influence is the ordinary power of great value over imaginative people.',
      'It cannot heal the dragon-sickness it inflames.',
    ],
    ownership: [
      {
        holder: 'Thrain I and the kings under the Mountain',
        holderId: 'thrain-i',
        period: 'Third Age',
        note: 'Found and prized as the chief heirloom of the Dwarves of Erebor.',
      },
      {
        holder: 'Smaug',
        holderId: 'smaug',
        period: 'T.A. 2770-2941',
        note: 'Sacked Erebor and hoarded the jewel among his treasure.',
      },
      {
        holder: 'Bilbo Baggins',
        holderId: 'bilbo-baggins',
        period: 'T.A. 2941',
        note: 'Found it in the dragon hoard and kept it secret before giving it as a bargaining piece.',
      },
      {
        holder: 'Thorin Oakenshield and his tomb',
        holderId: 'thorin-oakenshield',
        period: 'T.A. 2941 onward',
        note: 'Recovered after the Battle of Five Armies and laid on Thorin breast in death.',
      },
    ],
    symbolism:
      'The lure and the curse of great wealth. The Arkenstone is not evil, but it lays bare the greed that dragons and Dwarves alike can fall into, and Bilbo small act of honesty is set against it.',
    fate: 'Buried with Thorin Oakenshield in the restored kingdom under the Mountain.',
    eventIds: ['quest-of-erebor', 'sack-of-erebor', 'battle-of-five-armies'],
    characterIds: ['thorin-oakenshield', 'bilbo-baggins', 'smaug', 'bard-the-bowman', 'thranduil'],
    relatedIds: ['the-one-ring', 'glamdring-orcrist-and-sting', 'the-seven-dwarf-rings'],
  },
  {
    id: 'the-phial-of-galadriel',
    slug: 'the-phial-of-galadriel',
    name: 'The Phial of Galadriel',
    aliases: ['The Star-glass', 'The Light of Earendil'],
    summary:
      'A small crystal phial that holds the light of Earendil star, drawn from Galadriel mirror. In the darkest places of Mordor it becomes a light of hope and a defense against Shelob.',
    image: artifactImages.phialOfGaladriel,
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'tolkien-letters'],
    continuity: 'tolkien-texts',
    type: 'object',
    tags: ['lothlorien', 'galadriel', 'frodo', 'light', 'shelob'],
    creator: 'Galadriel, filled with the light of Earendil star as caught in her mirror',
    description:
      'The phial is a plain-seeming crystal flask, filled with water in which Galadriel has captured the light of the star of Earendil, itself the light of a Silmaril. Given to Frodo when the Fellowship leaves Lothlorien, it is the finest gift in the story precisely because it answers despair rather than force. It shines when its holder has hope and courage; it can drive back the darkness of Mordor and the horror of Shelob. Its power is the memory of light rather than light as a weapon, and it is bound up with the fate of the Elven ring that keeps Lothlorien alive.',
    powers: [
      'Gives a bright light in the darkest places, especially in Mordor.',
      'Strengthens the courage and hope of whoever holds it.',
      'Repels the will and terror of enemies such as Shelob and the will of Sauron in his own land.',
    ],
    limitations: [
      'Its light depends on the hope of its bearer; it can seem to fail when courage nearly does.',
      'Its power is tied to the Elven realm and its ring; once the One is destroyed that order fades.',
    ],
    ownership: [
      {
        holder: 'Galadriel',
        holderId: 'galadriel',
        period: 'Third Age',
        note: 'Made and filled in Lothlorien and given to Frodo as the Fellowship departs.',
      },
      {
        holder: 'Frodo Baggins',
        holderId: 'frodo-baggins',
        period: 'T.A. 3019',
        note: 'Carried to Mordor and used against Shelob in the pass of Cirith Ungol.',
      },
      {
        holder: 'Samwise Gamgee',
        holderId: 'samwise-gamgee',
        period: 'T.A. 3019 onward',
        note: 'Bears it when Frodo is taken, and uses it to resist the Uruk-hai in the tower.',
      },
    ],
    symbolism:
      'Hope as a memory of light carried into darkness. It is the gentlest answer the story offers to the Ring, and a reminder that small things and small hands can matter most.',
    fate: 'Sam carries the phial home to the Shire; its final keeping is not narrated. Its light belongs to an order that passes with the end of the Third Age.',
    eventIds: ['fellowship-departs-lothlorien', 'shelob-lair', 'war-of-the-ring', 'destruction-of-the-one-ring'],
    characterIds: ['galadriel', 'frodo-baggins', 'samwise-gamgee', 'shelob'],
    relatedIds: ['the-one-ring', 'the-three-elven-rings', 'the-silmarils'],
  },
  {
    id: 'the-morgul-blade',
    slug: 'the-morgul-blade',
    name: 'The Morgul-blade',
    aliases: ['The Morgul-knife', 'The Witch-king Knife'],
    summary:
      'A cursed knife of Minas Morgul whose broken fragment works its way toward a victim heart, turning a wound into a slow fading toward the wraith-world.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales'],
    continuity: 'tolkien-texts',
    type: 'weapon',
    tags: ['nazgul', 'witch-king', 'weathertop', 'frodo', 'wraith-world'],
    creator: 'The smiths of Minas Morgul, in the service of the Witch-king',
    description:
      'The Morgul-blade is the weapon of the Nazgul, and its power is not the cut but what the cut leaves behind. When the Witch-king stabs Frodo at Weathertop, the blade breaks and a sliver remains in the wound, working its way inward and pulling the victim toward the wraith-world and into the Ringwraiths control. The wound cannot be healed by ordinary means and defeats even Elrond and Gandalf until Frodo is carried across the Ford and into Rivendell. It is a precisely designed instrument of slow, terrorizing corruption, the opposite of a clean weapon.',
    powers: [
      'Leaves a fragment that burrows toward the heart, turning the wound into a mortal, spreading chill.',
      'Pulls the victim toward wraithdom and makes them vulnerable to the Nazgul.',
      'Inflicts a lasting cold sickness that ordinary medicine cannot touch.',
    ],
    limitations: [
      'The blade shatters when it strikes, so it can be used only once in that way.',
      'The damage it does is slow and can be countered by strong Elvish healing and by the phial of Galadriel.',
    ],
    ownership: [
      {
        holder: 'The Witch-king of Angmar',
        holderId: 'witch-king-of-angmar',
        period: 'Third Age',
        note: 'Used at the attack on Weathertop against Frodo.',
      },
      {
        holder: 'Frodo Baggins (as a wound)',
        holderId: 'frodo-baggins',
        period: 'T.A. 3018',
        note: 'Carries the fragment in his shoulder from Weathertop until it is removed at Rivendell.',
      },
    ],
    symbolism:
      'The power of fear and slow corruption, and the way evil can work by patience rather than force. Frodo carries the mark of it long after the wound itself is treated.',
    fate: 'The blade was broken at Weathertop; its surviving hilt and sheath remain as relics of the attack. The fragment in Frodo shoulder was found and removed at Rivendell.',
    eventIds: ['attack-at-weathertop', 'council-of-elrond', 'war-of-the-ring'],
    characterIds: ['witch-king-of-angmar', 'frodo-baggins', 'aragorn', 'elrond'],
    relatedIds: ['the-nine-rings-of-men', 'the-one-ring', 'the-phial-of-galadriel'],
  },
  {
    id: 'aeglos',
    slug: 'aeglos',
    name: 'Aeglos',
    aliases: ['Snow-thorn', 'The Spear of Gil-galad'],
    summary:
      'The spear of Gil-galad, High King of the Noldor, named Snow-thorn and dreaded by the enemies of the Last Alliance.',
    sourceIds: ['silmarillion', 'unfinished-tales', 'history-of-me', 'tolkien-letters'],
    continuity: 'supplementary',
    type: 'weapon',
    tags: ['first-age', 'last-alliance', 'gil-galad', 'beleriand'],
    creator: 'Unknown; a spear of the Elves of the Elder Days, borne by Gil-galad',
    description:
      'Aeglos is the spear of Gil-galad, whose name is usually rendered as Snow-thorn. The texts note that the enemies of the Last Alliance feared it, and that Gil-galad wielded it through the War of the Last Alliance until he fell with Elendil before Barad-dur. Like many First Age heirlooms, the spear is described more by the standing of its bearer than by any enchantment. Its history before Gil-galad and its fate after his fall are not recorded, and the legendarium is content to let the weapon be remembered chiefly through the king who held it.',
    powers: [
      'A long, keen Elven spear of great repute in war.',
      'Its name and the fame of its bearer were enough to make Sauron enemies fear it.',
    ],
    limitations: [
      'No special magic or curse is attributed to it; its power is that of a fine weapon and a great name.',
      'It could not save Gil-galad from falling in the final battle.',
    ],
    ownership: [
      {
        holder: 'Gil-galad',
        holderId: 'gil-galad',
        period: 'Second Age',
        note: 'Borne as the spear of the High King through the wars against Sauron.',
      },
    ],
    symbolism:
      'The strength and dignity of the last High King of the Noldor, and the fact that even the greatest weapon may not preserve its wielder.',
    fate: 'Gil-galad fell at Barad-dur at the end of the War of the Last Alliance. What became of Aeglos afterward is not narrated in the surviving texts.',
    eventIds: ['war-of-the-last-alliance', 'siege-of-barad-dur'],
    characterIds: ['gil-galad', 'elendil', 'sauron', 'elrond'],
    relatedIds: ['narsil-and-anduril', 'the-three-elven-rings'],
    interpretation:
      'Aeglos is attributed in passing within the accounts of the Last Alliance. Claims about its making and its later history are not supported by the texts.',
  },
  {
    id: 'the-ring-of-barahir',
    slug: 'the-ring-of-barahir',
    name: 'The Ring of Barahir',
    aliases: ['The Ring of the House of Hador'],
    summary:
      'An ancient ring given by Finrod Felagund to Barahir as a token of friendship, later an heirloom of the Numenorean and Dunedain line, and finally a token of Aragorn inheritance.',
    sourceIds: ['lotr', 'silmarillion', 'unfinished-tales', 'history-of-me'],
    continuity: 'supplementary',
    type: 'heirloom',
    tags: ['first-age', 'numenor', 'dunedain', 'aragorn', 'friendship'],
    creator: 'Made in the Elder Days; in one account it is said to have been made by the Dwarves for Finrod',
    description:
      'The Ring of Barahir is a ring of great age, worked with the likeness of two serpents whose eyes hold emeralds, meeting beneath a crown of golden flowers. Finrod gave it to Barahir as a token of an oath of friendship after Barahir saved his life, and it passed down through the line of the Edain into Numenor and then into the northern kingdom in exile. Kept at Rivendell for long years, it was given to Aragorn as proof of his descent, and it stands in the story as a small object carrying an enormous span of history and obligation.',
    powers: [
      'A token of undying friendship and of a sworn bond between Elf and Man.',
      'As an heirloom it identifies its bearer as the heir of the line of Isildur and of the Edain.',
    ],
    limitations: [
      'It has no magical power; its worth is the history and the claim it represents.',
    ],
    ownership: [
      {
        holder: 'Finrod Felagund',
        holderId: 'finrod',
        period: 'First Age',
        note: 'Given to Barahir in gratitude for his rescue.',
      },
      {
        holder: 'Barahir and the house of Hador',
        holderId: 'barahir',
        period: 'First Age',
        note: 'Kept as a family heirloom through the Edain.',
      },
      {
        holder: 'The Numenorean and Dunedain kings',
        period: 'Second Age into the Third',
        note: 'Passed down the line of Elros and afterward the heirs of Isildur.',
      },
      {
        holder: 'Elrond and Aragorn',
        holderId: 'aragorn',
        period: 'Third Age',
        note: 'Kept at Rivendell and given to Aragorn as a token of his heritage.',
      },
    ],
    symbolism:
      'Faithfulness across ages: a friendship sworn in the Elder Days still bearing fruit in the returning king. It binds the oldest Elven loyalty to the newest human hope.',
    fate: 'Aragorn bears the ring as king. Its later keeping after his reign is not narrated in detail.',
    eventIds: ['dagor-bragollach', 'war-of-the-ring'],
    characterIds: ['finrod', 'barahir', 'elendil', 'isildur', 'elrond', 'aragorn'],
    relatedIds: ['narsil-and-anduril', 'the-silmarils', 'the-dragon-helm-of-dor-lomin'],
    interpretation:
      'The ring maker is given differently in different accounts; the consistent point is the gift from Finrod to Barahir rather than the hand that first forged it.',
  },
  {
    id: 'the-dragon-helm-of-dor-lomin',
    slug: 'the-dragon-helm-of-dor-lomin',
    name: 'The Dragon-helm of Dor-lomin',
    aliases: ['The Helm of Hador', 'The Dragon-helm of the North'],
    summary:
      'A great Dwarf-wrought helm of the House of Hador, worn by Hurin and later by Turin Turambar, associated with courage and with the doom that followed that house.',
    sourceIds: ['children-of-hurin', 'unfinished-tales', 'silmarillion', 'history-of-me', 'fall-of-gondolin'],
    continuity: 'supplementary',
    type: 'heirloom',
    tags: ['first-age', 'hador', 'turin', 'dor-lomin', 'dwarves'],
    creator: 'Dwarf-smiths of the First Age; some accounts associate it with Telchar of Nogrod, but the texts do not firmly settle the maker',
    description:
      'The Dragon-helm of Dor-lomin is a tall, grim helm made by Dwarves, its visor wrought into a mask of terror. It was the heirloom of the House of Hador and grew famous as the helm of Hurin, and later of his son Turin, who wore it in his deeds in the wild and in Nargothrond. The helm is not magical in a mechanical way, but it carries the weight of a name: to see it was to know that the heir of Hador was at hand, and the accounts describe the fear it struck. Its story is inseparable from the tragedy that overtakes the children of Hurin.',
    powers: [
      'A strong and finely wrought helm that protects its wearer in battle.',
      'Its dread visage and famous name strike fear into enemies and rally the wearer allies.',
    ],
    limitations: [
      'It cannot avert the doom that hangs over the House of Hador; it saves the head, not the fate.',
      'Being an heirloom of a doomed line, it travels with its bearer into misfortune rather than away from it.',
    ],
    ownership: [
      {
        holder: 'Hador and the House of Hador',
        holderId: 'hador',
        period: 'First Age',
        note: 'The helm belongs to the lords of Dor-lomin.',
      },
      {
        holder: 'Hurin',
        holderId: 'hurin',
        period: 'First Age',
        note: 'Borne in the wars against Morgoth before Hurin is captured.',
      },
      {
        holder: 'Turin Turambar',
        holderId: 'turin-turambar',
        period: 'First Age',
        note: 'Worn in his deeds among the outlaws and in Nargothrond; left behind after he departs Doriath.',
      },
    ],
    symbolism:
      'The pride and the doom of the House of Hador. The Dragon-helm makes its wearer seem more than human, and that seeming is bound up with the overreaching that brings the house down.',
    fate: 'Turin leaves the helm behind when he flees Doriath, and the surviving accounts do not clearly follow it thereafter. Its later keeping is left unresolved in the texts.',
    eventIds: ['nirnaeth-arnoeddiad', 'sack-of-nargothrond'],
    characterIds: ['hador', 'hurin', 'turin-turambar', 'morwen', 'beleg-cuthalion'],
    relatedIds: ['the-ring-of-barahir', 'the-silmarils'],
    interpretation:
      'The maker of the helm is not stated with certainty. Later summaries sometimes name Telchar, but the narrative texts treat the helm mainly through its wearers rather than its craft.',
  },
];
