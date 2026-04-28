'use client';
import ModalConfirm from '@/components/ModalConfirm/ModalConfirm';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { DeleteProductById } from '@/lib/api/clientApi';
import { shopStore } from '@/lib/store/shopStore';

export default function DeleteMedicineClient() {
  const router = useRouter();
  const { shopId, productId } = useParams<{
    shopId: string;
    productId: string;
  }>();

  const { removeFromDrugStore } = shopStore();

  const handleConfirm = async () => {
    try {
      await DeleteProductById(shopId, productId);
      removeFromDrugStore(productId);
      router.refresh();
      router.back();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <ModalConfirm
      isOpen={true}
      onClose={() => router.back()}
      onConfirm={handleConfirm}
    />
  );
}
