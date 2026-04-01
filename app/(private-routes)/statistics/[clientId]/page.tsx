import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import StatisticsDetailsClient from './StatisticsDetailsClient';

export default function StatisticDetails() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatisticsDetailsClient />
    </HydrationBoundary>
  );
}
