'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/middleearth-map.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a29]/80 via-[#0d1a29]/50 to-[#0d1a29]" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4"
        style={{ opacity }}
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-['Cinzel_Decorative'] mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, #ffcc66, #b8860b, #ffcc66)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Middle-earth
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-[#ccc] italic max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          Welcome to the world of Middle-earth, where epic adventures unfold.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.button
            className="px-8 py-3 border-2 border-[#b8860b] text-[#ffcc66] rounded-full font-['Cinzel_Decorative'] text-sm tracking-wider"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(184, 134, 11, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore the Legend
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="text-[#b8860b]" size={32} />
      </motion.div>
    </section>
  );
}
