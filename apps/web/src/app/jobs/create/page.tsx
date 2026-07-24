'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { JobType, ExperienceLevel } from '@innovation/shared-types';
import { ArrowLeft, Briefcase, PlusCircle, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['Robotics & AI', 'AgriTech', 'CleanEnergy', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function CreateJobPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<JobType>(JobType.FULL_TIME);
  const [domain, setDomain] = useState('Robotics & AI');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(ExperienceLevel.MID);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [location, setLocation] = useState('Islamabad / Hybrid');
  const [remote, setRemote] = useState(true);
  const [hybrid, setHybrid] = useState(true);
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in as a company or lab to post job openings.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError('');
    setSubmitting(true);

    const requiredSkills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/jobs`, {
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
          experienceLevel,
          salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
          salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
          currency,
          location,
          remote,
          hybrid,
          applicationDeadline,
          requiredSkills
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success && data.data) {
        router.push(`/jobs/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to post job.');
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
        <ArrowLeft className="w-4 h-4" /> Back to Job Listings
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Post Job / Fellowship / Internship</h1>
        <p className="text-xs text-gray-500 mt-1">
          Recruit AI engineers, research fellows, and university interns across Pakistan.
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
          <label className="text-xs font-bold text-gray-700">Position Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Senior Computer Vision & AI Architect"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Type & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Employment Type *</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as JobType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={JobType.FULL_TIME}>Full Time</option>
              <option value={JobType.RESEARCH_POSITION}>Research Fellowship</option>
              <option value={JobType.INTERNSHIP}>Paid Internship</option>
              <option value={JobType.CONTRACT}>Contract / Freelance</option>
              <option value={JobType.PART_TIME}>Part Time</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Experience Level *</label>
            <select
              value={experienceLevel}
              onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={ExperienceLevel.ENTRY}>Entry Level / Fresh Grad</option>
              <option value={ExperienceLevel.MID}>Mid Level (2-4 Yrs)</option>
              <option value={ExperienceLevel.SENIOR}>Senior Level (5+ Yrs)</option>
              <option value={ExperienceLevel.EXPERT}>Expert / Principal</option>
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

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Job Description & Responsibilities *</label>
          <textarea
            required
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Outline team mission, daily responsibilities, and technical scope..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Min Salary (Monthly PKR)</label>
            <input
              type="number"
              value={salaryMin}
              onChange={e => setSalaryMin(e.target.value)}
              placeholder="e.g. 250000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Max Salary (Monthly PKR)</label>
            <input
              type="number"
              value={salaryMax}
              onChange={e => setSalaryMax(e.target.value)}
              placeholder="e.g. 400000"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Deadline *</label>
            <input
              type="date"
              required
              value={applicationDeadline}
              onChange={e => setApplicationDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Location & Remote checkboxes */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Office Location / City</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Lahore / Islamabad"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={remote}
                onChange={e => setRemote(e.target.checked)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              Remote Allowed
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hybrid}
                onChange={e => setHybrid(e.target.checked)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              Hybrid Work Model
            </label>
          </div>
        </div>

        {/* Required Skills */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Required Technical Skills (Comma Separated)</label>
          <input
            type="text"
            value={skillsInput}
            onChange={e => setSkillsInput(e.target.value)}
            placeholder="PyTorch, YOLOv8, Computer Vision, Docker, Python"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
        >
          {submitting ? 'Publishing Job...' : 'Post Job Opening'}
        </button>
      </form>
    </div>
  );
}
