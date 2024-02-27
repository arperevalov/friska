"use client";

import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import axios, { AxiosError } from "axios";
import useLoading from "./useLoading";
import ToastsEnum from "@/enums/Toasts";
import useToasts from "./useToasts";
import UnauthorizedErrorHandler from "@/handlers/UnauthorizedErrorHandler";

export default function useCards() {
    const { cards, removeCard, addCard, updateCard } = useMainStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();
    const { addToastAction } = useToasts();

    const getCardAction = async (id: string) => {
        try {
            const request = await axios.get(`/api/cards/${id}`);
            const requestJSON = await request.data;
            return requestJSON;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.status === 401) {
                    UnauthorizedErrorHandler();
                } else {
                    addToastAction({ message: error.message, type: ToastsEnum.ERROR });
                }
            }
        }
    };

    const addCardAction = (card: Omit<CardInterface, "id" | "created_at" | "updated_at">) => {
        const loadingId = addToQueueAction();
        axios
            .post("/api/cards", card)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                if (response) {
                    const formattedData = {
                        ...response[0],
                    };
                    addCard(formattedData);
                }
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

    const updateCardAction = (card: Omit<CardInterface, "created_at" | "updated_at">) => {
        const loadingId = addToQueueAction();
        axios
            .put(`/api/cards/${card.id}`, card)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                updateCard(response);
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

    const removeCardAction = (id: number) => {
        const loadingId = addToQueueAction();
        axios
            .delete(`/api/cards/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    removeCard(id);
                }
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

    const incrementCardLeftAction = (id: number) => {
        const loadingId = addToQueueAction();
        axios
            .put(`/api/cards/${id}/increment`)
            .then((response) => {
                if (response.status === 200) {
                    const formattedData = {
                        ...response.data,
                        left_count: parseInt(response.data.left_count, 10),
                    };
                    updateCard(formattedData);
                }
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

    const decrementCardLeftAction = (id: number) => {
        const loadingId = addToQueueAction();
        axios
            .put(`/api/cards/${id}/decrement`)
            .then((response) => {
                if (response.status === 200) {
                    const formattedData = {
                        ...response.data,
                        left_count: parseInt(response.data.left_count, 10),
                    };
                    updateCard(formattedData);
                }
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
        cards,
        removeCardAction,
        getCardAction,
        incrementCardLeftAction,
        decrementCardLeftAction,
        addCardAction,
        updateCardAction,
    };
}
