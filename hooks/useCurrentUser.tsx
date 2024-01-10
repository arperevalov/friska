import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import { useEffect } from "react";
import useLoading from "./useLoading";
import useToasts from "./useToasts";
import ToastsEnum from "@/enums/Toasts";

export default function useCurrentUser() {
    const { currentUser, setCurrentUser } = useSettingsStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();
    const { addToastAction } = useToasts();

    const updatePasswordAction = async (data: { password: string; password_repeat: string }) => {
        const loadingId = addToQueueAction();
        return axios
            .put("/api/current-user/password", data)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
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
                .catch((error) => {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
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
