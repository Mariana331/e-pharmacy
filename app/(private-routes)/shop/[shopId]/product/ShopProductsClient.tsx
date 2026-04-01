'use client';

import { GetProducts } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ProductList from '@/components/ProductList/ProductList';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import FilterMedicine from '@/components/FilterMedicine/FilterMedicine';

export default function ShopProductClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { shopId } = useParams<{ shopId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', shopId, search, category],
    queryFn: () => GetProducts({ shopId, search, category }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const products = data?.data?.data ?? [];

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !products) return <p>Something went wrong.</p>;

  return (
    <div className="container">
      <FilterMedicine
        value={search}
        category={category}
        onSubmitSearch={(value) => {
          setSearch(value);
        }}
        onSubmitCategory={(value) => {
          setCategory(value);
        }}
      />
      <ProductList products={products} />
    </div>
  );
}
