'use client';

import ModalEditMedicine from '@/components/ModalEditMedicine/ModalEditMedicine';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { shopStore } from '@/lib/store/shopStore';
import { GetProductById } from '@/lib/api/clientApi';
import { useParams } from 'next/navigation';

export default function EditMedicineClient() {
  const { shopId, productId } = useParams<{
    shopId: string;
    productId: string;
  }>();
  const router = useRouter();
  const { product, setProduct } = shopStore();

  const currentProductId = product?._id;

  useEffect(() => {
    if (currentProductId === productId) return;

    GetProductById(shopId, productId)
      .then((res) => setProduct(res.data.product))
      .catch(() => router.back());
  }, [shopId, productId, currentProductId, setProduct, router]);

  if (!product) return null;

  return <ModalEditMedicine isOpen={true} onClose={() => router.back()} />;
}
