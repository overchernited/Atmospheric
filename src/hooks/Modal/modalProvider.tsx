"use client"

import { createContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (
    title: string,
    content: ReactNode,
  ) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
  modalTitle: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (
    title: string,
    content: ReactNode,
    closeOnClick?: boolean // Nueva opción opcional
  ) => {
    setModalTitle(title);
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");

  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalContent,
        modalTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
