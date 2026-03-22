'use client';
import css from './EditShopForm.module.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Resolver } from 'react-hook-form';
import { CreateShopData, ShopResponse } from '@/types/shop';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateShop } from '@/lib/api/clientApi';
import { shopStore } from '@/lib/store/shopStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ApiError {
  message: string;
}

const Schema = Yup.object().shape({
  name: Yup.string(),
  owner: Yup.string(),
  email: Yup.string(),
  phone: Yup.string().matches(/^\+?[0-9]{10,13}$/, 'Invalid phone number'),
  street: Yup.string(),
  city: Yup.string(),
  zip: Yup.string(),
  delivery: Yup.boolean(),
});
type ShopFormData = Yup.InferType<typeof Schema>;

export default function EditShopForm() {
  const router = useRouter();
  const { shop, setShop } = shopStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShopFormData>({
    resolver: yupResolver(Schema) as unknown as Resolver<ShopFormData>,
    mode: 'onSubmit',
    defaultValues: {
      name: shop?.name,
      owner: shop?.owner,
      email: shop?.email,
      phone: shop?.phone,
      street: shop?.street,
      city: shop?.city,
      zip: shop?.zip,
      delivery: shop?.delivery,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<
    ShopResponse,
    AxiosError<ApiError>,
    CreateShopData
  >({
    mutationFn: (data: CreateShopData) => UpdateShop(shop!._id, data),
    onSuccess: (data) => {
      const updateShop = data.data.shop;
      setShop(updateShop);
      toast.success('Shop updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['shops', updateShop._id] });
      router.push(`/shop/${updateShop!._id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = async (data: ShopFormData) => {
    if (!shop) return;
    const payload: CreateShopData = {
      name: data.name ?? shop.name,
      owner: data.owner ?? shop.owner,
      email: data.email ?? shop.email,
      phone: data.phone ?? shop.phone,
      street: data.street ?? shop.street,
      city: data.city ?? shop.city,
      zip: data.zip ?? shop.zip,
      delivery: String(data.delivery) === 'true',
    };
    mutation.mutate(payload);
  };

  if (!shop) return null;
  return (
    <div className={css.shopForm}>
      <div className="container">
        <div className={css.create_shop_wrapper}>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={css.title}>Edit data</h2>
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
                    defaultChecked={shop?.delivery === true}
                  />
                  <label className={css.radio}>Yes</label>
                </div>
                <div className={css.radio_wrapper}>
                  <input
                    className={css.input_radio}
                    {...register('delivery')}
                    type="radio"
                    value="false"
                    defaultChecked={shop?.delivery === false}
                  />
                  <label className={css.radio}>No</label>
                </div>
              </div>
              <button className={css.btn_create} type="submit">
                Save
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
