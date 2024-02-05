"use client";

import Header from "@/components/Header";
import { SelectUnits } from "@/components/SelectUnits";
import Themes from "@/enums/Themes";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTheme from "@/hooks/useTheme";
import Link from "next/link";
import { FormEvent } from "react";

export default function Settings() {
    const { currentUser } = useCurrentUser();
    const { getThemeAction, setThemeAction } = useTheme();
    const themes = Object.keys(Themes).map((item) => item.charAt(0).toUpperCase() + item.slice(1));

    const onThemeSelectUpdate = (event: FormEvent<HTMLInputElement>) => {
        setThemeAction(event.currentTarget.value.toLowerCase());
    }

    const registerThemeSelect = () => {
        return {
            onChange: onThemeSelectUpdate
        }
    }

    return (
        <>
            <Header title="Account" />
            <main>
                <div className="container">
                    <div className="user-main">
                        <div className="user-main__avatar">{currentUser.username[0]}</div>
                        <div className="user-main__info">
                            <div className="user-main__username">{currentUser.username}</div>
                            <div className="user-main__email">{currentUser.email}</div>
                        </div>
                    </div>
                    <SelectUnits values={themes} label="App Theme" formKey="app-theme" register={registerThemeSelect} defaultValue={getThemeAction()}/>
                    <div className="settings">
                        <ul className="settings__list">
                            <li className="settings__item">
                                <Link href="/settings/password" className="settings__link">
                                    Change password
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
