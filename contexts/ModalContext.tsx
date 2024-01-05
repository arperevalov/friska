"use client";
import Modals from "@/components/Modals";
import ModalsEnum from "@/enums/Modals";
import { createContext, useState } from "react";

interface ModalContextValue {
    toggleModal: CallableFunction;
}

const defaultValue: ModalContextValue = {
    toggleModal: () => {},
};

export const ModalContext = createContext<ModalContextValue>(defaultValue);
export default function ModalProvider({ children }: { children: React.ReactNode }) {
    const [modals, setModal] = useState({
        [ModalsEnum.FormNewList]: {
            state: false,
            parameters: null,
        },
        [ModalsEnum.FormNewCard]: {
            state: false,
            parameters: null,
        },
        [ModalsEnum.FormUpdateCard]: {
            state: false,
            parameters: null,
        },
    });

    const toggleModal = (name: ModalsEnum, parameters: string | number | null) => {
        setModal((previous) => ({
            ...previous,
            [name]: {
                state: !previous[name].state,
                parameters,
            },
        }));
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
