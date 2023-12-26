import Header from "@/components/Header";
import "@/styles/_.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Friska",
    description: "Storage management app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="body">
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
