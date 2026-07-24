'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Save, CheckCircle2 } from 'lucide-react';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, updateProfileData } = useAuth();

  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.profile) {
      setFormData(user.profile);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to edit your profile settings.
      </div>
    );
  }

  const role = user.role;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const res = await updateProfileData(formData);
    setSaving(false);

    if (res.success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => {
        router.push(`/profile/${user.username}`);
      }, 1200);
    } else {
      setError(res.error || 'Failed to save changes.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Ecosystem Profile Settings</h1>
        <p className="text-xs text-gray-500">Update your verified organizational or personal information</p>
      </div>

      {message && (
        <div className="p-4 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" /> {message}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
        {/* Government Profile Form */}
        {role === UserRole.GOVERNMENT && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Government Ministry / Department Details</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Organization Name</label>
              <input
                type="text"
                value={formData.organizationName || ''}
                onChange={e => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Ministry / Department</label>
              <input
                type="text"
                value={formData.ministry || ''}
                onChange={e => setFormData({ ...formData, ministry: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Jurisdiction</label>
              <input
                type="text"
                value={formData.jurisdiction || ''}
                onChange={e => setFormData({ ...formData, jurisdiction: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>
          </div>
        )}

        {/* University Profile Form */}
        {role === UserRole.UNIVERSITY && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">University / Institute Details</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">University Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Ranking / Accreditation</label>
                <input
                  type="text"
                  value={formData.ranking || ''}
                  onChange={e => setFormData({ ...formData, ranking: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Company Profile Form */}
        {role === UserRole.COMPANY && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Company / Startup Profile Details</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Company Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Industry</label>
              <input
                type="text"
                value={formData.industry || ''}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Company Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>
          </div>
        )}

        {/* Individual Profile Form */}
        {role === UserRole.INDIVIDUAL && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">Individual Profile Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Headline</label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={e => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Biography</label>
              <textarea
                rows={3}
                value={formData.bio || ''}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving Changes...' : 'Save Profile Settings'}
        </button>
      </form>
    </div>
  );
}
