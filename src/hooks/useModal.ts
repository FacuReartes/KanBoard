import { useState } from "react";

export const useModal = () => {
  
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  return {openModal, handleCloseModal, handleOpenModal}

}