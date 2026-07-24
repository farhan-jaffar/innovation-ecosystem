'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Research } from '@innovation/shared-types';
import {
  BookOpen,
  Download,
  Eye,
  Award,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  Building2,
  GraduationCap,
  Send,
  Share2,
  FileText
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ResearchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user, token } = useAuth();

  const [research, setResearch] = useState<Research | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCollabModal, setShowCollabModal] = useState(false);

  // Inquiry modal state
  const [inquiryType, setInquiryType] = useState<'COMMERCIALIZATION' | 'JOINT_R_AND_D' | 'GOVT_INTEREST' | 'FUNDING'>('COMMERCIALIZATION');
  const [message, setMessage] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquiryErr, setInquiryErr] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/research/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setResearch(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDownload = () => {
    if (!research) return;
    fetch(`${API_BASE}/research/${id}/download`, { method: 'POST' }).catch(() => {});
    if (research.pdfUrl) {
      window.open(research.pdfUrl, '_blank');
    } else {
      alert('PDF document available upon request from author.');
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setInquiryMsg('');
    setInquiryErr('');
    setSubmittingInquiry(true);

    try {
      const res = await fetch(`${API_BASE}/research/${id}/collab`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          inquiryType,
          message,
          contactEmail: contactEmail || user?.email
        })
      });

      const data = await res.json();
      setSubmittingInquiry(false);

      if (data.success) {
        setInquiryMsg('Collaboration request sent directly to lead authors!');
        setTimeout(() => setShowCollabModal(false), 2000);
      } else {
        setInquiryErr(data.error || 'Failed to send inquiry.');
      }
    } catch (err: any) {
      setSubmittingInquiry(false);
      setInquiryErr('Server communication error.');
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading research paper...
      </div>
    );
  }

  if (!research) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500 space-y-3">
        <h2 className="text-xl font-bold text-gray-900">Research Publication Not Found</h2>
        <Link href="/research" className="text-xs text-green-600 font-semibold hover:underline">
          Return to Research Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Research Hub
      </button>

      {/* Main Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
              {research.publicationType}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
              {research.domain}
            </span>
            <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full border border-blue-200">
              {research.license}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {research.title}
          </h1>

          <p className="text-sm font-semibold text-gray-800">
            Authors: <span className="text-green-700">{research.authors.join(', ')}</span>
          </p>

          <p className="text-xs text-gray-500 font-medium">
            Affiliations: {research.affiliations.join(' | ')}
          </p>
        </div>

        {/* Action Bar & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span><strong className="text-gray-900">{research.citations}</strong> Citations</span>
            <span><strong className="text-gray-900">{research.downloads}</strong> Downloads</span>
            <span><strong className="text-gray-900">{research.views}</strong> Views</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>

            {user && (
              <button
                onClick={() => setShowCollabModal(true)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Commercialize / Express Interest
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Abstract */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Abstract</h2>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {research.abstract}
        </div>

        {research.doi && (
          <div className="pt-2">
            <p className="text-xs font-semibold text-gray-500">
              Digital Object Identifier (DOI):{' '}
              <a href={research.externalUrl || '#'} target="_blank" rel="noreferrer" className="text-green-600 underline font-mono">
                {research.doi}
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Keywords */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-3 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Research Index Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {research.keywords.map(kw => (
            <span key={kw} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-xl">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Commercialization & Collaboration Inquiry Modal */}
      {showCollabModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Commercialization Inquiry</h2>
              <button onClick={() => setShowCollabModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            {inquiryMsg && (
              <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {inquiryMsg}
              </div>
            )}

            {inquiryErr && (
              <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
                {inquiryErr}
              </div>
            )}

            <form onSubmit={handleSendInquiry} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Inquiry Purpose *</label>
                <select
                  value={inquiryType}
                  onChange={e => setInquiryType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                >
                  <option value="COMMERCIALIZATION">Industry IP Licensing & Commercialization</option>
                  <option value="JOINT_R_AND_D">Joint Industry-University R&D</option>
                  <option value="GOVT_INTEREST">Government Policy / Public Sector Interest</option>
                  <option value="FUNDING">Research Grant Funding Offer</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Message to Authors *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Detail your organization's interest, proposed collaboration terms, or funding opportunity..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Official Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  placeholder={user?.email || 'contact@organization.pk'}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCollabModal(false)}
                  className="w-1/3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="w-2/3 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  {submittingInquiry ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
