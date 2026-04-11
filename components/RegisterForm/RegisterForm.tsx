'use client';
import css from './RegisterForm.module.css';
import Link from 'next/link';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Register } from '@/lib/api/clientApi';
import { RegisterRequest } from '@/types/user';
import { ApiError } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';

export const Schema = Yup.object().shape({
  name: Yup.string().min(3).max(30).required('Name is required'),
  email: Yup.string()
    .email('Enter a valid Email')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,13}$/, 'Phone must be a valid number')
    .required('Phone is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(30, 'Maximum 30 characters')
    .required('Password is required'),
});

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, isAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(Schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await Register(data);
      const user = response.data.user;
      setUser(user);
      toast.success('Registration successful!');
      reset();
      router.push('/shop/create');
    } catch (error) {
      const message =
        (error as ApiError).response?.data?.error ??
        (error as ApiError).message ??
        'Oops... some error';
      toast.error(message);
    }
  };

  return (
    <div className={css.register_form}>
      <div className={isAuthenticated ? 'container' : 'container_beforeAuth'}>
        <div className={css.register_container}>
          <div className={css.register_title}>
            <div className={css.register_image}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/register/pill.mobile.svg"
                />
                <source
                  media="(max-width: 1440px)"
                  srcSet="/register/pill.desk.svg"
                />
                <img
                  className={css.image}
                  src="/register/pill.desk.svg"
                  alt="logo"
                />
              </picture>
            </div>
            <h1 className={css.title}>
              Your medication,<br></br> delivered Say goodbye<br></br> to all
              <span className={css.span_title}> your healthcare</span>
              <br></br>
              worries with us
            </h1>
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.input_name}>
              <input
                {...register('name')}
                className={css.form_input}
                type="text"
                placeholder="User Name"
              />
              {errors.name && (
                <p className={css.error_text}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.input_email}>
              <input
                {...register('email')}
                className={css.form_input}
                type="email"
                placeholder="Email address"
              />
              {errors.email && (
                <p className={css.error_text}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.input_tel}>
              <input
                {...register('phone')}
                className={css.form_input}
                type="tel"
                placeholder="Phone number"
              />
              {errors.phone && (
                <p className={css.error_text}>{errors.phone.message}</p>
              )}
            </div>

            <div className={css.input_password}>
              <button
                className={css.password_btn_eyes}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <svg width={18} height={18} className={css.password_eye_icon}>
                    <use href="/sprite.svg#icon-eye1"></use>
                  </svg>
                ) : (
                  <svg
                    width={18}
                    height={18}
                    className={css.password_eye_icon_off}
                  >
                    <use href="/sprite.svg#icon-eye-off"></use>
                  </svg>
                )}
              </button>
              <input
                {...register('password')}
                className={css.form_input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              {errors.password && (
                <p className={css.error_text}>{errors.password.message}</p>
              )}
            </div>

            <div className={css.btn}>
              <button className={css.btn_register} type="submit">
                Register
              </button>
              <Link href="/login" className={css.link}>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
