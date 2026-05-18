import * as Yup from 'yup';

const parseMileage = (value: number, originalValue: string | number) => {
  if (typeof originalValue === 'string') {
    const cleaned = originalValue.replace(/,/g, '');
    return cleaned === '' ? undefined : Number(cleaned);
  }
  return value;
};

export const SearchFiltersSchema = Yup.object().shape({
  brand: Yup.string(),
  price: Yup.string(),
  minMileage: Yup.number()
    .transform(parseMileage)
    .typeError('Please enter a valid number')
    .min(0, 'Mileage cannot be negative'),
  maxMileage: Yup.number()
    .transform(parseMileage)
    .typeError('Please enter a valid number')
    .min(0, 'Mileage cannot be negative')
    .test(
      'max-greater-than-min',
      'Maximum mileage cannot be less than minimum mileage',
      function (value) {
        const { minMileage } = this.parent;
        if (value == null || minMileage == null) {
          return true;
        }
        return value >= minMileage;
      }
    ),
});
