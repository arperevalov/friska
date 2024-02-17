import LoadingProvider from "@/contexts/LoadingContext";
import "@/styles/index.scss";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Friska",
    description: "Storage management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Image src={"/public/sprite.svg"} fill className="visually-hidden" alt="icons" />
                <LoadingProvider>{children}</LoadingProvider>
            </body>
        </html>
    );
}
