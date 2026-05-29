'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fetchSessionUser } from '@/lib/auth/session';
import { isPublicAuthPath } from '@/lib/auth/constants';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthReady = useAuthStore((state) => state.setAuthReady);
  const user = useAuthStore((state) => state.user);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  useEffect(() => {
    if (!pathname) return;

    let cancelled = false;

    const bootstrap = async () => {
      if (isPublicAuthPath(pathname)) {
        setAuthReady();
        return;
      }

      const sessionUser = await fetchSessionUser();
      if (cancelled) return;

      if (sessionUser) {
        setUser(sessionUser);
      } else {
        setAuthReady();
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [pathname, setUser, setAuthReady]);

  useEffect(() => {
    if (!isAuthReady || !user) return;
    if (pathname === '/login' || pathname === '/register') {
      router.replace('/shop/create');
    }
  }, [isAuthReady, user, pathname, router]);

  return children;
};

export default AuthProvider;
