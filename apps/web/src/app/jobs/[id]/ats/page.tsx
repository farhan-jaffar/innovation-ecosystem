'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { JobApplication, JobApplicationStatus } from '@innovation/shared-types';
import { ArrowLeft, Users, CheckCircle2, Calendar, FileText } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const ATS_COLUMNS: { key: JobApplicationStatus; label: string; bg: string; border: string; text: string }[] = [
  { key: JobApplicationStatus.APPLIED, label: 'Applied', bg: 'bg-blue-50/50', border: 'border-blue-200', text: 'text-blue-800' },
  { key: JobApplicationStatus.SCREENED, label: 'Screened', bg: 'bg-amber-50/50', border: 'border-amber-200', text: 'text-amber-800' },
  { key: JobApplicationStatus.INTERVIEW, label: 'Interview', bg: 'bg-purple-50/50', border: 'border-purple-200', text: 'text-purple-800' },
  { key: JobApplicationStatus.OFFER, label: 'Offer Sent', bg: 'bg-emerald-50/50', border: 'border-emerald-200', text: 'text-emerald-800' },
  { key: JobApplicationStatus.HIRED, label: 'Hired', bg: 'bg-green-50/50', border: 'border-green-200', text: 'text-green-800' },
  { key: JobApplicationStatus.REJECTED, label: 'Rejected', bg: 'bg-red-50/50', border: 'border-red-200', text: 'text-red-800' }
];

export default function CompanyATSPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/jobs/${id}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setApplications(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch ATS applicants', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [id, token]);

  const updateStatus = async (appId: string, newStatus: JobApplicationStatus) => {
    if (!token) return;
    setUpdatingId(appId);

    try {
      const res = await fetch(`${API_BASE}/jobs/applications/${appId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications(prev =>
          prev.map(a => (a.id === appId ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in as a company to manage ATS applicants.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Position
      </button>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Applicant Tracking System (ATS)</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage candidates, move applicants through recruitment stages, and view university recommendations.
          </p>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
          Total Candidates: {applications.length}
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading ATS board...
        </div>
      ) : (
        /* 6-Column ATS Board */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 overflow-x-auto min-h-[500px]">
          {ATS_COLUMNS.map(col => {
            const colApps = applications.filter(a => a.status === col.key);

            return (
              <div
                key={col.key}
                className={`p-3.5 rounded-3xl border ${col.border} ${col.bg} flex flex-col gap-3 min-w-[200px]`}
              >
                <div className="flex justify-between items-center pb-2 border-b border-gray-200/60">
                  <h3 className={`text-[11px] font-bold ${col.text} uppercase tracking-wider`}>
                    {col.label}
                  </h3>
                  <span className="w-5 h-5 rounded-full bg-white text-gray-700 font-extrabold text-[10px] flex items-center justify-center shadow-2xs">
                    {colApps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                  {colApps.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-gray-400 italic">
                      No candidates
                    </div>
                  ) : (
                    colApps.map(app => (
                      <div
                        key={app.id}
                        className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2.5 hover:shadow-xs transition"
                      >
                        <div>
                          <p className="font-bold text-gray-900 text-xs">{app.applicantName}</p>
                          <p className="text-[10px] text-gray-500">@{app.applicantUsername}</p>
                        </div>

                        <p className="text-[11px] text-gray-600 line-clamp-3 leading-relaxed">
                          {app.coverLetter}
                        </p>

                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-600 hover:underline"
                          >
                            <FileText className="w-3 h-3" /> View Resume PDF
                          </a>
                        )}

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <select
                            disabled={updatingId === app.id}
                            value={app.status}
                            onChange={e => updateStatus(app.id, e.target.value as JobApplicationStatus)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-semibold text-gray-700 focus:outline-none"
                          >
                            <option value={JobApplicationStatus.APPLIED}>Applied</option>
                            <option value={JobApplicationStatus.SCREENED}>Screened</option>
                            <option value={JobApplicationStatus.INTERVIEW}>Schedule Interview</option>
                            <option value={JobApplicationStatus.OFFER}>Send Offer</option>
                            <option value={JobApplicationStatus.HIRED}>Hire Candidate</option>
                            <option value={JobApplicationStatus.REJECTED}>Reject</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
