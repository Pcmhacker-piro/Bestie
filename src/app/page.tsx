"use client";

import { Suspense, lazy, useEffect } from "react";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import FloatingHearts from "@/components/FloatingHearts";
import ParticleBackground from "@/components/ParticleBackground";
import Starfield from "@/components/Starfield";
import MusicToggle from "@/components/MusicToggle";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { photos } from "@/data/photos";

const QuoteSection = lazy(() => import("@/components/QuoteSection"));

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Starfield />
      <LoadingScreen />
      <ParticleBackground />
      <FloatingHearts />
      <main className="relative z-10">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/5 to-transparent pointer-events-none" />
          <Gallery photos={photos} />
          <Suspense fallback={null}>
            <QuoteSection />
          </Suspense>
        </div>
        <Footer />
      </main>
      <MusicToggle />
    </>
  );
}
