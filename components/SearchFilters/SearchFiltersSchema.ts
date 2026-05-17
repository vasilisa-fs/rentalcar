import * as Yup from 'yup';

export const FiltersSchema = Yup.object().shape({
  brand: Yup.string(),
  price: Yup.string(),
  minMileage: Yup.number()
    .typeError('Please enter a valid number')
    .min(0, 'Mileage cannot be negative'),
  maxMileage: Yup.number()
    .typeError('Please enter a valid number')
    .min(
      Yup.ref('minMileage'),
      'Maximum mileage cannot be less than minimum mileage'
    ),
});
