import LoadingProvider from "@/contexts/LoadingContext";
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
                <LoadingProvider>{children}</LoadingProvider>
            </body>
        </html>
    );
}
