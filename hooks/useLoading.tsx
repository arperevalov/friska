import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext } from "react";

export default function useLoading() {
    const { loading, addToQueue, removeFromQueue } = useContext(LoadingContext);

    const addToQueueAction = () => {
        return addToQueue();
    };

    const removeFromQueueAction = (id: number) => {
        removeFromQueue(id);
    };

    return {
        loading,
        addToQueueAction,
        removeFromQueueAction,
    };
}
