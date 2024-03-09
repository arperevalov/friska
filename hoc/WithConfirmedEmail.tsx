"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WithConfirmedEmail(Component: () => React.ReactNode) {

    const WithConfirmedEmailComponent = () => {
        const { currentUser } = useCurrentUser();
        const router = useRouter();
    
        useEffect(()=>{
            if (!currentUser.confirmed_at) {
                router.push('/confirm')
            }
        }, [])
    
        return <Component/>;
    }

    return WithConfirmedEmailComponent;
}