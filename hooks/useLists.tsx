"use client";

import ListInterface from "@/interfaces/List";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useLists() {
    const { lists, setLists, addList, removeList } = useMainStore((state) => state);

    const addListAction = (value: Omit<ListInterface, "id">) => {
        axios
            .post("/api/lists", value)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                if (response) {
                    const formattedData = {
                        ...response,
                    };
                    addList(formattedData);
                }
            });
    }

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
        addListAction,
        removeList,
    };
}
