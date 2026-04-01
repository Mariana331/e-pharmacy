import StatisticsClient from './StatisticsClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetStatistics } from '@/lib/api/serverApi';

export default async function StatisticsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['statistics'],
    queryFn: () => GetStatistics(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatisticsClient />
    </HydrationBoundary>
  );
}
