import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";


export default function useCards() {
    const {initCards} = useMainStore(state=>state);

    useEffect(()=>{
        const requestData = async ()=>{
            const request = await fetch('/api/cards')
            const requestJSON = await request.json();
            initCards(requestJSON.cards)
          }
          
        requestData()
    },[])
}