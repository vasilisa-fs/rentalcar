import type { Metadata } from 'next';
import CatalogClient from '@/components/CatalogClient/CatalogClient';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description: 'Browse available rental cars',
};

const CatalogPage = () => {
  return <CatalogClient />;
};

export default CatalogPage;
