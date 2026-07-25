'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Rocket,
  Search,
  Building2,
  GraduationCap,
  PlusCircle,
  ExternalLink,
  Users,
  Award,
  DollarSign,
  Sparkles,
  FileText
} from 'lucide-react';
import { StartupStage, OriginType, Startup } from '@innovation/shared-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const INDUSTRIES = ['All Industries', 'AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function StartupsDiscoveryPage() {
  const { user } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedStage, setSelectedStage] = useState<string>('ALL');
  const [researchSpinOffOnly, setResearchSpinOffOnly] = useState(false);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedIndustry !== 'All Industries') queryParams.append('industry', selectedIndustry);
      if (selectedStage !== 'ALL') queryParams.append('stage', selectedStage);
      if (researchSpinOffOnly) queryParams.append('originType', OriginType.UNIVERSITY_RESEARCH);
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/startups?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setStartups(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch startups', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, [selectedIndustry, selectedStage, researchSpinOffOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStartups();
  };

  const getStageBadge = (stage: StartupStage) => {
    switch (stage) {
      case StartupStage.MVP:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-green-100 text-green-800 border border-green-300">MVP Stage</span>;
      case StartupStage.PROTOTYPE:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">Prototype</span>;
      case StartupStage.GROWTH:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300">Growth Stage</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300">Idea Concept</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-teal-50/60 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <Rocket className="w-3.5 h-3.5" /> Startup Hub & Research Spin-offs
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pakistan University Spin-Offs & Startups
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Discover deep-tech research spin-offs, connect with seasoned tech mentors, pitch to venture capital investors, and explore incubator partners.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/mentors"
            className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-xs"
          >
            <Users className="w-4 h-4 text-green-600" /> Mentor Directory
          </Link>

          <Link
            href="/investors"
            className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-xs"
          >
            <DollarSign className="w-4 h-4 text-green-600" /> Investors
          </Link>

          {user && (
            <Link
              href="/startups/create"
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Register Startup
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar & Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search startup name, tagline, research lineage (e.g. CropVision AI, Hyperspectral)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Search Startups
          </button>
        </form>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {INDUSTRIES.map(ind => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedIndustry === ind
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Stage Filter & University Research Spin-off Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStage('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedStage === 'ALL' ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Stages
            </button>
            <button
              onClick={() => setSelectedStage(StartupStage.PROTOTYPE)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedStage === StartupStage.PROTOTYPE ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Prototype
            </button>
            <button
              onClick={() => setSelectedStage(StartupStage.MVP)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedStage === StartupStage.MVP ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              MVP
            </button>
            <button
              onClick={() => setSelectedStage(StartupStage.GROWTH)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedStage === StartupStage.GROWTH ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Growth
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-xl border border-green-200">
            <input
              type="checkbox"
              checked={researchSpinOffOnly}
              onChange={e => setResearchSpinOffOnly(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <GraduationCap className="w-3.5 h-3.5 text-green-600" /> University Research Spin-Offs Only
          </label>
        </div>
      </div>

      {/* Startups Grid Feed */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading university spin-offs & startups...</p>
        </div>
      ) : startups.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Rocket className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No startups match your search</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria or industry filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map(start => (
            <Link
              key={start.id}
              href={`/startups/${start.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    {getStageBadge(start.stage)}
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                      {start.industry}
                    </span>
                  </div>
                  {start.originType === OriginType.UNIVERSITY_RESEARCH && (
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-800 text-[10px] font-bold rounded-md border border-purple-200 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Spin-off
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-green-700 transition leading-snug">
                    {start.name}
                  </h3>
                  <p className="text-xs font-semibold text-green-700 mt-0.5">{start.tagline}</p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {start.description}
                </p>

                {start.universityName && (
                  <p className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-gray-400" /> Origin: {start.universityName}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-bold text-gray-700">
                  {start.fundingRaised > 0 ? `Funding Raised: PKR ${start.fundingRaised.toLocaleString()}` : 'Bootstrapped / Grant Stage'}
                </span>

                {start.pitchDeckUrl && (
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Pitch Deck
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
