import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center page-bg">
        <Loader2 className="w-8 h-8 text-stone-900 animate-spin mb-3" />
        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
