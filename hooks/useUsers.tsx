import axios from "axios"

export default function useUsers () {
    const signUpAction = (data: {
        email: string;
        username: string;
        password: string;
    }) => {
        axios.post("/api/sign-up/", data)
    }

    return {signUpAction}
}