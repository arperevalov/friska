"use client";

import ListInterface from "@/interfaces/List";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import useLoading from "./useLoading";
import useToasts from "./useToasts";
import ToastsEnum from "@/enums/Toasts";

export default function useLists() {
    const { lists, addList, removeList, updateList } = useMainStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();
    const { addToastAction } = useToasts();

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
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    const removeListAction = async (id: number) => {
        const loadingId = addToQueueAction();
        return axios
            .delete(`/api/lists/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    removeList(id);
                }
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    const updateListAction = (list: ListInterface) => {
        const loadingId = addToQueueAction();
        axios
            .put(`/api/lists/${list.id}`, list)
            .then((response) => {
                if (response.status === 200) {
                    updateList(response.data);
                }
            })
            .catch((error) => {
                addToastAction({ message: error.message, type: ToastsEnum.ERROR });
            })
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    return {
        lists,
        addListAction,
        removeListAction,
        updateListAction,
    };
}
