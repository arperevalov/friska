"use client";
import Modals from "@/components/Modals";
import ModalsEnum from "@/enums/Modals";
import { createContext, useState } from "react";

interface ModalContextValue {
    toggleModal: CallableFunction;
}

export interface ModalStateItemInterface {
    name: ModalsEnum;
    state: boolean;
    parameters: null | string | number;
}

const defaultValue: ModalContextValue = {
    toggleModal: () => {},
};

export const ModalContext = createContext<ModalContextValue>(defaultValue);
export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModal] = useState<ModalStateItemInterface[]>([
        {
            name: ModalsEnum.FormNewList,
            state: false,
            parameters: null,
        },
        {
            name: ModalsEnum.FormUpdateList,
            state: false,
            parameters: null,
        },
        {
            name: ModalsEnum.FormNewCard,
            state: false,
            parameters: null,
        },
        {
            name: ModalsEnum.FormUpdateCard,
            state: false,
            parameters: null,
        },
    ]);

    const toggleModal = (name: ModalsEnum, parameters: string | number | null) => {
        setModal((previous) =>
            previous.map((item) => {
                if (item.name === name) {
                    return {
                        ...item,
                        state: !item.state,
                        parameters,
                    };
                }
                return item;
            }),
        );
    };

    return (
        <>
            <ModalContext.Provider value={{ toggleModal }}>
                {children}
                <Modals modals={modals} />
            </ModalContext.Provider>
        </>
    );
}
