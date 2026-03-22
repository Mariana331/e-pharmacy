'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';
import { GetUser } from '@/lib/api/clientApi';
import { UserInfoResponse } from '@/types/user';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res: UserInfoResponse = await GetUser();
        if (res?.data?.user) {
          setUser(res.data.user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
