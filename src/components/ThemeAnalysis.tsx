'use client';

import { motion } from 'framer-motion';
import { ScrollText, Quote } from 'lucide-react';

export default function ThemeAnalysis() {
  return (
    <section id="theme" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
            Theme Analysis
          </motion.h2>
        </motion.div>

        <motion.div
          className="relative p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, rgba(43,58,74,0.95), rgba(30,44,58,0.95))',
            border: '3px double #b8860b',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 60px rgba(184,134,11,0.1)',
          }}
        >
          <motion.div
            className="absolute -top-4 -left-4 text-[#b8860b]"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Quote size={32} />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-4 text-[#b8860b]"
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <Quote size={32} className="rotate-180" />
          </motion.div>

          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,204,102,0.05) 0%, transparent 70%)',
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <ScrollText className="text-[#b8860b]" size={20} />
              <span className="text-sm text-[#b8860b] font-['Cinzel_Decorative'] tracking-wider">
                The Wisdom of Middle-earth
              </span>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-[#ffd966] italic text-justify">
              The Lord of the Rings explores the battle between good and evil by following the journey of ordinary
              individuals who rise to extraordinary courage. At its core, the story shows that true heroism does not come
              from strength or status but from perseverance, friendship, and moral integrity. The One Ring symbolizes
              the corrupting nature of power, tempting even the noblest characters and revealing how difficult it is to
              resist domination and desire. Through the Fellowship&apos;s struggles, Tolkien emphasizes the importance of
              unity, hope, and sacrifice in overcoming darkness. Ultimately, the book teaches that even the smallest
              person can change the world and that victory often requires both bravery and humility.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
