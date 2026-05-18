import axios from 'axios';

import { Car, CarsResponse, CarFilters, FiltersResponse } from '@/types/cars';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchCars = async (
  page: number = 1,
  limit: number = 12,
  filters: CarFilters = {}
): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>('/cars', {
    params: {
      page,
      perPage: limit,
      ...filters,
    },
  });

  return data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const { data } = await api.get<Car>(`/cars/${id}`);

  return data;
};

export const fetchFilters = async (): Promise<FiltersResponse> => {
  const { data } = await api.get<FiltersResponse>('/cars/filters');

  return data;
};

export const submitBooking = async (
  carId: string,
  body: {
    name: string;
    email: string;
    comment?: string;
  }
): Promise<{ message: string }> => {
  const { data } = await api.post(`/cars/${carId}/booking-requests`, body);

  return data;
};
