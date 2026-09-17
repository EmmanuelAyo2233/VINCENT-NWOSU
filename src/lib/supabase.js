import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')
);

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Environment variables VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are missing or unconfigured. Falling back to local static portfolio data.'
  );
}

// Create Supabase client (fallback to a dummy URL if missing so app still initializes)
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export const BUCKET_NAME = 'portfolio-assets';

/**
 * Uploads a file to Supabase Storage in the portfolio-assets bucket.
 * @param {File} file - The file object to upload
 * @param {string} folder - Destination subfolder (e.g. 'avatars', 'projects', 'documents')
 * @returns {Promise<{ url: string | null, error: Error | null }>}
 */
export async function uploadAsset(file, folder = 'general') {
  if (!isSupabaseConfigured) {
    return { url: null, error: new Error('Supabase is not configured. Please set your environment variables.') };
  }

  try {
    // Validate size (max 8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { url: null, error: new Error('File size exceeds the 8MB limit. Please upload a smaller file.') };
    }

    // Clean filename (strip extension from base before re-appending)
    const fileExt = file.name.split('.').pop();
    const baseName = file.name.replace(/\.[^/.]+$/, ''); // strip extension
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanBaseName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return { url: data?.publicUrl || null, error: null };
  } catch (err) {
    console.error('Error uploading asset:', err);
    return { url: null, error: err };
  }
}

/**
 * Removes an asset from Supabase Storage by its public URL or storage path.
 * @param {string} urlOrPath
 */
export async function deleteAsset(urlOrPath) {
  if (!isSupabaseConfigured || !urlOrPath) return;

  try {
    let filePath = urlOrPath;
    if (urlOrPath.includes(BUCKET_NAME)) {
      const parts = urlOrPath.split(`${BUCKET_NAME}/`);
      if (parts[1]) filePath = decodeURIComponent(parts[1]);
    }

    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
  } catch (err) {
    console.error('Error deleting asset:', err);
  }
}
