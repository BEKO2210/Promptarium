import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FileText, Layers, Users, Star } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();
    setFinished(false);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setFinished(true);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, target]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {finished ? target.toLocaleString('de-DE') : count.toLocaleString('de-DE')}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    {
      icon: FileText,
      value: 10000,
      suffix: '+',
      label: 'Prompts',
      description: 'Produktionsreif & validiert',
    },
    {
      icon: Layers,
      value: 10,
      suffix: '',
      label: 'Kategorien',
      description: 'Von Landing Pages bis Data Viz',
    },
    {
      icon: Users,
      value: 25,
      suffix: '+',
      label: 'Industrien',
      description: 'Branchenspezifisch aufbereitet',
    },
    {
      icon: Star,
      value: 98,
      suffix: '%',
      label: 'Qualität',
      description: 'Durchschnittlicher Score',
    },
  ];

  return (
    <section id="stats" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-future-black via-future-surface to-future-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card rounded-3xl p-6 lg:p-8 text-center group hover:border-future-cyan/20 transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-future-cyan/10 mb-6 group-hover:bg-future-cyan/20 transition-colors">
                <stat.icon className="w-5 h-5 text-future-cyan" />
              </div>
              <div className="font-display text-4xl lg:text-5xl font-semibold text-future-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-semibold text-future-cyan uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-future-muted">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
