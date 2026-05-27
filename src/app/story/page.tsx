"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const videos = [
  { id: 1, src: "/story/1.mp4", title: "Chapter 1: The Beginning" },
  { id: 2, src: "/story/2.mp4", title: "Chapter 2: Our Journey" },
  { id: 3, src: "/story/3.mp4", title: "Chapter 3: Forever" },
];

export default function StoryPage() {
  const router = useRouter();
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const togglePlay = (id: number) => {
    const video = videoRefs.current[id - 1];
    if (!video) return;
    if (playing === id) {
      video.pause();
      setPlaying(null);
    } else {
      videoRefs.current.forEach((v) => v?.pause());
      video.play();
      setPlaying(id);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-rose-950/10 to-black pointer-events-none z-0" />

      <nav className="relative z-10 px-6 py-6 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm tracking-wide">Back</span>
        </motion.button>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/30 text-xs tracking-widest"
        >
          OUR STORY
        </motion.span>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-10"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-3">
            Our <span className="text-rose-300">Story</span>
          </h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Every moment captured in motion</p>
        </motion.div>

        <div className="space-y-16">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
            >
              <h2 className="text-xl text-white/60 font-light tracking-wide mb-4 text-center">
                {video.title}
              </h2>
              <div
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => togglePlay(video.id)}
              >
                <video
                  ref={(el) => { videoRefs.current[video.id - 1] = el; }}
                  src={video.src}
                  className="w-full rounded-2xl"
                  playsInline
                  preload="metadata"
                />
                {playing !== video.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
