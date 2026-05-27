"use client";

import { motion } from "framer-motion";

const quotes = [
  { text: "Some people come into our lives and leave footprints on our hearts.", from: "—" },
  { text: "Family is not just an important thing, it's everything.", from: "—" },
  { text: "Life was meant for good friends and great adventures.", from: "—" },
  { text: "Together is the best place to be.", from: "—" },
  { text: "Growing old with you is the greatest adventure.", from: "—" },
];

export default function QuoteSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-20">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div className={`max-w-lg ${i % 2 === 0 ? "text-left" : "text-right"}`}>
              <div className="text-4xl text-rose-400/20 mb-2">&ldquo;</div>
              <p className="text-white/50 text-lg md:text-xl font-light italic leading-relaxed">
                {q.text}
              </p>
              <p className="text-white/20 text-sm mt-2 tracking-wider">{q.from}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
