import React, { useState, useEffect } from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function PortfolioBuilderPage() {
  const [theme, setTheme] = useState<'Vercel' | 'Linear' | 'Apple'>('Linear');
  const [isPublishing, setIsPublishing] = useState(false);

  const [portfolio, setPortfolio] = useState({
    name: 'Paras Jain',
    role: 'Full Stack & AI Engineer',
    bio: 'Building scalable learning operating systems, distributed services, and high-performance React web interfaces.',
    github: 'github.com/paras-jain',
    projects: [
      { title: 'StudentPilot AI OS', desc: 'Dynamic DAG knowledge graph learning platform', tech: ['React 19', 'TypeScript', 'Zustand'] },
      { title: 'PostgreSQL Microservice', desc: 'High-throughput REST API with JWT security', tech: ['Node.js', 'Express', 'PostgreSQL'] },
    ],
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response: any = await apiClient.get('/portfolio');
      const data = response.data || response;
      if (data && data.subdomain) {
        setPortfolio((prev) => ({ ...prev, ...data }));
      }
    } catch {
      // Keep default
    }
  };

  const handlePublishPortfolio = async () => {
    setIsPublishing(true);
    try {
      await apiClient.put('/portfolio', { ...portfolio, theme });
      const exportRes: any = await apiClient.post('/portfolio/export', { theme });
      const data = exportRes.data || exportRes;
      toast.success(`Portfolio live at ${data.deployUrl || 'https://paras.studentpilot.ai'}!`);
    } catch {
      toast.error('Failed to publish portfolio site.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Developer Portfolio Generator</h1>
          <p className="text-xs text-zinc-400 mt-1">Generate a production-ready developer website inspired by Linear & Vercel.</p>
        </div>

        <div className="flex items-center gap-2">
          {['Linear', 'Vercel', 'Apple'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                theme === t ? 'border-purple-500 bg-purple-950 text-white' : 'border-zinc-800 bg-zinc-900 text-zinc-400'
              }`}
            >
              {t} Theme
            </button>
          ))}
          <Button variant="brand" size="sm" isLoading={isPublishing} leftIcon={<Globe className="w-3.5 h-3.5" />} onClick={handlePublishPortfolio}>
            Publish Website
          </Button>
        </div>
      </div>

      {/* Portfolio Live Preview Screen */}
      <Card className="p-8 space-y-8 bg-zinc-950 border-purple-500/30">
        <div className="space-y-3">
          <Badge variant="brand">{portfolio.role}</Badge>
          <h2 className="text-3xl font-black text-white">{portfolio.name}</h2>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">{portfolio.bio}</p>
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Featured Engineering Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.projects.map((proj, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
