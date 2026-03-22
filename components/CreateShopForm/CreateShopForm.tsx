'use client';
import css from './CreateShopForm.module.css';
// import Link from 'next/link';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CreateShopData } from '@/types/shop';
import { CreateShop } from '@/lib/api/clientApi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import { shopStore } from '@/lib/store/shopStore';

const Schema = Yup.object({
  name: Yup.string().min(3).max(30).required('Name is required'),
  owner: Yup.string().min(3).max(30).required('Name is required'),
  email: Yup.string()
    .email('Enter a valid Email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,13}$/, 'Phone must be a valid number')
    .required('Phone is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  zip: Yup.string().required('Zip is required'),
  delivery: Yup.boolean().required('Choose delivery option'),
});

export default function CreateShopForm() {
  const { setShop } = shopStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShopData>({
    resolver: yupResolver(Schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: CreateShopData) => {
    try {
      const response = await CreateShop(data);
      const shop = response.data.shop;

      if (shop) {
        setShop(shop);
        toast.success('Shop successful!');
        reset();
        router.push(`/shop/${shop._id}`);
      } else {
        toast('Invalid shop');
      }
    } catch (error) {
      const message =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        'Oops... some error';
      toast.error(message);
    }
  };
  return (
    <div className={css.shopForm}>
      <div className="container">
        <div className={css.create_shop_wrapper}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.title}>Create your Shop</h2>
            <p className={css.text}>
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className={css.input_wrapper}>
              <div className={css.input_box}>
                <label className={css.form_label}>Shop Name</label>
                <input
                  {...register('name')}
                  className={css.form_input}
                  type="text"
                  placeholder="Enter text"
                />
                {errors.name && (
                  <p className={css.error_text}>{errors.name.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>Shop Owner Name</label>
                <input
                  {...register('owner')}
                  className={css.form_input}
                  type="text"
                  placeholder="Enter text"
                />
                {errors.owner && (
                  <p className={css.error_text}>{errors.owner.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>Email address</label>
                <input
                  {...register('email')}
                  className={css.form_input}
                  type="email"
                  placeholder="Enter text"
                />
                {errors.email && (
                  <p className={css.error_text}>{errors.email.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>Phone Number</label>
                <input
                  {...register('phone')}
                  className={css.form_input}
                  type="tel"
                  placeholder="Enter text"
                />
                {errors.phone && (
                  <p className={css.error_text}>{errors.phone.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>Street address</label>
                <input
                  {...register('street')}
                  className={css.form_input}
                  type="text"
                  placeholder="Enter text"
                />
                {errors.street && (
                  <p className={css.error_text}>{errors.street.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>City</label>
                <input
                  {...register('city')}
                  className={css.form_input}
                  type="text"
                  placeholder="Enter text"
                />
                {errors.city && (
                  <p className={css.error_text}>{errors.city.message}</p>
                )}
              </div>

              <div className={css.input_box}>
                <label className={css.form_label}>Zip / Postal</label>
                <input
                  {...register('zip')}
                  className={css.form_input}
                  type="number"
                  placeholder="Enter text"
                />
                {errors.zip && (
                  <p className={css.error_text}>{errors.zip.message}</p>
                )}
              </div>
            </div>
            <div className={css.btns}>
              <p className={css.radio_text}>Has own Delivery System?</p>
              <div className={css.radio_box}>
                <div className={css.radio_wrapper}>
                  <input
                    className={css.input_radio}
                    {...register('delivery')}
                    type="radio"
                    value="true"
                  />
                  <label className={css.radio}>Yes</label>
                </div>
                <div className={css.radio_wrapper}>
                  <input
                    className={css.input_radio}
                    {...register('delivery')}
                    type="radio"
                    value="false"
                  />
                  <label className={css.radio}>No</label>
                </div>
              </div>
              <button className={css.btn_create} type="submit">
                Create account
              </button>
            </div>
          </form>
          <div className={css.image_box}>
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/shop/shop.mobile.jpg"
              />
              <source
                media="(max-width: 1440px)"
                srcSet="/shop/shop.tablet.jpg"
              />
              <img className={css.image} src="/shop/shop.desk.jpg" alt="shop" />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
