import Themes from "@/enums/Themes";
import UserInterface from "@/interfaces/User";
import { create } from "zustand";

interface SettingsStoreInterface {
    currentUser: UserInterface;
    theme: Themes;
    setCurrentUser: CallableFunction;
    setTheme: CallableFunction;
}

export const useSettingsStore = create<SettingsStoreInterface>((set) => ({
    currentUser: {
        username: "",
        email: "",
    },
    theme: Themes.default,
    setCurrentUser: (value: UserInterface) => set((state) => ({ ...state, currentUser: value })),
    setTheme: (value: Themes) => set((state) => ({ ...state, theme: value })),
}));
