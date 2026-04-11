import ShopProductClient from './ShopProductsClient';
import ShopDetailsClient from '../ShopDetailsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetProducts } from '@/lib/api/serverApi';

interface Props {
  params: Promise<{ shopId: string }>;
}

export default async function ShopDetails({ params }: Props) {
  const { shopId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', shopId, '', '', 1, 8],
    queryFn: () =>
      GetProducts({ shopId, search: '', category: '', page: 1, perPage: 8 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ShopDetailsClient />
      <ShopProductClient />
    </HydrationBoundary>
  );
}
