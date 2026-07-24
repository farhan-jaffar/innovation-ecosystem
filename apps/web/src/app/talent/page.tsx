'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User } from '@innovation/shared-types';
import { Search, Users, Sparkles, Github, Linkedin, Mail, CheckCircle2, UserCheck } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function TalentDiscoveryPage() {
  const { user } = useAuth();
  const [talent, setTalent] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchTalent = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/jobs/talent-feed?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTalent(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch talent', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalent();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTalent();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-teal-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <Users className="w-3.5 h-3.5" /> Verified Talent Pool
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pakistan Innovation Talent Discovery
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Browse verified AI researchers, software engineers, Ph.D. scholars, and university graduates available for full-time roles, research fellowships, or consulting.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search talent by skills (e.g. Computer Vision, PyTorch, YOLOv8), name, or headline..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Filter Talent
          </button>
        </form>
      </div>

      {/* Talent Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading verified talent pool...</p>
        </div>
      ) : talent.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <UserCheck className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No candidate profiles found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {talent.map(t => {
            const prof = t.profile as any;
            const name = prof?.firstName ? `${prof.firstName} ${prof.lastName || ''}` : t.username;

            return (
              <div
                key={t.id}
                className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 shadow-sm transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-1.5">
                        <Link href={`/profile/${t.username}`} className="hover:text-green-700 transition">
                          {name}
                        </Link>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </h3>
                      <p className="text-xs font-semibold text-green-700">{prof?.headline || 'Researcher & Innovator'}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {prof?.bio || 'Passionate researcher in artificial intelligence and engineering.'}
                  </p>

                  {/* Skills tags */}
                  {prof?.skills && prof.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prof.skills.map((s: string) => (
                        <span key={s} className="px-2.5 py-0.5 bg-green-50 text-green-800 text-[10px] font-bold rounded-md border border-green-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/profile/${t.username}`}
                    className="text-xs font-bold text-green-600 hover:underline"
                  >
                    View Full Ecosystem Profile ➔
                  </Link>

                  <a
                    href={`mailto:${t.email}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
