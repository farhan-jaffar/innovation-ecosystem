'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { KeyRound, Trash2, CheckCircle2, Image as ImageIcon, ShieldAlert } from 'lucide-react';

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, changePassword, deleteAccount, uploadAvatar } = useAuth();

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passErr, setPassErr] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  // Avatar fields
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarMsg, setAvatarMsg] = useState('');
  const [avatarErr, setAvatarErr] = useState('');

  // Delete account fields
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteErr, setDeleteErr] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-12 text-center text-gray-500">
        Please sign in to manage your account settings.
      </div>
    );
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMsg('');
    setPassErr('');
    setPassLoading(true);

    const res = await changePassword(currentPassword, newPassword);
    setPassLoading(false);

    if (res.success) {
      setPassMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setPassErr(res.error || 'Failed to change password.');
    }
  };

  const handleAvatarUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAvatarMsg('');
    setAvatarErr('');

    const res = await uploadAvatar(avatarUrl);
    if (res.success) {
      setAvatarMsg('Avatar image updated successfully!');
      setAvatarUrl('');
    } else {
      setAvatarErr(res.error || 'Failed to update avatar.');
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteErr('');
    const res = await deleteAccount();
    if (res.success) {
      router.push('/');
    } else {
      setDeleteErr(res.error || 'Failed to delete account.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Account Security & Settings</h1>
        <p className="text-xs text-gray-500">Manage security credentials, avatar assets, and account lifecycle</p>
      </div>

      {/* Avatar Image Settings */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-green-600" /> Organization Logo / Profile Avatar
        </h2>

        {avatarMsg && (
          <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" /> {avatarMsg}
          </div>
        )}

        {avatarErr && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
            {avatarErr}
          </div>
        )}

        <form onSubmit={handleAvatarUpdate} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Image URL (Cloudflare R2 / Unsplash / Direct link)</label>
            <input
              type="url"
              required
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-xl transition shadow-sm"
          >
            Update Avatar
          </button>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-green-600" /> Change Password
        </h2>

        {passMsg && (
          <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-xl border border-green-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" /> {passMsg}
          </div>
        )}

        {passErr && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
            {passErr}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600/30 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={passLoading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs rounded-xl transition shadow-sm"
          >
            {passLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-red-50/50 p-6 sm:p-8 rounded-3xl border border-red-200 space-y-4">
        <h2 className="text-base font-bold text-red-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" /> Danger Zone: Delete Account
        </h2>
        <p className="text-xs text-red-700">
          Once deleted, your ecosystem profile, linked research, projects, and applications will be permanently removed.
        </p>

        {deleteErr && (
          <div className="p-3 bg-red-100 text-red-800 text-xs font-semibold rounded-xl border border-red-300">
            {deleteErr}
          </div>
        )}

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        ) : (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-red-900">Are you completely sure you want to permanently delete @{user.username}?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                Yes, Delete My Account
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
