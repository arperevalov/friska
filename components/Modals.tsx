import ModalsEnum from "@/enums/Modals";
import FormNewCard from "@/components/forms/FormNewCard";
import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalTitle from "@/components/modal/ModalTitle";
import useModals from "@/hooks/useModals";
import FormUpdateCard from "./forms/FormUpdateCard";

interface ModalsProps {
    modals: {
        [ModalsEnum.FormNewCard]: {
            state: boolean;
            parameters: string | number | null;
        };
        [ModalsEnum.FormUpdateCard]: {
            state: boolean;
            parameters: number | null;
        };
    };
}

export default function Modals(props: ModalsProps) {
    const { modals } = props;
    const { toggleModalAction } = useModals();

    const hideFormNewCard = () => {
        toggleModalAction(ModalsEnum.FormNewCard);
    };

    const hideFormUpdateCard = () => {
        toggleModalAction(ModalsEnum.FormUpdateCard);
    };

    return (
        <>
            <Modal show={modals[ModalsEnum.FormNewCard].state} onHide={hideFormNewCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                <FormNewCard onSubmit={hideFormNewCard} />
            </Modal>
            <Modal show={modals[ModalsEnum.FormUpdateCard].state} onHide={hideFormUpdateCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                <FormUpdateCard onSubmit={hideFormUpdateCard} parameters={modals[ModalsEnum.FormUpdateCard]?.parameters} />
            </Modal>
        </>
    );
}
