export const PUBLIC_AUTH_PATHS = ['/', '/login', '/register'] as const;

export const isPublicAuthPath = (pathname: string) =>
  PUBLIC_AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
