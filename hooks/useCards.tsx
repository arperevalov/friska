"use client";

import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";
import useLoading from "./useLoading";

export default function useCards() {
    const { cards, initCards, removeCard, addCard, updateCard } = useMainStore((state) => state);
    const { addToQueueAction, removeFromQueueAction } = useLoading();

    const getCardAction = async (id: string) => {
        const request = await axios.get(`/api/cards/${id}`);
        const requestJSON = await request.data;
        return requestJSON;
    };

    const addCardAction = (card: Omit<CardInterface, "id">) => {
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
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    const updateCardAction = (card: CardInterface) => {
        const loadingId = addToQueueAction();
        axios
            .put(`/api/cards/${card.id}`, card)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                updateCard(response);
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
            .finally(() => {
                removeFromQueueAction(loadingId);
            });
    };

    useEffect(() => {
        if (cards.length !== 0) return;
        let ignore = false;

        if (!ignore) {
            const loadingId = addToQueueAction();
            axios
                .get("/api/cards")
                .then((response) => {
                    if (response.status === 200) {
                        initCards(response.data);
                    }
                })
                .finally(() => {
                    removeFromQueueAction(loadingId);
                });
        }

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
