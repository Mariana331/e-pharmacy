import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { logErrorResponse } from '@/app/api/utils/utils';
import { api } from '../../api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('user/login', body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || '/',
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };
        if (parsed.refreshToken)
          cookieStore.set('refreshToken', parsed.refreshToken, options);
        if (parsed.sessionId)
          cookieStore.set('sessionId', parsed.sessionId, options);
      }
    }

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
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
