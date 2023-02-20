import Link from "next/link";
import { ElementRef, useRef } from "react";
import { create } from "zustand"

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
    const daysBeforeSettingInput = useRef(null)

    return <>
    <Link href='/'>Home</Link>
        <div>
            {daysBeforeSetting}
            <label>
                <span>Days before setting</span>
                <input value={daysBeforeSetting} type="number" onChange={(event)=>{setDaysBeforeSetting(event.currentTarget.value)}}/>
            </label>
        </div>
    </>
}