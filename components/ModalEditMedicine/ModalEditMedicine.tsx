'use client';

import css from './ModalEditMedicine.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ApiError } from '@/app/api/api';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Select from 'react-select';
import { EditProductById } from '@/lib/api/clientApi';
import { shopStore } from '@/lib/store/shopStore';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ModalEditMedicineProps {
  onClose: () => void;
  isOpen: boolean;
}

const categoryOptions = [
  { value: 'Hand', label: 'Hand' },
  { value: 'Head', label: 'Head' },
  { value: 'Medicine', label: 'Medicine' },
  { value: 'Leg', label: 'Leg' },
  { value: 'Dental Care', label: 'Dental Care' },
  { value: 'Heart', label: 'Heart' },
];

export const productSchema = Yup.object({
  photo: Yup.string(),
  name: Yup.string(),
  price: Yup.number(),
  category: Yup.string().oneOf([
    'Hand',
    'Head',
    'Medicine',
    'Leg',
    'Dental Care',
    'Heart',
  ]),
});

type AddProductData = Yup.InferType<typeof productSchema>;

export default function ModalEditMedicine({
  onClose,
  isOpen,
}: ModalEditMedicineProps) {
  const { shop, product, setProduct } = shopStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<AddProductData>({
    resolver: yupResolver(productSchema) as unknown as Resolver<AddProductData>,
    mode: 'onSubmit',
    defaultValues: {
      photo: product?.photo,
      name: product?.name,
      price: product?.price,
      category: product?.category,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        photo: product.photo,
        name: product.name,
        price: product.price,
        category: product.category,
      });
    }
  }, [product, reset]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setValue('photo', 'uploaded', { shouldValidate: true });
  };

  const onSubmit = async (data: AddProductData) => {
    if (!shop || !product) return;
    try {
      const formData = new FormData();
      formData.append('name', data.name ?? product.name);
      formData.append('price', String(data.price) ?? product.price);
      formData.append('category', data.category ?? product.category);
      if (imageFile) {
        formData.append('photo', imageFile);
      }

      const response = await EditProductById(shop._id, product._id, formData);
      const updatedProduct = response.data.product;
      setProduct(updatedProduct);
      toast.success('Product updated successfully!');
      onClose();
      router.push(`/shop/${shop._id}/product/${updatedProduct._id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.message ?? 'Something went wrong');
    }
  };

  const imageSrc = preview || product?.photo || '/addMedicine/Object.svg';

  if (!isOpen || !shop) return null;
  return (
    <Modal onClose={onClose}>
      <div className={css.add_modal}>
        <button className={css.btn_close} type="button" onClick={onClose}>
          <svg className={css.icon_close} width={20} height={20}>
            <use href="/sprite.svg#icon-cross" />
          </svg>
        </button>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={css.form_title}>Edit medicine</p>
          <div className={css.form_image}>
            <Image
              className={css.image}
              width={130}
              height={130}
              src={imageSrc}
              alt="photo"
            />
            <div className={css.attachment}>
              <label className={css.upload_text}>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
                <svg className={css.upload}>
                  <use href="/sprite.svg#icon-attachment" />
                </svg>
                Upload image
              </label>
            </div>
          </div>

          <div className={css.input_wrapper}>
            <div className={css.input_box}>
              <label className={css.form_label}>Medicine Name</label>
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
              <label className={css.form_label}>Price</label>
              <input
                {...register('price', { valueAsNumber: true })}
                className={css.form_input}
                type="number"
                placeholder="Enter text"
              />
              {errors.price && (
                <p className={css.error_text}>{errors.price.message}</p>
              )}
            </div>
            <div className={css.input_box}>
              <label className={css.form_label}>Category</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    unstyled
                    placeholder="Type of pet"
                    options={categoryOptions}
                    value={
                      categoryOptions.find(
                        (opt) => opt.value === field.value,
                      ) || null
                    }
                    onChange={(selected) => field.onChange(selected?.value)}
                    styles={{
                      control: (base, state) => ({
                        ...base,

                        border: state.isFocused
                          ? '1px solid #59b17a'
                          : '1px solid rgba(38, 38, 38, 0.15)',
                      }),
                    }}
                    classNames={{
                      control: () => css.control_pet,
                      valueContainer: () => css.valueContainer,
                      singleValue: () => css.singleValue,
                      indicatorsContainer: () => css.indicators,
                      option: (state) =>
                        state.isSelected ? css.optionSelected : css.option,
                      menu: () => css.menu,
                      menuList: () => css.menuList,
                      placeholder: () => css.placeholder,
                    }}
                  />
                )}
              />
              {errors.category && (
                <p className={css.error_text}>{errors.category.message}</p>
              )}
            </div>
          </div>
          <div className={css.form_btn}>
            <button className={css.btn_add} type="submit">
              Save medicine
            </button>
            <button className={css.btn_cancel} type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
