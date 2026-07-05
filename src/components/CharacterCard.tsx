'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Character } from '@/data/characters';

export default function CharacterCard({ character, index }: { character: Character; index: number }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -12, scale: 1.03 }}
      style={{
        background: 'linear-gradient(135deg, rgba(30,44,58,0.95), rgba(42,63,95,0.95))',
        border: '1px solid rgba(58,75,92,0.4)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a29]/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-56 md:h-64 overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a29]/60 to-transparent" />
      </div>

      <div className="p-5 relative z-10">
        <motion.h3
          className="text-lg font-['Cinzel_Decorative'] text-[#ffcc66] mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {character.name}
        </motion.h3>
        <p className="text-sm text-[#ccc] leading-relaxed">{character.description}</p>
      </div>

      <motion.div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs z-20"
        style={{
          background: 'rgba(184,134,11,0.2)',
          border: '1px solid rgba(184,134,11,0.4)',
          color: '#b8860b',
        }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.05 }}
      >
        {index + 1}
      </motion.div>
    </motion.div>
  );
}
