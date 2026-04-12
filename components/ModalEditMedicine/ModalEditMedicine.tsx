// import css from './ModalEditMedicine.module.css';
// import Modal from '../Modal/Modal';
// import Image from 'next/image';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm, Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { ApiError } from '@/app/api/api';
// import Select from 'react-select';
// import { AddProductData } from '@/types/product';

// interface ModalEditMedicineProps {
//   onClose: () => void;
//   isOpen: boolean;
// }

// const categoryOptions = [
//   { value: 'Hand', label: 'Hand' },
//   { value: 'Head', label: 'Head' },
//   { value: 'Medicine', label: 'Medicine' },
//   { value: 'Leg', label: 'Leg' },
//   { value: 'Dental Care', label: 'Dental Care' },
//   { value: 'Heart', label: 'Heart' },
// ];

// export const productSchema = Yup.object({
//   photo: Yup.string(),
//   name: Yup.string().min(3).max(20),
//   price: Yup.number().typeError('Price must be a number'),
//   category: Yup.string().oneOf(
//     ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'],
//     'Invalid category',
//   ),
// });

// export default function ModalEditMedicine({
//   onClose,
//   isOpen,
// }: ModalEditMedicineProps) {
//   const {
//     register,
//     control,
//     formState: { errors },
//   } = useForm<AddProductData>({
//     resolver: yupResolver(productSchema),
//     mode: 'onSubmit',
//   });
//   if (!isOpen) return null;
//   return (
//     <Modal onClose={onClose}>
//       <div className={css.add_modal}>
//         <button className={css.btn_close} type="button" onClick={onClose}>
//           <svg className={css.icon_close} width={20} height={20}>
//             <use href="/sprite.svg#icon-cross" />
//           </svg>
//         </button>
//         <form className={css.form}>
//           <p className={css.form_title}>Edit medicine</p>
//           <div className={css.form_image}>
//             <Image
//               className={css.image}
//               width={130}
//               height={130}
//               src="/addMedicine/Object.svg"
//               alt="photo"
//             />
//             <div className={css.attachment}>
//               <svg className={css.upload}>
//                 <use href="/sprite.svg#icon-attachment" />
//               </svg>
//               <p className={css.upload_text}>Upload image</p>
//             </div>
//           </div>

//           <div className={css.input_wrapper}>
//             <div className={css.input_box}>
//               <label className={css.form_label}>Medicine Name</label>
//               <input
//                 {...register('name')}
//                 className={css.form_input}
//                 type="text"
//                 placeholder="Enter text"
//               />
//               {errors.name && (
//                 <p className={css.error_text}>{errors.name.message}</p>
//               )}
//             </div>

//             <div className={css.input_box}>
//               <label className={css.form_label}>Price</label>
//               <input
//                 {...register('price')}
//                 className={css.form_input}
//                 type="text"
//                 placeholder="Enter text"
//               />
//               {errors.price && (
//                 <p className={css.error_text}>{errors.price.message}</p>
//               )}
//             </div>
//             <div className={css.input_box}>
//               <label className={css.form_label}>Category</label>
//               <Controller
//                 name="category"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     unstyled
//                     placeholder="Type of pet"
//                     options={categoryOptions}
//                     value={
//                       categoryOptions.find(
//                         (opt) => opt.value === field.value,
//                       ) || null
//                     }
//                     onChange={(selected) => field.onChange(selected?.value)}
//                     styles={{
//                       control: (base, state) => ({
//                         ...base,

//                         border: state.isFocused
//                           ? '1px solid #59b17a'
//                           : '1px solid rgba(38, 38, 38, 0.15)',
//                       }),
//                     }}
//                     classNames={{
//                       control: () => css.control_pet,
//                       valueContainer: () => css.valueContainer,
//                       singleValue: () => css.singleValue,
//                       indicatorsContainer: () => css.indicators,
//                       option: (state) =>
//                         state.isSelected ? css.optionSelected : css.option,
//                       menu: () => css.menu,
//                       menuList: () => css.menuList,
//                       placeholder: () => css.placeholder,
//                     }}
//                   />
//                 )}
//               />
//               {errors.category && (
//                 <p className={css.error_text}>{errors.category.message}</p>
//               )}
//             </div>
//           </div>
//           <div className={css.form_btn}>
//             <button className={css.btn_add} type="submit">
//               Save medicine
//             </button>
//             <button className={css.btn_cancel} type="button">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }
