import Themes from "@/enums/Themes";
import { useSettingsStore } from "@/store/SettingsStore";

export default function useSettings() {
    const { theme, setTheme } = useSettingsStore((state) => state);

    const getThemeAction = (): string => {
        if (typeof window === "undefined") return Themes.default;
        return window.localStorage.getItem("app-theme") ?? theme ?? Themes.default;
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
        window.localStorage.setItem("app-theme", themeAttr);
    };
    return { getThemeAction, setThemeAction };
}
