import css from './page.module.css';
import Button from '@/components/Button/Button';

const Home = () => {
  return (
    <main>
      <section className={css.home_section}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Button href="/catalog" size="lg">
          View Catalog
        </Button>
      </section>
    </main>
  );
};

export default Home;
