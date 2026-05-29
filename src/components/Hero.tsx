import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Zap, Copy, Check } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('10.000+ Prompts für deine nächste Kreation');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 sm:pt-0"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-future-black via-future-black/80 to-future-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.06)_0%,_transparent_70%)]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-future-cyan/20 bg-future-cyan/5 mb-8 mt-8 sm:mt-0"
        >
          <Zap className="w-4 h-4 text-future-cyan" />
          <span className="text-sm font-medium text-future-cyan tracking-wide uppercase">
            10.000+ Produktionsreife Prompts
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight mb-8"
        >
          <span className="block text-future-white">Die Zukunft</span>
          <span className="block text-gradient-cyan italic">der Kreation</span>
          <span className="block text-future-white">beginnt hier.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-future-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Entdecke die weltweit umfangreichste Sammlung handkuratierter Prompts
          für Websites, Dashboards, Apps und interaktive Erlebnisse — alle
          sofort einsatzbereit.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#explorer"
            className="group relative px-8 py-4 rounded-2xl bg-future-cyan text-future-black font-semibold text-sm tracking-wide overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Prompts entdecken
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-future-cyan via-future-white to-future-cyan opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-future-border bg-future-elevated/50 hover:bg-future-elevated hover:border-future-cyan/30 transition-all duration-300 text-sm font-medium text-future-white"
            aria-label="Tagline in Zwischenablage kopieren"
          >
            {copied ? <Check className="w-4 h-4 text-future-cyan-bright" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
            {copied ? 'Kopiert!' : 'Tagline kopieren'}
          </button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-future-cyan/40 to-transparent mx-auto mt-20"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-future-border flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-future-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
}
