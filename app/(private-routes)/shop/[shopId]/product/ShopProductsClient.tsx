'use client';

import { GetProducts } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ProductList from '@/components/ProductList/ProductList';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import FilterMedicine from '@/components/FilterMedicine/FilterMedicine';
import Pagination from '@/components/Pagination/Pagination';

export default function ShopProductClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { shopId } = useParams<{ shopId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', shopId, search, category, page, perPage],
    queryFn: () => GetProducts({ shopId, search, category, page, perPage }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const products = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages;
  console.log(totalPages);
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !products) return <p>Something went wrong.</p>;

  return (
    <div>
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
      <Pagination page={page} onChange={setPage} totalPages={totalPages ?? 1} />
    </div>
  );
}
