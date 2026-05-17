export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  location: {
    country: string;
    city: string;
    address: string;
  };
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
  perPage: number;
}

export interface CarFilters {
  brand?: string;
  price?: string;
  minMileage?: string;
  maxMileage?: string;
}

export interface FiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}
