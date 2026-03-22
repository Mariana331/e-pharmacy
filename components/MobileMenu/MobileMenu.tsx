'use client';
import css from './MobileMenu.module.css';
import Link from 'next/link';
import { User } from '@/types/user';
import { shopStore } from '@/lib/store/shopStore';

interface MobileMenuProps {
  handleLogout: () => void;
  onClose: () => void;
  isOpenMobileMenu: boolean;
  user: User;
}

export const MobileMenu = ({
  handleLogout,
  onClose,
  isOpenMobileMenu,
  user,
}: MobileMenuProps) => {
  const { shop } = shopStore();

  if (!isOpenMobileMenu) return null;
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.mobile_menu}>
        <button className={css.close_btn} type="button" onClick={onClose}>
          <svg className={css.close_icon} width={32} height={32}>
            <use href="/sprite.svg#icon-cross" />
          </svg>
        </button>

        <nav className={css.mobile_nav}>
          <ul className={css.nav_list}>
            <li className={css.nav_item}>
              <Link
                href={shop ? `/shop/${shop._id}` : '/shop/create'}
                onClick={onClose}
              >
                Shop
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/medicine" onClick={onClose}>
                Medicine
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/statistics" onClick={onClose}>
                Statistics
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.btn_box}>
          <p className={css.user}>{user.name}</p>
          <button
            className={css.logout_btn}
            type="button"
            onClick={() => (handleLogout(), onClose())}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
