import { useState } from 'react';

export const useModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  return { openModal, handleCloseModal, handleOpenModal };
};
