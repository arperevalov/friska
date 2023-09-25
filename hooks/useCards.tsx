import { useMainStore } from "@/store/MainStore";
import axios from "axios";
import { useEffect } from "react";

export default function useCards() {
    const { initCards, cards } = useMainStore((state) => state);

    useEffect(() => {
        if (cards.length > 0) return;

        const requestData = async () => {
            const request = await axios.get("/api/cards");
            const requestJSON = await request.data;
            initCards(requestJSON.cards);
        };

        requestData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
