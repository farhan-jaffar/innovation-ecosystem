'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FundingType, FundingEligibility } from '@innovation/shared-types';
import { ArrowLeft, DollarSign, PlusCircle, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function PostFundingPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<FundingType>(FundingType.GRANT);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [fundingType, setFundingType] = useState('MILESTONE_BASED');
  const [eligibility, setEligibility] = useState<FundingEligibility>(FundingEligibility.ANY);
  const [domain, setDomain] = useState('AgriTech');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in as a government ministry, company, or university to post funding opportunities.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError('');
    setSubmitting(true);

    const requirements = requirementsInput.split('\n').map(r => r.trim()).filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/funding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          type,
          amount: parseFloat(amount),
          currency,
          fundingType,
          eligibility,
          domain,
          requirements,
          applicationDeadline
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success && data.data) {
        router.push(`/funding/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to post funding opportunity.');
      }
    } catch (err: any) {
      setSubmitting(false);
      setError('Network error connecting to API server.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Funding Hub
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Post Funding Opportunity / Grant Call</h1>
        <p className="text-xs text-gray-500 mt-1">
          Publish national R&D grants, innovation challenges, or seed funding calls for Pakistani universities and startups.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Grant / Funding Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. National AI & AgriTech Grand Challenge Fund 2026"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Type & Eligibility */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Funding Type *</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as FundingType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={FundingType.GRANT}>National Grant</option>
              <option value={FundingType.RD_FUNDING}>R&D Fund</option>
              <option value={FundingType.SEED_FUNDING}>Seed Accelerator</option>
              <option value={FundingType.INNOVATION_CHALLENGE}>Innovation Challenge</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Eligible Applicants *</label>
            <select
              value={eligibility}
              onChange={e => setEligibility(e.target.value as FundingEligibility)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={FundingEligibility.ANY}>Open to All</option>
              <option value={FundingEligibility.UNIVERSITY}>Universities & Faculties Only</option>
              <option value={FundingEligibility.STARTUP}>Startups & SMEs Only</option>
              <option value={FundingEligibility.INDIVIDUAL}>Individual Researchers Only</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Domain *</label>
            <select
              value={domain}
              onChange={e => setDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Amount & Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Total Grant Budget (PKR) *</label>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="e.g. 15000000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Application Deadline *</label>
            <input
              type="date"
              required
              value={applicationDeadline}
              onChange={e => setApplicationDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Grant Description & Objectives *</label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Detail national objectives, key performance indicators, and expected technology deliverables..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Requirements (One per line) */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Eligibility Requirements (One per line)</label>
          <textarea
            rows={3}
            value={requirementsInput}
            onChange={e => setRequirementsInput(e.target.value)}
            placeholder="Must deploy PyTorch edge AI models&#10;Must provide 10k local dataset images&#10;Must field test within 6 months"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
        >
          {submitting ? 'Publishing Grant Call...' : 'Post Funding Opportunity'}
        </button>
      </form>
    </div>
  );
}
