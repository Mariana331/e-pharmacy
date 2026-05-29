import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

export function bearerAuthHeaders(accessToken: string) {
  return { Authorization: `Bearer ${accessToken}` };
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { status: 401, message: 'Unauthorized' },
    { status: 401 },
  );
}

/** Returns 401 response if no access token, otherwise the token string. */
export async function requireAccessToken(): Promise<
  string | NextResponse
> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return unauthorizedResponse();
  }
  return accessToken;
}
