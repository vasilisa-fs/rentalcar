import { Car } from '@/types/cars';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  if (cars.length === 0) {
    return (
      <div className={css.empty}>
        <p className={css.emptyTitle}>No cars found</p>
        <p>Try different filters</p>
      </div>
    );
  }

  return (
    <ul className={css.list}>
      {cars.map((car: Car, index: number) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
    </ul>
  );
};

export default CarList;
