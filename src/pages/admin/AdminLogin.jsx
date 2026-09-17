import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: loginError } = await login(email, password);
      if (loginError) {
        setError(loginError.message || 'Invalid login credentials. Please check your email and password.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dot-pattern page-bg flex flex-col justify-center items-center px-4 py-12">
      {/* Back to public site */}
      <div className="w-full max-w-md mb-6 text-left">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Public Portfolio
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl relative overflow-hidden">
        
        {/* Top Decorative Graphic */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-md mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 tracking-tight">
            Admin Authentication
          </h1>
          <p className="text-xs text-stone-500 mt-1.5">
            Log in to manage your portfolio content, projects, and research.
          </p>
        </div>

        {/* Warning if Supabase is unconfigured */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-left flex gap-3 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Supabase credentials pending</span>
              Add your <code className="font-mono text-[10px] bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="font-mono text-[10px] bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> to your environment file to connect Supabase.
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-left flex gap-3 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vincentnwosu.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-250 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-2xl border border-stone-250 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-200 text-center">
          <p className="text-[11px] text-stone-400">
            Protected area. Authorized website administration only.
          </p>
        </div>
      </div>
    </div>
  );
}
