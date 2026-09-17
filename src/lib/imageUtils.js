/**
 * Extracts a clean image URL from any format:
 * - url('/path.jpg') center/cover no-repeat -> /path.jpg
 * - url("https://...") -> https://...
 * - https://... -> https://...
 * - /path.jpg -> /path.jpg
 */
export function getCleanImageUrl(val) {
  if (!val || typeof val !== 'string') return '';
  const trimmed = val.trim();
  
  // Matches url('...') or url("...") or url(...)
  const match = trimmed.match(/url\(['"]?([^'"]+?)['"]?\)/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  
  return trimmed;
}

/**
 * Returns a valid CSS style object for background images.
 * Works seamlessly with both local paths and Supabase Storage URLs.
 */
export function getBackgroundImageStyle(val) {
  const cleanUrl = getCleanImageUrl(val);
  if (!cleanUrl) return {};
  
  return {
    backgroundImage: `url("${cleanUrl}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
}
