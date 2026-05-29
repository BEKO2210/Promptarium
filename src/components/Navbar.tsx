import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Kategorien', href: '#categories' },
    { label: 'Entdecken', href: '#explorer' },
    { label: 'Statistiken', href: '#stats' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl border border-future-border transition-all duration-500 ${
          scrolled
            ? 'bg-future-surface/80 backdrop-blur-xl shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="Logo/logo-gradient.png"
              alt="Promptarium"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="font-display text-xl font-semibold tracking-wide text-future-white">
              Prompt<span className="text-future-cyan">arium</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-future-muted hover:text-future-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-future-cyan group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSearchClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-future-elevated border border-future-border hover:border-future-cyan/30 transition-all duration-300 text-sm text-future-muted hover:text-future-white"
            >
              <Search className="w-4 h-4" />
              <span>Suchen...</span>
              <kbd className="hidden lg:inline-flex ml-2 px-1.5 py-0.5 rounded text-[10px] bg-future-surface border border-future-border text-future-muted">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-future-elevated border border-future-border"
              aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 bg-future-surface/95 backdrop-blur-xl rounded-2xl border border-future-border p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-future-muted hover:text-future-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onSearchClick();
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-future-elevated border border-future-border text-future-muted"
              >
                <Search className="w-4 h-4" />
                Suchen...
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
