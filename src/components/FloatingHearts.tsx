"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts: { x: number; y: number; size: number; speedY: number; speedX: number; opacity: number; rotation: number }[] = [];

    for (let i = 0; i < 15; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * -0.3 - 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.15 + 0.05,
        rotation: Math.random() * Math.PI * 2,
      });
    }

    const drawHeart = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(size / 10, size / 10);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-5, -2, -10, 3, 0, 8);
      ctx.bezierCurveTo(10, 3, 5, -2, 0, 3);
      ctx.closePath();
      ctx.restore();
    };

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((h) => {
        h.y += h.speedY;
        h.x += h.speedX;
        h.rotation += 0.002;

        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }
        if (h.x < -20) h.x = canvas.width + 20;
        if (h.x > canvas.width + 20) h.x = -20;

        ctx.fillStyle = `rgba(244, 114, 182, ${h.opacity})`;
        drawHeart(h.x, h.y, h.size, h.rotation);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
