import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";

export default function useLists() {
    const { lists, setLists } = useMainStore((state) => state);

    useEffect(() => {
        let ignore = false;

        const requestData = async () => {
            const request = await fetch("/api/lists");
            const requestJSON = await request.json();
            setLists(requestJSON.lists);
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
        lists,
    };
}
