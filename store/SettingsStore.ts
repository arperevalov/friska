import CardsStyle from "@/enums/CardsStyle";
import Themes from "@/enums/Themes";
import UserInterface from "@/interfaces/User";
import { create } from "zustand";

interface SettingsStoreInterface {
    currentUser: UserInterface;
    theme: Themes;
    cardsStyle: CardsStyle;
    setCurrentUser: CallableFunction;
    setTheme: CallableFunction;
    setCardsStyle: CallableFunction;
}

export const useSettingsStore = create<SettingsStoreInterface>((set) => ({
    currentUser: {
        username: "",
        email: "",
    },
    theme: Themes.default,
    cardsStyle: CardsStyle.grid,
    setCurrentUser: (value: UserInterface) => set((state) => ({ ...state, currentUser: value })),
    setTheme: (value: Themes) => set((state) => ({ ...state, theme: value })),
    setCardsStyle: (value: CardsStyle) => set((state) => ({ ...state, cardsStyle: value })),
}));
