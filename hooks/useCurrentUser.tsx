import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import { useEffect } from "react";

export default function useCurrentUser() {
    const { currentUser, setCurrentUser } = useSettingsStore((state) => state);

    useEffect(() => {
        let ignore = false;

        if (!ignore && !currentUser) {
            axios.get("/api/current-user").then((response) => {
                if (response.status === 200) {
                    ignore = true;
                    setCurrentUser(response.data);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return () => {
            ignore = true;
        };
    }, []);

    return {
        currentUser,
    };
}
