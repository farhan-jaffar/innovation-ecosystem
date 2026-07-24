'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Shield, GraduationCap, Building2, UserCheck, ArrowRight, Check } from 'lucide-react';

export default function OnboardingWizardPage() {
  const params = useParams();
  const router = useRouter();
  const stepNum = parseInt((params.step as string) || '1', 10);
  const { registerUser } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.INDIVIDUAL);

  // Form states
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Step 3 Profile fields
  const [orgName, setOrgName] = useState('');
  const [ministry, setMinistry] = useState('');
  const [uniName, setUniName] = useState('');
  const [city, setCity] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stepNum === 1) {
      router.push('/onboarding/2');
    } else if (stepNum === 2) {
      router.push('/onboarding/3');
    } else {
      setError('');
      setSubmitting(true);

      let profileData: any = {};
      if (selectedRole === UserRole.GOVERNMENT) {
        profileData = { organizationName: orgName || username, ministry: ministry || 'Ministry Dept', jurisdiction: 'Pakistan' };
      } else if (selectedRole === UserRole.UNIVERSITY) {
        profileData = { name: uniName || username, city: city || 'Islamabad', country: 'Pakistan' };
      } else if (selectedRole === UserRole.COMPANY) {
        profileData = { name: companyName || username, industry: industry || 'Technology', size: '11-50 Employees' };
      } else if (selectedRole === UserRole.INDIVIDUAL) {
        profileData = { firstName: firstName || username, lastName, headline: headline || 'Researcher & Innovator' };
      }

      const res = await registerUser({
        email,
        username,
        password,
        role: selectedRole,
        profileData
      });

      setSubmitting(false);
      if (res.success) {
        router.push(`/profile/${username}`);
      } else {
        setError(res.error || 'Onboarding failed.');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 space-y-8">
      {/* Step Header Indicator */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Ecosystem Onboarding Wizard</h1>
        <p className="text-sm text-gray-500">
          Step {stepNum} of 3 —{' '}
          {stepNum === 1 && 'Select Stakeholder Persona'}
          {stepNum === 2 && 'Security Credentials'}
          {stepNum === 3 && 'Profile Setup'}
        </p>

        {/* Green Step Progress Bar */}
        <div className="flex gap-2 max-w-xs mx-auto pt-2">
          <div className={`h-1.5 flex-1 rounded-full ${stepNum >= 1 ? 'bg-green-600' : 'bg-gray-200'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${stepNum >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${stepNum >= 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {stepNum === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedRole(UserRole.GOVERNMENT)}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition flex flex-col justify-between space-y-3 ${
                selectedRole === UserRole.GOVERNMENT ? 'border-green-600 bg-green-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                {selectedRole === UserRole.GOVERNMENT && (
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Government</h3>
                <p className="text-xs text-gray-500 mt-1">Ministries & Public Research Councils</p>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole(UserRole.UNIVERSITY)}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition flex flex-col justify-between space-y-3 ${
                selectedRole === UserRole.UNIVERSITY ? 'border-green-600 bg-green-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                {selectedRole === UserRole.UNIVERSITY && (
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">University</h3>
                <p className="text-xs text-gray-500 mt-1">HEC Recognized Institutes & Labs</p>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole(UserRole.COMPANY)}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition flex flex-col justify-between space-y-3 ${
                selectedRole === UserRole.COMPANY ? 'border-green-600 bg-green-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                {selectedRole === UserRole.COMPANY && (
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Company / Startup</h3>
                <p className="text-xs text-gray-500 mt-1">Tech Enterprises & Startups</p>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole(UserRole.INDIVIDUAL)}
              className={`cursor-pointer p-5 rounded-2xl border-2 transition flex flex-col justify-between space-y-3 ${
                selectedRole === UserRole.INDIVIDUAL ? 'border-green-600 bg-green-50/50 shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-900 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                {selectedRole === UserRole.INDIVIDUAL && (
                  <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Individual</h3>
                <p className="text-xs text-gray-500 mt-1">Student, Researcher or Engineer</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/onboarding/2')}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            Next: Security Credentials <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {stepNum === 2 && (
        <form onSubmit={handleStepSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Ecosystem Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@domain.pk"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
              placeholder="unique_handle"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Account Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/onboarding/1')}
              className="w-1/3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
            >
              Next: Role Profile Setup
            </button>
          </div>
        </form>
      )}

      {stepNum === 3 && (
        <form onSubmit={handleStepSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
          {selectedRole === UserRole.GOVERNMENT && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Ministry / Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={e => setOrgName(e.target.value)}
                  placeholder="Ministry of IT & Telecom"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Ministry Department</label>
                <input
                  type="text"
                  value={ministry}
                  onChange={e => setMinistry(e.target.value)}
                  placeholder="National AI Directorate"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>
          )}

          {selectedRole === UserRole.UNIVERSITY && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">University Name</label>
                <input
                  type="text"
                  value={uniName}
                  onChange={e => setUniName(e.target.value)}
                  placeholder="FAST National University"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Campus City</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Islamabad"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>
          )}

          {selectedRole === UserRole.COMPANY && (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Systems Limited"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Industry / Domain</label>
                <input
                  type="text"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  placeholder="Enterprise Software & AI"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>
          )}

          {selectedRole === UserRole.INDIVIDUAL && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Dr. Ali"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Raza"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  placeholder="Assoc Professor & AI Researcher"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/onboarding/2')}
              className="w-1/3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition shadow-sm"
            >
              {submitting ? 'Creating Profile...' : 'Complete Onboarding'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
