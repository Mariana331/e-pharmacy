import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const apiRes = await api.post('/shop/create', body, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    });
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
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
