'use client';

import { useMutation } from '@tanstack/react-query';
import { submitBooking } from '@/lib/serverApi';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import { BookingFormSchema } from './BookingFormSchema';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';
import Button from '../Button/Button';

interface Props {
  carId: string;
}

interface BookingFormValues {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  bookingDate: '',
  comment: '',
};

const BookingForm = ({ carId }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, email, comment }: BookingFormValues) =>
      submitBooking(carId, { name, email, comment }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const handleSubmit = (
    values: BookingFormValues,
    actions: FormikHelpers<BookingFormValues>
  ) => {
    mutate(values, {
      onSuccess: () => actions.resetForm(),
    });
  };

  return (
    <div className={css.card}>
      <h2 className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingFormSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className={css.form} noValidate>
            {/* Name */}
            <Field name="name">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <div className={css.fieldWrapper}>
                    <input
                      {...field}
                      type="text"
                      placeholder="Name*"
                      className={`${css.input} ${hasError ? css.inputError : ''}`}
                    />
                    {hasError && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </div>
                );
              }}
            </Field>

            {/* Email */}
            <Field name="email">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <div className={css.fieldWrapper}>
                    <input
                      {...field}
                      type="email"
                      placeholder="Email*"
                      className={`${css.input} ${hasError ? css.inputError : ''}`}
                    />
                    {hasError && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </div>
                );
              }}
            </Field>

            {/* Booking Date */}
            <div className={css.fieldWrapper}>
              <DatePicker
                selected={
                  values.bookingDate ? new Date(values.bookingDate) : null
                }
                onChange={(date: Date | null) =>
                  setFieldValue(
                    'bookingDate',
                    date ? date.toISOString().split('T')[0] : ''
                  )
                }
                placeholderText="Booking date"
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                className={css.input}
                wrapperClassName={css.datepickerWrapper}
                calendarStartDay={1}
                fixedHeight={false}
                showPopperArrow
                formatWeekDay={(nameOfDay) =>
                  nameOfDay.slice(0, 3).toUpperCase()
                }
              />
            </div>

            {/* Comment */}
            <Field name="comment">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <div className={css.fieldWrapper}>
                    <textarea
                      {...field}
                      placeholder="Comment"
                      className={`${css.textarea} ${hasError ? css.inputError : ''}`}
                      rows={4}
                    />
                    {hasError && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </div>
                );
              }}
            </Field>

            <Button type="submit" size="md" disabled={isPending}>
              {isPending ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
