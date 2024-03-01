"use client";
import Themes from "@/enums/Themes";
import useSettings from "@/hooks/useSettings";
import { getCookie } from "cookies-next";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider(props: { children: ReactNode }) {
    const { setThemeAction } = useSettings();
    useEffect(() => {
        const themeAttr = getCookie("app-theme") ?? Themes.default;
        setThemeAction(themeAttr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>{props.children}</>;
}
