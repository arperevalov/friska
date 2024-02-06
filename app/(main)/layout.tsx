import ThemeProvider from "@/components/providers/ThemeProvider";
import GetInitialData from "@/components/helpers/getInitialData";
import LoadingProvider from "@/contexts/LoadingContext";
import ModalProvider from "@/contexts/ModalContext";
import ToastProvider from "@/contexts/ToastsContext";
import "@/styles/_.scss";
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
                <ThemeProvider>
                    <LoadingProvider>
                        <ToastProvider>
                            <ModalProvider>
                                <GetInitialData>{children}</GetInitialData>
                            </ModalProvider>
                        </ToastProvider>
                    </LoadingProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
