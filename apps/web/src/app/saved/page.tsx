'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Opportunity } from '@innovation/shared-types';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function SavedOpportunitiesPage() {
  const { user, token } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/marketplace/saved`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setOpportunities(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to view your bookmarked opportunities.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Saved Opportunities & Bookmarks</h1>
        <p className="text-xs text-gray-500 mt-1">
          Quick access to your bookmarked national challenges, research grants, and hackathons.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading saved opportunities...
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No saved opportunities yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Click the bookmark icon on any opportunity card in the marketplace to save it for later.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map(opp => (
            <Link
              key={opp.id}
              href={`/marketplace/${opp.id}`}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 shadow-sm transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                  {opp.domain}
                </span>
                <h3 className="font-extrabold text-gray-900 text-sm leading-snug">
                  {opp.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{opp.description}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{opp.organizationName}</span>
                <span className="flex items-center gap-1 font-semibold text-green-700">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> {opp.deadline}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
