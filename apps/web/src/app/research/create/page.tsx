'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PublicationType, AccessType } from '@innovation/shared-types';
import { ArrowLeft, BookOpen, UploadCloud, CheckCircle2 } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const DOMAINS = ['AgriTech', 'CleanEnergy', 'Robotics & AI', 'FinTech', 'HealthTech', 'EdTech', 'CyberSecurity'];

export default function PublishResearchPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [authorsInput, setAuthorsInput] = useState('');
  const [domain, setDomain] = useState('AgriTech');
  const [publicationType, setPublicationType] = useState<PublicationType>(PublicationType.PAPER);
  const [journalName, setJournalName] = useState('');
  const [doi, setDoi] = useState('');
  const [license, setLicense] = useState('CC BY 4.0');
  const [accessType, setAccessType] = useState<AccessType>(AccessType.OPEN);
  const [collaborationOpen, setCollaborationOpen] = useState(true);
  const [fundingRequest, setFundingRequest] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to publish research or register patents on the Innovation Repository.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setError('');
    setSubmitting(true);

    const authors = authorsInput.split(',').map(a => a.trim()).filter(Boolean);
    const keywords = keywordsInput.split(',').map(k => k.trim()).filter(Boolean);

    try {
      const res = await fetch(`${API_BASE}/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          abstract,
          pdfUrl,
          authors,
          domain,
          publicationType,
          journalName,
          doi,
          license,
          accessType,
          collaborationOpen,
          fundingRequest,
          fundingAmount: fundingAmount ? parseFloat(fundingAmount) : undefined,
          keywords
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success && data.data) {
        router.push(`/research/${data.data.id}`);
      } else {
        setError(data.error || 'Failed to publish research.');
      }
    } catch (err: any) {
      setSubmitting(false);
      setError('Network error connecting to API server.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Research Hub
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Publish Research, Patent or Dataset</h1>
        <p className="text-xs text-gray-500 mt-1">
          Deposit academic papers, IP patents, or datasets into Pakistan’s central innovation repository.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Publication Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Deep Learning Framework for Hyperspectral Rust Detection in Wheat Crops"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* Publication Type & Domain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Publication Type *</label>
            <select
              value={publicationType}
              onChange={e => setPublicationType(e.target.value as PublicationType)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              <option value={PublicationType.PAPER}>Peer-Reviewed Paper</option>
              <option value={PublicationType.PATENT}>Patent / IP Filing</option>
              <option value={PublicationType.DATASET}>Open Dataset</option>
              <option value={PublicationType.PROTOTYPE}>Working Prototype</option>
              <option value={PublicationType.IDEA}>Research Concept / Idea</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Domain *</label>
            <select
              value={domain}
              onChange={e => setDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            >
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Abstract */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Abstract & Summary *</label>
          <textarea
            required
            rows={5}
            value={abstract}
            onChange={e => setAbstract(e.target.value)}
            placeholder="Summarize the core research methodology, findings, datasets, and commercial potential..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
          />
        </div>

        {/* PDF Link & DOI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">PDF / Document URL</label>
            <input
              type="url"
              value={pdfUrl}
              onChange={e => setPdfUrl(e.target.value)}
              placeholder="https://nu.edu.pk/papers/sample.pdf"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">DOI / Patent Reference ID</label>
            <input
              type="text"
              value={doi}
              onChange={e => setDoi(e.target.value)}
              placeholder="e.g. 10.1109/TAGRI.2026.984120"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Authors & Journal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Authors (Comma Separated)</label>
            <input
              type="text"
              value={authorsInput}
              onChange={e => setAuthorsInput(e.target.value)}
              placeholder="Dr. Ali Raza, Prof. Tariq Mahmood"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Journal / Conference Name</label>
            <input
              type="text"
              value={journalName}
              onChange={e => setJournalName(e.target.value)}
              placeholder="IEEE Transactions on AgriTech"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-600/30"
            />
          </div>
        </div>

        {/* Funding Request Toggle */}
        <div className="p-4 bg-green-50/60 rounded-2xl border border-green-200 space-y-3">
          <label className="flex items-center gap-2 font-bold text-green-900 text-xs cursor-pointer">
            <input
              type="checkbox"
              checked={fundingRequest}
              onChange={e => setFundingRequest(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            Soliciting Commercialization / Grant Funding from Government & Industry
          </label>

          {fundingRequest && (
            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-gray-700">Required Grant Amount (PKR)</label>
              <input
                type="number"
                value={fundingAmount}
                onChange={e => setFundingAmount(e.target.value)}
                placeholder="e.g. 2500000"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-600/30 bg-white"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-sm"
        >
          {submitting ? 'Publishing...' : 'Publish to Research Repository'}
        </button>
      </form>
    </div>
  );
}
