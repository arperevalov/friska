import axios from "axios";
import { useRouter } from "next/navigation";
import useLoading from "./useLoading";

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

    const signInAction = (data: signInInterface) => {
        const loadingId = addToQueueAction();
        axios.post("/api/sign-in/", data).then((response) => {
            if (response.data.token) {
                router.push("/");
            }
            removeFromQueueAction(loadingId);
        });
    };

    const signUpAction = (data: signUpInterface) => {
        const loadingId = addToQueueAction();
        axios.post("/api/sign-up/", data).then((response) => {
            if (response.data.token) {
                router.push("/");
            }
            removeFromQueueAction(loadingId);
        });
    };

    return {
        signInAction,
        signUpAction,
    };
}
