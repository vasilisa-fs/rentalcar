import * as Yup from 'yup';

export const BookingFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  bookingDate: Yup.string().optional(),
  comment: Yup.string().max(500, 'Comment cannot exceed 500 characters'),
});
