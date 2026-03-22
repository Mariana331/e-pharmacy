import { nextServer } from './api';
import { CreateShopData, ShopResponse } from '@/types/shop';
import { UserInfoResponse } from '@/types/user';
import { cookies } from 'next/headers';

export const GetUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<UserInfoResponse>('/user/user-info', {
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
  });
  return response.data;
};

export const CreateShop = async (data: CreateShopData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.post<ShopResponse>('/shop/create', data, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return response.data;
};

export const GetShopById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<ShopResponse>(`/shop/${id}`, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return response.data;
};

export const UpdateShop = async (id: string, data: CreateShopData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.put<ShopResponse>(
    `/shop/${id}/update`,
    data,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  );
  return response.data;
};
