'use client';

import css from './ShopDetailsClient.module.css';
import { GetShopById } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ShopProductClient from './product/ShopProductsClient';
import { shopStore } from '@/lib/store/shopStore';

type Tab = 'store' | 'medicine';

export default function ShopDetailsClient() {
  const [activeTab, setActiveTab] = useState<Tab>('store');
  const { shopId } = useParams<{ shopId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['shops', shopId],
    queryFn: () => GetShopById(shopId),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const { drugStore } = shopStore();
  if (drugStore.length === 0)
    return <p>No products added yet. Go to All medicine and add some.</p>;

  const shop = data?.data?.shop;
  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !shop) return <p>Something went wrong.</p>;

  return (
    <div className={css.shop}>
      <div className="container">
        <div className={css.shop_container}>
          <div className={css.shop_desk}>
            <p className={css.shop_name}>{shop.name}</p>
            <div className={css.box_info}>
              <div className={css.shop_info}>
                <p className={css.shop_owner}>
                  Owner: <span className={css.shop_span}>{shop.owner}</span>
                </p>
                <div className={css.wrapper}>
                  <div className={css.shop_street}>
                    <svg className={css.map_icon} width={18} height={18}>
                      <use href="/sprite.svg#icon-map" />
                    </svg>
                    <p className={css.street_text}>{shop.street}</p>
                  </div>
                  <div className={css.shop_phone}>
                    <svg className={css.map_icon} width={18} height={18}>
                      <use href="/sprite.svg#icon-phone" />
                    </svg>
                    <p className={css.phone_text}>{shop.phone}</p>
                  </div>
                </div>
              </div>
              <div className={css.shop_links}>
                <Link href={`/shop/${shop._id}/update`} className={css.edit}>
                  Edit data
                </Link>
                <Link
                  href={`/shop/${shop._id}/product/add`}
                  className={css.add}
                >
                  Add medicine
                </Link>
              </div>
            </div>
          </div>
          <div className={css.tabs}>
            <div className={css.tab_wrapper}>
              <button
                type="button"
                className={`${css.store} ${activeTab === 'store' ? css.active : ''}`}
                onClick={() => setActiveTab('store')}
              >
                Drug store
              </button>
            </div>
            <div className={css.tab_wrapper}>
              <button
                type="button"
                className={`${css.medicine} ${activeTab === 'medicine' ? css.active : ''}`}
                onClick={() => setActiveTab('medicine')}
              >
                All medicine
              </button>
            </div>
          </div>
          {activeTab === 'medicine' && <ShopProductClient />}
        </div>
      </div>
    </div>
  );
}
