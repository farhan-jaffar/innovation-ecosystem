'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AiFloatingWidget() {
  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <Link
        href="/ai-assistant"
        className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg shadow-green-600/30 transition transform hover:scale-105 active:scale-95 border border-green-500/30"
        title="AI Innovation Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-200"></span>
        </span>
        <Sparkles className="w-5 h-5 text-white" />
        <span className="text-xs font-bold uppercase tracking-wider">AI Assistant</span>
      </Link>
    </div>
  );
}
