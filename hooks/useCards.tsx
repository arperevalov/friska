"use client";

import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCards() {
    const router = useRouter();
    const { cards, initCards, removeCard, addCard, updateCard } = useMainStore((state) => state);

    const getCardAction = async (id: string) => {
        const request = await axios.get(`/api/cards/${id}`);
        const requestJSON = await request.data;
        return requestJSON;
    };

    const addCardAction = (card: Omit<CardInterface, "id">) => {
        axios
            .post("/api/cards", card)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                if (response) {
                    const formattedData = {
                        response,
                        left_count: parseInt(response.left_count, 10),
                    };
                    router.push("/");
                    addCard(formattedData);
                }
            });
    };

    const updateCardAction = (card: CardInterface) => {
        axios
            .put(`/api/cards/${card.id}`, card)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                updateCard(response);
                router.push("/");
            });
    };

    const removeCardAction = (id: number) => {
        axios.delete(`/api/cards/${id}`).then((response) => {
            if (response.status === 200) {
                removeCard(id);
            }
        });
    };

    const incrementCardLeftAction = (id: number) => {
        axios.put(`/api/cards/${id}/increment`).then((response) => {
            if (response.status === 200) {
                const formattedData = {
                    ...response.data,
                    left_count: parseInt(response.data.left_count, 10),
                };
                updateCard(formattedData);
                router.push("/");
            }
        });
    };

    const decrementCardLeftAction = (id: number) => {
        axios.put(`/api/cards/${id}/decrement`).then((response) => {
            if (response.status === 200) {
                const formattedData = {
                    ...response.data,
                    left_count: parseInt(response.data.left_count, 10),
                };
                updateCard(formattedData);
                router.push("/");
            }
        });
    };

    useEffect(() => {
        let ignore = false;

        const requestData = async () => {
            const request = await axios.get("/api/cards");
            const requestJSON = request.data;
            initCards(requestJSON);
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
        cards,
        removeCardAction,
        getCardAction,
        incrementCardLeftAction,
        decrementCardLeftAction,
        addCardAction,
        updateCardAction,
    };
}
