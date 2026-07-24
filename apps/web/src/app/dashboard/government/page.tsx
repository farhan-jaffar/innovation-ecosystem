'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { NationalAnalytics } from '@innovation/shared-types';
import {
  Shield,
  DollarSign,
  Award,
  GraduationCap,
  TrendingUp,
  MapPin,
  Building2,
  FileText,
  CheckCircle2,
  BarChart2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function GovernmentDashboardPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<NationalAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/analytics/national`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAnalytics(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500 space-y-3">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold">Loading National Government Policy Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-950 p-8 rounded-3xl text-white shadow-md space-y-3 relative overflow-hidden">
        <div className="absolute right-4 top-4 text-green-700/30 text-8xl font-black select-none pointer-events-none">
          🇵🇰
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-800/80 text-green-200 rounded-full text-xs font-bold border border-green-700/50">
          <Shield className="w-3.5 h-3.5" /> Federal Ministry of IT & Telecom (MoITT) — Phase 8 Dashboard
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight">
          National Innovation & Policy Intelligence Dashboard
        </h1>

        <p className="text-xs text-green-100/90 max-w-2xl leading-relaxed">
          Real-time governance oversight of national R&D grant disbursements, university IP commercialization rates, regional skill heatmaps, and deep-tech startup formation across Pakistan.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Allocated Grants</span>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-black text-gray-900">
            PKR {(analytics?.totalFundingAllocated || 28000000).toLocaleString()}
          </p>
          <p className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Disbursed: PKR {(analytics?.totalFundingDisbursed || 10500000).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Commercialization Rate</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-black text-green-700">
            {analytics?.researchCommercializationRate || 41.6}%
          </p>
          <p className="text-[11px] text-gray-500 font-semibold">
            University IP converted into registered spin-offs
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Registered IP Patents</span>
            <Award className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-black text-gray-900">
            {analytics?.registeredPatents || 5} Patents
          </p>
          <p className="text-[11px] text-gray-500 font-semibold">
            Deposited in National Research Repository
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">University Spin-Offs</span>
            <Building2 className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-black text-gray-900">
            {analytics?.universitySpinOffsCount || 2} Deep-Tech Startups
          </p>
          <p className="text-[11px] text-purple-700 font-semibold">
            AgriTech & CleanEnergy Sector Leaders
          </p>
        </div>
      </div>

      {/* Main Dashboard Section 1: Regional Skill Heatmap */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" /> Provincial Technology & Skill Heatmap
            </h2>
            <p className="text-xs text-gray-500">Regional technology clustering and active AI talent distribution across Pakistan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics?.regionalSkillHeatmap.map(item => (
            <div key={item.province} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-gray-900">{item.province}</span>
                <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold rounded-full">
                  +{item.growthPercentage}% YoY Growth
                </span>
              </div>
              <p className="text-xs font-semibold text-green-800">{item.dominantDomain}</p>
              <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1">
                <span>Active Verified Talent Pool</span>
                <strong className="text-gray-900">{item.activeTalentCount.toLocaleString()} Specialists</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Section 2: University R&D Performance Ranking */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-green-600" /> National University R&D Ranking & IP Output
            </h2>
            <p className="text-xs text-gray-500">Evaluation of university research publication output, commercial spin-offs, and grant wins.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-400 font-extrabold uppercase border-b border-gray-200">
                <th className="p-3">Rank & Institution</th>
                <th className="p-3">Location</th>
                <th className="p-3">Publications</th>
                <th className="p-3">Spin-Offs Formed</th>
                <th className="p-3">National Grants Won</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analytics?.universityRankings.map((uni, idx) => (
                <tr key={uni.name} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 font-extrabold text-[10px] flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    {uni.name}
                  </td>
                  <td className="p-3 font-semibold text-gray-600">{uni.city}</td>
                  <td className="p-3 font-bold text-gray-900">{uni.publications} Papers/Patents</td>
                  <td className="p-3 font-bold text-purple-700">{uni.spinOffs} Startups</td>
                  <td className="p-3 font-bold text-green-700">{uni.grantsWon} Grants</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
