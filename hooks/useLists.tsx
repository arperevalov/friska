"use client";

import ListInterface from "@/interfaces/List";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useLists() {
    const { lists, setLists, addList, removeList, updateList } = useMainStore((state) => state);

    const addListAction = (value: Omit<ListInterface, "id" | "user_id">) => {
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
    };

    const removeListAction = (id: number) => {
        axios.delete(`/api/lists/${id}`).then((response) => {
            if (response.status === 200) {
                removeList(id);
            }
        });
    };

    const updateListAction = (list: ListInterface) => {
        axios.put(`/api/lists/${list.id}`).then((response) => {
            if (response.status === 200) {
                updateList(response.data);
            }
        });
    };

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
        removeListAction,
        updateListAction,
    };
}
