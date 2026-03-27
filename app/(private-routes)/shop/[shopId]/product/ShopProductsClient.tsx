'use client';

import { GetProducts } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ProductList from '@/components/ProductList/ProductList';
import { useParams } from 'next/navigation';

export default function ShopProductClient() {
  const { shopId } = useParams<{ shopId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', shopId],
    queryFn: () => GetProducts(shopId),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const products = data?.data?.data ?? [];

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !products) return <p>Something went wrong.</p>;
  return <ProductList products={products} />;
}
