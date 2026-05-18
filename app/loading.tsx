import css from './loading.module.css';

const Loading = () => {
  return (
    <div className={`container ${css.wrapper}`}>
      <div className={css.spinner}></div>

      <p className={css.text}>🚘 Loading cars, please wait...</p>
    </div>
  );
};

export default Loading;
