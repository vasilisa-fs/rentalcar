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
  isLoading?: boolean;
  loadingText?: string;
  target?: '_blank' | '_self';
};

const Button = ({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled,
  isLoading,
  target,
  loadingText,
}: ButtonProps) => {
  const classes = `${css.button} ${css[variant]} ${css[size]}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={classes}
    >
      {isLoading ? (loadingText ?? children) : children}
    </button>
  );
};

export default Button;
