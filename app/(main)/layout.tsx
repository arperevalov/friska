import GetInitialData from "@/components/helpers/getInitialData";
import LoadingProvider from "@/contexts/LoadingContext";
import ModalProvider from "@/contexts/ModalContext";
import ToastProvider from "@/contexts/ToastsContext";
import "@/styles/_.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Friska",
    description: "Storage management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <LoadingProvider>
                    <ToastProvider>
                        <ModalProvider>
                            <GetInitialData>{children}</GetInitialData>
                        </ModalProvider>
                    </ToastProvider>
                </LoadingProvider>
            </body>
        </html>
    );
}
