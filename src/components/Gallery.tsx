"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import type { Photo } from "@/data/photos";
import CategoryFilter from "./CategoryFilter";
import Lightbox from "./Lightbox";
import TiltCard from "./TiltCard";

interface Props {
  photos: Photo[];
}

const quoteSets = [
  { text: "Some people come into our lives and leave footprints on our hearts.", from: "—" },
  { text: "A bestie is like a sister you choose for yourself.", from: "—" },
  { text: "Life was meant for good friends and great adventures.", from: "—" },
  { text: "Together is the best place to be.", from: "—" },
];

export default function Gallery({ photos }: Props) {
  const [filter, setFilter] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  const handleSelect = useCallback((photo: Photo) => {
    const idx = filtered.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx);
    setLightboxPhoto(photo);
  }, [filtered]);

  const handlePrev = useCallback(() => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(newIdx);
    setLightboxPhoto(filtered[newIdx]);
  }, [lightboxIndex, filtered]);

  const handleNext = useCallback(() => {
    const newIdx = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(newIdx);
    setLightboxPhoto(filtered[newIdx]);
  }, [lightboxIndex, filtered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setVisiblePhotos((prev) => (prev.includes(id) ? prev : [...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = document.querySelectorAll("[data-gallery-item]");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <section id="gallery" ref={galleryRef} className="relative py-24 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Our <span className="text-rose-300">Gallery</span>
        </h2>
        <p className="text-white/40 text-sm tracking-widest uppercase">Every moment captured with love</p>
      </motion.div>

      <CategoryFilter active={filter} onSelect={setFilter} />

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 max-w-[1400px] mx-auto" style={{ columnGap: "2rem" }}>
        {filtered.map((photo, i) => (
          <motion.div
            key={photo.id}
            data-gallery-item
            data-id={photo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={visiblePhotos.includes(photo.id) ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
            className="break-inside-avoid mb-8 cursor-pointer"
            onClick={() => handleSelect(photo)}
          >
            <TiltCard className="group relative overflow-hidden rounded-xl">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-auto transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  style={{ transformOrigin: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white text-sm font-medium tracking-wide">{photo.alt}</p>
                  <span className="text-white/50 text-xs">{photo.category}</span>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-white/0 group-hover:ring-white/20 rounded-xl transition-all duration-500" />
            </TiltCard>

            {(i + 1) % 9 === 0 && i < filtered.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="my-8 py-8 text-center border-y border-white/10"
              >
                <p className="text-white/60 text-lg italic font-light">&ldquo;{quoteSets[Math.floor(i / 9) % quoteSets.length].text}&rdquo;</p>
                <p className="text-white/30 text-xs mt-2">{quoteSets[Math.floor(i / 9) % quoteSets.length].from}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <Lightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        total={filtered.length}
      />
    </section>
  );
}
