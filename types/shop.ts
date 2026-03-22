export interface Shop {
  _id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  delivery: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShopData {
  name: string;
  owner: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  delivery: boolean;
}

export interface ShopResponse {
  status: number;
  message: string;
  data: {
    shop: Shop;
  };
}
