import ShopDetailsClient from './ShopDetailsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetShopById } from '@/lib/api/serverApi';

interface Props {
  params: { id: string };
}

export default async function ShopDetails({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shops', id],
    queryFn: () => GetShopById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopDetailsClient />
    </HydrationBoundary>
  );
}
