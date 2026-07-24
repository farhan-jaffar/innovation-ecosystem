'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FundedProject } from '@innovation/shared-types';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FundedProjectTrackerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [project, setProject] = useState<FundedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingIdx, setUpdatingIdx] = useState<number | null>(null);

  const fetchProject = async () => {
    try {
      const res = await fetch(`${API_BASE}/funding/funded-projects/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        setProject(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch project tracker', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleUpdateMilestone = async (milestoneIndex: number, newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    if (!token) return;
    setUpdatingIdx(milestoneIndex);

    try {
      const res = await fetch(`${API_BASE}/funding/funded-projects/${id}/milestone`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          milestoneIndex,
          newStatus,
          releaseDisbursementAmount: newStatus === 'COMPLETED' ? 1000000 : 0
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setProject(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingIdx(null);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading milestone & financial ledger...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Project Tracker Not Found</h2>
        <Link href="/funded-projects" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Funded Projects Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Funded Projects
      </button>

      {/* Header Summary */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
            <TrendingUp className="w-3.5 h-3.5" /> Project Execution Ledger
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {project.fundingTitle}
          </h1>
          <p className="text-xs font-bold text-gray-700">Grant Recipient: {project.recipientName}</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Grant Approved</span>
            <span className="text-xl font-extrabold text-gray-900">PKR {project.totalGrant.toLocaleString()}</span>
          </div>

          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Released Disbursements</span>
            <span className="text-xl font-extrabold text-emerald-800">PKR {project.disbursedAmount.toLocaleString()}</span>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Remaining Escrow</span>
            <span className="text-xl font-extrabold text-amber-900">
              PKR {(project.totalGrant - project.disbursedAmount).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Milestone Execution Roadmap */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Milestone Compliance Roadmap</h2>

        <div className="space-y-4">
          {project.milestones.map((m, idx) => (
            <div
              key={m.id || idx}
              className={`p-5 rounded-2xl border transition space-y-3 ${
                m.status === 'COMPLETED'
                  ? 'bg-green-50/40 border-green-200'
                  : m.status === 'IN_PROGRESS'
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Phase {idx + 1}</span>
                  <h3 className="font-extrabold text-gray-900 text-sm">{m.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    m.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : m.status === 'IN_PROGRESS'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {m.status}
                  </span>

                  {user && (
                    <button
                      disabled={updatingIdx === idx}
                      onClick={() =>
                        handleUpdateMilestone(
                          idx,
                          m.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED'
                        )
                      }
                      className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-[10px] font-bold rounded-lg transition"
                    >
                      Toggle Compliance
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-600">{m.description}</p>

              {m.deliverables && m.deliverables.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.deliverables.map((d, di) => (
                    <span key={di} className="px-2 py-0.5 bg-white text-gray-700 text-[10px] font-semibold rounded-md border border-gray-200">
                      📄 {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Financial Disbursements Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Financial Disbursement Tranches</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-200">
              <tr>
                <th className="p-3">Tranche ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Release Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Milestone Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {project.disbursements.map(d => (
                <tr key={d.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 font-mono text-[11px]">{d.id}</td>
                  <td className="p-3 font-bold text-green-700">PKR {d.amount.toLocaleString()}</td>
                  <td className="p-3">{d.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      d.status === 'RELEASED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-800">{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
