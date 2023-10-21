import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";

export default function useLists() {
    const { setLists } = useMainStore((state) => state);

    useEffect(() => {
        const requestLists = async () => {
            const request = await fetch("/api/lists");
            const requestJSON = await request.json();
            setLists(requestJSON.lists);
        };

        requestLists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
