import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Star, Layers, Palette, Monitor, Sparkles, Tag } from 'lucide-react';
import type { Prompt } from '../hooks/usePrompts';

interface PromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
}

const difficultyColor: Record<string, string> = {
  beginner: 'text-future-cyan-bright bg-future-cyan-bright/10',
  intermediate: 'text-future-cyan bg-future-cyan/10',
  advanced: 'text-orange-400 bg-orange-400/10',
  expert: 'text-red-400 bg-red-400/10',
};

const difficultyLabel: Record<string, string> = {
  beginner: 'Anfänger',
  intermediate: 'Mittel',
  advanced: 'Fortgeschritten',
  expert: 'Experte',
};

export default function PromptModal({ prompt, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prompt) {
      document.body.style.overflow = 'hidden';
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [prompt]);

  useEffect(() => {
    if (!prompt) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [prompt, onClose]);

  if (!prompt) return null;

  const avgQuality = Math.round(
    (prompt.quality.specificity_score +
      prompt.quality.originality_score +
      prompt.quality.implementation_clarity_score +
      prompt.quality.website_readiness_score) / 4
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {prompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-future-black/80 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-3xl border border-future-border shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-future-border bg-future-surface/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${difficultyColor[prompt.difficulty]}`}>
                  {difficultyLabel[prompt.difficulty]}
                </span>
                <span className="text-xs font-mono text-future-muted">{prompt.id}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-future-elevated border border-future-border hover:border-future-cyan/30 transition-colors"
                aria-label="Modal schließen"
              >
                <X className="w-4 h-4 text-future-muted" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-future-white mb-2">
                  {prompt.title}
                </h2>
                <p className="text-sm text-future-muted">{prompt.website_card.summary}</p>
              </div>

              {/* Prompt text */}
              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-future-cyan/20 via-future-cyan-bright/20 to-future-cyan/20 blur-sm" />
                <div className="relative rounded-2xl bg-future-elevated border border-future-border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-future-cyan uppercase tracking-wider">
                      Prompt
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-future-surface border border-future-border hover:border-future-cyan/30 transition-all text-xs font-medium"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-future-cyan-bright" />
                          <span className="text-future-cyan-bright">Kopiert</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-future-muted" />
                          <span className="text-future-white">Kopieren</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-future-white leading-relaxed whitespace-pre-wrap">
                    {prompt.prompt}
                  </p>
                </div>
              </div>

              {/* Negative prompt */}
              {prompt.negative_prompt && (
                <div className="rounded-2xl bg-future-elevated/50 border border-future-border p-5">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-2">
                    Negative Prompt
                  </span>
                  <p className="text-sm text-future-muted leading-relaxed">
                    {prompt.negative_prompt}
                  </p>
                </div>
              )}

              {/* Details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem icon={Layers} label="Framework" value={prompt.tech_stack.framework} />
                <DetailItem icon={Monitor} label="Sprache" value={prompt.tech_stack.language} />
                <DetailItem icon={Palette} label="Styling" value={prompt.tech_stack.styling} />
                {prompt.tech_stack.animation && (
                  <DetailItem icon={Sparkles} label="Animation" value={prompt.tech_stack.animation} />
                )}
              </div>

              {/* Style */}
              <div className="rounded-2xl bg-future-elevated/50 border border-future-border p-5">
                <span className="text-xs font-semibold text-future-cyan uppercase tracking-wider block mb-3">
                  Style Direction
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <StyleRow label="Visual" value={prompt.style.visual_style} />
                  <StyleRow label="Layout" value={prompt.style.layout_style} />
                  <StyleRow label="Color" value={prompt.style.color_direction} />
                  <StyleRow label="Motion" value={prompt.style.motion_style} />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Tag className="w-4 h-4 text-future-muted mr-1" />
                {prompt.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-future-elevated border border-future-border text-xs text-future-muted capitalize"
                  >
                    {tag.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>

              {/* Quality scores */}
              <div className="rounded-2xl bg-future-elevated/50 border border-future-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-future-cyan" />
                  <span className="text-sm font-semibold text-future-white">Qualitätsbewertung</span>
                  <span className="ml-auto text-lg font-display font-semibold text-future-cyan">
                    {avgQuality}/10
                  </span>
                </div>
                <div className="space-y-3">
                  <QualityBar label="Spezifität" value={prompt.quality.specificity_score} />
                  <QualityBar label="Originalität" value={prompt.quality.originality_score} />
                  <QualityBar label="Klarheit" value={prompt.quality.implementation_clarity_score} />
                  <QualityBar label="Web-Readiness" value={prompt.quality.website_readiness_score} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-future-elevated/50 border border-future-border">
      <Icon className="w-4 h-4 text-future-cyan shrink-0" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-future-muted">{label}</div>
        <div className="text-sm font-medium text-future-white">{value}</div>
      </div>
    </div>
  );
}

function StyleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[10px] uppercase tracking-wider text-future-muted shrink-0 mt-0.5">{label}</span>
      <span className="text-future-white">{value}</span>
    </div>
  );
}

function QualityBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-future-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-future-elevated rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-future-cyan to-future-cyan-bright"
        />
      </div>
      <span className="text-xs font-mono text-future-white w-8 text-right">{value}</span>
    </div>
  );
}
