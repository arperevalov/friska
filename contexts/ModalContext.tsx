"use client";
import Modals from "@/components/Modals"
import { createContext } from "react"

interface ModalContextValue {
    toggleModal: CallableFunction
}

const defaultValue:ModalContextValue = {
    toggleModal: () => {}
}

export const ModalContext = createContext<ModalContextValue>(defaultValue)
export default function ModalProvider({children}:{children: React.ReactNode}) {

    const toggleModal = () => {
    }

    return <>
        <ModalContext.Provider value={{toggleModal}}>
            {children}
            <Modals />
        </ModalContext.Provider>
    </>
}

 