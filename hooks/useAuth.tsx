import axios from "axios";
import { useRouter } from "next/navigation";
import useLoading from "./useLoading";
import useToasts from "./useToasts";
import ToastsEnum from "@/enums/Toasts";

interface signInInterface {
    username: string;
    password: string;
}

interface signUpInterface {
    username: string;
    email: string;
    password: string;
}

export default function useAuth() {
    const router = useRouter();
    const { addToQueueAction, removeFromQueueAction } = useLoading();
    const { addToastAction } = useToasts();

    const signInAction = (data: signInInterface) => {
        const loadingId = addToQueueAction();
        axios
            .post("/api/sign-in/", data)
            .then((response) => {
                if (response.data.token) {
                    router.push("/");
                }
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    const signUpAction = (data: signUpInterface) => {
        const loadingId = addToQueueAction();
        axios
            .post("/api/sign-up/", data)
            .then((response) => {
                if (response.data.token) {
                    router.push("/");
                }
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    return {
        signInAction,
        signUpAction,
    };
}
