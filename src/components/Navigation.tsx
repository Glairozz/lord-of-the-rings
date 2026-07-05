'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Users, ScrollText, MessageCircle } from 'lucide-react';

const navItems = [
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'characters', label: 'Characters', icon: Users },
  { id: 'theme', label: 'Theme', icon: ScrollText },
  { id: 'footer', label: 'About', icon: MessageCircle },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[#0d1a29]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.button
            className="text-[#ffcc66] font-['Cinzel_Decorative'] text-lg tracking-wider"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Middle-earth
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="flex items-center gap-2 text-[#ccc] hover:text-[#ffcc66] transition-colors text-sm tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
              >
                <item.icon size={16} />
                {item.label}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="md:hidden text-[#ffcc66]"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0d1a29]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                className="flex items-center gap-3 text-2xl text-[#ffcc66] font-['Cinzel_Decorative']"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection(item.id);
                }}
              >
                <item.icon size={24} />
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
