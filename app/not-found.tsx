import Button from '@/components/Button/Button';
import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`container ${css.wrapper}`}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>
        Sorry, the page you are looking for does not exist.
      </p>

      <Button href="/" size="lg">
        Go Home
      </Button>
    </div>
  );
}
