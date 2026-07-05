'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Book, BookOpen } from 'lucide-react';
import { books } from '@/data/books';

function BookCard({ book, index }: { book: (typeof books)[0]; index: number }) {
  return (
    <motion.div
      className="group relative flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        background: 'linear-gradient(135deg, rgba(30,44,58,0.9), rgba(42,63,95,0.9))',
        border: '1px solid rgba(58,75,92,0.5)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc66]/0 via-[#ffcc66]/5 to-[#ffcc66]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        className="relative w-[120px] h-[180px] md:w-[140px] md:h-[210px] shrink-0 z-10"
        whileHover={{ scale: 1.08, rotateY: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover rounded-lg"
          style={{ border: '2px solid #b8860b', boxShadow: '0 8px 25px rgba(0,0,0,0.4)' }}
        />
      </motion.div>

      <div className="flex-1 z-10 text-center md:text-left">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-3"
          style={{
            background: 'rgba(184,134,11,0.15)',
            border: '1px solid rgba(184,134,11,0.3)',
            color: '#b8860b',
          }}
        >
          <BookOpen size={12} />
          {book.series}
        </motion.div>
        <h3 className="text-xl md:text-2xl font-['Cinzel_Decorative'] text-[#ffcc66] mb-2">{book.title}</h3>
        <p className="text-sm text-[#b8860b] mb-2">{book.author} · {book.published}</p>
        <p className="text-sm text-[#ccc] leading-relaxed">{book.description}</p>
      </div>

      <div className="absolute top-4 right-4 text-[#b8860b]/20">
        <Book size={40} />
      </div>
    </motion.div>
  );
}

export default function BookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ['-50px', '50px']);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="books" ref={ref} className="relative py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
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
            Books
          </motion.h2>
          <p className="text-[#b8860b] italic">The tales that defined a genre</p>
        </motion.div>

        <div className="space-y-8">
          {books.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
