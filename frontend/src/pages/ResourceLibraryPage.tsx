import React, { useEffect, useState } from 'react';
import { ExternalLink, Bookmark } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function ResourceLibraryPage() {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res: any = await apiClient.get('/resources');
      setResources(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleAddBookmark = async (resItem: any) => {
    try {
      await apiClient.post('/bookmarks', {
        title: resItem.title,
        url: resItem.url,
        category: resItem.category,
      });
      toast.success('Resource saved to bookmarks!');
    } catch {
      toast.error('Failed to bookmark resource.');
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Curated Engineering Resource Library</h1>
        <p className="text-xs text-zinc-400 mt-1">Vetted books, articles, videos, and documentation for software engineers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, idx) => (
          <Card key={idx} interactive className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="brand">{res.category || 'Engineering'}</Badge>
              <Badge variant="neutral">{res.type || 'Doc'}</Badge>
            </div>
            <h3 className="text-sm font-bold text-white leading-snug">{res.title}</h3>
            <div className="flex items-center justify-between text-xs text-purple-300 font-mono pt-2 border-t border-zinc-800">
              <a href={res.url || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> Open Resource
              </a>
              <button onClick={() => handleAddBookmark(res)} className="p-1 text-zinc-500 hover:text-white">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
