"use client";
import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";
import useLoading from "@/hooks/useLoading";
import axios from "axios";
import useToasts from "@/hooks/useToasts";
import ToastsEnum from "@/enums/Toasts";
import { useSettingsStore } from "@/store/SettingsStore";
import UnauthorizedErrorHandler from "@/handlers/UnauthorizedErrorHandler";

interface getInitialDataProps {
    children: React.ReactNode;
}

export default function GetInitialData(props: getInitialDataProps) {
    const { children } = props;

    const { setLists, initCards } = useMainStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();
    const { setCurrentUser } = useSettingsStore((state) => state);
    const { addToastAction } = useToasts();

    const fetchLists = (ignore: boolean) => {
        return axios
            .get("/api/lists")
            .then((response) => {
                if (response.status === 200 && !ignore) {
                    setLists(response.data);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    UnauthorizedErrorHandler();
                } else {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
                }
            });
    };

    const fetchCurrentUser = (ignore: boolean) => {
        axios
            .get("/api/current-user")
            .then((response) => {
                if (response.status === 200 && !ignore) {
                    setCurrentUser(response.data);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    UnauthorizedErrorHandler();
                } else {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
                }
            });
    };

    const fetchCards = (ignore: boolean) => {
        return axios
            .get("/api/cards")
            .then((response) => {
                if (response.status === 200 && !ignore) {
                    initCards(response.data);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    UnauthorizedErrorHandler();
                } else {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
                }
            });
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            const loadingId = addToQueueAction();
            Promise.all([fetchLists(ignore), fetchCurrentUser(ignore), fetchCards(ignore)]).finally(() => {
                removeFromQueueAction(loadingId);
                ignore = true;
            });
        }

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>{children}</>;
}
