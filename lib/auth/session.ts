import { GetUser } from '@/lib/api/clientApi';
import { User } from '@/types/user';

let sessionCheckPromise: Promise<User | null> | null = null;

/** Single in-flight session check (survives React Strict Mode remounts). */
export function fetchSessionUser(): Promise<User | null> {
  if (!sessionCheckPromise) {
    sessionCheckPromise = GetUser()
      .then((res) => res?.data?.user ?? null)
      .catch(() => null)
      .finally(() => {
        sessionCheckPromise = null;
      });
  }
  return sessionCheckPromise;
}

export function resetSessionCheck() {
  sessionCheckPromise = null;
}
