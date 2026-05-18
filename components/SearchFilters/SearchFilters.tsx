'use client';

import { useState } from 'react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import { fetchFilters } from '@/lib/api/api';
import { CarFilters } from '@/types/cars';
import { SearchFiltersSchema } from './SearchFiltersSchema';
import css from './SearchFilters.module.css';
import Button from '../Button/Button';

interface SearchFiltersProps {
  onSearch: (filters: CarFilters) => void;
}

interface FiltersFormValues {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const initialValues: FiltersFormValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

const formatNumber = (val: string): string => {
  const clean = val.replace(/,/g, '');
  if (clean === '' || isNaN(Number(clean))) return val;
  return Number(clean).toLocaleString('en-US');
};

const cleanNumber = (val: string): string => val.replace(/,/g, '');

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
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
  const brandOptions: SelectOption[] = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const priceOptions: SelectOption[] = prices.map((price) => ({
    value: price,
    label: price,
  }));

  const resetSearchState = () => {
    setIsSearched(false);
    setIsSearching(false);
  };
  
  const handleSubmit = async (
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>
  ) => {
    const hasMax = !!values.maxMileage;
    const hasMin = !!values.minMileage;
    setIsSearching(true);
    onSearch({
      brand: values.brand || undefined,
      price: values.price || undefined,
      minMileage: hasMin
        ? cleanNumber(values.minMileage)
        : hasMax
          ? '0'
          : undefined,
      maxMileage: values.maxMileage
        ? cleanNumber(values.maxMileage)
        : undefined,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSearching(false);
    setIsSearched(true);
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchFiltersSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.filters}>
          <div className={css.group}>
            <label className={css.label}>Car brand</label>
            <Field name="brand">
              {({ field, form }: FieldProps) => {
                const selectedOption =
                  brandOptions.find((option) => option.value === field.value) ||
                  null;
                return (
                  <Select
                    instanceId="brand-select"
                    className={css.selectContainer}
                    classNamePrefix="select"
                    options={brandOptions}
                    value={selectedOption}
                    placeholder="Choose a brand"
                    isSearchable={false}
                    onChange={(option) => {
                      form.setFieldValue(
                        field.name,
                        option ? option.value : ''
                      );
                      resetSearchState();
                    }}
                  />
                );
              }}
            </Field>
          </div>

          <div className={css.group}>
            <label className={css.label}>Price / 1 hour</label>
            <Field name="price">
              {({ field, form }: FieldProps) => {
                const selectedOption =
                  priceOptions.find((option) => option.value === field.value) ||
                  null;
                return (
                  <Select
                    instanceId="price-select"
                    className={css.selectContainer}
                    classNamePrefix="select"
                    options={priceOptions}
                    value={selectedOption}
                    placeholder="Choose a price"
                    isSearchable={false}
                    formatOptionLabel={(option, { context }) => {
                      if (context === 'value') {
                        return `To $${option.value}`;
                      }
                      return option.label;
                    }}
                    onChange={(option) => {
                      form.setFieldValue(
                        field.name,
                        option ? option.value : ''
                      );
                      resetSearchState();
                    }}
                  />
                );
              }}
            </Field>
          </div>

          <div className={css.mileageGroup}>
            <label className={css.label}>Car mileage / km</label>
            <div className={css.mileageRow}>
              <Field name="minMileage">
                {({ field, form, meta }: FieldProps) => (
                  <div className={css.inputWrapper}>
                    <span className={css.inputPrefix}>From</span>

                    <input
                      {...field}
                      type="text"
                      className={`${css.input} ${css.inputLeft}`}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, '');
                        if (
                          raw === '' ||
                          (Number(raw) >= 0 && !isNaN(Number(raw)))
                        ) {
                          form.setFieldValue(
                            'minMileage',
                            raw ? formatNumber(raw) : ''
                          );

                          resetSearchState();
                        }
                      }}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Field name="maxMileage">
                {({ field, form, meta }: FieldProps) => (
                  <div className={css.inputWrapper}>
                    <span className={css.inputPrefix}>To</span>
                    <input
                      {...field}
                      type="text"
                      className={`${css.input} ${css.inputRight}`}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/,/g, '');

                        if (
                          raw === '' ||
                          (Number(raw) >= 0 && !isNaN(Number(raw)))
                        ) {
                          form.setFieldValue(
                            'maxMileage',
                            raw ? formatNumber(raw) : ''
                          );

                          resetSearchState();
                        }
                      }}
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>

          <div className={css.btnWrapper}>
            <Button
              type="submit"
              isLoading={isSearching}
              loadingText="Searching..."
              disabled={isSearched || isSearching}
            >
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchFilters;
