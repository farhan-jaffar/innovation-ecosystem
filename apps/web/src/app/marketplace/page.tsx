'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  Search,
  Filter,
  PlusCircle,
  Building2,
  GraduationCap,
  Shield,
  Clock,
  Briefcase,
  Bookmark as BookmarkIcon,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProjectType, Opportunity } from '@innovation/shared-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['All Domains', 'AgriTech', 'Robotics & AI', 'CleanEnergy', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function MarketplacePage() {
  const { user, token } = useAuth();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedDomain !== 'All Domains') queryParams.append('domain', selectedDomain);
      if (selectedType !== 'ALL') queryParams.append('type', selectedType);
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/marketplace?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOpportunities(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch opportunities', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [selectedDomain, selectedType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOpportunities();
  };

  const toggleBookmark = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/marketplace/${id}/bookmark`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setBookmarkedIds(prev => {
          const next = new Set(prev);
          if (data.bookmarked) next.add(id);
          else next.delete(id);
          return next;
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTypeBadge = (type: ProjectType) => {
    switch (type) {
      case ProjectType.GOVERNMENT_CHALLENGE:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1"><Shield className="w-3 h-3" /> Govt Challenge</span>;
      case ProjectType.INDUSTRY_CHALLENGE:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-300 flex items-center gap-1"><Building2 className="w-3 h-3" /> Industry Challenge</span>;
      case ProjectType.RESEARCH_OPPORTUNITY:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-green-100 text-green-800 border border-green-300 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Research Lab</span>;
      case ProjectType.HACKATHON:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-lime-100 text-lime-900 border border-lime-300 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Hackathon</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-800 border border-gray-300 flex items-center gap-1"><Layers className="w-3 h-3" /> Opportunity</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Innovation Operating System
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            National Innovation Marketplace
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Discover funded national challenges, research grants, industry projects, and hackathons across Pakistan’s 4 core stakeholders.
          </p>
        </div>

        {user && (
          <Link
            href="/marketplace/create"
            className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-sm shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Post Opportunity
          </Link>
        )}
      </div>

      {/* Search Bar & Type Filter */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search challenges, skills (e.g. Computer Vision, AgriTech, Python)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>
        </form>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DOMAINS.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedDomain === dom
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Type Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedType === 'ALL' ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedType(ProjectType.GOVERNMENT_CHALLENGE)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedType === ProjectType.GOVERNMENT_CHALLENGE ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Govt Challenges
          </button>
          <button
            onClick={() => setSelectedType(ProjectType.INDUSTRY_CHALLENGE)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedType === ProjectType.INDUSTRY_CHALLENGE ? 'bg-teal-100 text-teal-900 border border-teal-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Industry Challenges
          </button>
          <button
            onClick={() => setSelectedType(ProjectType.RESEARCH_OPPORTUNITY)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedType === ProjectType.RESEARCH_OPPORTUNITY ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Research Lab
          </button>
          <button
            onClick={() => setSelectedType(ProjectType.HACKATHON)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              selectedType === ProjectType.HACKATHON ? 'bg-lime-100 text-lime-900 border border-lime-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Hackathons
          </button>
        </div>
      </div>

      {/* Opportunity Grid Feed */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading innovation marketplace feed...</p>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No opportunities found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search terms or domain filters to view active challenges.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map(opp => (
            <Link
              key={opp.id}
              href={`/marketplace/${opp.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Badge & Poster */}
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    {getTypeBadge(opp.type)}
                    {opp.featured && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {user && (
                    <button
                      onClick={e => toggleBookmark(opp.id, e)}
                      className={`p-1.5 rounded-lg transition ${
                        bookmarkedIds.has(opp.id)
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-400 hover:text-green-600 hover:bg-gray-100'
                      }`}
                    >
                      <BookmarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-green-700 transition leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.requiredSkills.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {opp.requiredSkills.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-semibold rounded-md">
                      +{opp.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-[10px]">
                    {opp.organizationName.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-700 truncate max-w-[140px]">
                    {opp.organizationName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {opp.budget && (
                    <span className="font-bold text-green-700">
                      {opp.budget.toLocaleString()} {opp.currency}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-gray-400" /> {opp.deadline}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
