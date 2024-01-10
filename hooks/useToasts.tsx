import { ToastBodyInterface, ToastsContext } from "@/contexts/ToastsContext";
import { useContext } from "react";

export default function useToasts() {
    const { addToast } = useContext(ToastsContext);

    const addToastAction = (item: ToastBodyInterface) => {
        addToast(item);
    };

    return { addToastAction };
}
