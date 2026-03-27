'use client';

import css from './ProductDetailsClient.module.css';
import { GetProductById } from '@/lib/api/clientApi';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

type Tab = 'description' | 'reviews';

export default function ProductDetailsClient() {
  const { shopId, productId } = useParams<{
    shopId: string;
    productId: string;
  }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', shopId, productId],
    queryFn: () => GetProductById(shopId, productId),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const [activeTab, setActiveTab] = useState<Tab>('description');

  const response = data?.data;
  const product = response?.product;
  const reviews = response?.reviews;

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !product) return <p>Something went wrong.</p>;

  return (
    <div className={css.product_box}>
      <div className="container">
        <div className={css.product}>
          <div className={css.product_wrapper}>
            <div className={css.box_image}>
              <Image
                className={css.image}
                src={product.photo}
                alt="shop"
                width={335}
                height={300}
              />
            </div>
            <div className={css.product_info}>
              <div className={css.product_data}>
                <p className={css.data}>{product.name}</p>
                <p className={css.price}>৳{product.price}</p>
              </div>
              <p className={css.category}>category: {product.category}</p>
              <div className={css.product_btns}>
                <button className={css.btn_add} type="button">
                  Add to shop
                </button>
              </div>
            </div>
          </div>

          <div className={css.box_details}>
            <div className={css.tab}>
              <button
                className={`${css.description} ${activeTab === 'description' ? css.active : ''}`}
                type="button"
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`${css.review} ${activeTab === 'reviews' ? css.active : ''}`}
                type="button"
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            {activeTab === 'description' && (
              <p className={css.text_description}>
                Although it&apos;s typically considered safe, excessive
                consumption can lead to side effects. Therefore, it&apos;s
                recommended to consult a healthcare professional before using
                moringa, especially if you&apos;re pregnant, nursing, or taking
                other medications.
                <br />
                <br />
                <span className={css.span}>
                  Medicinal Uses: Antioxidant Properties:
                </span>{' '}
                Moringa is packed with antioxidants that help fight oxidative
                stress.
                <br />
                <br />
                <span className={css.span}>Anti-Diabetic Effects:</span> Some
                studies have shown that moringa leaves might lower blood sugar
                levels.
                <br />
                <br />
                <span className={css.span}>Heart Health:</span> The plant has
                been linked to reduced cholesterol levels.
                <br />
                <br />
                <span className={css.span}>Anti-Cancer Properties:</span>{' '}
                Certain compounds in moringa, such as niazimicin, have been
                found to suppress cancer cells.
                <br />
                <br />
                <span className={css.span}>Immune Support:</span> With its high
                vitamin C content, moringa can boost the immune system.
                <br />
                <br />
                <span className={css.span}>Digestive Aid:</span> Moringa can
                help in treating digestive disorders due to its
                anti-inflammatory properties.
              </p>
            )}
            {activeTab === 'reviews' && reviews && reviews.length > 0 && (
              <ul className={css.review_list}>
                {reviews.map((review) => (
                  <li className={css.review_item} key={review._id}>
                    <h3 className={css.review_title}>{review.name}</h3>
                    <p className={css.review_time}>2 days ago</p>
                    <p className={css.review_text}>{review.testimonial}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
