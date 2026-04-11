import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/utils/utils';

interface Props {
  params: Promise<{ shopId: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  const { shopId } = await params;

  try {
    const formData = await req.formData();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const apiRes = await api.post(`/shop/${shopId}/product/add`, formData, {
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
