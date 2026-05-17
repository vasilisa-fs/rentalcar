import { Car } from '@/types/cars';
import css from './CarDetails.module.css';

interface Props {
  car: Car;
}

const CarDetails = ({ car }: Props) => {
  const city = car.location?.city ?? '';
  const country = car.location?.country ?? '';
  const mileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ');
  const features = car.features ?? [];

  return (
    <div className={css.infoCard}>
      {/* Title */}
      <div className={css.titleRow}>
        <h1 className={css.carTitle}>
          {car.brand} {car.model}, {car.year}
        </h1>
        <span className={css.articleId}>Id: {car.stockNumber}</span>
      </div>

      {/* Location & mileage */}
      <div className={css.meta}>
        <span className={css.metaItem}>
          <svg width="16" height="16">
            <use href="/sprite.svg#icon-location" />
          </svg>
          {city}, {country}
        </span>
        <span className={css.metaItem}>Mileage: {mileage} km</span>
      </div>

      {/* Price */}
      <p className={css.price}>${car.rentalPrice}</p>

      {/* Description */}
      <p className={css.description}>{car.description}</p>

      <hr className={css.divider} />

      {/* Rental Conditions */}
      <h3 className={css.sectionTitle}>Rental Conditions:</h3>
      <ul className={css.checkList}>
        {car.rentalConditions?.map((c, i) => (
          <li key={i} className={css.checkItem}>
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-check-circle" />
            </svg>
            {c}
          </li>
        ))}
      </ul>

      <hr className={css.divider} />

      {/* Car Specifications */}
      <h3 className={css.sectionTitle}>Car Specifications:</h3>
      <ul className={css.specList}>
        <li className={css.specItem}>
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-calendar" />
          </svg>
          Year: {car.year}
        </li>
        <li className={css.specItem}>
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-car" />
          </svg>
          Type: {car.type}
        </li>
        <li className={css.specItem}>
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-fuel" />
          </svg>
          Fuel Consumption: {car.fuelConsumption}
        </li>
        <li className={css.specItem}>
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-engine" />
          </svg>
          Engine Size: {car.engine}
        </li>
      </ul>

      <hr className={css.divider} />

      {/* Accessories and functionalities */}
      <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
      <ul className={css.checkList}>
        {features.map((f, i) => (
          <li key={i} className={css.checkItem}>
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-check-circle" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarDetails;
