import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import useLoading from "./useLoading";
import useToasts from "./useToasts";
import ToastsEnum from "@/enums/Toasts";
import UnauthorizedErrorHandler from "@/handlers/UnauthorizedErrorHandler";

export default function useCurrentUser() {
    const { currentUser } = useSettingsStore((state) => state);
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
                if (error.response.status === 401) {
                    UnauthorizedErrorHandler();
                } else {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
                }
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    return {
        currentUser,
        updatePasswordAction,
    };
}
