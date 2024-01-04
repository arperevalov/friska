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
        [ModalsEnum.FormNewCard]: false,
    });

    const toggleModal = (name: ModalsEnum) => {
        setModal((previous) => ({ ...previous, [name]: !previous[name] }));
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
