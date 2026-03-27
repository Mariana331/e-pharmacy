import ProductDetailsClient from './ProductDetailsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetProductById } from '@/lib/api/serverApi';

interface Props {
  params: { shopId: string; productId: string };
}

export default async function ProductDetails({ params }: Props) {
  const { shopId, productId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', shopId, productId],
    queryFn: () => GetProductById(shopId, productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsClient />
    </HydrationBoundary>
  );
}
