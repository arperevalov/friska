"use client";

import Header from "@/components/Header";
import { SelectUnits } from "@/components/SelectUnits";
import { Switch } from "@/components/Switch";
import CardsStyle from "@/enums/CardsStyle";
import Themes from "@/enums/Themes";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import useSettings from "@/hooks/useSettings";
import Link from "next/link";
import { FormEvent, ReactNode } from "react";

function Settings(): ReactNode {
    const { currentUser } = useCurrentUser();
    const { getThemeAction, setThemeAction, getCardsStyleAction, setCardsStyleAction } = useSettings();
    const { subscribe, unsubscribe } = useNotifications();
    const capitalize = (item: string) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    };
    const themes = Object.keys(Themes).map((item) => capitalize(item));
    const cardsStyles = Object.keys(CardsStyle).map((item) => capitalize(item));

    const onNotificationsSwitchChange = (event: FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.checked) {
            subscribe();
        } else {
            unsubscribe();
        }
    };

    const registerNotificationsSwitch = () => {
        return {
            onChange: onNotificationsSwitchChange,
        };
    };

    const onThemeSelectUpdate = (event: FormEvent<HTMLInputElement>) => {
        setThemeAction(event.currentTarget.value.toLowerCase());
    };

    const registerThemeSelect = () => {
        return {
            onChange: onThemeSelectUpdate,
        };
    };

    const onCardsStyleSelectUpdate = (event: FormEvent<HTMLInputElement>) => {
        setCardsStyleAction(event.currentTarget.value.toLowerCase());
    };

    const registerCardsStyleSelect = () => {
        return {
            onChange: onCardsStyleSelectUpdate,
        };
    };

    return (
        <>
            <Header title="Account" isLogout={true} isBack={true} isBottom={true} />
            <main>
                <div className="container">
                    <div className="user-main">
                        <div className="user-main__avatar">{currentUser.username[0]}</div>
                        <div className="user-main__info">
                            <div className="user-main__username">{currentUser.username}</div>
                            <div className="user-main__email">{currentUser.email}</div>
                        </div>
                    </div>
                    <Switch
                        label="Enable notifications"
                        formKey="notifications"
                        register={registerNotificationsSwitch}
                    />
                    <SelectUnits
                        values={cardsStyles}
                        label="Display Cards As"
                        formKey="app-cards-style"
                        register={registerCardsStyleSelect}
                        defaultValue={capitalize(getCardsStyleAction())}
                    />
                    <SelectUnits
                        values={themes}
                        label="App Theme"
                        formKey="app-theme"
                        register={registerThemeSelect}
                        defaultValue={capitalize(getThemeAction())}
                    />
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

export default Settings;
