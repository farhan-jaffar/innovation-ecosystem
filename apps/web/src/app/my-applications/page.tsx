'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Application, ApplicationStatus } from '@innovation/shared-types';
import { Briefcase, Clock, CheckCircle2, XCircle, FileText, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MyApplicationsPage() {
  const { user, token } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/marketplace/my-applications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setApplications(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to track your submitted proposals.
      </div>
    );
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.ACCEPTED:
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">✓ Accepted</span>;
      case ApplicationStatus.SHORTLISTED:
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">★ Shortlisted</span>;
      case ApplicationStatus.REVIEWED:
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">In Review</span>;
      case ApplicationStatus.REJECTED:
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Rejected</span>;
      default:
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Submitted</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">My Submitted Proposals</h1>
        <p className="text-xs text-gray-500 mt-1">
          Track the status of your technical proposals submitted to government challenges and industry RFPs.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading submitted proposals...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No applications submitted yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Explore active government challenges and research grants on the marketplace.
          </p>
          <div className="pt-2">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Explore Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  {getStatusBadge(app.status)}
                  <span className="text-[11px] text-gray-400">
                    Submitted on {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-gray-900">
                  <Link href={`/marketplace/${app.opportunityId}`} className="hover:text-green-700 transition">
                    {app.opportunityTitle}
                  </Link>
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {app.coverLetter}
                </p>
              </div>

              <div className="shrink-0 space-y-2 text-right">
                {app.proposedBudget && (
                  <p className="text-sm font-bold text-green-700">
                    PKR {app.proposedBudget.toLocaleString()}
                  </p>
                )}
                <Link
                  href={`/marketplace/${app.opportunityId}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:underline"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
