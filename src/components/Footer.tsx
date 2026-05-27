"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/prakash_meena1307/" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-rose-300/60 transition-colors cursor-pointer text-sm tracking-widest">Instagram</a>
            <span className="text-white/20 hover:text-rose-300/60 transition-colors cursor-pointer text-sm tracking-widest">Spotify</span>
            <span className="text-white/20 hover:text-rose-300/60 transition-colors cursor-pointer text-sm tracking-widest">Playlist</span>
          </div>

          <p className="text-white/30 text-sm tracking-wide mb-2">
            Every moment with you is a memory I&apos;ll cherish forever.
          </p>
          <p className="text-rose-300/60 text-sm tracking-wider">
            Made with love <span className="text-rose-400">❤️</span>
          </p>
          <p className="text-white/10 text-xs mt-4 tracking-widest">
            &copy; 2026 Our Memories
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
