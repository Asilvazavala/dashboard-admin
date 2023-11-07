"use client"

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/modals/store.modal';

export const ModalProvider = () => {
  const [isMounted, setIsMonunted] = useState(false);

  useEffect(() => {
    setIsMonunted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};