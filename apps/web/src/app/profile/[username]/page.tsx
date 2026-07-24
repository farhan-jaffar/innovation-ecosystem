'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Shield, GraduationCap, Building2, UserCheck, CheckCircle2, Globe, Mail, MapPin, Edit3, Github, Linkedin, Award, BookOpen, Layers } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const { user: currentUser } = useAuth();

  const [profileUser, setProfileUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const isOwnProfile = currentUser && currentUser.username.toLowerCase() === username.toLowerCase();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProfileUser(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Loading stakeholder profile...
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Profile Not Found</h2>
        <p className="text-sm text-gray-500">No registered ecosystem stakeholder exists for username @{username}.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-green-600 text-white font-semibold text-xs rounded-xl">
          Return Home
        </Link>
      </div>
    );
  }

  const role = profileUser.role;
  const prof = profileUser.profile || {};
  const completeness = profileUser.completeness || 85;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-green-100 border border-green-200 text-green-800 text-2xl font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
              {(prof.name || prof.organizationName || prof.firstName || profileUser.username).substring(0, 2).toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  {prof.name || prof.organizationName || `${prof.firstName || ''} ${prof.lastName || ''}`.trim() || profileUser.username}
                </h1>
                
                {prof.verificationStatus === 'VERIFIED' && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Verified
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 font-medium">
                {prof.headline || prof.ministry || prof.industry || prof.ranking || 'Innovation Ecosystem Partner'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                {prof.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-green-600" /> {prof.city}, {prof.country || 'Pakistan'}
                  </span>
                )}
                {prof.website && (
                  <a href={prof.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-green-600 hover:underline">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
                <span className="text-gray-400">@{profileUser.username}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {isOwnProfile && (
              <Link
                href="/settings/profile"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </Link>
            )}

            {/* Role Badge */}
            {role === UserRole.GOVERNMENT && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> Government Entity
              </span>
            )}
            {role === UserRole.UNIVERSITY && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 border border-green-200 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-green-600" /> University Profile
              </span>
            )}
            {role === UserRole.COMPANY && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-teal-600" /> Company / Startup
              </span>
            )}
            {role === UserRole.INDIVIDUAL && (
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-lime-100 text-lime-900 border border-lime-200 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-lime-700" /> Individual Innovator
              </span>
            )}
          </div>
        </div>

        {/* Profile Completeness Bar */}
        <div className="bg-green-50/70 border border-green-200 p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-gray-800">Ecosystem Profile Completeness</span>
            <span className="font-bold text-green-700">{completeness}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full transition-all duration-500" style={{ width: `${completeness}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Shade of green active tab) */}
      <div className="flex border-b border-gray-200 bg-white rounded-xl px-2 pt-2 shadow-sm gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
            activeTab === 'overview' ? 'tab-active' : 'text-gray-600 hover:text-green-600'
          }`}
        >
          Overview & Focus
        </button>

        {role === UserRole.GOVERNMENT && (
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
              activeTab === 'challenges' ? 'tab-active' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            National Challenges & Grants
          </button>
        )}

        {role === UserRole.UNIVERSITY && (
          <button
            onClick={() => setActiveTab('research')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
              activeTab === 'research' ? 'tab-active' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Research Publications & Labs
          </button>
        )}

        {role === UserRole.COMPANY && (
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
              activeTab === 'tech' ? 'tab-active' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Tech Stack & R&D Projects
          </button>
        )}

        {role === UserRole.INDIVIDUAL && (
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition ${
              activeTab === 'experience' ? 'tab-active' : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Education & Experience
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {prof.bio && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900">About / Biography</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{prof.bio}</p>
              </div>
            )}

            {prof.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900">Organization Overview</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{prof.description}</p>
              </div>
            )}

            {/* National Focus Areas (Government) */}
            {prof.nationalFocusAreas && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-green-600" /> National Innovation Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prof.nationalFocusAreas.map((area: string, idx: number) => (
                    <span key={idx} className="badge-green px-3 py-1 rounded-full text-xs font-semibold">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* University Departments */}
            {prof.departments && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-green-600" /> Academic Departments & Faculties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prof.departments.map((dept: string, idx: number) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 border border-gray-200 px-3 py-1 rounded-xl text-xs font-medium">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Individual Skills */}
            {prof.skills && prof.skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-green-600" /> Verified Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prof.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="badge-green px-3 py-1 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Posted National Challenges & Grants</h3>
            <div className="bg-green-50 p-4 rounded-2xl border border-green-200 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-200 text-green-800">OPEN GRANT</span>
              <h4 className="font-bold text-gray-900 text-base">National AI AgriTech Crop Disease Detection System</h4>
              <p className="text-xs text-gray-600">Grant Budget: PKR 25,000,000 | Target: HEC Universities & AI Startups</p>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Featured Research & Labs</h3>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">PUBLICATION</span>
              <h4 className="font-bold text-gray-900 text-base">Autonomous Drone Navigation in GPS-Denied Agricultural Fields</h4>
              <p className="text-xs text-gray-600">Authors: Dr. Ali Raza et al. | Journal of AI & Robotics 2026</p>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Enterprise Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {(prof.techStack || []).map((t: string, i: number) => (
                <span key={i} className="badge-green px-3 py-1 rounded-full text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {prof.education && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900">Education Background</h3>
                {prof.education.map((edu: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="font-bold text-xs text-gray-900">{edu.degree} — {edu.fieldOfStudy}</p>
                    <p className="text-xs text-gray-500">{edu.institution} ({edu.startYear} - {edu.endYear || 'Present'})</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
