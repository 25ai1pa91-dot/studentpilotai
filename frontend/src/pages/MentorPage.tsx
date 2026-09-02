import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Send,
  Bot,
  Brain,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Drawer } from '../components/ui/Drawer';
import { useLearnerStore } from '../store/useLearnerStore';
import { toast } from '../components/ui/ToastProvider';
import { apiClient } from '../lib/api-client';

interface Message {
  id: string;
  role: 'mentor' | 'user';
  content: string;
  timestamp: string;
  citations?: string[];
  recommendedActions?: { label: string; action: string }[];
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'mentor',
      content: 'Hi Paras!\n\nAsk me your first engineering question.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const placementReadiness = useLearnerStore((state) => state.placementReadiness);
  const targetCareer = useLearnerStore((state) => state.targetCareer);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response: any = await apiClient.get('/mentor/conversations');
      const list = response.data || response;
      if (Array.isArray(list) && list.length > 0) {
        setActiveConversationId(list[0]._id);
      }
    } catch {
      // Non-blocking
    }
  };

  const quickPrompts = [
    'Explain HTML5 semantic structure',
    'How do CSS Flexbox axes work?',
    'What is a JavaScript closure?',
    'Give me a beginner debugging task',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    try {
      const response: any = await apiClient.post('/mentor/chat', {
        message: messageText,
        conversationId: activeConversationId || undefined,
      });

      const data = response.data || response;
      if (data.conversationId) {
        setActiveConversationId(data.conversationId);
      }

      const mentorReply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'mentor',
        content: data.assistantResponse || `Based on your ${targetCareer} track, here is the answer...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations,
        recommendedActions: data.recommendedActions,
      };

      setMessages((prev) => [...prev, mentorReply]);
    } catch {
      const fallbackReply: Message = {
        id: (Date.now() + 1).toString(),
        role: 'mentor',
        content: `Great question! In ${targetCareer}, foundational semantic structure ensures web browsers and screen readers render UI correctly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-6 select-none overflow-hidden text-zinc-100">
      {/* ── LEFT COLUMN: MAIN CHAT INTERFACE ──────────────────── */}
      <div className="flex-1 flex flex-col bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden min-w-0">
        {/* Chat Header Bar */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">StudentPilot AI Mentor</h2>
                <Badge variant="brand" dot>Live Active</Badge>
              </div>
              <p className="text-[11px] text-zinc-400">Target Track: {targetCareer} • Readiness: {placementReadiness}%</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsContextDrawerOpen(true)}
            leftIcon={<Brain className="w-3.5 h-3.5 text-purple-400" />}
          >
            Context Info
          </Button>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'mentor' && (
                <div className="p-2 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-300 h-fit">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.citations && msg.citations.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-zinc-800 text-[10px] font-mono text-purple-300 space-y-0.5">
                      <span className="font-bold uppercase tracking-wider text-zinc-400">Knowledge Citations:</span>
                      {msg.citations.map((c, i) => (
                        <div key={i}>• {c}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-zinc-500 font-mono px-1">{msg.timestamp}</div>
              </div>
            </motion.div>
          ))}

          {/* AI Thinking Animation */}
          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-300">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                Querying AI Knowledge Graph & executing RAG reasoning...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 border-t border-zinc-800/60 bg-zinc-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((qp) => (
            <button
              key={qp}
              onClick={() => handleSendMessage(qp)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[11px] text-zinc-300 whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me your first engineering question..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              type="submit"
              variant="brand"
              size="md"
              disabled={!input.trim() || isThinking}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </form>
        </div>
      </div>

      {/* ── RIGHT COLUMN: DESKTOP CONTEXT PANEL ───────────────── */}
      <div className="hidden lg:flex w-80 flex-col gap-4">
        <Card className="p-5 space-y-4 h-full overflow-y-auto">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Brain className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Learner Context Memory</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">Active Mission</span>
              <div className="font-semibold text-white">Level 1 • Unlocked</div>
              <p className="text-zinc-400 text-[11px]">HTML5 Foundations</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-teal-400 font-bold">Placement Vector</span>
              <div className="font-semibold text-white">{targetCareer}</div>
              <p className="text-zinc-400 text-[11px]">Readiness Score: {placementReadiness}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Context Drawer */}
      <Drawer
        isOpen={isContextDrawerOpen}
        onClose={() => setIsContextDrawerOpen(false)}
        title="Learner Context Memory"
      >
        <div className="space-y-3 text-xs text-zinc-200">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] uppercase font-mono text-purple-400 font-bold">Active Mission</span>
            <div className="font-semibold text-white">Level 1 • HTML5 Foundations</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
