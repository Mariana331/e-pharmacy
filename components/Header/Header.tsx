'use client';

import css from './Header.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { Logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { useState } from 'react';
import { shopStore } from '@/lib/store/shopStore';

const Header = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const router = useRouter();
  const { shop } = shopStore();
  const { isAuthenticated, clearIsAuthenticated, user } = useAuthStore();
  const handleLogout = async () => {
    await Logout();
    clearIsAuthenticated();
    router.push('/login');
  };
  return (
    <header className={css.header}>
      <div className={isAuthenticated ? 'container' : 'container_beforeAuth'}>
        <div className={css.header_container}>
          <div className={css.logo}>
            {' '}
            <Link href="/">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/logo/green.mob.svg"
                />
                <source
                  media="(max-width: 1440px)"
                  srcSet="/logo/green.desk.svg"
                />
                <img
                  className={css.image}
                  src="/logo/green.desk.svg"
                  alt="logo"
                />
              </picture>
            </Link>
            {isAuthenticated ? (
              <Link className={css.link_text} href="/shop/create">
                E-Pharmacy
              </Link>
            ) : (
              <Link className={css.link_text} href="/">
                E-Pharmacy
              </Link>
            )}
          </div>
          {isAuthenticated && user && (
            <>
              <nav className={css.nav}>
                <ul className={css.nav_list}>
                  <li className={css.nav_item}>
                    <Link href={shop ? `/shop/${shop._id}` : '/shop/create'}>
                      Shop
                    </Link>
                  </li>
                  <li className={css.nav_item}>
                    <Link href="/medicine">Medicine</Link>
                  </li>
                  <li className={css.nav_item}>
                    <Link href="/statistics">Statistics</Link>
                  </li>
                </ul>
              </nav>
              <div className={css.btns}>
                <p className={css.user}>{user.name}</p>
                <button
                  className={css.log_btn}
                  type="button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
                <button
                  className={css.burger}
                  type="button"
                  onClick={() => setIsOpenMobileMenu(true)}
                >
                  <svg className={css.burger_icon} width={32} height={26}>
                    <use href="/sprite.svg#icon-burger" />
                  </svg>
                </button>
                <MobileMenu
                  handleLogout={handleLogout}
                  onClose={() => setIsOpenMobileMenu(false)}
                  isOpenMobileMenu={isOpenMobileMenu}
                  user={user}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
