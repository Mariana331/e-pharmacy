'use client';

import StatisticList from '@/components/StatisticList/StatisticList';
import css from './StatisticsClient.module.css';
import { GetStatistics } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export default function StatisticsClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => GetStatistics(),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const statistics = data?.data;

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !statistics) return <p>Something went wrong.</p>;
  return (
    <div className={css.statistic_list}>
      <div className="container">
        <StatisticList statistics={statistics} />
      </div>
    </div>
  );
}
