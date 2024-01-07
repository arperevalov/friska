"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";

export default function Settings() {
    const { currentUser } = useCurrentUser();

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
