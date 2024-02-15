import ModalsEnum from "@/enums/Modals";
import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalTitle from "@/components/modal/ModalTitle";
import useModals from "@/hooks/useModals";
import { ModalStateItemInterface } from "@/contexts/ModalContext";

interface ModalsProps {
    modals: ModalStateItemInterface[];
}

export default function Modals(props: ModalsProps) {
    const { modals } = props;
    const { closeModalAction } = useModals();

    const getModalStateItem = (name: ModalsEnum) => {
        const index = modals.findIndex((item) => {
            return item.name === name;
        });

        return modals[index];
    };

    const hideFormNewList = () => {
        closeModalAction(ModalsEnum.FormNewList);
    };

    const hideFormUpdateList = () => {
        closeModalAction(ModalsEnum.FormUpdateList);
    };

    const hideFormNewCard = () => {
        closeModalAction(ModalsEnum.FormNewCard);
    };

    const hideFormUpdateCard = () => {
        closeModalAction(ModalsEnum.FormUpdateCard);
    };

    return (
        <>
            <Modal show={getModalStateItem(ModalsEnum.FormNewList).state} onHide={hideFormNewList}>
                <ModalHeader>
                    <ModalTitle>New list</ModalTitle>
                </ModalHeader>
                {getModalStateItem(ModalsEnum.FormNewList).body}
            </Modal>
            <Modal show={getModalStateItem(ModalsEnum.FormUpdateList).state} onHide={hideFormUpdateList}>
                <ModalHeader>
                    <ModalTitle>Update list</ModalTitle>
                </ModalHeader>
                {getModalStateItem(ModalsEnum.FormUpdateList).body}
            </Modal>
            <Modal show={getModalStateItem(ModalsEnum.FormNewCard).state} onHide={hideFormNewCard}>
                <ModalHeader>
                    <ModalTitle>New card</ModalTitle>
                </ModalHeader>
                {getModalStateItem(ModalsEnum.FormNewCard).body}
            </Modal>
            <Modal show={getModalStateItem(ModalsEnum.FormUpdateCard).state} onHide={hideFormUpdateCard}>
                <ModalHeader>
                    <ModalTitle>Update card</ModalTitle>
                </ModalHeader>
                {getModalStateItem(ModalsEnum.FormUpdateCard).body}
            </Modal>
        </>
    );
}
