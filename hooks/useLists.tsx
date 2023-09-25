import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useLists() {
    const { setLists, lists } = useMainStore((state) => state);

    useEffect(() => {
        if (lists.length > 0) return;

        const requestLists = async () => {
            const request = await axios.get("/api/lists");
            const requestJSON = await request.data;
            setLists(requestJSON.lists);
        };
        requestLists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
