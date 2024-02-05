import Themes from "@/enums/Themes";
import { useSettingsStore } from "@/store/SettingsStore";

export default function useTheme () {
    const { theme, setTheme } = useSettingsStore((state) => state);

    const getThemeAction = () => {
        if (typeof window === 'undefined') return Themes.default;
        const result = localStorage.getItem('app-theme') ?? theme ?? Themes.default;
        // setInitialClass(result);
        return result;
    }

    // const setInitialClass = (modifier: string) => {
    //     if (typeof document === 'undefined') return;
    //     const { documentElement } = document;
    //     const template = 'is-theme-'

    //     documentElement.classList.add(template + modifier);
    // }

    // const updateClasses = () => {
    //     if (typeof document === 'undefined') return;
    //     const { documentElement } = document;
    //     const template = 'is-theme-'

    //     Object.keys(Themes).forEach((style) => {
    //         documentElement.classList.remove(template + style);
    //     });
    //     documentElement.classList.add(template + theme);
    // }

    const setThemeAction = (themeAttr: string) => {
        setTheme(themeAttr);
        // updateClasses();
        localStorage.setItem('app-theme', themeAttr);
    }
    return {getThemeAction, setThemeAction}
}