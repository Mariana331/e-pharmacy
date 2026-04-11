'use client';

import ModalAddMedicine from '@/components/ModalAddMedicine/ModalAddMedicine';
import { useRouter } from 'next/navigation';

export default function AddMedicinePage() {
  const router = useRouter();

  return <ModalAddMedicine isOpen={true} onClose={() => router.back()} />;
}
