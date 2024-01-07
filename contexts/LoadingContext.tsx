"use client";
import { createContext, useState } from "react";

interface LoadingQueueValue {
    id: number;
    state: boolean;
}

interface LoadingContextValue {
    loading: LoadingQueueValue[];
    addToQueue: CallableFunction;
    removeFromQueue: CallableFunction;
}

const defaultValue: LoadingContextValue = {
    loading: [],
    addToQueue: () => {},
    removeFromQueue: () => {},
};

export const LoadingContext = createContext<LoadingContextValue>(defaultValue);
export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<LoadingQueueValue[]>([]);
    const [queueId, setQueueId] = useState(0);

    const addToQueue = () => {
        setLoading((previous) => [...previous, { id: queueId, state: true }]);
        setQueueId((previous) => previous++);
        return queueId;
    };

    const removeFromQueue = (id: number) => {
        setLoading((previous) =>
            previous.filter((item) => {
                return item.id !== id;
            }),
        );
    };

    return (
        <>
            <LoadingContext.Provider value={{ loading, addToQueue, removeFromQueue }}>
                {children}
                <div className={`loading${loading.length > 0 ? " show" : ""}`}></div>
            </LoadingContext.Provider>
        </>
    );
}
