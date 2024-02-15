"use client";
import Modals from "@/components/Modals";
import ModalsEnum from "@/enums/Modals";
import { ReactNode, createContext, useState } from "react";

interface ModalContextValue {
    toggleModal: CallableFunction;
    closeModal: CallableFunction;
}

export interface ModalStateItemInterface {
    name: ModalsEnum;
    state: boolean;
    body: ReactNode;
}

const defaultValue: ModalContextValue = {
    toggleModal: () => {},
    closeModal: () => {},
};

export const ModalContext = createContext<ModalContextValue>(defaultValue);
export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModal] = useState<ModalStateItemInterface[]>([
        {
            name: ModalsEnum.FormNewList,
            state: false,
            body: <></>,
        },
        {
            name: ModalsEnum.FormUpdateList,
            state: false,
            body: <></>,
        },
        {
            name: ModalsEnum.FormNewCard,
            state: false,
            body: <></>,
        },
        {
            name: ModalsEnum.FormUpdateCard,
            state: false,
            body: <></>,
        },
    ]);

    const toggleModal = (name: ModalsEnum, body: ReactNode) => {
        setModal((previous) =>
            previous.map((item) => {
                if (item.name === name) {
                    return {
                        ...item,
                        state: !item.state,
                        body,
                    };
                }
                return item;
            }),
        );
    };

    const closeModal = (name: ModalsEnum) => {
        setModal((previous) =>
            previous.map((item) => {
                if (item.name === name) {
                    return {
                        ...item,
                        state: false,
                        body: <></>,
                    };
                }
                return item;
            }),
        );
    };

    return (
        <>
            <ModalContext.Provider value={{ toggleModal, closeModal }}>
                {children}
                <Modals modals={modals} />
            </ModalContext.Provider>
        </>
    );
}
