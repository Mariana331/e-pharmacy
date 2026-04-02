import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const sessionId = cookieStore.get('sessionId')?.value;

    const apiRes = await api.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}; sessionId=${sessionId}`,
        },
      },
    );

    const accessToken = apiRes.data?.data?.accessToken;
    if (accessToken) {
      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 15 * 60,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
