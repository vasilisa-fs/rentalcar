'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCars } from '@/lib/serverApi';
import { CarFilters } from '@/types/cars';
import Filters from '@/components/Filters/SearchFilters';
import CarList from '@/components/CarList/CarList';
import Pagination from '@/components/Pagination/Pagination';
import css from './CatalogClient.module.css';

const LIMIT = 12;

const CatalogClient = () => {
  const [filters, setFilters] = useState<CarFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchCars(pageParam as number, LIMIT, filters);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      Number(lastPage.page) < Number(lastPage.totalPages)
        ? Number(lastPage.page) + 1
        : undefined,
  });
  console.log('error:', error);
  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleSearch = (newFilters: CarFilters) => {
    setFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({});
  };

  return (
    <div className={css.page}>
      <Filters onSearch={handleSearch} onClear={handleClear} />

      {isLoading && (
        <div className={css.loaderWrapper}>
          <div className={css.spinner} />
        </div>
      )}

      {isError && (
        <p className={css.error}>Something went wrong. Please try again.</p>
      )}

      {!isLoading && !isError && (
        <>
          <CarList cars={cars} />
          <Pagination
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        </>
      )}
    </div>
  );
};

export default CatalogClient;
