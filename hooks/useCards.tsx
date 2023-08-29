import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";

export default function useCards() {
    const { initCards, cards } = useMainStore((state) => state);

    useEffect(() => {
        if (cards.length > 0) return;

        const requestData = async () => {
            const request = await fetch("/api/cards");
            const requestJSON = await request.json();
            initCards(requestJSON.cards);
        };

        requestData();
    }, []);
}
