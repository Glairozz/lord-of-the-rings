export interface Book {
  id: string;
  title: string;
  author: string;
  published: string;
  description: string;
  image: string;
  series: 'The Hobbit' | 'Lord of the Rings';
}

export const books: Book[] = [
  {
    id: 'the-hobbit',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    published: '1937',
    description: 'A fantasy novel that follows the journey of Bilbo Baggins, a hobbit who embarks on an unexpected adventure.',
    image: '/bookimages/UnexpectedJourney.jpg',
    series: 'The Hobbit',
  },
  {
    id: 'desolation-of-smaug',
    title: 'The Desolation of Smaug',
    author: 'J.R.R. Tolkien',
    published: '1937',
    description: 'The second part of Bilbo Baggins\' adventure, where he and the company of dwarves face the dragon Smaug.',
    image: '/bookimages/DesolationOfSmaug.jpg',
    series: 'The Hobbit',
  },
  {
    id: 'battle-of-five-armies',
    title: 'The Battle of the Five Armies',
    author: 'J.R.R. Tolkien',
    published: '1937',
    description: 'The thrilling conclusion to The Hobbit, featuring a massive battle for control of the Lonely Mountain\'s treasure.',
    image: '/bookimages/BattleOfTheFiveArmies.png',
    series: 'The Hobbit',
  },
  {
    id: 'fellowship-of-the-ring',
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    published: '1954',
    description: 'The first volume of The Lord of the Rings, detailing the formation of the Fellowship and their quest to destroy the One Ring.',
    image: '/bookimages/TheFellowshipOfTheRing.jpg',
    series: 'Lord of the Rings',
  },
  {
    id: 'two-towers',
    title: 'The Two Towers',
    author: 'J.R.R. Tolkien',
    published: '1954',
    description: 'The second volume of The Lord of the Rings, focusing on the split of the Fellowship and their individual journeys.',
    image: '/bookimages/TheTwoTowers.jpg',
    series: 'Lord of the Rings',
  },
  {
    id: 'return-of-the-king',
    title: 'The Return of the King',
    author: 'J.R.R. Tolkien',
    published: '1955',
    description: 'The final volume of The Lord of the Rings, concluding the epic tale with the defeat of Sauron and the restoration of peace to Middle-earth.',
    image: '/bookimages/TheReturnOfTheKing.jpg',
    series: 'Lord of the Rings',
  },
];
