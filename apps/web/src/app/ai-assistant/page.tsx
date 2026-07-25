'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Send, Bot, User as UserIcon, Award, GraduationCap, DollarSign, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  model?: string;
}

export default function AiAssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'AI',
      text: 'Hello! I am your AI Innovation Ecosystem Assistant (powered by xAI Grok & Groq Llama 3).\n\nAsk me anything about Pakistan national grant calls, university research patents, candidate matching, or startup spin-offs!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'xAI Grok-1'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = inputQuery;
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_query: currentQuery })
      });

      const data = await res.json();
      setLoading(false);

      if (data.success && data.reply) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'AI',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: data.model || 'xAI Grok-1'
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 rounded-3xl text-white shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5" /> AI Ecosystem Assistant
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          AI Ecosystem Assistant (Grok / Llama 3)
        </h1>
        <p className="text-xs text-green-100 max-w-xl leading-relaxed">
          Intelligent agent trained to search university research patents, analyze grant proposals, match AI talent, and summarize technology trends.
        </p>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setInputQuery('Show active government grant calls open for AgriTech startups')}
          className="p-3.5 bg-white hover:bg-green-50/50 rounded-2xl border border-gray-200 text-left transition space-y-1 shadow-2xs group"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:text-green-700">
            <DollarSign className="w-3.5 h-3.5 text-green-600" /> Active R&D Grants Call
          </div>
          <p className="text-[11px] text-gray-500 line-clamp-1">"Show active grant calls open for AgriTech..."</p>
        </button>

        <button
          onClick={() => setInputQuery('Search FAST University computer vision research papers and patents')}
          className="p-3.5 bg-white hover:bg-green-50/50 rounded-2xl border border-gray-200 text-left transition space-y-1 shadow-2xs group"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:text-green-700">
            <GraduationCap className="w-3.5 h-3.5 text-green-600" /> University Research Patents
          </div>
          <p className="text-[11px] text-gray-500 line-clamp-1">"Search FAST University research patents..."</p>
        </button>

        <button
          onClick={() => setInputQuery('Find top AI researchers in Islamabad skilled in PyTorch and YOLOv8')}
          className="p-3.5 bg-white hover:bg-green-50/50 rounded-2xl border border-gray-200 text-left transition space-y-1 shadow-2xs group"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:text-green-700">
            <Award className="w-3.5 h-3.5 text-green-600" /> AI Talent Matcher
          </div>
          <p className="text-[11px] text-gray-500 line-clamp-1">"Find top AI researchers skilled in PyTorch..."</p>
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[500px] p-6 space-y-4">
        {/* Messages Feed */}
        <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'USER' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl font-bold flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'AI' ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'
                }`}
              >
                {msg.sender === 'AI' ? <Bot className="w-5 h-5" /> : <UserIcon className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-3xl space-y-1 max-w-xl text-xs leading-relaxed ${
                  msg.sender === 'AI'
                    ? 'bg-gray-50 border border-gray-200 text-gray-800'
                    : 'bg-green-600 text-white shadow-xs'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] opacity-75 mb-1">
                  <span>{msg.sender === 'AI' ? `AI Agent (${msg.model || 'Grok'})` : 'You'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-line font-medium">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="w-8 h-8 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <span className="italic font-semibold">AI Assistant is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-gray-100">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Ask AI Assistant about grants, talent, papers, or spin-offs..."
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" /> Ask AI
          </button>
        </form>
      </div>
    </div>
  );
}
