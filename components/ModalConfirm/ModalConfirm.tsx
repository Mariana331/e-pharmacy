import css from './ModalConfirm.module.css';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import { shopStore } from '@/lib/store/shopStore';

import { getPhotoUrl } from '@/lib/utils/photoUrl';

interface ModalConfirmProps {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
}

export default function ModalConfirm({
  onClose,
  isOpen,
  onConfirm,
}: ModalConfirmProps) {
  const { product } = shopStore();
  if (!isOpen || !product) return null;
  return (
    <Modal onClose={onClose}>
      <div className={css.confirm}>
        <button className={css.btn_close} type="button" onClick={onClose}>
          <svg className={css.icon_close} width={20} height={20}>
            <use href="/sprite.svg#icon-cross" />
          </svg>
        </button>
        <h2 className={css.confirm_title}>Confirm deletion</h2>
        <p className={css.confirm_text}>
          Are you sure you want to delete this item?
        </p>
        <div className={css.box_image}>
          <Image
            className={css.image}
            src={getPhotoUrl(product.photo)}
            alt="shop"
            width={335}
            height={300}
          />
        </div>
        <p className={css.confirm_name}>{product.name}</p>
        <p className={css.confirm_category}>{product.category}</p>
        <div className={css.confirm_btns}>
          <button className={css.btn_confirm} type="button" onClick={onConfirm}>
            Confirm
          </button>
          <button className={css.btn_cancel} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
