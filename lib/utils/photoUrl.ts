/** Uploaded files are proxied via Next (same origin as the UI). */
export function getPhotoUrl(photo: string): string {
  if (photo.startsWith('http')) return photo;
  const origin =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
    'http://localhost:3001';
  return `${origin}${photo}`;
}
