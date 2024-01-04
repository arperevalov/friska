import ModalsEnum from "@/enums/Modals";
import FormNewCard from "@/components/forms/FormNewCard";
import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalTitle from "@/components/modal/ModalTitle";
import useModals from "@/hooks/useModals";

interface ModalsProps {
    modals: { [ModalsEnum.FormNewCard]: boolean };
}

export default function Modals(props: ModalsProps) {
    const { modals } = props;
    const { toggleModalAction } = useModals();

    const hideFormNewCard = () => {
        toggleModalAction(ModalsEnum.FormNewCard);
    };

    return (
        <>
            <Modal show={modals[ModalsEnum.FormNewCard]} onHide={hideFormNewCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                <FormNewCard onSubmit={hideFormNewCard} />
            </Modal>
        </>
    );
}
