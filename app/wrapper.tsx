"use client";

import GetInitialData from "@/components/helpers/getInitialData";
import { usePathname } from "next/navigation";
import React from "react";

const unsignedRoutes = /!?\/sign-in|\/sign-up|\/intro/i;

export default function Wrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname.match(unsignedRoutes)) {
        return <>{children}</>;
    }

    return (
        <>
            <GetInitialData>{children}</GetInitialData>
        </>
    );
}
