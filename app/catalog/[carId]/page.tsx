'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/serverApi';
import CarDetails from '@/components/CarDetails/CarDetails';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import css from './page.module.css';
import { use } from 'react';

interface Props {
  params: Promise<{ carId: string }>;
}

export default function CarDetailPage({ params }: Props) {
  const { carId } = use(params);

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
  });

  if (isLoading) return <Loader />;
  if (isError || !car) return <p className={css.error}>Car not found.</p>;

  return (
    <div className={css.page}>
      <div className={css.layout}>
        <div className={css.left}>
          <div className={css.imageWrapper}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={css.image}
            />
          </div>
          <BookingForm carId={carId} />
        </div>
        <div className={css.right}>
          <CarDetails car={car} />
        </div>
      </div>
    </div>
  );
}
