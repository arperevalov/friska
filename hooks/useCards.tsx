"use client";

import CardInterface from "@/interfaces/Card";
import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCards() {
    const router = useRouter();
    const { cards, initCards, removeCard, addCard, updateCard } = useMainStore((state) => state);

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

    const incrementCardLeftAction = () => {
        // axios
        //     .put("/api/cards/", card)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .then((response) => {
        //         if (response) {
        //             const formattedData = {
        //                 response,
        //                 left_count: parseInt(response.left_count, 10),
        //             };
        //             router.push("/");
        //             addCard(formattedData);
        //         }
        //     });
    };

    const decrementCardLeftAction = () => {
        // axios
        //     .post("/api/cards", card)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .then((response) => {
        //         if (response) {
        //             const formattedData = {
        //                 response,
        //                 left_count: parseInt(response.left_count, 10),
        //             };
        //             router.push("/");
        //             addCard(formattedData);
        //         }
        //     });
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
        removeCard,
        incrementCardLeftAction,
        decrementCardLeftAction,
        addCardAction,
        updateCardAction,
    };
}
