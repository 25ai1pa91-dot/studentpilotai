import React, { useEffect, useState } from 'react';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res: any = await apiClient.get('/bookmarks');
      setBookmarks(res.data || res || []);
    } catch {
      // Fallback
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    try {
      await apiClient.delete(`/bookmarks/${id}`);
      toast.success('Bookmark removed.');
      fetchBookmarks();
    } catch {
      toast.error('Failed to delete bookmark.');
    }
  };

  return (
    <div className="space-y-6 select-none text-zinc-100">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white">Saved Bookmarks & Quick Access</h1>
        <p className="text-xs text-zinc-400 mt-1">Bookmarked topics, practice problems, and learning resources.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookmarks.map((bm) => {
          const id = bm._id || bm.id;
          return (
            <Card key={id} interactive className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="brand">{bm.category || 'General'}</Badge>
                <button onClick={() => handleDeleteBookmark(id)} className="text-zinc-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-sm font-bold text-white">{bm.title || 'Bookmarked Item'}</h3>
              <a href={bm.url || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-purple-300 font-mono pt-2 border-t border-zinc-800">
                <ExternalLink className="w-3.5 h-3.5" /> Open resource link
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
