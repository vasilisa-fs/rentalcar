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
      <div className={css.header}>
        <div className={css.titleRow}>
          <h1 className={css.carTitle}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <span className={css.articleId}>Id: {car.stockNumber}</span>
        </div>
        <div className={css.meta}>
          <span className={css.metaItem}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-location" />
            </svg>
            {city}, {country}
          </span>
          <span className={css.metaItem}>Mileage: {mileage} km</span>
        </div>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <p className={css.description}>{car.description}</p>

      <section className={css.section}>
        <h3 className={css.sectionTitle}>Rental Conditions:</h3>
        <ul className={css.list}>
          {car.rentalConditions?.map((condition, index) => (
            <li key={index} className={css.listItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-check-circle" />
              </svg>

              {condition}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section}>
        <h3 className={css.sectionTitle}>Car Specifications:</h3>

        <ul className={css.list}>
          <li className={css.listItem}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>

          <li className={css.listItem}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>

          <li className={css.listItem}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-fuel" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>

          <li className={css.listItem}>
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-engine" />
            </svg>
            Engine Size: {car.engine}
          </li>
        </ul>
      </section>

      <section className={css.section}>
        <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>

        <ul className={css.list}>
          {features.map((feature, index) => (
            <li key={index} className={css.listItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-check-circle" />
              </svg>

              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CarDetails;
