'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { StartupStage, OriginType } from '@innovation/shared-types';
import { ArrowLeft, Rocket, PlusCircle, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const INDUSTRIES = ['AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function RegisterStartupPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('AgriTech');
  const [stage, setStage] = useState<StartupStage>(StartupStage.MVP);
  const [city, setCity] = useState('Islamabad');
  const [website, setWebsite] = useState('');
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');
  const [teamSize, setTeamSize] = useState('3');
  const [fundingRaised, setFundingRaised] = useState('');
  const [originType, setOriginType] = useState<OriginType>(OriginType.UNIVERSITY_RESEARCH);
  const [universityName, setUniversityName] = useState('FAST National University');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to register your startup or university research spin-off.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/startups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          tagline,
          description,
          industry,
          stage,
          city,
          website,
          pitchDeckUrl,
          teamSize: parseInt(teamSize),
          fundingRaised: fundingRaised ? parseFloat(fundingRaised) : 0,
          originType,
          universityName
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success && data.data) {
        router.push(`/startups/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to register startup.');
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
        <ArrowLeft className="w-4 h-4" /> Back to Startup Hub
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Register Startup or Research Spin-Off</h1>
        <p className="text-xs text-gray-500 mt-1">
          Showcase your startup to mentors, venture capital investors, and corporate partners across Pakistan.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Startup Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. CropVision AI"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Tagline *</label>
          <input
            type="text"
            required
            value={tagline}
            onChange={e => setTagline(e.target.value)}
            placeholder="e.g. Autonomous Drone & Edge AI Diagnostics for Agriculture"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Industry, Stage, Origin */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Industry *</label>
            <select
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              {INDUSTRIES.map(i => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Development Stage *</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as StartupStage)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={StartupStage.IDEA}>Idea Concept</option>
              <option value={StartupStage.PROTOTYPE}>Working Prototype</option>
              <option value={StartupStage.MVP}>MVP Stage</option>
              <option value={StartupStage.GROWTH}>Growth Stage</option>
              <option value={StartupStage.SCALE}>Scaleup</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Origin Type *</label>
            <select
              value={originType}
              onChange={e => setOriginType(e.target.value as OriginType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={OriginType.UNIVERSITY_RESEARCH}>University Research Spin-Off</option>
              <option value={OriginType.PERSONAL}>Independent Founders</option>
              <option value={OriginType.CORPORATE_SPINOFF}>Corporate Spinoff</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Description & Mission *</label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Detail core technology innovation, target market, product-market fit, and revenue model..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Pitch Deck & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Pitch Deck PDF URL</label>
            <input
              type="url"
              value={pitchDeckUrl}
              onChange={e => setPitchDeckUrl(e.target.value)}
              placeholder="https://cropvision.ai/pitch-deck-2026.pdf"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Website / Demo Link</label>
            <input
              type="url"
              value={website}
              onChange={e => setWebsite(e.target.value)}
              placeholder="https://cropvision.ai"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Team Size & Funding Raised */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Team Size</label>
            <input
              type="number"
              value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
              placeholder="e.g. 4"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Funding Raised (PKR)</label>
            <input
              type="number"
              value={fundingRaised}
              onChange={e => setFundingRaised(e.target.value)}
              placeholder="e.g. 5000000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Affiliated University</label>
            <input
              type="text"
              value={universityName}
              onChange={e => setUniversityName(e.target.value)}
              placeholder="FAST National University"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
        >
          {submitting ? 'Registering Startup...' : 'Register Startup Profile'}
        </button>
      </form>
    </div>
  );
}
