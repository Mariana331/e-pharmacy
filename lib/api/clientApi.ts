import { nextServer } from './api';
import { CreateShopData, ShopResponse } from '@/types/shop';
import {
  ProductResponse,
  AddProductData,
  GetProductByIdResponse,
  GetProductParams,
} from '@/types/product';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserInfoResponse,
  LogoutResponse,
} from '@/types/user';

import { StatisticsResponse } from '@/types/statistics';

export const Register = async (data: RegisterRequest) => {
  const response = await nextServer.post<RegisterResponse>(
    '/user/register',
    data,
  );
  return response.data;
};

export const Login = async (data: LoginRequest) => {
  const response = await nextServer.post<LoginResponse>('/user/login', data);
  return response.data;
};

export const Logout = async (): Promise<void> => {
  await nextServer.post<LogoutResponse>('/user/logout');
};

export const GetUser = async () => {
  const response = await nextServer.get<UserInfoResponse>('/user/user-info');
  return response.data;
};

export const CreateShop = async (data: CreateShopData) => {
  const response = await nextServer.post<ShopResponse>('/shop/create', data);
  return response.data;
};

export const GetShopById = async (shopId: string) => {
  const response = await nextServer.get<ShopResponse>(`/shop/${shopId}`);
  return response.data;
};

export const UpdateShop = async (shopId: string, data: CreateShopData) => {
  const response = await nextServer.put<ShopResponse>(
    `/shop/${shopId}/update`,
    data,
  );
  return response.data;
};

export const GetProducts = async ({
  shopId,
  category,
  search,
  page,
  perPage,
}: GetProductParams) => {
  const response = await nextServer.get<ProductResponse>(
    `/shop/${shopId}/product`,
    { params: { shopId, search, category, page, perPage } },
  );
  return response.data;
};

export const AddProduct = async (
  shopId: string,
  data: FormData | AddProductData,
) => {
  const response = await nextServer.post<AddProductData>(
    `/shop/${shopId}/product/add`,
    data,
  );
  return response.data;
};

export const GetProductById = async (shopId: string, productId: string) => {
  const response = await nextServer.get<GetProductByIdResponse>(
    `/shop/${shopId}/product/${productId}`,
  );
  return response.data;
};

export const EditProductById = async (
  shopId: string,
  productId: string,
  data: FormData | AddProductData,
) => {
  const response = await nextServer.put<GetProductByIdResponse>(
    `/shop/${shopId}/product/${productId}/edit`,
    data,
  );
  return response.data;
};

export const DeleteProductById = async (shopId: string, productId: string) => {
  await nextServer.delete(`/shop/${shopId}/product/${productId}/delete`);
};

export const GetStatistics = async () => {
  const response = await nextServer.get<StatisticsResponse>('/statistics');
  return response.data;
};
