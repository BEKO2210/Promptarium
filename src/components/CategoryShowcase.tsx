import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Globe, Layout, BarChart3, ShoppingBag, User, Bot,
  GraduationCap, Smartphone, Gamepad2, PieChart, ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Globe, Layout, BarChart3, ShoppingBag, User, Bot,
  GraduationCap, Smartphone, Gamepad2, PieChart,
};

interface Category {
  name: string;
  label: string;
  count: number;
  icon: string;
}

interface CategoryShowcaseProps {
  categories: Category[];
  onSelect: (cat: string) => void;
}

export default function CategoryShowcase({ categories, onSelect }: CategoryShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categoryDescriptions: Record<string, string> = {
    landing_pages: 'Hero-Sections, CTAs & Conversion-Fokus',
    ui_components: 'Buttons, Modals, Forms & Navigation',
    saas_dashboards: 'Analytics, Charts & Admin Panels',
    ecommerce: 'Produktseiten, Warenkorb & Checkout',
    portfolio_personal_brand: 'About, Gallery & Testimonials',
    ai_tools_agents: 'Chat-Interfaces, Tool-Panels & Agents',
    education_learning: 'Kurse, Quizze & Interaktive Lernpfade',
    mobile_apps: 'iOS/Android UI & Mobile-first Design',
    games_interactive: 'Spielmechaniken, Leaderboards & Animationen',
    data_visualization: 'Charts, Dashboards & Real-time Data',
  };

  return (
    <section id="categories" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-future-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-future-cyan/3 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-future-cyan uppercase tracking-widest mb-4 block">
            Durchsuche
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-light text-future-white mb-6">
            Kategorien
          </h2>
          <p className="text-future-muted max-w-xl mx-auto">
            Von Hero Sections bis hin zu Data Visualizations — finde genau den Prompt, den du brauchst.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Globe;
            return (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => onSelect(cat.name)}
                className="group relative glass-card rounded-2xl overflow-hidden text-left hover:bg-future-elevated/80 transition-all duration-500 cursor-pointer"
                aria-label={`${cat.label} - ${categoryDescriptions[cat.name] || ''}`}
              >
                {/* Category image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={`/images/${cat.name}.jpg`}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-future-surface via-future-surface/20 to-future-surface/30" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-future-cyan/20 backdrop-blur-md flex items-center justify-center border border-future-cyan/20">
                      <Icon className="w-4 h-4 text-future-cyan" />
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 text-xs font-mono text-future-white bg-future-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-future-border/30">
                    {cat.count.toLocaleString('de-DE')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-future-white mb-1 group-hover:text-future-cyan transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-future-muted mb-4">
                    {categoryDescriptions[cat.name] || cat.name.replace(/_/g, ' ')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-future-cyan opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Entdecken</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
