'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  GraduationCap,
  Search,
  BookOpen,
  FileText,
  Award,
  Database,
  PlusCircle,
  Download,
  Eye,
  ExternalLink,
  Sparkles,
  DollarSign,
  Share2
} from 'lucide-react';
import { PublicationType, Research } from '@innovation/shared-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['All Domains', 'AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function ResearchDiscoveryPage() {
  const { user } = useAuth();
  const [researchList, setResearchList] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [fundingOnly, setFundingOnly] = useState(false);

  const fetchResearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedDomain !== 'All Domains') queryParams.append('domain', selectedDomain);
      if (selectedType !== 'ALL') queryParams.append('publicationType', selectedType);
      if (search) queryParams.append('search', search);
      if (fundingOnly) queryParams.append('fundingRequest', 'true');

      const res = await fetch(`${API_BASE}/research?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setResearchList(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch research', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, [selectedDomain, selectedType, fundingOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResearch();
  };

  const getPublicationBadge = (type: PublicationType) => {
    switch (type) {
      case PublicationType.PAPER:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1"><FileText className="w-3 h-3" /> Research Paper</span>;
      case PublicationType.PATENT:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1"><Award className="w-3 h-3" /> Patent</span>;
      case PublicationType.DATASET:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1"><Database className="w-3 h-3" /> Open Dataset</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gray-100 text-gray-800 border border-gray-300 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Research</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-teal-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5" /> University & Research Repository — Phase 3
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            National Research & Intellectual Property Hub
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Central repository for Pakistani universities and researchers to publish peer-reviewed papers, patents, open-access datasets, and solicit commercialization funding.
          </p>
        </div>

        {user && (
          <Link
            href="/research/create"
            className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-sm shrink-0"
          >
            <PlusCircle className="w-4 h-4" /> Publish Research / Patent
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
              placeholder="Search research papers, patents, DOI, authors (e.g. Hyperspectral, Dr. Ali Raza)..."
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

        {/* Publication Type & Funding Request Checkbox */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === 'ALL' ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Research
            </button>
            <button
              onClick={() => setSelectedType(PublicationType.PAPER)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === PublicationType.PAPER ? 'bg-blue-100 text-blue-900 border border-blue-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Papers
            </button>
            <button
              onClick={() => setSelectedType(PublicationType.PATENT)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === PublicationType.PATENT ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Patents
            </button>
            <button
              onClick={() => setSelectedType(PublicationType.DATASET)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === PublicationType.DATASET ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Open Datasets
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-xl border border-green-200">
            <input
              type="checkbox"
              checked={fundingOnly}
              onChange={e => setFundingOnly(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <DollarSign className="w-3.5 h-3.5 text-green-600" /> Soliciting Commercial Funding
          </label>
        </div>
      </div>

      {/* Research List Feed */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading national research repository...</p>
        </div>
      ) : researchList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No research publications found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search criteria or domain filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {researchList.map(res => (
            <div
              key={res.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {getPublicationBadge(res.publicationType)}
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                      {res.domain}
                    </span>
                    {res.fundingRequest && (
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md border border-emerald-300">
                        ⚡ Funding Requested: PKR {res.fundingAmount?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900 hover:text-green-700 transition leading-snug">
                    <Link href={`/research/${res.id}`}>{res.title}</Link>
                  </h3>

                  <p className="text-xs text-gray-500 font-medium">
                    Authors: <span className="text-gray-800 font-semibold">{res.authors.join(', ')}</span> — {res.organizationName}
                  </p>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {res.abstract}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {res.keywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-semibold rounded-md border border-gray-200">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side stats & action */}
                <div className="shrink-0 space-y-3 text-right w-full sm:w-auto">
                  <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 text-xs text-gray-500">
                    <span className="font-bold text-gray-700">{res.citations} Citations</span>
                    <span className="text-gray-400">{res.downloads} Downloads</span>
                  </div>

                  <Link
                    href={`/research/${res.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition w-full sm:w-auto"
                  >
                    View Research <BookOpen className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
