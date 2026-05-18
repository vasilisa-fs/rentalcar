import type { Metadata } from 'next';
import CatalogClient from '@/components/CatalogClient/CatalogClient';

export const metadata: Metadata = {
  title: 'Car Catalog — RentalCar',
  description:
    'Explore our catalog of reliable SUVs and luxury rental cars. Find the perfect vehicle for your trip.',
  keywords: [
    'car catalog',
    'SUV rentals',
    'luxury rentals',
    'Volvo XC90 rental',
    'Subaru Outback rental',
    'Buick Enclave rental',
  ],
  openGraph: {
    title: 'Car Catalog — RentalCar',
    description: 'Browse available rental cars and choose the perfect option.',
    type: 'website',
    url: 'https://rentalcar-drab-chi.vercel.app/catalog',
    siteName: 'RentalCar',
    images: [
      {
        url: 'https://rentalcar-drab-chi.vercel.app/open_graph.jpg',
        width: 1200,
        height: 630,
        alt: 'RentalCar catalog',
      },
    ],
  },
};

const CatalogPage = () => {
  return <CatalogClient />;
};

export default CatalogPage;
