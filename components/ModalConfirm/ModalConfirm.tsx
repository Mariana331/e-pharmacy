import css from './ModalConfirm.module.css';

interface ModalConfirmProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function ModalConfirm({ onClose, isOpen }: ModalConfirmProps) {
  if (!isOpen) return null;
}
