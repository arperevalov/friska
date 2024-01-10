import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import { useEffect } from "react";
import useLoading from "./useLoading";

export default function useCurrentUser() {
    const { currentUser, setCurrentUser } = useSettingsStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();

    const updatePasswordAction = async (data: { password: string; password_repeat: string }) => {
        const loadingId = addToQueueAction();
        return axios
            .put("/api/current-user/password", data)
            .then((result) => {
                return result;
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore && !currentUser.username) {
            const loadingId = addToQueueAction();
            axios
                .get("/api/current-user")
                .then((response) => {
                    if (response.status === 200) {
                        ignore = true;
                        setCurrentUser(response.data);
                    }
                })
                .finally(() => {
                    removeFromQueueAction(loadingId);
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
