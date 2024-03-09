"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmLink() {
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/confirm/${params.link}`).then(() => {
            router.push("/");
        });
    }, []);

    return (
        <>
            <Header title="Confirmation" />
            <main>
                <div className="container">
                    It seems like you haven&apos;t confirmed your email address. Please check out your email.
                </div>
            </main>
        </>
    );
}
