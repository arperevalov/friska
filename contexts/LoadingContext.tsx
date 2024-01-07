"use client";
import { createContext, useState } from "react";

interface LoadingQueueValue {
    id: number,
    state: boolean,
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
    const [id, setId] = useState(0);

    const addToQueue = () => {
        setLoading((previous) => [...previous, {id, state: true}]);
        setId((previous) => previous++);
        return id
    }

    const removeFromQueue = (id: number) => {
        setLoading((previous) => previous.filter((item)=>{
            return item.id !== id
        }))
    }

    return (
        <>
            <LoadingContext.Provider value={{ loading, addToQueue, removeFromQueue }}>
                {children}
                <div className={`loading${loading.length > 0 ? 'show' : ''}`}></div>
            </LoadingContext.Provider>
        </>
    );
}
