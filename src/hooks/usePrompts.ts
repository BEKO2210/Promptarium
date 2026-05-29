import { useState, useEffect, useMemo } from 'react';

export interface Prompt {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  audience: string;
  use_case: string;
  industry: string;
  style: {
    visual_style: string;
    layout_style: string;
    color_direction: string;
    motion_style: string;
  };
  tech_stack: {
    framework: string;
    language: string;
    styling: string;
    animation?: string;
    optional_libraries?: string[];
  };
  prompt: string;
  negative_prompt?: string;
  tags: string[];
  website_card: {
    headline: string;
    summary: string;
    preview_label: string;
    search_keywords: string[];
  };
  quality: {
    specificity_score: number;
    originality_score: number;
    implementation_clarity_score: number;
    website_readiness_score: number;
  };
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('prompts.json')
      .then(r => r.json())
      .then((data: Prompt[]) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const map = new Map<string, { count: number; icon: string }>();
    const icons: Record<string, string> = {
      landing_pages: 'Globe',
      ui_components: 'Layout',
      saas_dashboards: 'BarChart3',
      ecommerce: 'ShoppingBag',
      portfolio_personal_brand: 'User',
      ai_tools_agents: 'Bot',
      education_learning: 'GraduationCap',
      mobile_apps: 'Smartphone',
      games_interactive: 'Gamepad2',
      data_visualization: 'PieChart',
    };
    prompts.forEach(p => {
      const existing = map.get(p.category);
      if (existing) {
        existing.count++;
      } else {
        map.set(p.category, { count: 1, icon: icons[p.category] || 'FileText' });
      }
    });
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      label: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count: data.count,
      icon: data.icon,
    }));
  }, [prompts]);

  return { prompts, loading, categories };
}
