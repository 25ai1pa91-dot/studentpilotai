import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Send, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { apiClient } from '../../lib/api-client';

export const NovaAiWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'nova'; text: string }>>([
    { sender: 'nova', text: 'Hello Engineer! I am Nova, your global AI mentor. Ask me anything about your current mission, code syntax, or placement roadmap!' },
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim() || isSending) return;

    const userText = inputMsg.trim();
    setInputMsg('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsSending(true);

    try {
      const res: any = await apiClient.post('/mentor/chat', { message: userText });
      const reply = res.data?.reply || res.reply || 'Verify landmark structure tags (<main>, <header>) and ensure clean semantic hierarchy.';
      setMessages((prev) => [...prev, { sender: 'nova', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'nova', text: 'Keep code clean, structure semantic landmarks, and write automated tests for every edge case!' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-2xl shadow-purple-950/80 border border-purple-400/50 flex items-center gap-2 group cursor-pointer"
      >
        <div className="p-1 rounded-full bg-black/20 animate-pulse">
          <Bot className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold font-mono pr-1 hidden sm:inline">Nova AI</span>
      </motion.button>

      {/* CHAT DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[480px] rounded-3xl bg-zinc-950/95 border border-purple-500/40 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Nova AI Mentor</h3>
                  <div className="text-[10px] font-mono text-purple-300">Context-Aware Assistant</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-none text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none font-medium'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask Nova AI anything..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <Button type="submit" variant="brand" size="sm" className="h-8 w-8 p-0 flex items-center justify-center shrink-0" disabled={isSending}>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
