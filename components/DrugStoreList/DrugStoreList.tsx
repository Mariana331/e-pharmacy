'use client';

import css from './DrugStoreList.module.css';
import { shopStore } from '@/lib/store/shopStore';
import Image from 'next/image';
import Link from 'next/link';

const getPhotoUrl = (photo: string) => {
  if (photo.startsWith('http')) return photo;
  return `${process.env.NEXT_PUBLIC_API_URL}${photo}`;
};

export default function DrugStoreList() {
  const { drugStore, shop } = shopStore();

  return (
    <div className={css.drugStoreList}>
      {drugStore.map((product) => (
        <div className={css.product} key={product._id}>
          <div className={css.box_image}>
            <Image
              className={css.image}
              src={getPhotoUrl(product.photo)}
              alt="shop"
              width={335}
              height={300}
            />
          </div>
          <div className={css.product_info}>
            <div className={css.product_data}>
              <p className={css.data}>{product.name.slice(0, 14)}</p>
              <p className={css.data}>৳{product.price}</p>
            </div>
            <p className={css.category}>{product.category}</p>
            <div className={css.product_btns}>
              <Link
                href={`/shop/${shop?._id}/product/${product._id}/edit`}
                className={css.btn_add}
              >
                Edit
              </Link>
              <Link
                href={`/shop/${shop?._id}/product/${product._id}/delete`}
                className={css.btn_del}
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
