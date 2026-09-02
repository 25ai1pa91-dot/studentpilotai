import React, { useState, useEffect } from 'react';
import { Plus, Pin, Save, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

export default function NotesSystemPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res: any = await apiClient.get('/notes');
      const list = res.data || res || [];
      setNotes(list);
      if (list.length > 0) {
        setActiveNoteId(list[0]._id || list[0].id);
      }
    } catch {
      // Fallback
    }
  };

  const handleCreateNote = async () => {
    try {
      const res: any = await apiClient.post('/notes', {
        title: 'New Engineering Note',
        content: 'Type your note content here...',
      });
      const newNote = res.data || res;
      toast.success('New note created!');
      fetchNotes();
      setActiveNoteId(newNote._id);
    } catch {
      toast.error('Failed to create note.');
    }
  };

  const handleSaveNote = async () => {
    if (!activeNoteId || !activeNote) return;
    try {
      await apiClient.put(`/notes/${activeNoteId}`, {
        title: activeNote.title,
        content: activeNote.content,
      });
      toast.success('Note saved to MongoDB!');
      fetchNotes();
    } catch {
      toast.error('Failed to save note.');
    }
  };

  const handleDeleteNote = async () => {
    if (!activeNoteId) return;
    try {
      await apiClient.delete(`/notes/${activeNoteId}`);
      toast.success('Note deleted.');
      fetchNotes();
    } catch {
      toast.error('Failed to delete note.');
    }
  };

  const activeNote = notes.find((n) => (n._id || n.id) === activeNoteId) || notes[0];

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-4 select-none overflow-hidden text-zinc-100">
      <div className="w-64 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col gap-3 shrink-0 overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">My Notes</h2>
          <button onClick={handleCreateNote} className="p-1 rounded bg-purple-950 text-purple-300">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {notes.map((note) => {
            const id = note._id || note.id;
            return (
              <button
                key={id}
                onClick={() => setActiveNoteId(id)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                  id === activeNoteId ? 'border-purple-500 bg-purple-950/40 text-white font-bold' : 'border-zinc-800 bg-zinc-950/40 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{note.title || 'Untitled Note'}</span>
                  {note.isPinned && <Pin className="w-3 h-3 text-amber-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeNote ? (
        <div className="flex-1 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <input
              type="text"
              value={activeNote.title || ''}
              onChange={(e) => {
                const updatedTitle = e.target.value;
                setNotes((prev) => prev.map((n) => ((n._id || n.id) === activeNoteId ? { ...n, title: updatedTitle } : n)));
              }}
              className="bg-transparent text-base font-bold text-white focus:outline-none flex-1"
            />
            <div className="flex items-center gap-2">
              <button onClick={handleDeleteNote} className="p-2 text-zinc-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
              <Button variant="brand" size="sm" leftIcon={<Save className="w-3.5 h-3.5" />} onClick={handleSaveNote}>
                Save Note
              </Button>
            </div>
          </div>

          <textarea
            value={activeNote.content || ''}
            onChange={(e) => {
              const updatedContent = e.target.value;
              setNotes((prev) => prev.map((n) => ((n._id || n.id) === activeNoteId ? { ...n, content: updatedContent } : n)));
            }}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none resize-none leading-relaxed"
          />
        </div>
      ) : (
        <div className="flex-1 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex items-center justify-center text-xs text-zinc-400">
          No note selected. Click "+" to create a note.
        </div>
      )}
    </div>
  );
}
