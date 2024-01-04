import { ModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";

export default function useModals() {
    const { toggleModal } = useContext(ModalContext);

    const toggleModalAction = () => {
        toggleModal();
    };

    return { toggleModalAction };
}
