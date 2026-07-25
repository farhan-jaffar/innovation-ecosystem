'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, GraduationCap, Building2, UserCheck, ArrowRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/all')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfiles(data.data || []);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-50/70 via-white to-white border border-green-100 p-8 sm:p-12 text-center max-w-5xl mx-auto shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-6 border border-green-200">
          <Sparkles className="w-4 h-4 text-green-600" />
          <span>Pakistan's National Innovation Ecosystem Platform</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Connecting <span className="text-green-600">Government</span>, <span className="text-green-600">Universities</span>, <span className="text-green-600">Companies</span> & <span className="text-green-600">Talent</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          The central innovation pipeline for Pakistan. Eliminate fragmentation. Fund national challenges, publish research, discover top talent, and spin off research into startups.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {user ? (
            <Link
              href={`/profile/${user.username}`}
              className="px-6 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-600/30 transition flex items-center gap-2"
            >
              Go to My Profile <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                href="/auth/register"
                className="px-6 py-3 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-600/30 transition flex items-center gap-2"
              >
                Join Ecosystem <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-3 text-sm font-semibold text-green-800 bg-green-100 hover:bg-green-200 rounded-xl border border-green-300 transition"
              >
                Explore Demo Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* 4 Stakeholder Pillars */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Four Pillars of Innovation</h2>
          <p className="text-sm text-gray-500 mt-1">Select a profile type to onboard into the ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Government */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">Government</h3>
              <p className="text-xs text-gray-500 mt-1">Ministries, Municipalities & Research Councils</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Post National Challenges & Grants
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Track Funded Project Progress
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Discover Top Researchers & Startups
              </li>
            </ul>
          </div>

          {/* Universities */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">Universities</h3>
              <p className="text-xs text-gray-500 mt-1">HEC Accredited Institutes & Labs</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Publish Research Papers & Patents
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Showcase Student Talent & Incubators
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Industry R&D Collaboration
              </li>
            </ul>
          </div>

          {/* Companies */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">Companies & Startups</h3>
              <p className="text-xs text-gray-500 mt-1">Tech Enterprises & Fast-growing Startups</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Post Technical R&D Challenges
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Sponsor University Research
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Direct Talent Matching
              </li>
            </ul>
          </div>

          {/* Individuals */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-md transition group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">Individuals</h3>
              <p className="text-xs text-gray-500 mt-1">Students, Researchers & Engineers</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Centralized Portfolio & GitHub
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Apply for Grants & National Projects
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                Receive Smart AI Recommendations
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Ecosystem Stakeholders */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-green-600 fill-green-600" />
              Verified Ecosystem Stakeholders
            </h2>
            <p className="text-xs text-gray-500">Live profiles currently active in the innovation operating system</p>
          </div>
          <Link href="/explore" className="text-xs font-semibold text-green-700 hover:underline">
            View All ({profiles.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map(p => {
            const roleName = p.role;
            const profile = p.profile || {};
            const title = profile.name || profile.organizationName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || p.username;
            const subtitle = profile.ministry || profile.industry || profile.headline || profile.ranking || 'Ecosystem Stakeholder';

            return (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 font-bold flex items-center justify-center text-lg border border-green-200">
                      {title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{title}</h3>
                      <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-100 text-green-800">
                    {roleName}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Profile Completeness:</span>
                    <span className="font-semibold text-green-700">{p.completeness || 85}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${p.completeness || 85}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400">@{p.username}</span>
                  <Link
                    href={`/profile/${p.username}`}
                    className="font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    View Verified Profile <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
