"use client";

import ListInterface from "@/interfaces/List";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";
import useLoading from "./useLoading";

export default function useLists() {
    const { lists, setLists, addList, removeList, updateList } = useMainStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();

    const addListAction = (value: Omit<ListInterface, "id" | "user_id">) => {
        const loadingId = addToQueueAction();
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
                removeFromQueueAction(loadingId);
            });
    };

    const removeListAction = async (id: number) => {
        const loadingId = addToQueueAction();
        return axios.delete(`/api/lists/${id}`).then((response) => {
            if (response.status === 200) {
                removeList(id);
            }
            removeFromQueueAction(loadingId);
        });
    };

    const updateListAction = (list: ListInterface) => {
        const loadingId = addToQueueAction();
        axios.put(`/api/lists/${list.id}`, list).then((response) => {
            if (response.status === 200) {
                updateList(response.data);
            }
            removeFromQueueAction(loadingId);
        });
    };

    useEffect(() => {
        let ignore = false;

        const requestData = async () => {
            const loadingId = addToQueueAction();
            const request = await axios.get("/api/lists");
            const requestJSON = request.data;
            setLists(requestJSON);
            removeFromQueueAction(loadingId);
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
