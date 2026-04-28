import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/utils/utils';

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const sessionId = cookieStore.get('sessionId')?.value;

  const clearCookies = () => {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');
  };

  try {
    await api.post('/user/logout', null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}; sessionId=${sessionId}`,
      },
    });

    clearCookies();
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 },
    );
  } catch (error) {
    clearCookies(); //
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
    }

    return NextResponse.json({ message: 'Logged out' }, { status: 200 });
  }
}
