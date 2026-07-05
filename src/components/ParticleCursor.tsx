'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; size: number; hue: number }[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouse);

    let frameId: number;
    let lastSpawn = 0;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - lastSpawn > 80) {
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: mouse.current.x + (Math.random() - 0.5) * 10,
            y: mouse.current.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            life: 1,
            size: Math.random() * 3 + 1,
            hue: Math.random() * 30 + 35,
          });
        }
        lastSpawn = time;
      }

      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        p.size *= 0.99;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life * 0.6})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life * 0.15})`;
        ctx.fill();

        return true;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
}
