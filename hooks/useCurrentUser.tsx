import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import { useEffect } from "react";

export default function useCurrentUser() {
    const { currentUser, setCurrentUser } = useSettingsStore((state) => state);

    const updatePasswordAction = async (data: { password: string; password_repeat: string }) => {
        return axios.put("/api/current-user/password", data);
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore && !currentUser.username) {
            axios.get("/api/current-user").then((response) => {
                if (response.status === 200) {
                    ignore = true;
                    setCurrentUser(response.data);
                }
            });
        }

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        currentUser,
        updatePasswordAction,
    };
}
