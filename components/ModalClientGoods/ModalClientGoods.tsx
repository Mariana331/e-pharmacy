import css from './ModalClientGoods.module.css';

interface ModalClientGoodsProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function ModalClientsGoods({
  onClose,
  isOpen,
}: ModalClientGoodsProps) {
  if (!isOpen) return null;
}
