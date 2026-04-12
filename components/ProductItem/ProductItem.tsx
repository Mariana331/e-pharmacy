'use client';
import css from './ProductItem.module.css';
import Image from 'next/image';
import { Product } from '@/types/product';
import Link from 'next/link';
import { shopStore } from '@/lib/store/shopStore';

interface ProductItemProps {
  product: Product;
}

const getPhotoUrl = (photo: string) => {
  if (photo.startsWith('http')) return photo;
  return `${process.env.NEXT_PUBLIC_API_URL}${photo}`;
};

export default function ProductItem({ product }: ProductItemProps) {
  const { shop, addProductToDrugStore } = shopStore();
  const handleAdd = () => {
    addProductToDrugStore(product);
  };
  return (
    <div className={css.product}>
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
          <button className={css.btn_add} type="button" onClick={handleAdd}>
            Add to shop
          </button>
          <Link
            href={`/shop/${shop?._id}/product/${product._id}`}
            className={css.details}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
