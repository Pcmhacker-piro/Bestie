"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/photos";

interface Props {
  active: string;
  onSelect: (cat: string) => void;
}

export default function CategoryFilter({ active, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          onClick={() => onSelect(cat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
            active === cat
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-lg shadow-rose-500/10"
              : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80 hover:border-white/20"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
}
