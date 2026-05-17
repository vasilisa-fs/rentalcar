'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFilters } from '@/lib/serverApi';
import { CarFilters } from '@/types/cars';
import css from './SearchFilters.module.css';
import Button from '../Button/Button';

interface Props {
  onSearch: (filters: CarFilters) => void;
  onClear: () => void;
}

const Filters = ({ onSearch, onClear }: Props) => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [mileageError, setMileageError] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const { data: filters } = useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
  });

  const brands = filters?.brands ?? [];

  const prices = filters
    ? Array.from(
        { length: (filters.price.max - filters.price.min) / 10 + 1 },
        (_, i) => String(filters.price.min + i * 10)
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setBrandOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setPriceOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    const hasMax = !!maxMileage;
    const hasMin = !!minMileage;

    if (minMileage && Number(minMileage) < 0) {
      setMileageError('Mileage cannot be negative');
      return;
    }
    if (minMileage && maxMileage && Number(maxMileage) < Number(minMileage)) {
      setMileageError('Maximum mileage cannot be less than minimum mileage');
      return;
    }
    setMileageError('');
    setIsSearched(true);

    onSearch({
      brand: brand || undefined,
      price: price || undefined,
      minMileage: hasMin ? minMileage : hasMax ? '0' : undefined,
      maxMileage: maxMileage || undefined,
    });
  };

  const handleClear = () => {
    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
    setMileageError('');
    setIsSearched(false);
    onClear();
  };

  return (
    <div className={css.filters}>
      {/* Brand */}
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <div className={css.dropdown} ref={brandRef}>
          <button
            type="button"
            className={css.trigger}
            onClick={() => setBrandOpen((v) => !v)}
          >
            <span>{brand || 'Choose a brand'}</span>
            <svg
              className={`${css.arrow} ${brandOpen ? css.arrowUp : ''}`}
              width="16"
              height="16"
            >
              <use href="/sprite.svg#icon-arrow-down" />
            </svg>
          </button>
          {brandOpen && (
            <ul className={css.list}>
              {brands.map((b) => (
                <li
                  key={b}
                  className={`${css.item} ${brand === b ? css.selected : ''}`}
                  onClick={() => {
                    setBrand(b);
                    setBrandOpen(false);
                    setIsSearched(false);
                  }}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Price */}
      <div className={css.group}>
        <label className={css.label}>Price / 1 hour</label>
        <div className={css.dropdown} ref={priceRef}>
          <button
            type="button"
            className={css.trigger}
            onClick={() => setPriceOpen((v) => !v)}
          >
            <span>{price ? `To $${price}` : 'Choose a price'}</span>
            <svg
              className={`${css.arrow} ${priceOpen ? css.arrowUp : ''}`}
              width="16"
              height="16"
            >
              <use href="/sprite.svg#icon-arrow-down" />
            </svg>
          </button>
          {priceOpen && (
            <ul className={css.list}>
              {prices.map((p) => (
                <li
                  key={p}
                  className={`${css.item} ${price === p ? css.selected : ''}`}
                  onClick={() => {
                    setPrice(p);
                    setPriceOpen(false);
                    setIsSearched(false);
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mileage */}
      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageRow}>
          <div
            className={`${css.inputWrapper} ${css.inputLeft}`}
            onClick={(e) =>
              (
                e.currentTarget.querySelector('input') as HTMLInputElement
              )?.focus()
            }
          >
            <span className={css.inputPrefix}>From</span>
            <input
              type="number"
              value={minMileage}
              onChange={(e) => {
                setMinMileage(e.target.value);
                setMileageError('');
                setIsSearched(false);
              }}
              className={css.input}
            />
          </div>
          <div
            className={`${css.inputWrapper} ${css.inputRight}`}
            onClick={(e) =>
              (
                e.currentTarget.querySelector('input') as HTMLInputElement
              )?.focus()
            }
          >
            <span className={css.inputPrefix}>To</span>
            <input
              type="number"
              value={maxMileage}
              onChange={(e) => {
                setMaxMileage(e.target.value);
                setMileageError('');
                setIsSearched(false);
              }}
              className={css.input}
            />
          </div>
        </div>
        <span className={css.error}>{mileageError}</span>
      </div>

      {/* Actions */}
      <div className={css.actions}>
        <Button onClick={handleSearch} disabled={isSearched}>
          Search
        </Button>
        <button type="button" className={css.clearBtn} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
