import Link from 'next/link';
import css from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  disabled?: boolean;
};

const Button = ({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled,
}: ButtonProps) => {
  const classes = `${css.button} ${css[variant]} ${css[size]}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
