import ModalsEnum from "@/enums/Modals";
import FormNewCard from "@/components/forms/FormNewCard";
import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import ModalTitle from "@/components/modal/ModalTitle";
import useModals from "@/hooks/useModals";
import FormUpdateCard from "./forms/FormUpdateCard";
import FormNewList from "./forms/FormNewList";

interface ModalsProps {
    modals: {
        [ModalsEnum.FormNewList]: {
            state: boolean;
            parameters: null;
        };
        [ModalsEnum.FormNewCard]: {
            state: boolean;
            parameters: null;
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
            <Modal show={modals[ModalsEnum.FormNewList].state} onHide={hideFormNewList}>
                <ModalHeader>
                    <ModalTitle>New list</ModalTitle>
                </ModalHeader>
                <FormNewList onSubmit={hideFormNewList} />
            </Modal>
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
                <FormUpdateCard
                    onSubmit={hideFormUpdateCard}
                    parameters={modals[ModalsEnum.FormUpdateCard]?.parameters}
                />
            </Modal>
        </>
    );
}
