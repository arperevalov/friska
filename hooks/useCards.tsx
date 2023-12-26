"use client";

import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useCards() {
    const { cards, initCards, removeCard, incrementCardLeft, decrementCardLeft, addCard, updateCard } = useMainStore(
        (state) => state,
    );

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
        incrementCardLeft,
        decrementCardLeft,
        addCard,
        updateCard,
    };
}
