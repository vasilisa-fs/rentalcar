'use client';

import { useEffect } from 'react';
import Button from '@/components/Button/Button';
import css from './error.module.css';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`container ${css.wrapper}`}>
      <h1 className={css.title}>Something went wrong</h1>
      <p className={css.text}>
        An unexpected error has occurred.
      </p>

      <Button onClick={() => reset()} size="lg">
        Try again
      </Button>
    </div>
  );
}