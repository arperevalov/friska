"use client";

import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useLists() {
    const { lists, setLists, addList, removeList } = useMainStore((state) => state);

    useEffect(() => {
        let ignore = false;

        const requestData = async () => {
            const request = await axios.get("/api/lists");
            const requestJSON = request.data;
            setLists(requestJSON);
        };

        if (!ignore) {
            requestData();
        }

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        lists,
        addList,
        removeList,
    };
}
