'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FundingProposal, FundingProposalStatus } from '@innovation/shared-types';
import { ArrowLeft, CheckCircle2, DollarSign, Award, XCircle } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FunderProposalEvaluationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [proposals, setProposals] = useState<FundingProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchProposals = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/funding/${id}/proposals`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProposals(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch proposals', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [id, token]);

  const handleUpdateStatus = async (proposalId: string, status: FundingProposalStatus) => {
    if (!token) return;
    setActionId(proposalId);

    try {
      const res = await fetch(`${API_BASE}/funding/proposals/${proposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          reviewerNotes: status === FundingProposalStatus.APPROVED ? 'Approved for official grant release & milestone tracking.' : 'Evaluated.'
        })
      });

      const data = await res.json();
      if (data.success) {
        setProposals(prev =>
          prev.map(p => (p.id === proposalId ? { ...p, status } : p))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionId(null);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in as a funder to evaluate grant proposals.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Funding Call
      </button>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Grant Proposal Evaluation Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Review grant submissions, approve research funding, and trigger project mobilization disbursements.
          </p>
        </div>
        <Link
          href="/funded-projects"
          className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition"
        >
          View Active Funded Projects ➔
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading submitted proposals...
        </div>
      ) : proposals.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
          <Award className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No grant proposals submitted yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map(prop => (
            <div
              key={prop.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      prop.status === FundingProposalStatus.APPROVED
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : prop.status === FundingProposalStatus.REJECTED
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {prop.status}
                    </span>
                    <span className="text-xs font-bold text-gray-500">
                      Applicant: {prop.applicantName} (@{prop.applicantUsername})
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-gray-900">
                    {prop.proposalTitle}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                    {prop.proposalDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs pt-1 font-semibold text-gray-700">
                    <span>Requested Budget: <strong className="text-green-700">PKR {prop.budget.toLocaleString()}</strong></span>
                    <span>Timeline: <strong>{prop.timeline}</strong></span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
                  {prop.status !== FundingProposalStatus.APPROVED && (
                    <button
                      disabled={actionId === prop.id}
                      onClick={() => handleUpdateStatus(prop.id, FundingProposalStatus.APPROVED)}
                      className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Issue Grant
                    </button>
                  )}

                  {prop.status !== FundingProposalStatus.REJECTED && (
                    <button
                      disabled={actionId === prop.id}
                      onClick={() => handleUpdateStatus(prop.id, FundingProposalStatus.REJECTED)}
                      className="px-5 py-2 bg-gray-100 hover:bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-gray-200 transition flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject Proposal
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
