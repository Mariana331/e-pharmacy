import ShopDetailsClient from '../[shopId]/ShopDetailsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetShopById } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ shopId: string }>;
}

export default async function ShopDetails({ params }: Props) {
  const { shopId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shops', shopId],
    queryFn: () => GetShopById(shopId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopDetailsClient />
    </HydrationBoundary>
  );
}
