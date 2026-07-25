'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  PlusCircle,
  Building2,
  Users,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { JobType, ExperienceLevel, JobPosting } from '@innovation/shared-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['All Domains', 'Robotics & AI', 'AgriTech', 'CleanEnergy', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function JobsDiscoveryPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [remoteOnly, setRemoteOnly] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedDomain !== 'All Domains') queryParams.append('domain', selectedDomain);
      if (selectedType !== 'ALL') queryParams.append('type', selectedType);
      if (search) queryParams.append('search', search);
      if (remoteOnly) queryParams.append('remote', 'true');

      const res = await fetch(`${API_BASE}/jobs?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setJobs(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch jobs', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [selectedDomain, selectedType, remoteOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const getJobTypeBadge = (type: JobType) => {
    switch (type) {
      case JobType.FULL_TIME:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-green-100 text-green-800 border border-green-300">Full Time</span>;
      case JobType.RESEARCH_POSITION:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-300">Research Fellow</span>;
      case JobType.INTERNSHIP:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-300">Internship</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-300">Contract</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" /> Talent Marketplace
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pakistan Tech & Research Jobs
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Connecting enterprise tech companies, AI labs, and startups with top-tier university graduates, researchers, and engineers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/talent"
            className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-xs"
          >
            <Users className="w-4 h-4 text-green-600" /> Browse Talent Pool
          </Link>

          {user && (
            <Link
              href="/jobs/create"
              className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Post Job Position
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
              placeholder="Search job title, skills, company (e.g. AI Architect, Systems Limited, PyTorch)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Search Jobs
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

        {/* Job Type Pills & Remote Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === 'ALL' ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setSelectedType(JobType.FULL_TIME)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === JobType.FULL_TIME ? 'bg-green-100 text-green-900 border border-green-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Full-Time
            </button>
            <button
              onClick={() => setSelectedType(JobType.RESEARCH_POSITION)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === JobType.RESEARCH_POSITION ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Research Fellowships
            </button>
            <button
              onClick={() => setSelectedType(JobType.INTERNSHIP)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                selectedType === JobType.INTERNSHIP ? 'bg-teal-100 text-teal-900 border border-teal-300 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Internships
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={e => setRemoteOnly(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            Remote / Hybrid Positions
          </label>
        </div>
      </div>

      {/* Jobs Grid Feed */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading job opportunities...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No job openings match your search</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search query or domain filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    {getJobTypeBadge(job.type)}
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                      {job.experienceLevel}
                    </span>
                  </div>
                  {job.remote && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-md border border-emerald-200">
                      🌐 Remote
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900 group-hover:text-green-700 transition leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    {job.companyName} — {job.location}
                  </p>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-bold text-green-700">
                  {job.salaryMin ? `PKR ${job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()} / mo` : 'Competitive Salary'}
                </span>
                <span className="text-gray-400 text-[11px]">
                  {job.applicantCount} Applicants
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
