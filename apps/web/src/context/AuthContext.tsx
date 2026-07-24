'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export enum UserRole {
  GOVERNMENT = 'GOVERNMENT',
  UNIVERSITY = 'UNIVERSITY',
  COMPANY = 'COMPANY',
  INDIVIDUAL = 'INDIVIDUAL',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  status: string;
  emailVerified: boolean;
  profile?: any;
  completeness?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  registerUser: (data: any) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfileData: (data: any) => Promise<{ success: boolean; message?: string; error?: string }>;
  changePassword: (curPass: string, newPass: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; message?: string; error?: string }>;
  uploadAvatar: (avatarUrl: string) => Promise<{ success: boolean; message?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();

      if (data.success && data.data) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Login failed.' };
      }
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to auth service.' };
    }
  };

  const registerUser = async (payload: any) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.data) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Registration failed.' };
      }
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to server.' };
    }
  };

  const logout = () => {
    if (token) {
      fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateProfileData = async (profileData: any) => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ profileData })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Update failed.' };
      }
    } catch (err: any) {
      return { success: false, error: 'Server communication failed.' };
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      return { success: data.success, message: data.message, error: data.error };
    } catch (err: any) {
      return { success: false, error: 'Server communication failed.' };
    }
  };

  const deleteAccount = async () => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        logout();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Delete failed.' };
      }
    } catch (err: any) {
      return { success: false, error: 'Server communication failed.' };
    }
  };

  const uploadAvatar = async (avatarUrl: string) => {
    if (!token) return { success: false, error: 'Not authenticated' };
    try {
      const res = await fetch(`${API_BASE}/users/me/avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ avatarUrl })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || 'Avatar upload failed.' };
      }
    } catch (err: any) {
      return { success: false, error: 'Server communication failed.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        registerUser,
        logout,
        refreshProfile,
        updateProfileData,
        changePassword,
        deleteAccount,
        uploadAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
