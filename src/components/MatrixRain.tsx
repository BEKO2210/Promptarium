import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Katakana + Numbers + Letters + Special symbols
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>[]{}|=+-_/\\~`!@#$%^&*';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(w / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // start above screen at random times
      speeds[i] = 0.5 + Math.random() * 1.5;
      colors[i] = Math.random() > 0.7 ? '#00f0ff' : '#22d3ee'; // mix of bright cyan shades
    }

    let frame = 0;
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(2, 4, 10, 0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the drop is bright white-cyan
        if (y > 0 && y < h) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00f0ff';
          ctx.fillText(text, x, y);

          // The trail behind is darker cyan
          if (drops[i] > 1) {
            const trailChar = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillStyle = colors[i];
            ctx.shadowBlur = 4;
            ctx.shadowColor = colors[i];
            ctx.globalAlpha = 0.6;
            ctx.fillText(trailChar, x, y - fontSize);
            ctx.globalAlpha = 1.0;
          }
        }

        // Reset drop randomly after it crosses screen
        if (y * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
          colors[i] = Math.random() > 0.5 ? '#00f0ff' : '#818cf8'; // cyan or indigo
        }

        drops[i] += speeds[i] * 0.6;
      }

      // Occasionally draw a brighter "spark" character
      if (Math.random() > 0.95) {
        const sparkX = Math.floor(Math.random() * columns) * fontSize;
        const sparkY = Math.floor(Math.random() * (h / fontSize)) * fontSize;
        const sparkChar = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#a78bfa';
        ctx.fillText(sparkChar, sparkX, sparkY);
      }

      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      w = newW;
      h = newH;
      canvas.width = newW;
      canvas.height = newH;
      // Recalculate columns and reset drops for new width
      const newColumns = Math.floor(newW / fontSize);
      drops.length = 0;
      speeds.length = 0;
      colors.length = 0;
      for (let i = 0; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
        speeds[i] = 0.5 + Math.random() * 1.5;
        colors[i] = Math.random() > 0.7 ? '#00f0ff' : '#22d3ee';
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.35,
      }}
    />
  );
}
