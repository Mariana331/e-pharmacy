import { ProductResponse } from '@/types/product';
import { nextServer } from './api';
import { CreateShopData, ShopResponse } from '@/types/shop';
import { StatisticsResponse } from '@/types/statistics';

import {
  AddProductData,
  Product,
  GetProductByIdResponse,
  GetProductParams,
} from '@/types/product';
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

export const GetShopById = async (shopId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<ShopResponse>(`/shop/${shopId}`, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return response.data;
};

export const UpdateShop = async (shopId: string, data: CreateShopData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.put<ShopResponse>(
    `/shop/${shopId}/update`,
    data,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  );
  return response.data;
};

export const GetProducts = async ({
  shopId,
  category,
  search,
}: GetProductParams) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<ProductResponse>(
    `/shop/${shopId}/product`,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      params: { shopId, search, category },
    },
  );
  return response.data;
};

export const AddProduct = async (shopId: string, data: AddProductData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.post<Product>(
    ` /shop/${shopId}/product/add`,
    data,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  );
  return response.data;
};

export const GetProductById = async (shopId: string, productId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<GetProductByIdResponse>(
    `/shop/${shopId}/product/${productId}`,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  );
  return response.data;
};

export const GetStatistics = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const response = await nextServer.get<StatisticsResponse>('/statistics/', {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return response.data;
};
