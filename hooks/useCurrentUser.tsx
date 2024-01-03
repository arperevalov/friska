import { useSettingsStore } from "@/store/SettingsStore";
import axios from "axios";
import { useEffect } from "react";

export default function useCurrentUser() {
    const { currentUser, setCurrentUser } = useSettingsStore((state) => state);

    useEffect(() => {
        let ignore = false;

        if (!ignore) {
            axios.get("/api/current-user").then((response) => {
                if (response.status === 200) {
                    debugger;
                    ignore = true;
                    setCurrentUser(response.data);
                }
            });
        }
    }, []);

    return {
        currentUser,
    };
}
