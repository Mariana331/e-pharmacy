import { nextServer } from './api';
import { CreateShopData, ShopResponse } from '@/types/shop';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserInfoResponse,
  LogoutResponse,
} from '@/types/user';

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

export const GetShopById = async (id: string) => {
  const response = await nextServer.get<ShopResponse>(`/shop/${id}`);
  return response.data;
};

export const UpdateShop = async (id: string, data: CreateShopData) => {
  const response = await nextServer.put<ShopResponse>(
    `/shop/${id}/update`,
    data,
  );
  return response.data;
};
