import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onLegalClick: () => void;
}

export default function Footer({ onLegalClick }: FooterProps) {
  return (
    <footer className="relative py-20 border-t border-future-border">
      <div className="absolute inset-0 bg-gradient-to-t from-future-surface/30 to-future-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="Logo/logo-gradient.png"
              alt="Promptarium"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="font-display text-xl font-semibold tracking-wide text-future-white">
              Prompt<span className="text-future-cyan">arium</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6" aria-label="Rechtliche Links">
            <button
              onClick={onLegalClick}
              className="text-sm text-future-muted hover:text-future-white transition-colors"
            >
              Datenschutz
            </button>
            <button
              onClick={onLegalClick}
              className="text-sm text-future-muted hover:text-future-white transition-colors"
            >
              Impressum
            </button>
            <button
              onClick={onLegalClick}
              className="text-sm text-future-muted hover:text-future-white transition-colors"
            >
              Nutzungsbedingungen
            </button>
          </nav>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-future-border/50 to-transparent my-10"
        />

        <div className="text-center">
          <p className="text-sm text-future-muted flex items-center justify-center gap-1">
            Mit <Heart className="w-3 h-3 text-red-400 fill-red-400" aria-hidden="true" /> gebaut von Promptarium
          </p>
          <p className="text-xs text-future-muted/60 mt-2">
            Alle Prompts sind urheberrechtlich geschützt und unterliegen den Nutzungsbedingungen.
            Namen und Marken Dritter gehören ihren jeweiligen Eigentümern.
          </p>
        </div>
      </div>
    </footer>
  );
}
