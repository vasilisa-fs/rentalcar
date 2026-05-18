'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/lib/api/api';
import CarDetails from '@/components/CarDetails/CarDetails';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import css from './page.module.css';
import Image from 'next/image';

interface Props {
  carId: string;
}

export default function CarDetailClient({ carId }: Props) {
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
    <div className={`container ${css.pageContainer}`}>
      <div className={css.layout}>
        <div className={css.left}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={400}
              height={300}
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
