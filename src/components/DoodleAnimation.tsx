"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function DoodleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    let progress = 0;
    let animId: number;

    const points: { x: number; y: number }[] = [];

    for (let t = 0; t <= 1; t += 0.02) {
      const angle = t * Math.PI * 2;
      const x = 150 + 80 * Math.pow(Math.sin(angle), 3);
      const y = 150 - 60 * Math.cos(angle) + 25 * Math.cos(2 * angle) + 10 * Math.cos(3 * angle) + 5 * Math.cos(4 * angle);
      points.push({ x: x + (Math.random() - 0.5) * 3, y: y + (Math.random() - 0.5) * 3 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(244, 114, 182, 0.15)");
      gradient.addColorStop(1, "rgba(236, 72, 153, 0.15)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const count = Math.floor(progress * points.length);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < count; i++) {
        const cp1x = (points[i - 1].x + points[i].x) / 2;
        const cp1y = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cp1x, cp1y);
      }
      ctx.strokeStyle = "rgba(244, 114, 182, 0.6)";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      for (let i = 0; i < count; i += 3) {
        const size = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(points[i].x + (Math.random() - 0.5) * 4, points[i].y + (Math.random() - 0.5) * 4, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${Math.random() * 0.3 + 0.1})`;
        ctx.fill();
      }

      progress += 0.008;
      if (progress < 1) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-[300px] h-[300px] mx-auto my-16"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center text-white/20 text-sm tracking-widest pointer-events-none select-none"
      >
        always & forever
      </motion.p>
    </motion.div>
  );
}
