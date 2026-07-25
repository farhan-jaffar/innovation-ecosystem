'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  DollarSign,
  Search,
  Award,
  Calendar,
  Building2,
  PlusCircle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { FundingType, FundingEligibility, FundingOpportunity } from '@innovation/shared-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['All Domains', 'AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function FundingDiscoveryPage() {
  const { user } = useAuth();
  const [fundingList, setFundingList] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedEligibility, setSelectedEligibility] = useState<string>('ALL');

  const fetchFunding = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedDomain !== 'All Domains') queryParams.append('domain', selectedDomain);
      if (selectedType !== 'ALL') queryParams.append('type', selectedType);
      if (selectedEligibility !== 'ALL') queryParams.append('eligibility', selectedEligibility);
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/funding?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setFundingList(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch funding', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunding();
  }, [selectedDomain, selectedType, selectedEligibility]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFunding();
  };

  const getFundingBadge = (type: FundingType) => {
    switch (type) {
      case FundingType.GRANT:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">National Grant</span>;
      case FundingType.RD_FUNDING:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300">R&D Fund</span>;
      case FundingType.SEED_FUNDING:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300">Seed Accelerator</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">Challenge Fund</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/60 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <DollarSign className="w-3.5 h-3.5" /> Funding & Grants Marketplace
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pakistan Grants & Innovation Funding
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Federal government grant funds, university R&D subsidies, corporate seed accelerators, and milestone-based project disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/funded-projects"
            className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-xs"
          >
            <TrendingUp className="w-4 h-4 text-green-600" /> Active Funded Projects
          </Link>

          {user && (
            <Link
              href="/funding/create"
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Post Grant Call
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
              placeholder="Search grant calls, funding amounts, funder (e.g. MoITT, HEC 15M Grant)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Search Funding
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

        {/* Funding Type & Eligibility Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === 'ALL' ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Funds
            </button>
            <button
              onClick={() => setSelectedType(FundingType.GRANT)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === FundingType.GRANT ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              National Grants
            </button>
            <button
              onClick={() => setSelectedType(FundingType.RD_FUNDING)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === FundingType.RD_FUNDING ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              R&D Grants
            </button>
            <button
              onClick={() => setSelectedType(FundingType.SEED_FUNDING)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === FundingType.SEED_FUNDING ? 'bg-blue-100 text-blue-900 border border-blue-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Seed Funds
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span>Eligibility:</span>
            <select
              value={selectedEligibility}
              onChange={e => setSelectedEligibility(e.target.value)}
              className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none"
            >
              <option value="ALL">All Applicants</option>
              <option value={FundingEligibility.UNIVERSITY}>Universities</option>
              <option value={FundingEligibility.STARTUP}>Startups</option>
              <option value={FundingEligibility.INDIVIDUAL}>Researchers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Funding Grid Feed */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading funding opportunities...</p>
        </div>
      ) : fundingList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <DollarSign className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No grant calls match your filters</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query or eligibility filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fundingList.map(fund => (
            <Link
              key={fund.id}
              href={`/funding/${fund.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    {getFundingBadge(fund.type)}
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                      {fund.domain}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold rounded-md border border-emerald-200">
                    Eligible: {fund.eligibility}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-green-700 transition leading-snug">
                    {fund.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    Funder: {fund.organizationName}
                  </p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {fund.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Total Budget</span>
                  <span className="font-extrabold text-green-700 text-base">
                    PKR {fund.amount.toLocaleString()}
                  </span>
                </div>

                <div className="text-right text-gray-500">
                  <span className="text-[10px] block font-semibold text-gray-400">Deadline</span>
                  <span className="font-semibold text-gray-800 text-xs">{fund.applicationDeadline}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
