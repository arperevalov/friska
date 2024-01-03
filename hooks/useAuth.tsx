import axios from "axios";
import { useRouter } from "next/navigation";

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

    const signInAction = (data: signInInterface) => {
        axios.post("/api/sign-in/", data).then((response) => {
            if (response.data.token) {
                router.push("/");
            }
        });
    };

    const signUpAction = (data: signUpInterface) => {
        axios.post("/api/sign-up/", data).then((response) => {
            if (response.data.token) {
                router.push("/");
            }
        });
    };

    return {
        signInAction,
        signUpAction,
    };
}
