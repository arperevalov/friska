import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";

export default function useCards() {
    const { cards, initCards } = useMainStore((state) => state);

    useEffect(() => {
        let ignore = false;

        const requestData = async () => {
            const request = await fetch("/api/cards");
            const requestJSON = await request.json();
            initCards(requestJSON.cards);
        };

        if(!ignore) {
            requestData();
        }

        return () => {
            ignore = true;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        cards,
    };
}
