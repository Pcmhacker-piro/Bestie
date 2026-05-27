"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black perspective-[800px]"
        >
          <motion.div className="text-center" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block text-5xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                💕
              </motion.span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl font-light tracking-[0.3em] text-white/80"
              style={{ transformStyle: "preserve-3d" }}
            >
              OUR MEMORIES
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
