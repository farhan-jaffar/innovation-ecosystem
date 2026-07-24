'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Workspace } from '@innovation/shared-types';
import { MessageSquare, CheckSquare, Video, ArrowRight, Shield, Users } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function WorkspaceDirectoryPage() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/workspaces`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setWorkspaces(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
          <MessageSquare className="w-3.5 h-3.5" /> Collaboration Suite — Phase 7
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">National Collaboration Workspaces</h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Integrated Slack + Jira + Jitsi Meet workspace replacing external tools. Collaborate in real-time on grant projects, research tasks, and video meetings.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading collaboration workspaces...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workspaces.map(ws => (
            <div
              key={ws.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 shadow-sm transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
                    {ws.name}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold rounded-full">
                    Active Workspace
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {ws.description}
                </p>

                {/* Features Pill */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-gray-600">
                  <span className="px-2.5 py-1 bg-gray-100 rounded-xl flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-green-600" /> {ws.channels.length} Channels
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-xl flex items-center gap-1">
                    <CheckSquare className="w-3 h-3 text-green-600" /> Tasks Kanban
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 rounded-xl flex items-center gap-1">
                    <Video className="w-3 h-3 text-green-600" /> Jitsi Video Rooms
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  {ws.members.length} Member(s)
                </span>

                <Link
                  href={`/workspace/${ws.id}`}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  Enter Workspace <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
