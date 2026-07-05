export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  race: string;
}

export const charactersByRace: Record<string, Character[]> = {
  Hobbits: [
    { id: 'bilbo', name: 'Bilbo Baggins', description: 'A hobbit from the Shire who becomes an unlikely hero in The Hobbit.', image: '/hobbitimages/bilbo.webp', race: 'Hobbits' },
    { id: 'frodo', name: 'Frodo Baggins', description: 'The main protagonist of The Lord of the Rings, tasked with destroying the One Ring.', image: '/hobbitimages/frodo.jpg', race: 'Hobbits' },
    { id: 'samwise', name: 'Samwise Gamgee', description: "Frodo's loyal friend and companion on his quest to destroy the One Ring.", image: '/hobbitimages/samwise.webp', race: 'Hobbits' },
    { id: 'merry', name: 'Meriadoc Brandybuck', description: 'Commonly known as Merry, a brave hobbit and member of the Fellowship of the Ring.', image: '/hobbitimages/merry.webp', race: 'Hobbits' },
    { id: 'pippin', name: 'Peregrin Took', description: 'Commonly known as Pippin, a curious and adventurous hobbit in The Lord of the Rings.', image: '/hobbitimages/pippin.jpg', race: 'Hobbits' },
  ],
  Dwarves: [
    { id: 'thorin', name: 'Thorin Oakenshield', description: 'The leader of the company of dwarves in The Hobbit, seeking to reclaim his homeland.', image: '/dwarfimages/thorin.webp', race: 'Dwarves' },
    { id: 'thrain', name: 'Thrain', description: 'Father of Thorin Oakenshield and former King under the Mountain.', image: '/dwarfimages/thrain.jpg', race: 'Dwarves' },
    { id: 'thror', name: 'Thror', description: 'Grandfather of Thorin Oakenshield and former King under the Mountain.', image: '/dwarfimages/thror.jpg', race: 'Dwarves' },
    { id: 'dain', name: 'Dain', description: "A brave dwarf who becomes King under the Mountain after Thorin's death.", image: '/dwarfimages/dain.jpg', race: 'Dwarves' },
    { id: 'nori', name: 'Nori', description: 'A dwarf known for his distinctive hairstyle and adventurous spirit in The Hobbit.', image: '/dwarfimages/nori.webp', race: 'Dwarves' },
    { id: 'dori', name: 'Dori', description: 'A strong and dependable dwarf from The Hobbit.', image: '/dwarfimages/dori.webp', race: 'Dwarves' },
    { id: 'balin', name: 'Balin', description: 'An elder dwarf known for his wisdom and kindness in The Hobbit.', image: '/dwarfimages/balin.webp', race: 'Dwarves' },
    { id: 'durin', name: 'Durin', description: "The eldest of the Seven Fathers of the Dwarves and founder of the line of Durin's Folk.", image: '/dwarfimages/durin.jpg', race: 'Dwarves' },
    { id: 'gimli', name: 'Gimli', description: 'A member of the Fellowship of the Ring, known for his bravery and loyalty.', image: '/dwarfimages/gimli.jpg', race: 'Dwarves' },
    { id: 'bombur', name: 'Bombur', description: 'A jovial and somewhat clumsy dwarf from The Hobbit.', image: '/dwarfimages/bombur.jpg', race: 'Dwarves' },
    { id: 'dwalin', name: 'Dwalin', description: 'A fierce warrior and loyal companion in The Hobbit.', image: '/dwarfimages/dwalin.webp', race: 'Dwarves' },
    { id: 'kili', name: 'Kili', description: 'A young and brave dwarf, skilled with a bow in The Hobbit.', image: '/dwarfimages/kili.webp', race: 'Dwarves' },
    { id: 'fili', name: 'Fili', description: "A courageous dwarf and Kili's older brother in The Hobbit.", image: '/dwarfimages/fili.webp', race: 'Dwarves' },
    { id: 'oin', name: 'Oin', description: 'A dwarf known for his skills in healing in The Hobbit.', image: '/dwarfimages/oin.webp', race: 'Dwarves' },
    { id: 'gloin', name: 'Gloin', description: 'A stout dwarf and father of Gimli in The Hobbit.', image: '/dwarfimages/gloin.webp', race: 'Dwarves' },
    { id: 'bifur', name: 'Bifur', description: 'A dwarf known for his unique speech in The Hobbit.', image: '/dwarfimages/bifur.webp', race: 'Dwarves' },
  ],
  Elves: [
    { id: 'legolas', name: 'Legolas', description: 'A skilled archer and member of the Fellowship of the Ring.', image: '/elvesimages/legolas.webp', race: 'Elves' },
    { id: 'tauriel', name: 'Tauriel', description: 'A captain of the Mirkwood Elven guard, known for her bravery and combat skills.', image: '/elvesimages/tauriel.webp', race: 'Elves' },
    { id: 'thranduil', name: 'Thranduil', description: 'The Elvenking of Mirkwood and father of Legolas.', image: '/elvesimages/thranduil.webp', race: 'Elves' },
    { id: 'elrond', name: 'Elrond', description: 'The Lord of Rivendell, known for his wisdom and healing abilities.', image: '/elvesimages/elrond.webp', race: 'Elves' },
    { id: 'galadriel', name: 'Galadriel', description: 'The Lady of Lothlórien, renowned for her beauty and power.', image: '/elvesimages/galadriel.webp', race: 'Elves' },
    { id: 'arondir', name: 'Arondir', description: 'A Silvan Elf, a branch of woodland elves who never left Middle-earth for Valinor.', image: '/elvesimages/arondir.jpg', race: 'Elves' },
    { id: 'arwen', name: 'Arwen', description: 'The daughter of Elrond, known for her love story with Aragorn.', image: '/elvesimages/arwen.jpg', race: 'Elves' },
    { id: 'celeborn', name: 'Celeborn', description: 'The Lord of Lothlórien and husband of Galadriel.', image: '/elvesimages/celeborn.webp', race: 'Elves' },
    { id: 'haldir', name: 'Haldir', description: 'An elf of Lothlórien who aids the Fellowship during their journey.', image: '/elvesimages/haldir.jpg', race: 'Elves' },
    { id: 'glorfindel', name: 'Glorfindel', description: 'A noble elf-lord known for his bravery and strength.', image: '/elvesimages/glorfindel.webp', race: 'Elves' },
  ],
  Wizards: [
    { id: 'gandalf', name: 'Gandalf', description: 'A wise and powerful wizard who plays a crucial role in both The Hobbit and The Lord of the Rings.', image: '/wizardimages/gandalf.webp', race: 'Wizards' },
    { id: 'saruman', name: 'Saruman', description: 'The head of the wizards, who becomes corrupted by his desire for power.', image: '/wizardimages/saruman.jpg', race: 'Wizards' },
    { id: 'radagast', name: 'Radagast', description: 'A wizard known for his affinity with animals and nature.', image: '/wizardimages/radagast.jpg', race: 'Wizards' },
    { id: 'alatar', name: 'Alatar', description: 'One of the Blue Wizards who journeyed into the East of Middle-earth.', image: '/wizardimages/alatar.jpg', race: 'Wizards' },
    { id: 'pallando', name: 'Pallando', description: 'One of the Blue Wizards who journeyed into the East of Middle-earth.', image: '/wizardimages/pallando.jpg', race: 'Wizards' },
  ],
  Men: [
    { id: 'aragorn', name: 'Aragorn', description: 'The rightful heir to the throne of Gondor and a key member of the Fellowship of the Ring.', image: '/manimages/aragorn.webp', race: 'Men' },
    { id: 'boromir', name: 'Boromir', description: 'A noble warrior of Gondor and member of the Fellowship of the Ring.', image: '/manimages/boromir.jpg', race: 'Men' },
    { id: 'faramir', name: 'Faramir', description: 'The younger brother of Boromir and a captain of Gondor.', image: '/manimages/faramir.webp', race: 'Men' },
    { id: 'eomer', name: 'Eomer', description: 'The nephew of King Theoden and a skilled warrior of Rohan.', image: '/manimages/eomer.webp', race: 'Men' },
    { id: 'theoden', name: 'Theoden', description: 'The King of Rohan, known for his leadership and bravery in battle.', image: '/manimages/theoden.jpg', race: 'Men' },
    { id: 'denethor', name: 'Denethor', description: 'The Steward of Gondor during the War of the Ring.', image: '/manimages/denethor.webp', race: 'Men' },
  ],
  Necromancer: [
    { id: 'morgoth', name: 'Morgoth', description: 'The first Dark Lord, and the primordial source of evil in Eä in the Elder Days.', image: '/necromancerimages/morgoth.webp', race: 'Necromancer' },
    { id: 'sauron', name: 'Sauron', description: 'The primary antagonist of The Lord of the Rings, a dark lord seeking to conquer Middle-earth.', image: '/necromancerimages/sauron.webp', race: 'Necromancer' },
    { id: 'witchking', name: 'The Witch-king of Angmar', description: "The leader of the Nazgûl, Sauron's most feared servants.", image: '/necromancerimages/witchking.webp', race: 'Necromancer' },
    { id: 'gollum', name: 'Gollum', description: 'A creature corrupted by the One Ring, obsessed with reclaiming it.', image: '/necromancerimages/gollum.jpg', race: 'Necromancer' },
    { id: 'grima', name: 'Grima Wormtongue', description: 'An advisor to King Theoden who secretly serves Saruman.', image: '/necromancerimages/grima.webp', race: 'Necromancer' },
  ],
  Orcs: [
    { id: 'azog', name: 'Azog the Defiler', description: 'An infamous orc chieftain who plays a significant role in The Hobbit.', image: '/orcsimages/azog.webp', race: 'Orcs' },
    { id: 'bolg', name: 'Bolg', description: 'The son of Azog, who leads the orc forces in The Hobbit.', image: '/orcsimages/bolg.webp', race: 'Orcs' },
    { id: 'lurtz', name: 'Lurtz', description: 'A formidable Uruk-hai captain who serves Saruman in The Lord of the Rings.', image: '/orcsimages/lurtz.webp', race: 'Orcs' },
    { id: 'grishnakh', name: 'Grishnakh', description: 'An Orc captain from Mordor who led a host of Orcs to join the Uruk-hai.', image: '/orcsimages/grishnakh.jpg', race: 'Orcs' },
    { id: 'mauhur', name: 'Mauhúr', description: "An Uruk-hai captain in the company sent to accompany Saruman's scouts.", image: '/orcsimages/mauhúr.webp', race: 'Orcs' },
    { id: 'gorbag', name: 'Gorbag', description: 'Captain of the Uruks of Minas Morgul who served the Nazgûl.', image: '/orcsimages/gorbag.webp', race: 'Orcs' },
    { id: 'shagrat', name: 'Shagrat', description: 'A large Uruk, Captain of the Tower of Cirith Ungol.', image: '/orcsimages/shagrat.jpg', race: 'Orcs' },
    { id: 'ugluk', name: 'Uglúk', description: 'Leader of the Uruk-hai sent from Isengard to pursue the Fellowship.', image: '/orcsimages/uglúk.webp', race: 'Orcs' },
  ],
  Dragons: [
    { id: 'smaug', name: 'Smaug', description: 'The fearsome dragon who hoards a vast treasure in The Hobbit.', image: '/dragonimages/smaug.webp', race: 'Dragons' },
    { id: 'ancalagon', name: 'Ancalagon the Black', description: 'The largest and most powerful dragon in Middle-earth, featured in The Silmarillion.', image: '/dragonimages/ancalagon.jpg', race: 'Dragons' },
    { id: 'glaurung', name: 'Glaurung', description: 'The first of the great dragons in Middle-earth, known for his cunning and cruelty.', image: '/dragonimages/glaurung.webp', race: 'Dragons' },
    { id: 'scatha', name: 'Scatha', description: 'A great dragon of the Grey Mountains, known for his battles with the Dwarves.', image: '/dragonimages/scatha.webp', race: 'Dragons' },
    { id: 'chrysophylax', name: 'Chrysophylax Dives', description: 'A dragon featured in Tolkien\'s short story "Farmer Giles of Ham," known for his greed.', image: '/dragonimages/chrysophylax.jpg', race: 'Dragons' },
  ],
};

export const raceIcons: Record<string, string> = {
  Hobbits: '🍃',
  Dwarves: '⛏️',
  Elves: '🌿',
  Wizards: '🔮',
  Men: '⚔️',
  Necromancer: '💀',
  Orcs: '🛡️',
  Dragons: '🐉',
};

export const raceImages: Record<string, string> = {
  Hobbits: '/images/hobbit-bg.jpg',
  Dwarves: '/images/dwarf-bg.jpg',
  Elves: '/images/elf-bg.jpg',
  Wizards: '/images/wizard-bg.jpg',
  Men: '/images/men-bg.jpg',
  Necromancer: '/images/necromancer-bg.jpg',
  Orcs: '/images/orc-bg.jpg',
  Dragons: '/images/dragon-bg.jpg',
};
