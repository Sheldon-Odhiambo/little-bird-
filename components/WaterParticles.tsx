import React, { useEffect } from 'react';

const WaterParticles: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let bubbles: Bubble[] = [];
    const bubbleCount = 60; // Optimal count for performance and aesthetics

    class Bubble {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 35 + 10; // Larger range for variety
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -1.2 - 0.4; // Gentle floating speed
        this.opacity = Math.random() * 0.5 + 0.4; // Increased base opacity (40% to 90%)
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
      }

      update(w: number, h: number) {
        this.x += this.speedX + Math.sin(this.wobble) * 0.6;
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;

        if (this.y < -this.size * 2) {
          this.y = h + this.size * 2;
          this.x = Math.random() * w;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Pronounced blue shadow for pop against white backgrounds
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
        
        // Vibrant Blue Liquid Gradient
        const grad = ctx.createRadialGradient(
          this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.1,
          this.x, this.y, this.size
        );
        grad.addColorStop(0, 'rgba(186, 230, 253, 1)'); // Bright sky blue center
        grad.addColorStop(0.4, 'rgba(96, 165, 250, 0.8)'); // Vivid mid blue
        grad.addColorStop(0.8, 'rgba(37, 99, 235, 0.5)'); // Deep primary blue
        grad.addColorStop(1, 'rgba(30, 64, 175, 0.6)');   // Darker royal blue edge
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        
        // High-contrast white rim for shine
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Primary specular highlight (shine)
        ctx.beginPath();
        ctx.ellipse(
          this.x - this.size * 0.4, 
          this.y - this.size * 0.4, 
          this.size * 0.2, 
          this.size * 0.1, 
          Math.PI / 4, 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bubbles = [];
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push(new Bubble(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(b => {
        b.update(canvas.width, canvas.height);
        b.draw();
      });
      
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