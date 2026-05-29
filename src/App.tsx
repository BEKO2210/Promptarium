import { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { usePrompts } from './hooks/usePrompts';
import MatrixRain from './components/MatrixRain';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import CategoryShowcase from './components/CategoryShowcase';
import PromptExplorer from './components/PromptExplorer';
import Footer from './components/Footer';
import Legal from './components/Legal';

export default function App() {
  useLenis();
  const { prompts, loading, categories } = usePrompts();
  const [explorerCategory, setExplorerCategory] = useState<string | undefined>();
  const [showLegal, setShowLegal] = useState(false);

  const handleCategorySelect = useCallback((cat: string) => {
    setExplorerCategory(cat);
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSearchClick = useCallback(() => {
    const el = document.getElementById('explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = el.querySelector('input');
        input?.focus();
      }, 800);
    }
  }, []);

  if (showLegal) {
    return <Legal onBack={() => setShowLegal(false)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-future-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-future-cyan/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-6 h-6 rounded-lg bg-future-cyan/30" />
          </div>
          <p className="text-sm text-future-muted animate-pulse">Lade Prompt-Bibliothek...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-future-black text-future-white overflow-x-hidden">
      {/* Background effects */}
      <MatrixRain />
      <div className="film-grain" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar onSearchClick={handleSearchClick} />
        <Hero />
        <Stats />
        <CategoryShowcase categories={categories} onSelect={handleCategorySelect} />
        <PromptExplorer prompts={prompts} initialCategory={explorerCategory} />
        <Footer onLegalClick={() => setShowLegal(true)} />
      </div>
    </div>
  );
}
