import { ModalContext } from "@/contexts/ModalContext";
import ModalsEnum from "@/enums/Modals";
import { ReactNode, useContext } from "react";

export default function useModals() {
    const { toggleModal, closeModal } = useContext(ModalContext);

    const toggleModalAction = (modal: ModalsEnum, body: ReactNode) => {
        toggleModal(modal, body);
    };

    const closeModalAction = (modal: ModalsEnum) => {
        closeModal(modal);
    };

    return { toggleModalAction, closeModalAction };
}
