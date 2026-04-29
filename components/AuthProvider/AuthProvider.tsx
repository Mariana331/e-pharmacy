'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { GetUser } from '@/lib/api/clientApi';
import { UserInfoResponse } from '@/types/user';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { setUser, clearUser, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated() || user) return;

    const fetchUser = async () => {
      try {
        const res: UserInfoResponse = await GetUser();
        if (res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      }
    };

    fetchUser();
  }, []);

  return children;
};

export default AuthProvider;
