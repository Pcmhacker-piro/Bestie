export interface Photo {
  id: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
}

export const categories = ["All", "Cute", "Trips", "Random", "Best Moments"];

function srcPath(id: number): string {
  const exts: Record<number, string> = {
    1: "png", 2: "png", 3: "png", 4: "png", 5: "png",
    6: "png", 7: "png", 8: "png", 9: "png", 10: "png",
    11: "png", 12: "png", 13: "png",
    14: "jpeg", 15: "jpeg", 16: "jpeg",
    17: "png",
    18: "jpeg", 19: "jpeg", 20: "jpeg", 21: "jpeg", 22: "jpeg",
    23: "png", 24: "png", 25: "png",
    26: "jpeg", 27: "png", 28: "png",
  };
  return `/photos/${id}.${exts[id]}`;
}

export const photos: Photo[] = [
  { id: 1, src: srcPath(1), width: 600, height: 800, alt: "Our first memory", category: "Best Moments" },
  { id: 2, src: srcPath(2), width: 800, height: 600, alt: "Beautiful day", category: "Cute" },
  { id: 3, src: srcPath(3), width: 600, height: 900, alt: "Laughing together", category: "Best Moments" },
  { id: 4, src: srcPath(4), width: 800, height: 800, alt: "Sunset walk", category: "Trips" },
  { id: 5, src: srcPath(5), width: 600, height: 700, alt: "Cozy moments", category: "Cute" },
  { id: 6, src: srcPath(6), width: 800, height: 900, alt: "Adventure time", category: "Trips" },
  { id: 7, src: srcPath(7), width: 600, height: 600, alt: "Pure joy", category: "Best Moments" },
  { id: 8, src: srcPath(8), width: 800, height: 700, alt: "Chill vibes", category: "Random" },
  { id: 9, src: srcPath(9), width: 600, height: 1000, alt: "Golden hour", category: "Best Moments" },
  { id: 10, src: srcPath(10), width: 800, height: 600, alt: "On the road", category: "Trips" },
  { id: 11, src: srcPath(11), width: 600, height: 750, alt: "Picnic perfect", category: "Cute" },
  { id: 12, src: srcPath(12), width: 800, height: 1000, alt: "Starry night", category: "Best Moments" },
  { id: 13, src: srcPath(13), width: 600, height: 650, alt: "Flower fields", category: "Cute" },
  { id: 14, src: srcPath(14), width: 800, height: 750, alt: "Beach bliss", category: "Trips" },
  { id: 15, src: srcPath(15), width: 600, height: 850, alt: "City lights", category: "Random" },
  { id: 16, src: srcPath(16), width: 800, height: 650, alt: "Date night", category: "Cute" },
  { id: 17, src: srcPath(17), width: 600, height: 950, alt: "Mountain view", category: "Trips" },
  { id: 18, src: srcPath(18), width: 800, height: 850, alt: "Train rides", category: "Trips" },
  { id: 19, src: srcPath(19), width: 600, height: 700, alt: "Bookstore finds", category: "Random" },
  { id: 20, src: srcPath(20), width: 800, height: 900, alt: "Rainy days", category: "Cute" },
  { id: 21, src: srcPath(21), width: 600, height: 800, alt: "Campfire stories", category: "Best Moments" },
  { id: 22, src: srcPath(22), width: 800, height: 750, alt: "New memories", category: "Best Moments" },
  { id: 23, src: srcPath(23), width: 600, height: 800, alt: "Sunny days", category: "Cute" },
  { id: 24, src: srcPath(24), width: 800, height: 700, alt: "Adventure awaits", category: "Trips" },
  { id: 25, src: srcPath(25), width: 600, height: 900, alt: "Dreamy nights", category: "Best Moments" },
  { id: 26, src: srcPath(26), width: 800, height: 600, alt: "Roadside stops", category: "Trips" },
  { id: 27, src: srcPath(27), width: 600, height: 750, alt: "Laughter", category: "Cute" },
  { id: 28, src: srcPath(28), width: 800, height: 850, alt: "Cherished times", category: "Best Moments" },
];
