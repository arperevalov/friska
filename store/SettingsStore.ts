import { create } from "zustand"

interface SettingsStoreInterface {
    daysBeforeSetting: number,
    setDaysBeforeSetting: CallableFunction
}

export const useSettingsStore = create<SettingsStoreInterface>(set => ({
    daysBeforeSetting: 1,
    setDaysBeforeSetting: (value:number) => set((state) => ({...state, daysBeforeSetting: value}))
}))