"use client";

import Header from "@/components/Header";

export default function Confirm() {
    return (
        <>
            <Header title="Confirmation" isLogout={true} isBack={false} isBottom={false} />
            <main>
                <div className="container">
                    It seems like you haven&apos;t confirmed your email address. Please check out your email.
                </div>
            </main>
        </>
    );
}
