'use client';

import Image from 'next/image';
import { Car } from '@/types/cars';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import Button from '../Button/Button';
import css from './CarCard.module.css';

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  const { city, country } = car.location;
  const mileage = car.mileage.toLocaleString('en-US').replace(/,/g, ' ');
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(car.id);

  return (
    <li className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          className={css.img}
          src={car.img}
          alt="car image"
          fill
          sizes="276px"
          priority={index < 4}
        />

        <button
          className={css.heartBtn}
          onClick={() => toggleFavorite(car.id)}
          type="button"
          aria-label="Toggle favorite"
        >
          <svg className={css.heart} width="16" height="16">
            <use
              href={`/sprite.svg#icon-heart-${
                isFavorite ? 'filled' : 'default'
              }`}
            />
          </svg>
        </button>
      </div>

      <div className={css.carInfo}>
        <div className={css.carTitle}>
          <h3 className={css.carName}>
            {car.brand} <span>{car.model}</span>
            {', ' + car.year}
          </h3>

          <p className={css.carPrice}>${car.rentalPrice}</p>
        </div>

        <div className={css.carDesc}>
          <ul className={css.rentInfo}>
            <li>{city}</li>
            <li>{country}</li>
            <li>{car.rentalCompany}</li>
          </ul>

          <ul className={css.techInfo}>
            <li>{car.type}</li>
            <li>{mileage} km</li>
          </ul>
        </div>
      </div>

      <Button href={`/catalog/${car.id}`} size="lg" target="_blank">
        Read more
      </Button>
    </li>
  );
};

export default CarCard;
