import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { useEffect, useRef } from "react";
import { create } from "zustand"
import { useMainStore } from ".";

interface SettingsStoreInterface {
    daysBeforeSetting: number,
    setDaysBeforeSetting: CallableFunction
}

export const useSettingsStore = create<SettingsStoreInterface>(set => ({
    daysBeforeSetting: 1,
    setDaysBeforeSetting: (value:number) => set((state) => ({...state, daysBeforeSetting: value}))
}))

export default function Settings() {

    const {daysBeforeSetting, setDaysBeforeSetting} = useSettingsStore(state=>state);
    const {lists, setLists} = useMainStore(state=>state);

    useEffect(()=>{
        const requestLists = async () =>{
        const request = await fetch('/api/lists')
        const requestJSON = await request.json();
        setLists(requestJSON.lists)
        }
        requestLists();
    },[])

    return <>
    <Header/>
    <main>
        <div className="container">
            <label htmlFor="" className="input">
                <span className="input__label h3">Best before limit, days {daysBeforeSetting}</span>
                <input onChange={(event)=>{setDaysBeforeSetting(event.currentTarget.value)}} className="input__input" type='number' value={ daysBeforeSetting } min='0'/>
            </label>
            
            <label htmlFor="" className="input">
                <span className="input__label h3">Categories</span>
                <div className="chips">
                    { lists.length > 0 ? lists.map(list => (
                        <>
                            <div className="chips__item h3">
                                {list.title}
                            </div>
                        </>
                    )) : ''}
                </div>
            </label>
        </div>
      </main>
    </>
}