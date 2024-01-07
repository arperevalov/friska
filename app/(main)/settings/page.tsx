"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";

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
                </div>
            </main>
        </>
    );
}
