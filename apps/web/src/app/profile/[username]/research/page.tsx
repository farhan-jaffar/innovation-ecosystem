'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Research } from '@innovation/shared-types';
import { BookOpen, ArrowLeft, User } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ResearcherPortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const [researchList, setResearchList] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/research?authorUsername=${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setResearchList(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-2 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900">Researcher Portfolio: @{username}</h1>
        <p className="text-xs text-gray-500">
          Published papers, patents, and datasets authored by @{username}.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          Loading portfolio...
        </div>
      ) : researchList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No publications found for @{username}</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {researchList.map(res => (
            <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                  {res.publicationType}
                </span>
                <span className="text-xs text-gray-500 font-semibold">{res.citations} Citations</span>
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">
                <Link href={`/research/${res.id}`} className="hover:text-green-700 transition">
                  {res.title}
                </Link>
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">{res.abstract}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
