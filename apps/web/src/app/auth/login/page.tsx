'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, GraduationCap, Building2, UserCheck, KeyRound, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setError('');
    setLoading(true);
    setEmail(demoEmail);
    setPassword('password123');

    const res = await login(demoEmail, 'password123');
    setLoading(false);
    if (res.success) {
      router.push('/');
    } else {
      setError(res.error || 'Demo login failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-gray-900">Sign In to InnovatePK</h1>
        <p className="text-xs text-gray-500">Access your Innovation Ecosystem Dashboard</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Demo Stakeholder 1-Click Login Bar */}
      <div className="bg-green-50/70 border border-green-200 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-green-800">
          <Sparkles className="w-4 h-4 text-green-600" />
          <span>Demo 1-Click Persona Login:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('moitt@gov.pk')}
            className="px-3 py-2 text-xs font-semibold bg-white hover:bg-green-100 text-gray-800 rounded-xl border border-green-200 flex items-center gap-1.5 transition text-left"
          >
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="truncate">Ministry of IT</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('research@fast.edu.pk')}
            className="px-3 py-2 text-xs font-semibold bg-white hover:bg-green-100 text-gray-800 rounded-xl border border-green-200 flex items-center gap-1.5 transition text-left"
          >
            <GraduationCap className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="truncate">FAST University</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('careers@systemsltd.com')}
            className="px-3 py-2 text-xs font-semibold bg-white hover:bg-green-100 text-gray-800 rounded-xl border border-green-200 flex items-center gap-1.5 transition text-left"
          >
            <Building2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span className="truncate">Systems Ltd</span>
          </button>

          <button
            type="button"
            onClick={() => handleDemoLogin('ali.raza@fast.edu.pk')}
            className="px-3 py-2 text-xs font-semibold bg-white hover:bg-green-100 text-gray-800 rounded-xl border border-green-200 flex items-center gap-1.5 transition text-left"
          >
            <UserCheck className="w-4 h-4 text-lime-700 flex-shrink-0" />
            <span className="truncate">Dr. Ali Raza</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@organization.pk"
            className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <Link href="/auth/forgot-password" className="text-xs text-green-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500">
        Don't have an ecosystem profile?{' '}
        <Link href="/auth/register" className="text-green-600 font-semibold hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
}
