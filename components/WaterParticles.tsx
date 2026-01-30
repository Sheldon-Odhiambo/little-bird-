
import React, { useEffect, useRef } from 'react';

const WaterParticles: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let waveOffset = 0;
    const particleCount = 30;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.8 - 0.2;
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -this.size) {
          this.y = canvas.height + this.size;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
        ctx.fill();
      }
    }

    const drawWave = (offset: number, amplitude: number, frequency: number, color: string) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = canvas.height - 40 + Math.sin(x * frequency + offset) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gentle waves
      drawWave(waveOffset, 15, 0.005, 'rgba(37, 99, 235, 0.03)');
      drawWave(waveOffset * 0.8, 10, 0.008, 'rgba(59, 130, 246, 0.02)');
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      waveOffset += 0.02;
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
};

export default WaterParticles;
