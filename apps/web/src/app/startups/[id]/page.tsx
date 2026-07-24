'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Startup } from '@innovation/shared-types';
import {
  Rocket,
  Building2,
  GraduationCap,
  FileText,
  ExternalLink,
  Users,
  DollarSign,
  ArrowLeft,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function StartupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuth();

  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/startups/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setStartup(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading startup profile...
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Startup Not Found</h2>
        <Link href="/startups" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Startup Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Startups
      </button>

      {/* Header Banner Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                {startup.stage} STAGE
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                {startup.industry}
              </span>
              {startup.originType === 'UNIVERSITY_RESEARCH' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full border border-purple-200 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" /> University Research Spin-Off
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {startup.name}
            </h1>

            <p className="text-sm font-bold text-green-700">{startup.tagline}</p>
            <p className="text-xs font-semibold text-gray-500">{startup.city}, {startup.country}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {startup.pitchDeckUrl && (
              <a
                href={startup.pitchDeckUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl shadow-sm transition flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" /> View Pitch Deck PDF
              </a>
            )}

            <Link
              href="/mentors"
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-2xl transition flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-green-600" /> Request Mentorship
            </Link>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Funding Raised</p>
            <p className="font-extrabold text-green-700 text-base">
              {startup.fundingRaised > 0 ? `PKR ${startup.fundingRaised.toLocaleString()}` : 'Grant / Seed Stage'}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Team Size</p>
            <p className="font-semibold text-gray-900">{startup.teamSize} Member(s)</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Origin University</p>
            <p className="font-semibold text-gray-900">{startup.universityName || 'Independent'}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Founders</p>
            <p className="font-semibold text-gray-900">@{startup.founderUsernames.join(', @')}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">About {startup.name}</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {startup.description}
        </div>
      </div>

      {/* Linked Research Lineage */}
      {startup.linkedResearchIds && startup.linkedResearchIds.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Academic Research & IP Lineage
          </h3>
          <p className="text-xs text-gray-600">
            This startup is a direct commercial spin-off founded on peer-reviewed papers and patents deposited in the National Innovation Repository.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {startup.linkedResearchIds.map(rid => (
              <Link
                key={rid}
                href={`/research/${rid}`}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold rounded-xl border border-purple-200 flex items-center gap-1 transition"
              >
                📄 View Patent/Paper #{rid} ➔
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
