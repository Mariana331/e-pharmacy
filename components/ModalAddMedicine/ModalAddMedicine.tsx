'use client';

import css from './ModalAddMedicine.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { ApiError } from '@/app/api/api';
import Select from 'react-select';
import type { ChangeEvent } from 'react';
import { AddProductData } from '@/types/product';
import { AddProduct } from '@/lib/api/clientApi';
import { shopStore } from '@/lib/store/shopStore';

interface ModalAddMedicineProps {
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
  photo: Yup.string().required(),
  name: Yup.string().min(3).max(20).required('Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  category: Yup.string()
    .oneOf(
      ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'],
      'Invalid category',
    )
    .required('Category is required'),
});

export default function ModalAddMedicine({
  onClose,
  isOpen,
}: ModalAddMedicineProps) {
  const { shop } = shopStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddProductData>({
    resolver: yupResolver(productSchema),
    mode: 'onSubmit',
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setValue('photo', 'uploaded', { shouldValidate: true });
  };

  if (!shop) return null;

  const onSubmit = async (data: AddProductData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', String(data.price));
      formData.append('category', data.category);
      if (imageFile) {
        formData.append('photo', imageFile);
      }

      await AddProduct(shop._id, formData);
      toast.success('AddProduct successfully!');
      reset();
      onClose();
    } catch (error) {
      const message =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        'Oops... some error';
      toast.error(message);
    }
  };

  if (!isOpen) return null;
  return (
    <Modal onClose={onClose}>
      <div className={css.add_modal}>
        <button className={css.btn_close} type="button" onClick={onClose}>
          <svg className={css.icon_close} width={20} height={20}>
            <use href="/sprite.svg#icon-cross" />
          </svg>
        </button>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={css.form_title}>Add medicine to store</p>
          <div className={css.form_image}>
            {preview ? (
              <Image
                className={css.image}
                width={130}
                height={130}
                src={preview}
                alt="photo"
              />
            ) : (
              <>
                <Image
                  className={css.image}
                  width={130}
                  height={130}
                  src="/addMedicine/Object.svg"
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
              </>
            )}
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
                    placeholder="Category"
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
              Add medicine
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
