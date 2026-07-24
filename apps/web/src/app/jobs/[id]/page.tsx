'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { JobPosting } from '@innovation/shared-types';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Send,
  Users,
  CheckCircle2,
  ArrowLeft,
  Award,
  GraduationCap,
  FileText
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);

  // Apply modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [applying, setApplying] = useState(false);
  const [appMsg, setAppMsg] = useState('');
  const [appErr, setAppErr] = useState('');

  // University Endorsement Modal state
  const [showRecModal, setShowRecModal] = useState(false);
  const [studentUsername, setStudentUsername] = useState('draliraza');
  const [recNote, setRecNote] = useState('');
  const [recommending, setRecommending] = useState(false);
  const [recMsg, setRecMsg] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setJob(data.data);
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
      const res = await fetch(`${API_BASE}/jobs/${id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ coverLetter, resumeUrl })
      });

      const data = await res.json();
      setApplying(false);

      if (data.success) {
        setAppMsg('Job application submitted!');
        setTimeout(() => setShowApplyModal(false), 2000);
      } else {
        setAppErr(data.error || 'Failed to submit application.');
      }
    } catch (err: any) {
      setApplying(false);
      setAppErr('Server communication error.');
    }
  };

  const handleRecommendStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setRecMsg('');
    setRecommending(true);

    try {
      const res = await fetch(`${API_BASE}/jobs/${id}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ studentUsername, note: recNote })
      });

      const data = await res.json();
      setRecommending(false);

      if (data.success) {
        setRecMsg(`University Endorsement submitted for @${studentUsername}!`);
        setTimeout(() => setShowRecModal(false), 2000);
      }
    } catch (err: any) {
      setRecommending(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading job opening...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Job Opening Not Found</h2>
        <Link href="/jobs" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Job Listings
        </Link>
      </div>
    );
  }

  const isCompanyPoster = user && user.id === job.companyId;
  const isUniversity = user && user.role === 'UNIVERSITY';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      {/* Main Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                {job.type.replace(/_/g, ' ')}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                {job.experienceLevel}
              </span>
              {job.remote && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                  🌐 Remote
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {job.title}
            </h1>
            <p className="text-sm font-bold text-gray-700">{job.companyName} — {job.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {isCompanyPoster ? (
              <Link
                href={`/jobs/${job.id}/ats`}
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
              >
                <Users className="w-4 h-4" /> Manage ATS Applicants ({job.applicantCount})
              </Link>
            ) : user ? (
              <>
                {isUniversity && (
                  <button
                    onClick={() => setShowRecModal(true)}
                    className="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-bold text-xs rounded-2xl transition flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4 text-purple-700" /> Recommend Student
                  </button>
                )}
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-2xl transition shadow-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Apply for Position
                </button>
              </>
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
            <p className="text-[10px] uppercase font-bold text-gray-400">Salary</p>
            <p className="font-bold text-green-700 text-sm">
              {job.salaryMin ? `PKR ${job.salaryMin.toLocaleString()} - ${job.salaryMax?.toLocaleString()}` : 'Competitive'}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Deadline</p>
            <p className="font-semibold text-gray-900">{job.applicationDeadline}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Applicants</p>
            <p className="font-semibold text-gray-900">{job.applicantCount} Candidate(s)</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Domain</p>
            <p className="font-semibold text-gray-900">{job.domain}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Job Description & Responsibilities</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </div>
      </div>

      {/* Required Skills */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Required Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {job.requiredSkills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-green-50 text-green-800 text-xs font-bold rounded-xl border border-green-200">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Apply for Position</h2>
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
                <label className="text-xs font-bold text-gray-700">Cover Letter *</label>
                <textarea
                  required
                  rows={4}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  placeholder="Introduce yourself, your technical skills, and why you are a fit..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Resume / Portfolio URL</label>
                <input
                  type="url"
                  value={resumeUrl}
                  onChange={e => setResumeUrl(e.target.value)}
                  placeholder="https://aliraza.ai/cv.pdf"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
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
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* University Endorsement Modal */}
      {showRecModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Official Student Recommendation</h2>
              <button onClick={() => setShowRecModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {recMsg && (
              <div className="p-3 bg-purple-50 text-purple-800 text-xs font-semibold rounded-xl border border-purple-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> {recMsg}
              </div>
            )}

            <form onSubmit={handleRecommendStudent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Student Username *</label>
                <input
                  type="text"
                  required
                  value={studentUsername}
                  onChange={e => setStudentUsername(e.target.value)}
                  placeholder="draliraza"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">University Endorsement Note *</label>
                <textarea
                  required
                  rows={3}
                  value={recNote}
                  onChange={e => setRecNote(e.target.value)}
                  placeholder="Explain student Academic performance, GPA, or research achievements..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={recommending}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
              >
                {recommending ? 'Submitting Endorsement...' : 'Send University Endorsement'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
