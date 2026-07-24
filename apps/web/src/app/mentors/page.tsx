'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { MentorProfile } from '@innovation/shared-types';
import { Users, Search, Award, MessageSquare, CheckCircle2, Calendar, Star } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MentorDirectoryPage() {
  const { user, token } = useAuth();
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Mentorship request modal
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [startupId, setStartupId] = useState('start-001');
  const [message, setMessage] = useState('');
  const [requesting, setRequesting] = useState(false);
  const [reqMsg, setReqMsg] = useState('');

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);

      const res = await fetch(`${API_BASE}/mentors?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setMentors(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch mentors', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMentors();
  };

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedMentor) return;

    setReqMsg('');
    setRequesting(true);

    try {
      const res = await fetch(`${API_BASE}/mentorship/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          startupId,
          mentorId: selectedMentor.id,
          message
        })
      });

      const data = await res.json();
      setRequesting(false);

      if (data.success) {
        setReqMsg('Mentorship request sent successfully!');
        setTimeout(() => setSelectedMentor(null), 2000);
      }
    } catch (err) {
      setRequesting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white p-8 rounded-3xl border border-green-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
          <Users className="w-3.5 h-3.5" /> Verified Industry Mentors
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Pakistan Innovation Mentorship Network</h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Connect with seasoned CTOs, VPs of AI, product leaders, and serial entrepreneurs for 1-on-1 guidance on scaling your startup.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search mentor by name, company, expertise (e.g. AI Product Scaling, Zainab Khan)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-2xl transition shadow-sm flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" /> Search Mentors
          </button>
        </form>
      </div>

      {/* Mentors Grid */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 space-y-3">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading mentor directory...</p>
        </div>
      ) : mentors.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
          <Users className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No mentors match your search</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map(m => (
            <div
              key={m.id}
              className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-green-400 shadow-sm transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-600 text-white font-extrabold flex items-center justify-center text-base shadow-sm">
                    {m.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base">{m.fullName}</h3>
                    <p className="text-xs font-semibold text-green-700">{m.title} — {m.company}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {m.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.expertise.map(exp => (
                    <span key={exp} className="px-2.5 py-0.5 bg-green-50 text-green-800 text-[10px] font-bold rounded-md border border-green-200">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  Availability: <strong className="text-gray-800">{m.availability}</strong>
                </span>

                {user ? (
                  <button
                    onClick={() => setSelectedMentor(m)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Request Session
                  </button>
                ) : (
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentorship Request Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Request Mentorship with {selectedMentor.fullName}</h2>
              <button onClick={() => setSelectedMentor(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {reqMsg && (
              <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {reqMsg}
              </div>
            )}

            <form onSubmit={handleSendRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Select Startup *</label>
                <select
                  value={startupId}
                  onChange={e => setStartupId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                >
                  <option value="start-001">CropVision AI (MVP Stage)</option>
                  <option value="start-002">SolarGrid Dynamics (Prototype Stage)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Message to Mentor *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Introduce your startup, your current challenges, and specific topics you'd like mentorship on..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="w-1/3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requesting}
                  className="w-2/3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  {requesting ? 'Sending Request...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
