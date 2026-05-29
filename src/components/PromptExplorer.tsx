import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import PromptCard from './PromptCard';
import PromptModal from './PromptModal';
import type { Prompt } from '../hooks/usePrompts';

interface PromptExplorerProps {
  prompts: Prompt[];
  initialCategory?: string;
}

export default function PromptExplorer({ prompts, initialCategory }: PromptExplorerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const perPage = 24;

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setPage(1);
    }
  }, [initialCategory]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(prompts.map(p => p.category));
    return Array.from(set).sort();
  }, [prompts]);

  const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];

  const filtered = useMemo(() => {
    return prompts.filter(p => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.prompt.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        p.website_card.search_keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [prompts, search, selectedCategory, selectedDifficulty]);

  const paginated = useMemo(() => {
    return filtered.slice(0, page * perPage);
  }, [filtered, page]);

  const hasMore = paginated.length < filtered.length;

  return (
    <>
      <section id="explorer" ref={sectionRef} className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-future-black via-future-surface/50 to-future-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-future-cyan uppercase tracking-widest mb-4 block">
              Explorer
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-light text-future-white mb-6">
              Prompts entdecken
            </h2>
            <p className="text-future-muted max-w-xl mx-auto">
              Durchsuche die gesamte Sammlung. Filtere nach Kategorie, Schwierigkeitsgrad oder einfach per Stichwort.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-future-muted" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Suche nach Titel, Tags, Keywords..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-future-elevated border border-future-border text-future-white placeholder:text-future-muted focus:outline-none focus:border-future-cyan/40 focus:ring-1 focus:ring-future-cyan/20 transition-all"
                aria-label="Suche nach Prompts"
              />
              {search && (
                <button
                  onClick={() => { setSearch(''); setPage(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-future-surface transition-colors"
                >
                  <X className="w-4 h-4 text-future-muted" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                showFilters
                  ? 'bg-future-cyan/10 border-future-cyan/30 text-future-cyan'
                  : 'bg-future-elevated border-future-border text-future-muted hover:text-future-white'
              }`}
              aria-expanded={showFilters}
              aria-label="Filter ein-/ausblenden"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">Filter</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <FilterChip
                active={selectedCategory === 'all'}
                onClick={() => { setSelectedCategory('all'); setPage(1); }}
                label="Alle"
              />
              {categories.map(cat => (
                <FilterChip
                  key={cat}
                  active={selectedCategory === cat}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                  label={cat.replace(/_/g, ' ')}
                />
              ))}
            </div>
          </motion.div>

          {/* Difficulty filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center justify-center gap-2 mb-12"
            >
              <span className="text-xs text-future-muted mr-2">Schwierigkeit:</span>
              <FilterChip
                active={selectedDifficulty === 'all'}
                onClick={() => { setSelectedDifficulty('all'); setPage(1); }}
                label="Alle"
              />
              {difficulties.map(diff => (
                <FilterChip
                  key={diff}
                  active={selectedDifficulty === diff}
                  onClick={() => { setSelectedDifficulty(diff); setPage(1); }}
                  label={diff === 'beginner' ? 'Anfänger' : diff === 'intermediate' ? 'Mittel' : diff === 'advanced' ? 'Fortgeschritten' : 'Experte'}
                />
              ))}
            </motion.div>
          )}

          {/* Results count */}
          <div className="text-center mb-8">
            <span className="text-sm text-future-muted">
              {filtered.length.toLocaleString('de-DE')} Ergebnisse
            </span>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((prompt, i) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    index={i}
                    onClick={setSelectedPrompt}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-8 py-3 rounded-2xl border border-future-cyan/40 bg-future-elevated text-sm font-medium text-future-white hover:border-future-cyan/70 hover:bg-future-cyan/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:text-future-cyan-bright transition-all"
                  >
                    Mehr laden
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-future-muted mx-auto mb-4" />
              <h3 className="font-display text-xl text-future-white mb-2">Keine Ergebnisse</h3>
              <p className="text-sm text-future-muted">
                Versuche andere Suchbegriffe oder Filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
    </>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
        active
          ? 'bg-future-cyan/15 border-future-cyan/30 text-future-cyan'
          : 'bg-future-elevated border-future-border text-future-muted hover:text-future-white hover:border-future-border'
      }`}
    >
      {label}
    </button>
  );
}
