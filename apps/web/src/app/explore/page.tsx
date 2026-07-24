'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Shield, GraduationCap, Building2, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ExplorePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/all')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProfiles(data.data || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = profiles.filter(p => {
    const roleMatch = selectedRole === 'ALL' || p.role === selectedRole;
    const searchMatch = !search ||
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      (p.profile?.name && p.profile.name.toLowerCase().includes(search.toLowerCase())) ||
      (p.profile?.organizationName && p.profile.organizationName.toLowerCase().includes(search.toLowerCase())) ||
      (p.profile?.firstName && p.profile.firstName.toLowerCase().includes(search.toLowerCase()));

    return roleMatch && searchMatch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Ecosystem Stakeholder Directory</h1>
        <p className="text-sm text-gray-500 mt-1">Explore verified government ministries, university labs, tech companies, and research scholars</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or keyword..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['ALL', 'GOVERNMENT', 'UNIVERSITY', 'COMPANY', 'INDIVIDUAL'].map(r => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition ${
                selectedRole === r
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {r === 'ALL' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Directory List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading ecosystem profiles...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center text-gray-500 border border-gray-200">
          No profiles matched your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(p => {
            const roleName = p.role;
            const prof = p.profile || {};
            const title = prof.name || prof.organizationName || `${prof.firstName || ''} ${prof.lastName || ''}`.trim() || p.username;
            const subtitle = prof.ministry || prof.industry || prof.headline || prof.ranking || 'Ecosystem Stakeholder';

            return (
              <div key={p.id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition flex flex-col justify-between space-y-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 font-bold flex items-center justify-center text-base border border-green-200">
                      {title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{title}</h3>
                      <p className="text-xs text-gray-500">{subtitle}</p>
                    </div>
                  </div>
                  
                  {roleName === 'GOVERNMENT' && <Shield className="w-5 h-5 text-emerald-600" />}
                  {roleName === 'UNIVERSITY' && <GraduationCap className="w-5 h-5 text-green-600" />}
                  {roleName === 'COMPANY' && <Building2 className="w-5 h-5 text-teal-600" />}
                  {roleName === 'INDIVIDUAL' && <UserCheck className="w-5 h-5 text-lime-700" />}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Completeness Score</span>
                    <span className="font-semibold text-green-700">{p.completeness || 85}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: `${p.completeness || 85}%` }} />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400">@{p.username}</span>
                  <Link
                    href={`/profile/${p.username}`}
                    className="font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    View Full Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
