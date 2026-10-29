/** Public CDN origin (no trailing slash). Required for medal images on the client. */
export function getCdnBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_CDN_BASE_URL?.trim();
  if (!raw) {
    return "";
  }
  return raw.replace(/\/+$/, "");
}
