import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Loader2, RefreshCw } from 'lucide-react';
import { uploadAsset } from '../../lib/supabase';
import { getCleanImageUrl } from '../../lib/imageUtils';

/**
 * Reusable file/image uploader for Admin CMS
 */
export default function ImageUpload({
  value,
  onChange,
  folder = 'general',
  accept = 'image/*',
  label = 'Upload Image',
  helperText = 'PNG, JPG, WebP up to 8MB',
  maxSizeMB = 8,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const cleanUrl = getCleanImageUrl(value);
  const isPdf = cleanUrl?.toLowerCase().endsWith('.pdf') || accept.includes('pdf');

  const handleFile = async (file) => {
    if (!file) return;
    setError(null);

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit. Please choose a smaller file.`);
      return;
    }

    setUploading(true);
    try {
      const { url, error: uploadErr } = await uploadAsset(file, folder);
      if (uploadErr) {
        setError(uploadErr.message || 'Failed to upload file.');
      } else if (url) {
        onChange(url);
      }
    } catch (err) {
      setError(err.message || 'An unexpected upload error occurred.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <div className="space-y-2 text-left">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
          {label}
        </label>
      )}

      {/* Preview if exists */}
      {cleanUrl ? (
        <div className="relative rounded-2xl border border-stone-200 bg-stone-50 p-3 flex items-center gap-4">
          {!isPdf ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-stone-200 shrink-0 flex items-center justify-center">
              <img
                src={cleanUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" />
            </div>
          )}

          <div className="flex-grow min-w-0 pr-2">
            <p className="text-xs font-mono text-stone-700 truncate">{cleanUrl}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Asset stored</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={triggerSelect}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              <span>Replace</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange('');
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-red-50 hover:text-red-600 text-stone-500 text-xs font-medium transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={triggerSelect}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-stone-900 bg-stone-100'
              : 'border-stone-250 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-400'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <Loader2 className="w-6 h-6 text-stone-900 animate-spin" />
              <span className="text-xs font-medium text-stone-600">Uploading asset to Supabase...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-1">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200 shadow-inner">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
