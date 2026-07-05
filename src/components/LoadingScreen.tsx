'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsOpen(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 1800);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  const title = 'Lord of the Rings'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: 'radial-gradient(circle at center, #1e3a5a, #0d1a29)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="flex perspective-[1000px] mb-10">
            <motion.div
              className="w-[50px] h-[70px] bg-[#4b0000] border-2 border-[#b8860b] border-r-0"
              style={{ transformOrigin: 'right' }}
              animate={{ rotateY: isOpen ? -180 : 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.div
              className="w-[50px] h-[70px] bg-[#4b0000] border-2 border-[#b8860b] border-l-0"
              style={{ transformOrigin: 'left' }}
              animate={{ rotateY: isOpen ? 180 : 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <motion.h2
            className="text-4xl md:text-6xl mb-10 overflow-hidden flex"
            style={{
              color: '#b8860b',
              textShadow: '0 0 5px #ffcc66, 0 0 10px #ffcc66',
              fontFamily: "'Cinzel Decorative', cursive",
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {title.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, x: 60 }}
                animate={isOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                style={{ width: char === ' ' ? '0.5em' : 'auto' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>

          <div className="w-[300px] md:w-[400px] h-2.5 bg-[#5d4037] rounded-full overflow-hidden shadow-lg">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #b8860b, #ffcc66, #b8860b)',
                backgroundSize: '200% 100%',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>

          <motion.p
            className="mt-4 text-sm text-[#b8860b]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Entering Middle-earth...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
