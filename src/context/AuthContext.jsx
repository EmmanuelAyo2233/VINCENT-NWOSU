import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isConfigured: false,
  login: async () => ({ error: null }),
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((err) => {
      console.error('Error fetching auth session:', err);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      return {
        data: null,
        error: new Error('Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not configured. Please add them to your .env file.'),
      };
    }

    try {
      const result = await supabase.auth.signInWithPassword({ email, password });
      return result;
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateEmail = async (newEmail) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured.') };
    }
    try {
      const result = await supabase.auth.updateUser({ email: newEmail });
      return result;
    } catch (err) {
      return { error: err };
    }
  };

  const updatePassword = async (newPassword) => {
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured.') };
    }
    try {
      const result = await supabase.auth.updateUser({ password: newPassword });
      return result;
    } catch (err) {
      return { error: err };
    }
  };

  const logout = async () => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      return;
    }
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        login,
        logout,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
