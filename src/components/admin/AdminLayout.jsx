import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  FolderKanban,
  FileText,
  Compass,
  GraduationCap,
  BookOpen,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';

const navTabs = [
  { id: 'profile', label: 'Profile & Socials', icon: User },
  { id: 'experiences', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'publications', label: 'Publications', icon: FileText },
  { id: 'research', label: 'Research Areas', icon: Compass },
  { id: 'education', label: 'Education Journey', icon: GraduationCap },
  { id: 'blog', label: 'News & Essays', icon: BookOpen },
  { id: 'settings', label: 'Account & Security', icon: Settings },
];

export default function AdminLayout({ activeTab, onTabChange, children, toast }) {
  const { user, logout } = useAuth();
  const { isLive } = usePortfolioData();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-stone-100 text-stone-700 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-heading font-black text-sm shadow-xs">
                VN
              </span>
              <div className="hidden sm:block text-left">
                <span className="font-heading font-black text-stone-900 text-base leading-none block">
                  Vincent Nwosu
                </span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-stone-400">
                  CMS Dashboard
                </span>
              </div>
            </Link>

            {/* Connection Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ml-4 bg-stone-50 border-stone-200">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="text-stone-600">
                {isLive ? 'Supabase Connected' : 'Local Fallback Mode'}
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* View Public Site */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all shadow-2xs"
            >
              <span className="hidden sm:inline">View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </Link>

            {/* User details */}
            {user && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                <Shield className="w-3.5 h-3.5 text-stone-700" />
                <span className="font-mono text-[11px] font-medium truncate max-w-[180px]">
                  {user.email}
                </span>
              </div>
            )}

            {/* Logout button */}
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-900 hover:text-white text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container (Sidebar + Content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Nav (Desktop & Mobile Drawer) */}
        <aside
          className={`${
            mobileNavOpen ? 'block' : 'hidden'
          } lg:block w-full lg:w-64 shrink-0 transition-all`}
        >
          <div className="sticky top-24 bg-white rounded-3xl p-3 border border-stone-200/80 shadow-xs space-y-1">
            <div className="px-4 py-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold">
                Navigation
              </span>
            </div>

            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Toast Notification Notification Banner */}
          {toast && (
            <div
              className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300 ${
                toast.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              ) : (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              )}
              <p className="text-xs sm:text-sm font-medium">{toast.message}</p>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
