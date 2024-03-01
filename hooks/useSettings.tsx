import CardsStyle from "@/enums/CardsStyle";
import Themes from "@/enums/Themes";
import { useSettingsStore } from "@/store/SettingsStore";
import { getCookie, setCookie } from "cookies-next";

export default function useSettings() {
    const { theme, setTheme, cardsStyle, setCardsStyle } = useSettingsStore((state) => state);

    const getThemeAction = (): string => {
        return getCookie("app-theme") ?? theme ?? Themes.default;
    };

    const getCardsStyleAction = (): string => {
        if (typeof window === "undefined") return CardsStyle.grid;
        return window.localStorage.getItem("app-cards-style") ?? cardsStyle ?? CardsStyle.grid;
    };

    const updateClasses = (themeAttr: string) => {
        if (typeof document === "undefined") return;
        const { documentElement } = document;
        const template = "is-theme-";

        Object.keys(Themes).forEach((style) => {
            documentElement.classList.remove(template + style);
        });
        if (documentElement.classList.contains(template + themeAttr)) return;
        documentElement.classList.add(template + themeAttr);
    };

    const setThemeAction = (themeAttr: string) => {
        setTheme(themeAttr);
        updateClasses(themeAttr);
        setCookie("app-theme", themeAttr);
    };

    const setCardsStyleAction = (themeAttr: string) => {
        setCardsStyle(themeAttr);
        window.localStorage.setItem("app-cards-style", themeAttr);
    };
    return { getThemeAction, setThemeAction, getCardsStyleAction, setCardsStyleAction };
}
