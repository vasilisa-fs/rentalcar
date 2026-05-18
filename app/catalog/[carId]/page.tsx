import type { Metadata } from 'next';
import { fetchCarById } from '@/lib/api/api';
import CarDetailClient from './CarDetailClient';

interface Props {
  params: Promise<{ carId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;

  const car = await fetchCarById(carId);

  if (!car) {
    return {
      title: 'Car not found | RentalCar',
    };
  }

  return {
    title: `${car.brand} ${car.model} (${car.year}) | RentalCar`,
    description: car.description,

    openGraph: {
      images: [
        {
          url: car.img,
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { carId } = await params;

  return <CarDetailClient carId={carId} />;
}
