"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const springX = useSpring(cardX, { stiffness: 100, damping: 30 });
  const springY = useSpring(cardY, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
        cardX.set(x);
        cardY.set(y);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cardX, cardY]);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden perspective-[1200px]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY }}
        animate={{
          scale: 1 + Math.abs(mousePos.x) * 0.015,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        <div
          className="h-full w-full bg-contain bg-center"
          style={{
            backgroundImage:
              'url("/photos/1.png")',
            backgroundColor: '#0a0a0a',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-3"
          >
            <span className="inline-block text-xs tracking-[0.4em] text-rose-300/80 uppercase font-light">
              A journey of us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-rose-100 to-white bg-clip-text text-transparent">
              OUR MEMORIES
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 font-light tracking-wide mb-10"
          >
            A Beautiful Journey Together
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToGallery}
              className="group relative px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium tracking-wide overflow-hidden"
            >
              <span className="relative z-10">View Memories</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/story")}
              className="group relative px-8 py-3.5 rounded-full bg-rose-500/80 backdrop-blur-md border border-rose-400/30 text-white font-medium tracking-wide overflow-hidden"
            >
              <span className="relative z-10">Our Story</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 text-sm tracking-widest"
        >
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
}
