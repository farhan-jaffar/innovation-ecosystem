'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ProjectType } from '@innovation/shared-types';
import { PlusCircle, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['AgriTech', 'Robotics & AI', 'CleanEnergy', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function CreateOpportunityPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ProjectType>(ProjectType.GOVERNMENT_CHALLENGE);
  const [domain, setDomain] = useState('AgriTech');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [budgetType, setBudgetType] = useState<'FIXED' | 'RANGE' | 'GRANT' | 'TBD'>('GRANT');
  const [deadline, setDeadline] = useState('');
  const [duration, setDuration] = useState('6 Months');
  const [skillsInput, setSkillsInput] = useState('');
  const [rolesInput, setRolesInput] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to post an opportunity on the Innovation Marketplace.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError('');
    setSubmitting(true);

    const requiredSkills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const requiredRoles = rolesInput.split(',').map(r => r.trim()).filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/marketplace`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          type,
          domain,
          budget: budget ? parseFloat(budget) : undefined,
          currency,
          budgetType,
          deadline,
          duration,
          requiredSkills,
          requiredRoles
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success && data.data) {
        router.push(`/marketplace/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to post opportunity.');
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
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Post New Ecosystem Opportunity</h1>
        <p className="text-xs text-gray-500 mt-1">
          Publish a government challenge, research grant, industry RFP, or hackathon for ecosystem stakeholders.
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
          <label className="text-xs font-bold text-gray-700">Opportunity Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. National AI Challenge: Hyperspectral Crop Disease Detection"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Type & Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Project Type *</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as ProjectType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={ProjectType.GOVERNMENT_CHALLENGE}>Government Challenge</option>
              <option value={ProjectType.INDUSTRY_CHALLENGE}>Industry Challenge</option>
              <option value={ProjectType.RESEARCH_OPPORTUNITY}>Research Lab Opportunity</option>
              <option value={ProjectType.HACKATHON}>Hackathon</option>
              <option value={ProjectType.COMPETITION}>Competition</option>
              <option value={ProjectType.FUNDING_OPPORTUNITY}>Funding Opportunity</option>
              <option value={ProjectType.COLLABORATION_REQUEST}>Collaboration Request</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Technology Domain *</label>
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

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Full Problem Statement & Scope *</label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the problem, objectives, expected deliverables, and evaluation criteria..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Budget & Currency */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Grant / Budget Amount</label>
            <input
              type="number"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="e.g. 5000000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
            >
              <option value="PKR">PKR (Pakistani Rupee)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Budget Type</label>
            <select
              value={budgetType}
              onChange={e => setBudgetType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm"
            >
              <option value="GRANT">Government Grant</option>
              <option value="FIXED">Fixed Contract</option>
              <option value="RANGE">Prize Range</option>
              <option value="TBD">To Be Discussed</option>
            </select>
          </div>
        </div>

        {/* Deadline & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Submission Deadline *</label>
            <input
              type="date"
              required
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Project Duration</label>
            <input
              type="text"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="e.g. 6 Months"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Required Skills & Roles */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Required Skills (Comma Separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={e => setSkillsInput(e.target.value)}
              placeholder="Computer Vision, PyTorch, YOLOv8, OpenCV"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Required Roles (Comma Separated)</label>
            <input
              type="text"
              value={rolesInput}
              onChange={e => setRolesInput(e.target.value)}
              placeholder="Lead AI Researcher, Data Scientist, Embedded Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
        >
          {submitting ? 'Publishing Opportunity...' : 'Publish to Marketplace'}
        </button>
      </form>
    </div>
  );
}
