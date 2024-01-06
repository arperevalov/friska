import ModalsEnum from "@/enums/Modals";
import FormNewCard from "@/components/forms/FormNewCard";
import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalTitle from "@/components/modal/ModalTitle";
import useModals from "@/hooks/useModals";
import FormUpdateCard from "./forms/FormUpdateCard";
import FormNewList from "./forms/FormNewList";
import { ModalStateItemInterface } from "@/contexts/ModalContext";

interface ModalsProps {
    modals: ModalStateItemInterface[];
}

export default function Modals(props: ModalsProps) {
    const { modals } = props;
    const { toggleModalAction } = useModals();

    const getModalStateItem = (name: ModalsEnum) => {
        const index = modals.findIndex((item) => {
            return item.name === name;
        });

        return modals[index];
    };

    const hideFormNewList = () => {
        toggleModalAction(ModalsEnum.FormNewList);
    };

    const hideFormNewCard = () => {
        toggleModalAction(ModalsEnum.FormNewCard);
    };

    const hideFormUpdateCard = () => {
        toggleModalAction(ModalsEnum.FormUpdateCard);
    };

    return (
        <>
            <Modal show={getModalStateItem(ModalsEnum.FormNewList).state} onHide={hideFormNewList}>
                <ModalHeader>
                    <ModalTitle>New list</ModalTitle>
                </ModalHeader>
                <FormNewList onSubmit={hideFormNewList} />
            </Modal>
            <Modal show={getModalStateItem(ModalsEnum.FormNewCard).state} onHide={hideFormNewCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                <FormNewCard onSubmit={hideFormNewCard} />
            </Modal>
            <Modal show={getModalStateItem(ModalsEnum.FormUpdateCard).state} onHide={hideFormUpdateCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                <FormUpdateCard
                    onSubmit={hideFormUpdateCard}
                    parameters={getModalStateItem(ModalsEnum.FormUpdateCard).parameters}
                />
            </Modal>
        </>
    );
}
