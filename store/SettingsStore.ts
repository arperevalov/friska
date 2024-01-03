import UserInterface from "@/interfaces/User";
import { create } from "zustand";

interface SettingsStoreInterface {
    currentUser: UserInterface;
    setCurrentUser: CallableFunction;
}

export const useSettingsStore = create<SettingsStoreInterface>((set) => ({
    currentUser: {
        username: "",
        email: "",
        best_before: 1,
    },
    setCurrentUser: (value: UserInterface) => set((state) => ({ ...state, currentUser: value })),
}));
