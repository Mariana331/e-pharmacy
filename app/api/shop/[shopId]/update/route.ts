import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/utils/utils';

interface Props {
  params: Promise<{ shopId: string }>;
}

export async function PUT(req: NextRequest, { params }: Props) {
  const { shopId } = await params;

  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const apiRes = await api.put(`/shop/${shopId}/update`, body, {
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
