'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FundedProject } from '@innovation/shared-types';
import { TrendingUp, DollarSign, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FundedProjectsFeedPage() {
  const [projects, setProjects] = useState<FundedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/funding/funded-projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5" /> Project Execution & Disbursement Transparency
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">National Active Funded Projects</h1>
        <p className="text-sm text-gray-600">
          Track research grant execution, milestone compliance, and milestone disbursement releases across Pakistani universities and startups.
        </p>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading active projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
          <TrendingUp className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No active funded projects found</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(proj => (
            <div key={proj.id} className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 transition space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold rounded-full">
                    {proj.status}
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    <Link href={`/funded-projects/${proj.id}`} className="hover:text-green-700 transition">
                      {proj.fundingTitle}
                    </Link>
                  </h3>
                  <p className="text-xs font-semibold text-gray-600">
                    Recipient Lab / Institution: <span className="text-gray-900 font-bold">{proj.recipientName}</span>
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Total Grant Awarded</span>
                  <span className="text-lg font-extrabold text-green-700">PKR {proj.totalGrant.toLocaleString()}</span>
                  <span className="text-[11px] block font-semibold text-emerald-800">
                    Disbursed: PKR {proj.disbursedAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Milestone Progress Bar */}
              <div className="pt-2 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>Milestone Compliance Progress</span>
                  <span>{proj.milestones.filter(m => m.status === 'COMPLETED').length} of {proj.milestones.length} Milestones</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(proj.milestones.filter(m => m.status === 'COMPLETED').length / (proj.milestones.length || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="text-gray-500 font-medium">Disbursements Released: {proj.disbursements.length} Tranches</span>
                <Link href={`/funded-projects/${proj.id}`} className="font-bold text-green-600 hover:underline flex items-center gap-1">
                  View Tracker & Financial Ledger <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
