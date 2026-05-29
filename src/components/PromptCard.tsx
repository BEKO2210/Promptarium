import { motion } from 'motion/react';
import { Star, Copy, Check, Layers } from 'lucide-react';
import { useState } from 'react';
import type { Prompt } from '../hooks/usePrompts';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
  onClick: (p: Prompt) => void;
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

export default function PromptCard({ prompt, index, onClick }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const avgQuality = Math.round(
    (prompt.quality.specificity_score +
      prompt.quality.originality_score +
      prompt.quality.implementation_clarity_score +
      prompt.quality.website_readiness_score) / 4
  );

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 12) * 0.05, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onClick(prompt)}
      className="group relative glass-card rounded-2xl p-5 cursor-pointer glass-card-hover transition-all duration-500"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            difficultyColor[prompt.difficulty]
          }`}
        >
          {difficultyLabel[prompt.difficulty]}
        </span>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-future-elevated border border-future-border opacity-0 group-hover:opacity-100 hover:border-future-cyan/30 transition-all duration-300"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-future-cyan-bright" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-future-muted" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-future-white mb-2 line-clamp-2 group-hover:text-future-cyan transition-colors duration-300 leading-snug">
        {prompt.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-future-muted line-clamp-3 mb-4 leading-relaxed">
        {prompt.website_card.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {prompt.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-future-elevated border border-future-border text-[10px] text-future-muted capitalize"
          >
            {tag.replace(/-/g, ' ')}
          </span>
        ))}
        {prompt.tags.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-[10px] text-future-muted">
            +{prompt.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-future-border">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-future-muted" />
          <span className="text-xs text-future-muted">{prompt.tech_stack.framework}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-future-cyan fill-future-cyan" />
          <span className="text-xs font-semibold text-future-white">{avgQuality}/10</span>
        </div>
      </div>
    </motion.div>
  );
}
