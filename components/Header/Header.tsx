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

  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const shop = shopStore((state) => state.shop);

  const handleLogout = async () => {
    await Logout();
    clearUser();
    router.push('/login');
  };

  const isAuthenticated = !!user;

  return (
    <header className={css.header}>
      <div className={isAuthenticated ? 'container' : 'container_beforeAuth'}>
        <div className={css.header_container}>
          <div className={css.logo}>
            <Link href={isAuthenticated ? '/shop/create' : '/'}>
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

            <Link
              className={css.link_text}
              href={isAuthenticated ? '/shop/create' : '/'}
            >
              E-Pharmacy
            </Link>
          </div>

          <nav className={css.nav}>
            <ul className={css.nav_list}>
              {isAuthenticated && user && (
                <>
                  <li className={css.nav_item}>
                    <Link href="/shop/create">Shop</Link>
                  </li>
                  <li className={css.nav_item}>
                    <Link
                      href={
                        shop?._id
                          ? `/shop/${shop._id}/product`
                          : '/shop/create'
                      }
                    >
                      Medicine
                    </Link>
                  </li>
                </>
              )}
              <li className={css.nav_item}>
                <Link href="/statistics">Statistics</Link>
              </li>
            </ul>
          </nav>

          {isAuthenticated && user && (
            <>

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
