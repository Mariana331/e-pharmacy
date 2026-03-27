export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  name: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: { user: User };
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserInfoResponse {
  status: number;
  message: string;
  data: {
    user: User;
  };
}

export interface LogoutResponse {
  status: number;
  message: string;
}
