"use client";

import Toasts from "@/components/Toasts";
import ToastsEnum from "@/enums/Toasts";
import { createContext, useState } from "react";

interface ToastsContextValue {
    addToast: CallableFunction;
}

export interface ToastBodyInterface {
    message: string;
    type: ToastsEnum;
}

const defaultValue: ToastsContextValue = {
    addToast: () => {},
};

export const ToastsContext = createContext<ToastsContextValue>(defaultValue);
export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [id, setId] = useState(0);
    const [toasts, setToasts] = useState<ToastBodyInterface[]>([]);

    const addToast = (item: ToastBodyInterface) => {
        setToasts((previous) => [...previous, { ...item, id }]);
        setId((previous) => previous++);
    };

    return (
        <>
            <ToastsContext.Provider value={{ addToast }}>
                {children}
                <Toasts toasts={toasts} />
            </ToastsContext.Provider>
        </>
    );
}
