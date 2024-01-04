import { ModalContext } from "@/contexts/ModalContext";
import ModalsEnum from "@/enums/Modals";
import { useContext } from "react";

export default function useModals() {
    const { toggleModal } = useContext(ModalContext);

    const toggleModalAction = (modal: ModalsEnum) => {
        toggleModal(modal);
    };

    return { toggleModalAction };
}
