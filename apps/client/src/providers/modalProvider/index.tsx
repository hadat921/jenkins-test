import { ReactNode, createContext, useContext, useState } from "react";

interface IModalProps {
  children: ReactNode;
}

type TModal = "signin" | "signup";

type ModalContext = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  type: "signup" | "signin";
  setTypeModal: (type: TModal) => void;
};

export const ModalContext = createContext<ModalContext>({
  isOpen: true,
  onClose: () => {},
  onOpen: () => {},
  type: "signin",
  setTypeModal: () => {},
});

export const ModalProvider: React.FC<IModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState<TModal>("signin");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSetTypeModal = (type: TModal) => {
    setTypeModal(type);
  };
  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpen,
        onClose: handleClose,
        onOpen: handleOpen,
        type: typeModal,
        setTypeModal: handleSetTypeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
