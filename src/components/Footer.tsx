'use client';

import { motion } from 'framer-motion';
import { GitFork as Github, ExternalLink as Globe, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="relative py-12 px-4 border-t border-[#b8860b]/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[#ffcc66] font-['Cinzel_Decorative'] text-sm tracking-wider mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="inline-flex items-center gap-2">
              <Heart size={14} className="text-red-500" />
              The Legend of Middle-earth
              <Heart size={14} className="text-red-500" />
            </span>
          </motion.p>

          <p className="text-[#b8860b] text-xs mb-6">
            A tribute to the works of J.R.R. Tolkien
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.a
              href="#"
              className="text-[#ccc] hover:text-[#ffcc66] transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="#"
              className="text-[#ccc] hover:text-[#ffcc66] transition-colors"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Globe size={20} />
            </motion.a>
          </div>

          <p className="text-xs text-[#5d4037]">
            © 2025{' '}
            <motion.span
              className="text-[#b8860b]"
              whileHover={{ color: '#ffcc66' }}
            >
              Glairozz Blair P. Punay
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
