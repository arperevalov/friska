import { useMainStore } from "@/store/MainStore";
import { useEffect } from "react";


export default function useCards() {
    const {setCards} = useMainStore(state=>state);

    useEffect(()=>{
        const requestData = async ()=>{
            const request = await fetch('/api/cards')
            const requestJSON = await request.json();
            setCards(requestJSON.cards)
          }
          
        requestData()
    },[])
}