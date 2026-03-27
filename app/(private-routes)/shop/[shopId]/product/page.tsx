import ShopProductClient from './ShopProductsClient';
import ShopDetailsClient from '../ShopDetailsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetProducts } from '@/lib/api/serverApi';

interface Props {
  params: { shopId: string };
}

export default async function ShopDetails({ params }: Props) {
  const { shopId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shops', shopId],
    queryFn: () => GetProducts(shopId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopDetailsClient />
      <ShopProductClient />
    </HydrationBoundary>
  );
}
