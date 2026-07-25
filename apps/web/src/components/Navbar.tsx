'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  Building2,
  GraduationCap,
  UserCheck,
  Sparkles,
  LogOut,
  Settings,
  Menu,
  X,
  KeyRound,
  BookOpen,
  Briefcase,
  DollarSign,
  Rocket,
  MessageSquare,
  Search,
  ChevronDown,
  Globe,
  FileText,
  Bookmark
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'GOVERNMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Government
          </span>
        );
      case 'UNIVERSITY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
            <GraduationCap className="w-3.5 h-3.5 text-green-600" /> University
          </span>
        );
      case 'COMPANY':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 border border-teal-200">
            <Building2 className="w-3.5 h-3.5 text-teal-600" /> Company / Startup
          </span>
        );
      case 'INDIVIDUAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-lime-100 text-lime-900 border border-lime-200">
            <UserCheck className="w-3.5 h-3.5 text-lime-700" /> Individual
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold shadow-md shadow-green-600/20 group-hover:bg-green-700 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-1">
                Innovate<span className="text-green-600">PK</span>
              </span>
              <p className="text-[10px] text-gray-500 font-medium">Innovation Operating System</p>
            </div>
          </Link>

          {/* Compact Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/marketplace" className="text-sm font-bold text-green-700 hover:text-green-800 transition flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Marketplace
            </Link>
            <Link href="/research" className="text-sm font-semibold text-gray-700 hover:text-green-600 transition flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-green-600" /> Research
            </Link>
            <Link href="/jobs" className="text-sm font-semibold text-gray-700 hover:text-green-600 transition flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-green-600" /> Jobs & Talent
            </Link>
            <Link href="/funding" className="text-sm font-semibold text-gray-700 hover:text-green-600 transition flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-green-600" /> Grants & Funding
            </Link>

            {/* "More" Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="text-sm font-semibold text-gray-700 hover:text-green-600 transition flex items-center gap-1 py-1.5 px-2.5 rounded-lg hover:bg-gray-50"
              >
                More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/startups"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <Rocket className="w-4 h-4 text-green-600" /> Startup Hub
                  </Link>
                  <Link
                    href="/workspace"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <MessageSquare className="w-4 h-4 text-green-600" /> Workspaces
                  </Link>
                  <Link
                    href="/dashboard/government"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <Shield className="w-4 h-4 text-green-600" /> Gov & Policy
                  </Link>
                  <Link
                    href="/explore"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    <Globe className="w-4 h-4 text-green-600" /> Ecosystem Profiles
                  </Link>

                  {user && (
                    <>
                      <div className="my-1 border-t border-gray-100" />
                      <Link
                        href="/my-applications"
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                      >
                        <FileText className="w-4 h-4 text-green-600" /> My Proposals
                      </Link>
                      <Link
                        href="/saved"
                        onClick={() => setMoreDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                      >
                        <Bookmark className="w-4 h-4 text-green-600" /> Saved Items
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Quick Search Button */}
            <Link
              href="/search"
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
              title="Universal Search"
            >
              <Search className="w-4 h-4" />
            </Link>
          </nav>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {getRoleBadge(user.role)}
                
                <Link
                  href={`/profile/${user.username}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-800 rounded-lg hover:bg-green-50 transition border border-gray-200"
                >
                  <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-xs">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                </Link>

                <Link
                  href="/settings/profile"
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                  title="Profile Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <Link
                  href="/settings/account"
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                  title="Account Security & Settings"
                >
                  <KeyRound className="w-4 h-4" />
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-green-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm shadow-green-600/30 transition flex items-center gap-1.5"
                >
                  Join Ecosystem
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link href="/marketplace" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Marketplace
          </Link>
          <Link href="/research" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Research Hub
          </Link>
          <Link href="/jobs" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Jobs & Talent
          </Link>
          <Link href="/funding" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Grants & Funding
          </Link>
          <Link href="/startups" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Startup Hub
          </Link>
          <Link href="/workspace" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Workspaces
          </Link>
          <Link href="/dashboard/government" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Gov & Policy
          </Link>
          <Link href="/explore" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Ecosystem Profiles
          </Link>
          <Link href="/search" className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1">
            Search Portal
          </Link>

          {user ? (
            <>
              <div className="pt-2 pb-2 border-t border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                {getRoleBadge(user.role)}
              </div>
              <Link
                href="/my-applications"
                className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1"
              >
                My Proposals
              </Link>
              <Link
                href="/saved"
                className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1"
              >
                Saved Items
              </Link>
              <Link
                href={`/profile/${user.username}`}
                className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1"
              >
                View Profile
              </Link>
              <Link
                href="/settings/profile"
                className="block text-sm font-medium text-gray-700 hover:text-green-600 py-1"
              >
                Edit Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left text-sm font-medium text-red-600 py-1"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <Link
                href="/auth/login"
                className="block w-full text-center py-2 text-sm font-semibold text-gray-700 bg-gray-50 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block w-full text-center py-2 text-sm font-semibold text-white bg-green-600 rounded-lg"
              >
                Join Ecosystem
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
