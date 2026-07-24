'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Briefcase,
  DollarSign,
  Rocket,
  Users,
  Sparkles,
  ExternalLink,
  GraduationCap,
  Building2
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any>({
    opportunities: [],
    researches: [],
    jobs: [],
    funding: [],
    startups: [],
    talent: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'OPPORTUNITIES' | 'RESEARCH' | 'JOBS' | 'FUNDING' | 'STARTUPS' | 'TALENT'>('ALL');

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success && data.data) {
        setResults(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const totalCount =
    (results.opportunities?.length || 0) +
    (results.researches?.length || 0) +
    (results.jobs?.length || 0) +
    (results.funding?.length || 0) +
    (results.startups?.length || 0) +
    (results.talent?.length || 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
          <Search className="w-3.5 h-3.5" /> Universal Ecosystem Search
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">National Innovation Knowledge Engine</h1>

        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search across all grants, patents, AI jobs, startups, and researchers..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" /> Search Platform
          </button>
        </form>
      </div>

      {/* Results Count & Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="text-xs font-bold text-gray-700">
          Found <strong className="text-green-700">{totalCount}</strong> match(es) across all modules
        </div>

        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'ALL' ? 'bg-green-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab('RESEARCH')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'RESEARCH' ? 'bg-green-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Research ({results.researches?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('FUNDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'FUNDING' ? 'bg-green-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Grants ({results.funding?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('STARTUPS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'STARTUPS' ? 'bg-green-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Startups ({results.startups?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('JOBS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'JOBS' ? 'bg-green-600 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Jobs ({results.jobs?.length || 0})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Searching national ecosystem database...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Research Results */}
          {(activeTab === 'ALL' || activeTab === 'RESEARCH') && results.researches?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Academic Research & IP Patents ({results.researches.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.researches.map((r: any) => (
                  <Link
                    key={r.id}
                    href={`/research/${r.id}`}
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-purple-300 transition space-y-2 shadow-2xs block"
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-bold rounded-md">
                        {r.publicationType}
                      </span>
                      <span className="text-[10px] text-gray-400">{r.domain}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-xs line-clamp-1">{r.title}</h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{r.abstract}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Grants & Funding Results */}
          {(activeTab === 'ALL' || activeTab === 'FUNDING') && results.funding?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-green-800 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> National Grants & Funding Opportunities ({results.funding.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.funding.map((f: any) => (
                  <Link
                    key={f.id}
                    href={`/funding/${f.id}`}
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-green-400 transition space-y-2 shadow-2xs block"
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-md">
                        {f.type}
                      </span>
                      <span className="font-bold text-green-700 text-xs">PKR {f.amount.toLocaleString()}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-xs">{f.title}</h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{f.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Startups Results */}
          {(activeTab === 'ALL' || activeTab === 'STARTUPS') && results.startups?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <Rocket className="w-4 h-4" /> Deep-Tech Startups & Spin-Offs ({results.startups.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.startups.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/startups/${s.id}`}
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-blue-300 transition space-y-2 shadow-2xs block"
                  >
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-md">
                        {s.stage} STAGE
                      </span>
                      <span className="text-[10px] text-gray-400">{s.industry}</span>
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-xs">{s.name}</h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{s.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function UniversalSearchPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs text-gray-500">Loading search engine...</div>}>
      <SearchContent />
    </Suspense>
  );
}
