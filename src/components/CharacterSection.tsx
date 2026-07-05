'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { charactersByRace, raceIcons } from '@/data/characters';
import CharacterCard from './CharacterCard';

export default function CharacterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], ['-50px', '50px']);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const races = Object.entries(charactersByRace);

  return (
    <section id="characters" ref={ref} className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-['Cinzel_Decorative'] mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffcc66, #b8860b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Characters
          </motion.h2>
          <p className="text-[#b8860b] italic">The heroes, villains, and legends of Middle-earth</p>
        </motion.div>

        <div className="space-y-20">
          {races.map(([race, characters]) => (
            <motion.div
              key={race}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl">{raceIcons[race] || '✦'}</span>
                <h3
                  className="text-2xl md:text-3xl font-['Cinzel_Decorative'] text-[#ffcc66]"
                  style={{
                    textShadow: '0 0 20px rgba(255,204,102,0.2)',
                  }}
                >
                  {race}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[#b8860b]/50 to-transparent" />
                <span className="text-sm text-[#b8860b]">{characters.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {characters.map((char, i) => (
                  <CharacterCard key={char.id} character={char} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
