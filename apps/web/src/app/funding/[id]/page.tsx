'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FundingOpportunity } from '@innovation/shared-types';
import {
  DollarSign,
  Calendar,
  Building2,
  Send,
  Users,
  CheckCircle2,
  ArrowLeft,
  Award,
  FileText
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FundingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [funding, setFunding] = useState<FundingOpportunity | null>(null);
  const [loading, setLoading] = useState(true);

  // Proposal modal state
  const [showPropModal, setShowPropModal] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('12 Months');
  const [submittingProp, setSubmittingProp] = useState(false);
  const [propMsg, setPropMsg] = useState('');
  const [propErr, setPropErr] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/funding/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setFunding(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setPropMsg('');
    setPropErr('');
    setSubmittingProp(true);

    try {
      const res = await fetch(`${API_BASE}/funding/${id}/proposal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          proposalTitle,
          proposalDescription,
          budget: parseFloat(budget),
          timeline
        })
      });

      const data = await res.json();
      setSubmittingProp(false);

      if (data.success) {
        setPropMsg('Grant Proposal submitted successfully to Funder!');
        setTimeout(() => setShowPropModal(false), 2000);
      } else {
        setPropErr(data.error || 'Failed to submit proposal.');
      }
    } catch (err: any) {
      setSubmittingProp(false);
      setPropErr('Server communication error.');
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading funding opportunity...
      </div>
    );
  }

  if (!funding) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Grant Opportunity Not Found</h2>
        <Link href="/funding" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Funding Hub
        </Link>
      </div>
    );
  }

  const isFunder = user && user.id === funding.funderId;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Funding Hub
      </button>

      {/* Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {funding.type}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                {funding.domain}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-full border border-blue-200">
                Eligible: {funding.eligibility}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {funding.title}
            </h1>

            <p className="text-sm font-bold text-gray-700">Funder: {funding.organizationName}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isFunder ? (
              <Link
                href={`/funding/${funding.id}/proposals`}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> Evaluate Submitted Proposals ({funding.proposalCount})
              </Link>
            ) : user ? (
              <button
                onClick={() => setShowPropModal(true)}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Grant Proposal
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm"
              >
                Sign In to Apply
              </Link>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Total Grant Fund</p>
            <p className="font-extrabold text-green-700 text-base">PKR {funding.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Application Deadline</p>
            <p className="font-semibold text-gray-900">{funding.applicationDeadline}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Submitted Proposals</p>
            <p className="font-semibold text-gray-900">{funding.proposalCount} Proposal(s)</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Disbursement</p>
            <p className="font-semibold text-gray-900">{funding.fundingType}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Grant Description & Objectives</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {funding.description}
        </div>
      </div>

      {/* Requirements */}
      {funding.requirements && funding.requirements.length > 0 && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Eligibility Requirements</h3>
          <ul className="space-y-2">
            {funding.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2 text-xs font-medium text-gray-800">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Proposal Modal */}
      {showPropModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Submit Grant Proposal</h2>
              <button onClick={() => setShowPropModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {propMsg && (
              <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {propMsg}
              </div>
            )}

            {propErr && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                {propErr}
              </div>
            )}

            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Proposal Title *</label>
                <input
                  type="text"
                  required
                  value={proposalTitle}
                  onChange={e => setProposalTitle(e.target.value)}
                  placeholder="e.g. Hyperspectral Drone Diagnostics & Edge AI System for Wheat Rust"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Technical Scope & Methodology *</label>
                <textarea
                  required
                  rows={4}
                  value={proposalDescription}
                  onChange={e => setProposalDescription(e.target.value)}
                  placeholder="Detail research architecture, data collection, team expertise, and expected impact..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Requested Grant Amount (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    placeholder="e.g. 5000000"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Timeline *</label>
                  <input
                    type="text"
                    required
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    placeholder="12 Months"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPropModal(false)}
                  className="w-1/3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingProp}
                  className="w-2/3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  {submittingProp ? 'Submitting Proposal...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
