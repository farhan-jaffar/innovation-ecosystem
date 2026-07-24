'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (e) {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-gray-900">Reset Password</h1>
        <p className="text-xs text-gray-500">Enter your registered email address to receive recovery instructions.</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Reset link sent!</h3>
          <p className="text-xs text-gray-600">Check your inbox at <strong>{email}</strong> for instructions.</p>
          <Link
            href="/auth/login"
            className="inline-block mt-2 px-4 py-2 text-xs font-semibold text-white bg-green-600 rounded-xl"
          >
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Account Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@domain.pk"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <Link href="/auth/login" className="flex items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-3 h-3" /> Back to Login
          </Link>
        </form>
      )}
    </div>
  );
}
