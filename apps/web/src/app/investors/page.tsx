'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { InvestorProfile } from '@innovation/shared-types';
import { DollarSign, Search, Building2, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function InvestorDirectoryPage() {
  const [investors, setInvestors] = useState<InvestorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/investors`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setInvestors(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-teal-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
          <DollarSign className="w-3.5 h-3.5" /> Venture Capital & Angel Directory
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Pakistan Innovation Investors</h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Browse verified seed stage VC funds, corporate venture funds, and angel investors backing deep-tech startups and university spin-offs.
        </p>
      </div>

      {/* Investor Cards */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading investor directory...</p>
        </div>
      ) : investors.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
          <DollarSign className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No investor profiles registered yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investors.map(inv => (
            <div
              key={inv.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 shadow-sm transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                      {inv.orgName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base">{inv.orgName}</h3>
                      <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                        {inv.investorType.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-[10px]">Investment Criteria</p>
                  <p className="text-xs text-gray-700 leading-relaxed">{inv.investmentCriteria}</p>
                </div>

                {/* Target Domains */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {inv.investmentDomains.map(dom => (
                    <span key={dom} className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-md">
                      {dom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Ticket Size</span>
                  <span className="font-bold text-green-700">
                    PKR {inv.ticketSizeMin.toLocaleString()} - {inv.ticketSizeMax.toLocaleString()}
                  </span>
                </div>

                <a
                  href={`mailto:${inv.contactEmail}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Submit Pitch
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
