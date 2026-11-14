'use client';

import { useEffect, useRef } from 'react';

export const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      color: 'gold' | 'blue';
    }> = [];

    const maxParticles = 60; // Reduced for subtlety

    const createParticle = (): {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      color: 'gold' | 'blue';
    } => {
      const isGold = Math.random() > 0.4; // 60% gold, 40% blue for Victorian balance
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 1.5 + 0.5, // Smaller, more refined
        speedY: -(Math.random() * 0.4 + 0.2), // Slower drift
        speedX: (Math.random() - 0.5) * 0.3, // Gentle horizontal movement
        opacity: Math.random() * 0.3 + 0.1, // More subtle
        life: Math.random() * 250 + 150,
        color: isGold ? 'gold' as const : 'blue' as const,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.life--;

        // Reset particle if it goes off screen or dies
        if (particle.y < -10 || particle.x < -10 || particle.x > canvas.width + 10 || particle.life <= 0) {
          particles[index] = createParticle();
          return;
        }

        // Victorian color palette - candlelight gold or ghost blue
        const glowSize = particle.size * 4;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize
        );

        if (particle.color === 'gold') {
          // Candlelight gold - #C9A86C
          gradient.addColorStop(0, `rgba(201, 168, 108, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(224, 197, 137, ${particle.opacity * 0.4})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          // Ghost blue - #6B8C9E
          gradient.addColorStop(0, `rgba(107, 140, 158, ${particle.opacity})`);
          gradient.addColorStop(0.5, `rgba(107, 140, 158, ${particle.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
};
