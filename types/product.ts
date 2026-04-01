export interface Product {
  _id: string;
  id: number;
  photo: string;
  name: string;
  suppliers: ['Square', 'Beximco', 'Uniliver', 'ACI', 'Acme'];
  stock: number;
  price: number;
  category: ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'];
  createdAt: string;
  updatedAt: string;
}

export interface GetProductParams {
  shopId: string;
  category: string;
  search: string;
}

export interface ProductResponse {
  status: number;
  message: string;
  data: {
    data: Product[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AddProductData {
  id: number;
  photo: string;
  name: string;
  suppliers: ['Square', 'Beximco', 'Uniliver', 'ACI', 'Acme'];
  stock: number;
  price: number;
  category: ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'];
}

export interface GetProductByIdResponse {
  status: number;
  message: string;
  data: { product: Product; reviews: Review[] };
}

export interface Review {
  _id: string;
  name: string;
  testimonial: string;
}
