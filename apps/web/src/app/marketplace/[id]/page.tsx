'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Opportunity, Application } from '@innovation/shared-types';
import {
  Shield,
  Building2,
  GraduationCap,
  Sparkles,
  Clock,
  Briefcase,
  Users,
  Eye,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Bookmark as BookmarkIcon,
  Send
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Application form state
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedApproach, setProposedApproach] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [proposedTimeline, setProposedTimeline] = useState('6 Months');
  const [applying, setApplying] = useState(false);
  const [appMsg, setAppMsg] = useState('');
  const [appErr, setAppErr] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/marketplace/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setOpp(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setAppMsg('');
    setAppErr('');
    setApplying(true);

    try {
      const res = await fetch(`${API_BASE}/marketplace/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          coverLetter,
          proposedApproach,
          proposedBudget: proposedBudget ? parseFloat(proposedBudget) : undefined,
          proposedTimeline
        })
      });

      const data = await res.json();
      setApplying(false);

      if (data.success) {
        setAppMsg('Your application & technical proposal have been submitted!');
        setTimeout(() => {
          setShowApplyModal(false);
        }, 2000);
      } else {
        setAppErr(data.error || 'Failed to submit application.');
      }
    } catch (err: any) {
      setApplying(false);
      setAppErr('Server communication error.');
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading opportunity detail...
      </div>
    );
  }

  if (!opp) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Opportunity Not Found</h2>
        <Link href="/marketplace" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isPoster = user && user.id === opp.postedBy;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </button>

      {/* Main Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                {opp.type.replace(/_/g, ' ')}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                {opp.domain}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {opp.title}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {isPoster ? (
              <Link
                href={`/marketplace/${opp.id}/applications`}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> Review Applications ({opp.applicationCount})
              </Link>
            ) : user ? (
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Proposal
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

        {/* Organization Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              {opp.organizationName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{opp.organizationName}</p>
              <p className="text-[11px] text-gray-500">Posted by @{opp.posterUsername}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Budget / Funding</p>
              <p className="font-bold text-green-700 text-sm">
                {opp.budget ? `${opp.budget.toLocaleString()} ${opp.currency}` : 'TBD'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Deadline</p>
              <p className="font-semibold text-gray-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> {opp.deadline}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Duration</p>
              <p className="font-semibold text-gray-900">{opp.duration || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Scope */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Problem Statement & Scope</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {opp.description}
        </div>
      </div>

      {/* Required Skills & Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {opp.requiredSkills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-green-50 text-green-800 text-xs font-bold rounded-xl border border-green-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Roles</h3>
          <div className="flex flex-wrap gap-2">
            {opp.requiredRoles.map(role => (
              <span key={role} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Milestone Roadmap */}
      {opp.milestones && opp.milestones.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Project Milestones & Deliverables</h2>
          <div className="space-y-3">
            {opp.milestones.map((m, idx) => (
              <div key={m.id || idx} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">{m.title}</h4>
                  <p className="text-xs text-gray-500">{m.description}</p>
                </div>
                <div className="text-right text-xs font-semibold text-gray-600 shrink-0">
                  <p className="text-green-700 font-bold">Due: {m.dueDate}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase">{m.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Application Proposal Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Submit Project Proposal</h2>
              <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {appMsg && (
              <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {appMsg}
              </div>
            )}

            {appErr && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                {appErr}
              </div>
            )}

            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Cover Letter & Introduction *</label>
                <textarea
                  required
                  rows={3}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself or lab team and why you are qualified..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Proposed Technical Approach *</label>
                <textarea
                  required
                  rows={4}
                  value={proposedApproach}
                  onChange={e => setProposedApproach(e.target.value)}
                  placeholder="Outline your methodology, architecture, tools, and execution timeline..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Proposed Budget ({opp.currency})</label>
                  <input
                    type="number"
                    value={proposedBudget}
                    onChange={e => setProposedBudget(e.target.value)}
                    placeholder="e.g. 4800000"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Estimated Timeline</label>
                  <input
                    type="text"
                    value={proposedTimeline}
                    onChange={e => setProposedTimeline(e.target.value)}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="w-1/3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="w-2/3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  {applying ? 'Submitting...' : 'Send Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
