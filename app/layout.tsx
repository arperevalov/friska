import ThemeProvider from "@/components/providers/ThemeProvider";
import LoadingProvider from "@/contexts/LoadingContext";
import ModalProvider from "@/contexts/ModalContext";
import ToastProvider from "@/contexts/ToastsContext";
import "@/styles/index.scss";
import type { Metadata } from "next";
import Image from "next/image";
import Wrapper from "@/app/wrapper";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Friska",
    description: "Storage management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

    const theme = cookies().get("app-theme")?.value ?? ""

    return (
        <html lang="en" className={theme ? `is-theme-${theme}` : ''}>
            <body>
                <Image src={"/public/sprite.svg"} fill className="visually-hidden" alt="icons" />
                <ThemeProvider>
                    <LoadingProvider>
                        <ToastProvider>
                            <ModalProvider>
                                <Wrapper>{children}</Wrapper>
                            </ModalProvider>
                        </ToastProvider>
                    </LoadingProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
