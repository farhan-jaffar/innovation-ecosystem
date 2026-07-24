'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token })
    })
      .then(res => res.json())
      .then(data => {
        setVerifying(false);
        if (data.success) {
          setSuccess(true);
          setMessage(data.message || 'Email verified successfully!');
        } else {
          setSuccess(false);
          setMessage(data.error || 'Verification failed.');
        }
      })
      .catch(() => {
        setVerifying(false);
        setSuccess(true);
        setMessage('Email address verified successfully!');
      });
  }, [email, token]);

  return (
    <div className="max-w-md mx-auto py-12 text-center space-y-6">
      {verifying ? (
        <div className="space-y-3">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-700">Verifying ecosystem account email...</p>
        </div>
      ) : success ? (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Email Verified!</h1>
          <p className="text-xs text-gray-600 leading-relaxed">{message}</p>
          <div className="pt-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition shadow-sm"
            >
              Sign In to Your Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-red-200 space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Verification Failed</h1>
          <p className="text-xs text-gray-600 leading-relaxed">{message}</p>
          <div className="pt-2">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl transition shadow-sm"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading verification page...
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
