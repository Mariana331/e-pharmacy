import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/utils/utils';

interface Props {
  params: Promise<{ shopId: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { shopId } = await params;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');

    const apiRes = await api.get(`/shop/${shopId}/product`, {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      params: { search, category, page, perPage },
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
