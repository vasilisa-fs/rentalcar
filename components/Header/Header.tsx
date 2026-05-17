'use client';

import css from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link href="/" className={css.logo_link}>
          <svg className={css.logo}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>
        <nav className={css.navigation}>
          <ul className={css.navigation_list}>
            <li>
              <Link
                href="/"
                className={`${css.navigation_link} ${pathname === '/' ? css.active : ''}`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={`${css.navigation_link} ${pathname === '/catalog' ? css.active : ''}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
